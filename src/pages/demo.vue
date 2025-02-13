<template>
    <div class="calendar-container">
      <HeaderBtn />
      <div class="calendar">
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
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index" 
            class="calendar-day"
            :class="{
              'other-month': !day.isCurrentMonth,
              'rest-day': day.isRest,
              'work-day': day.isWorkday
            }"
          >
            <div class="date-info">
              <p class="solar-date">{{ day.solarDate }}</p>
              <p class="lunar-date">{{ day.lunarDate }}</p>
            </div>
            <div class="day-tags">
              <span v-if="day.isRest" class="rest-tag">休</span>
              <span v-if="day.isWorkday" class="work-tag">班</span>
              <span v-if="day.festival" class="festival-tag">{{ day.festival }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import HeaderBtn from '../components/HeaderBtn.vue';
  import { ref, computed, onMounted,watch  } from 'vue';
  import axios from 'axios';
  import { Lunar } from 'lunar-javascript';
  
  // 当前视图日期
  const currentDate = ref(new Date());
  // 节假日数据
  const holidays = ref([]);
  
  // 获取当前年月
  const currentYear = computed(() => currentDate.value.getFullYear());
  const currentMonth = computed(() => currentDate.value.getMonth() + 1);
  
  // 获取中国节假日数据
  const fetchHolidays = async (year, month) => {
    try {
      const response = await axios.get('https://api.example.com/holidays', {
        params: {
          year,
          month
        }
      });
      holidays.value = response.data;
    } catch (error) {
      console.error('获取节假日数据失败:', error);
    }
  };
  
  // 生成日历数据
  const calendarDays = computed(() => {
    const days = [];
    const date = new Date(currentDate.value);
    date.setDate(1);
    
    // 添加上个月末尾日期
    const firstDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
    date.setDate(date.getDate() - firstDay);
  
    // 生成6周数据
    for (let i = 0; i < 42; i++) {
      const current = new Date(date);
      const lunar = Lunar.fromDate(current);
      
      const dayInfo = {
        solarDate: current.getDate(),
        lunarDate: lunar.getDayInChinese(),
        isCurrentMonth: current.getMonth() === currentDate.value.getMonth(),
        isRest: false,
        isWorkday: false,
        festival: ''
      };
  
      // 处理节假日
      const holiday = holidays.value.find(h => 
        h.date === current.toISOString().slice(0,10)
      );
      
      if (holiday) {
        dayInfo.festival = holiday.name;
        dayInfo.isRest = holiday.isOffDay;
        dayInfo.isWorkday = holiday.isWorkday;
      } else {
        dayInfo.isRest = [0, 6].includes(current.getDay());
      }
  
      days.push(dayInfo);
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  });
  
  // 星期标题
  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
  
  // 月份切换
  const prevMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1
    );
  };
  
  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1
    );
  };
  
  // 监听年月变化
  watch([currentYear, currentMonth], () => {
    fetchHolidays(currentYear.value, currentMonth.value);
  });
  
  onMounted(() => {
    fetchHolidays(currentYear.value, currentMonth.value);
  });
  </script>
  
  <style scoped>
  .calendar-container {
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 70px;
    padding: 20px;
    background: #f8f9fa;
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
    min-height: 100px;
    padding: 8px;
    background: white;
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  
  .other-month {
    background: #f8f9fa;
    color: #adb5bd;
  }
  
  .date-info {
    justify-content: space-between;
  }
  
  .solar-date {
    font-weight: bold;
    font-size: 16px;
  }
  
  .lunar-date {
    color: #868e96;
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
  </style>