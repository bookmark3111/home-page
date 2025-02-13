<template>
  <div class="calendar-container">
    <HeaderBtn />
    <div class="calendar">
      <!-- 年月切换 -->
      <div class="calendar-header">
        <button @click="prevMonth" class="change-month">上一月</button>
        <h2>{{ currentMonthYear }}</h2>
        <button @click="nextMonth" class="change-month">下一月</button>
      </div>

      <!-- 星期几标题 -->
      <div class="calendar-weekdays">
        <div v-for="(weekday, index) in weekDays" :key="index" class="weekday">
          {{ weekday }}
        </div>
      </div>

      <!-- 日历网格 -->
      <div class="calendar-grid">
        <div v-for="day in getDaysInMonth" :key="day.date" class="calendar-day" @click="selectDay(day)">
          <span :class="{
            'today': isToday(day),
            'holiday': day.isHoliday,
            'weekend': day.isWeekend
          }"> <span>{{ day.day }}
              <span v-if="day.isHoliday" class="holiday-label">{{ day.isHoliday }}</span>
              <span v-if="day.isWeekend" class="weekend-label">周末</span>
            </span>
            <span v-if="day.events.length > 0">
              <!-- Event indicator SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 -20 72 72">
                <circle cx="36.01" cy="21.186" r="3.478" fill="#fff" />
                <path fill="#d22f27"
                  d="M46.289 21.39c0-6.016-4.607-10.91-10.271-10.91s-10.271 4.894-10.271 10.913c.002.3.145 7.497 8.37 20.179c.53.829 1.143 1.25 1.82 1.25c1.188 0 1.999-1.31 2.078-1.443c8.278-12.689 8.278-19.703 8.274-19.99m-10.27 4.394c-2.523 0-4.575-2.052-4.575-4.574s2.052-4.574 4.574-4.574s4.574 2.052 4.574 4.574s-2.052 4.574-4.574 4.574" />
              </svg>
            </span>
          </span>
          <p class="todayStation" v-if="day.events.length > 0">
          <p v-for="event in day.events" :key="event.time">
            {{ event.time }} {{ event.event }}
          </p>
          </p>
        </div>
      </div>

      <!-- 行程详情 -->
      <div v-if="selectedDay" class="day-details">
        <h3>{{ selectedDay.date }} 的行程</h3>
        <ul>
          <li v-for="event in selectedDay.events" :key="event.time">
            <strong>{{ event.time }} - {{ event.event }}</strong>
            <p>{{ event.desc }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderBtn from '../components/HeaderBtn.vue';
import { ref, computed, watch } from 'vue';
import schedule from '../config/schedule.json'; // 用于加载 JSON 数据
import axios from 'axios';

// 当前年份和月份
const currentDate = ref(new Date());
const selectedDay = ref(null); // 用于存储选中的日期
//节假日数据
const holidays = ref([]);

// 获取中国节假日数据
const fetchHolidays = async (year) => {
  try {
    const response = await axios.get(`https://api.juheapi.com/japi/toh`, {
      params: {
        key: 'your_api_key', // 使用你从API获得的key
        year: year,
      }
    });
    holidays.value = response.data.result;
  } catch (error) {
    console.error('Error fetching holidays:', error);
  }
};

// 初始化时获取当前年份的节假日数据
fetchHolidays(new Date().getFullYear());

// 获取当前月份和年份的格式化字符串
const currentMonthYear = computed(() => {
  const monthNames = [
    '1 January', '2 February', '3 March', '4 April', '5 May', '6 June', '7 July', '8 August', '9 September', '10 October', '11 November', '12 December'
  ];
  return `${monthNames[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`;
});

// 获取星期几名称（从星期一开始）
const weekDays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

// 获取当前月份的所有日期
const getDaysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const days = [];
  for (let day = firstDayOfMonth.getDate(); day <= lastDayOfMonth.getDate(); day++) {
    const dateStr = `${year}-${(month + 1) < 10 ? '0' + (month + 1) : (month + 1)}-${day < 10 ? '0' + day : day}`;
    const events = schedule.find(dayEvent => dayEvent.date === dateStr)?.events || [];
    // 判断是否为节假日
    const holiday = holidays.value.find(holiday => holiday.date === dateStr);
    const isHoliday = holiday ? holiday.name : '';

    // 判断是否为周末（休息日）
    const isWeekend = new Date(year, month, day).getDay() === 0 || new Date(year, month, day).getDay() === 6;

    days.push({
      day, date: dateStr, events, isHoliday, isWeekend
    });
  }
  return days;
});

// 判断是否是今天
const isToday = (day) => {
  const today = new Date();
  return today.getDate() === day.day && today.getMonth() === currentDate.value.getMonth() && today.getFullYear() === currentDate.value.getFullYear();
};

// 选择某一天，查看行程
const selectDay = (day) => {
  selectedDay.value = day;
};

// 切换到上个月
const prevMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(currentDate.value.getMonth() - 1);
  currentDate.value = newDate;
};

// 切换到下个月
const nextMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(currentDate.value.getMonth() + 1);
  currentDate.value = newDate;
};

watch(currentDate, () => {
  selectedDay.value = null; // 切换月份时，清除当前选中的日期
});
</script>

<style scoped>
.calendar-container {
  padding: 20px;
  height: 95vh;
}

.calendar {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
}

.change-month {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

.change-month:hover {
  background-color: #0056b3;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 10px 10px 0;
  font-size: 14px;
  background-color: #f5f5f5;
}

.weekday {
  text-align: center;
  font-weight: bold;
  color: #555;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  padding: 10px;
  font-size: 14px;
}

.calendar-day {
  padding: 10px;
  background-color: #f0f0f0;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.calendar-day:hover {
  background-color: #e0e0e0;
}

.calendar-day span {
  font-weight: bold;
}

.today {
  display: block;
  line-height: 1.5rem;
  width: 100%;
  background-color: #ff7f50;
  color: white;
}

.todayStation {
  font-size: 0.75rem;
  color: #007bff;
}

.day-details {
  padding: 15px;
  background-color: #fafafa;
  margin-top: 20px;
}

.day-details h3 {
  margin-bottom: 10px;
}

.day-details ul {
  list-style-type: none;
  padding-left: 0;
}

.day-details li {
  padding: 5px 0;
}

.calendar-day.holiday {
  background-color: #ffefdb;
  color: #d22f27;
  /* 节假日用红色标记 */
}

.calendar-day.weekend {
  background-color: #f0f8ff;
}

.holiday-label,
.weekend-label {
  font-size: 0.8rem;
  color: #fff;
  background-color: #d22f27;
  padding: 2px 5px;
  border-radius: 4px;
}
</style>
