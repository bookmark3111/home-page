<template>
    <div class="calendar-container">
        <HeaderBtn />
        <!-- 加载动画 -->
        <div v-if="isLoading" class="overlay">
            <div class="spinner"></div>
        </div>

        <div class="calendar" v-if="!isLoading">
            <!-- 年月切换 -->
            <div class="calendar-header">
                <button @click="prevMonth" class="change-month">上一月</button>
                <h2>{{ currentYear }}年 {{ currentMonth }}月</h2>
                <button @click="nextMonth" class="change-month">下一月</button>
            </div>

            <!-- 星期几标题 -->
            <div class="calendar-weekdays">
                <div v-for="weekday in weekDays" :key="weekday" class="weekday">
                    {{ weekday }}
                </div>
            </div>

            <!-- 日历网格 -->
            <div class="calendar-grid">
                <div v-for="(day, index) in calendarDays" :key="index" class="calendar-day" :class="{
                    'today': isToday(day.date),
                    'other-month': !day.isCurrentMonth,
                    'rest-day': day.isRest,
                    'work-day': day.isWorkday,
                    'festival-day': day.festival_zh
                }" @click="selectDay(day)">
                    <div class="date-info" @click="scrollToBottom">
                        <p class="solar-date">{{ day.solarDate }}
                            <span v-if="day.isRest && day.events.length == 0" class="rest-tag">休</span>
                            <span v-if="!day.isWorkday && day.events.length > 0" class="reservation-tag">{{
                                day.lable
                            }}</span>
                            <span v-if="day.isWorkday" class="work-tag">班</span>
                        </p>
                        <div class="day-tags">
                            <p class="todayStation" v-if="!day.isWorkday && day.events.length > 0">
                            <p v-for="event in day.events" :key="event.time">
                                {{ event.time }} {{ event.event }}
                            </p>
                            </p>
                        </div>
                        <p class="lunar-date">{{ day.festival_zh != '' ? day.festival_zh : day.lunarDate }}</p>
                        <div :class="{ 'float-text': true }">今</div>
                    </div>
                </div>
            </div>

            <!-- 行程详情 -->
            <div v-if="selectedDay" class="day-details">
                <h3>{{ selectedDay.date }}日 的行程 <span v-show="selectedDay.images.length != 0"
                        style="color: red;float: right;">(出镜 {{ selectedDay.images.length }} 人)</span></h3>
                <ul>
                    <li v-show="selectedDay.festival_zh != ''">{{ selectedDay.lunarDate }}
                        <span style="color: red;"><strong>{{ selectedDay.festival_zh }}</strong> ( {{
                            selectedDay.festival_en }} )</span>
                    </li>
                    <li v-for="event in selectedDay.events" :key="event.time">
                        <strong>{{ event.time }} - {{ event.event }}</strong>
                        <p>{{ event.desc }}</p>
                        <p v-if="event.imgsrc.length > 0">
                            <div class="content">
                                <div v-for="exp in event.imgsrc">
                                    <img :src="exp.src" class="timestamp-img-item"
                                    @click="openModal(exp.src, event.time, event.event)" />
                                </div>
                               
                            </div>
                        </p>
                    </li>
                </ul>
                <div v-if="selectedDay.images.length > 0">
                    <div class="moment" v-for="(image, index) in selectedDay.images">
                        <div class="content">
                            <div>
                                <el-row>
                                    <el-col :span="20">{{ image.title }} <i class="fa fa-camera"
                                            style="color: purple;"></i>
                                        {{ image.desc }} </el-col>
                                    <el-col style="text-align: right;" :span="4">第{{ index + 1 }}条</el-col>
                                </el-row>
                            </div>
                            <img :key="index" :src="image.src" :alt="image.alt" class="timestamp-img-item"
                                @click="openModal(image.src, image.alt, image.major)" />
                            <!-- <img src="../assets/timeline/2024.11.27.jpg"/> -->
                            <div class="timestamp">
                                <el-row>
                                    <el-col :span="12">{{ image.city }} · {{ image.place }}</el-col>
                                    <el-col :span="12" style="text-align: right;">出镜：{{ image.major }}</el-col>
                                </el-row>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 模态框 -->
        <div v-show="isModalVisible" class="modal-overlay" @click="closeModal">
            <div class="modal" @click.stop> <!-- 阻止点击事件冒泡到模态框背景 -->
                <span class="close" aria-label="Close" @click="closeModal">&times;</span>
                <img :src="modalImageSrc" class="modal-content" alt="Modal Image" />
                <div class="caption">{{ modalCaption }} --{{ modalCaption_major }}</div>
            </div>
        </div>
        <div v-show="showArrow" class="arrow-container">
            <div class="arrow bounce"><img style="max-width: 50px;" @click="scrollToTop" src="../assets/向上箭头.png" />
            </div>
        </div>
    </div>
</template>
<script setup>
import HeaderBtn from '../components/HeaderBtn.vue';
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import schedule from '../config/schedule.json'; // 假设schedule.json存储了行程数据
import { Lunar } from 'lunar-javascript';
import timelineData from '../config/timeline.json';
//时间线数据 axios优化

//加载动画
const isLoading = ref(false);

// 当前视图日期
const currentDate = ref(new Date());
const selectedDay = ref(null);  // 存储选中的日期行程
// 节假日数据
const holidays = ref([]);

// 获取当前年月
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth() + 1);

// 星期标题
const weekDays = ['一', '二', '三', '四', '五', '六', '日'];

// 获取中国节假日数据
const fetchHolidays = async (year, month) => {
    try {
        const response = await axios.get('https://unpkg.com/holiday-calendar@1.1.3/data/CN/' + year + '.json');
        holidays.value = response.data.dates;
    } catch (error) {
        console.error('获取节假日数据失败:', error);
    }
};
//模态框图片
const isModalVisible = ref(false);
const modalImageSrc = ref('');
const modalCaption = ref('');
const modalCaption_major = ref('');

// 方法：打开模态框
const openModal = (src, alt, major) => {
    modalImageSrc.value = src;
    modalCaption.value = alt;
    modalCaption_major.value = major;
    isModalVisible.value = true;
};
// 方法：关闭模态框
const closeModal = () => {
    isModalVisible.value = false;
};
//浮动的按钮
const showArrow = ref(true);

const calendarDays = computed(() => {
    const days = [];
    const date = new Date(currentDate.value);
    date.setDate(1);

    // 设置时区为本地时区
    const firstDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(date.getDate() - firstDay);

    // 生成6周数据
    for (let i = 0; i < 42; i++) {
        const current = new Date(date);

        // 使用本地时间而不是 UTC 时间
        current.setHours(0, 0, 0, 0); // 设置为本地时区的午夜
        const lunar = Lunar.fromDate(current);

        const dayInfo = {
            solarDate: current.getDate(),
            lunarDate: lunar.getDayInChinese(),
            isCurrentMonth: current.getMonth() === currentDate.value.getMonth(),
            isRest: false,
            isWorkday: false,
            festival_zh: '',
            festival_en: '',
            events: [],
            date: '',
            images: [],
            lable: '',
        };

        dayInfo.date = formatDate(current.toLocaleDateString()); // 本地日期格式

        // 处理节假日
        const holiday = holidays.value.find(h =>
            h.date === formatDate(current.toLocaleDateString())
        );

        if (holiday) {
            dayInfo.isRest = holiday.type == "public_holiday" ? true : false;
            dayInfo.isWorkday = holiday.type == "transfer_workday" ? true : false;
            dayInfo.festival_zh = holiday.name_cn;
            dayInfo.festival_en = holiday.name_en;
        } else {
            dayInfo.isRest = [0, 6].includes(current.getDay());
        }

        // 从schedule.json中加载行程安排
        const dayEvents = schedule.find(event => event.date === formatDate(current.toLocaleDateString()));
        if (dayEvents) {
            dayInfo.events = dayEvents.events;
        }
        //从时间线中取照片
        const timelineInfo = timelineData.filter(x => formatDate(x.title) === formatDate(current.toLocaleDateString()));
        if (timelineInfo.length > 0) {
            dayInfo.images = timelineInfo;
        }
        dayInfo.lable = new Date(dayInfo.date) < new Date() ? '拍' : '预';
        days.push(dayInfo);
        date.setDate(date.getDate() + 1);
    }

    return days;
});

const formatDate = (date) => {
    date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');  // 月份是从0开始的
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};
const formatDate2 = (date) => {
    date = new Date(date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');  // 月份是从0开始的
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};


// 月份切换
const prevMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1);
};

const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1);
};

// 判断是否是今天
const isToday = (day) => {
    const today = new Date();
    const dayday = formatDate(today.toLocaleDateString());
    return dayday === day && today.getMonth() === currentDate.value.getMonth() && today.getFullYear() === currentDate.value.getFullYear();
    // return day=="2025-02-08"?true:false;
};

// 选择某一天，显示行程
const selectDay = (day) => {
    selectedDay.value = null;
    selectedDay.value = day;
    console.log(selectedDay.value);
};

// 监听年月变化
watch([currentYear, currentMonth], () => {
    fetchHolidays(currentYear.value, currentMonth.value);
});

// 初始化数据
onMounted(() => {
    fetchHolidays(currentYear.value, currentMonth.value);
});

// 滚动到页面最底部
const scrollToBottom = () => {
    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        // 等待 0.3 秒后执行该方法
    }, 100);
    setTimeout(() => {
        document.documentElement.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
        // 等待 0.3 秒后执行该方法
    }, 200);
}
const scrollToTop = () => {
    document.documentElement.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

</script>
<style scoped>
/* 全屏遮罩层，显示加载动画 */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明黑色背景 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

/* 加载动画样式 */
.spinner {
    border: 4px solid #f3f3f3;
    /* 灰色背景 */
    border-top: 4px solid #3498db;
    /* 蓝色进度条 */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

/* 加载动画旋转效果 */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* 全屏遮罩层，显示加载动画 结束*/
/* 动画关键帧 */
@keyframes example {
    from {
        background-color: rgb(214, 163, 163);
    }

    to {
        background-color: rgb(192, 192, 130);
    }
}

@keyframes example {
    0% {
        background-color: rgb(209, 156, 156);
    }

    50% {
        background-color: rgb(152, 152, 192);
    }

    100% {
        background-color: rgb(148, 203, 148);
    }
}

/* 闪烁效果 */
@keyframes blink {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0.1;
    }
}

/* 动画关键帧 */
.calendar {
    max-width: 1024px;
    min-width: 400px;
    margin: 0 auto;
}

.calendar-container {}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    background: #f8f9fa;
}

.change-month {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 20px;
}

.change-month:hover {
    background-color: #0056b3;
}

.calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background: #f8f9fa;
    padding: 10px 0;
    font-weight: bold;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px;
    background: #e9ecef;
}

.calendar-day {
    max-height: 100px;
    padding: 8px;
    background: white;
    display: flex;
    flex-direction: column;
    font-size: 14px;
}

.weekday {
    text-align: center;
    font-weight: bold;
    color: #555;
}

.other-month {
    background: #f8f9fa;
    color: #adb5bd;
}

.today {
    display: block;
    width: 100%;
    background-color: #96dba6 !important;
    color: white !important;
    /* animation: example 5s infinite alternate; */
    position: relative;
    /* 确保子元素可以相对定位 */
}

.float-text {
    position: absolute;
    right: 2px;
    /* 距离右边10px */
    top: 2px;
    /* 距离底部10px */
    color: #ff6b6b;
    font-weight: bold;
    font-size: 1.2rem;
    animation: blink 2s infinite alternate;
}

/* animation-name: example; 动画名称
animation-duration: 5s; 动画持续时间
animation-timing-function: linear; 动画速度曲线
animation-delay: 2s; 动画延迟
animation-iteration-count: infinite; 动画播放次数
animation-direction: alternate; 动画播放方向 */

.date-info {
    justify-content: space-between;
    overflow: hidden;
}

.solar-date {
    font-weight: bold;
    font-size: 12px;
}

.lunar-date {
    /* color: #868e96; */
}

.day-tags {
    margin-top: auto;
}

.rest-tag {
    background: #ff6b6b;
    color: white;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
}

.work-tag {
    background: #4dabf7;
    color: white;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
}

.reservation-tag {
    background: #468b5f;
    color: white;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
}

.festival-tag {
    display: block;
    color: #d6336c;
    font-size: 12px;
    margin-top: 4px;
}

.rest-day {
    background: #fff0f6;
}

.work-day {
    background: #e7f5ff;
}

.day-details {
    margin-top: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 5px;
}

.day-details ul {
    list-style-type: none;
    padding: 0;
}

.day-details li {
    padding: 5px 0;
}

/* 时间线照片样式 开始 */
.moment {
    margin-bottom: 20px;
}

.content {
    margin-top: 10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
}

.content img {
    width: 100%;
    border-radius: 5px;
}

.timestamp {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
}

/* 模态框中图片的样式 */
.modal-content {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 80vh;
    /* 限制图片最大高度为视口高度的80% */
    object-fit: contain;
    /* 保持图片比例 */
    position: relative;
}

/* 关闭按钮的样式和位置 */
.close {
    position: absolute;
    float: left;
    top: 20px;
    /* 调整位置 */
    right: 30px;
    /* 调整位置 */
    color: red;
    font-size: 30px;
    /* 可根据需要调整大小 */
    font-weight: bold;
    cursor: pointer;
    z-index: 1000;
    /* 确保关闭按钮在所有内容之上 */
}

/* 模态框样式优化 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    /* 确保模态框在最上层 */
}

.modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    /* 相对于模态框内部定位关闭按钮 */
}

.close {
    /* position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #333; */
}

.caption {
    text-align: center;
}

/* 时间线照片样式 结束 */


/* 使按钮浮动在右侧中间 */
/* 向下箭头的容器 */
.arrow-container {
    position: fixed;
    right: 20px;
    bottom: 0px;
    transform: translateY(-50%);
}

/* 浮动按钮开始 */
/* 向下箭头的样式及动画 */
.arrow {
    font-size: 40px;
    color: #007bff;
    animation: bounce 1s infinite;

    /* 让文字竖排 */
    /* writing-mode: vertical-rl; */
    /* 竖排文字，右向左 */
    text-align: center;
    /* 文字居中 */
}

/* 弹跳动画 */
@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

/* 浮动按钮结束 */
</style>