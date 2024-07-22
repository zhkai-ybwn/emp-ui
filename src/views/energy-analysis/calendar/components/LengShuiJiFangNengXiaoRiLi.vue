<template>
  <div>
    <ModuleBox :config="state.title">
      <div class="calendar-contain">
        <div class="header">
          <div class="date">
            <div class="pre" @click="preTime"></div>
            <a-month-picker
              v-model="state.time"
              :disabled-date="(current:any) => dayjs(current).isAfter(dayjs())"
              @change="changeMonth"
            >
              <div class="time"> {{ state.year }}年{{ state.month }}月 </div>
            </a-month-picker>
            <div
              class="next"
              :class="isNextTime() ? '' : 'disable-cell'"
              @click="nextTime"
            ></div>
            <a-button type="primary" style="margin-left: 30px" @click="reset">
              <template #icon><icon-refresh /></template>重置
            </a-button>
          </div>
          <div class="list">
            <div class="cop">COP:能效比</div>
            <div class="c"><span></span> C:日制冷量(kWh)</div>
            <div class="p"><span></span> P:日耗电量(kWh)</div>
          </div>
        </div>
        <div class="calendar">
          <div v-if="state.loading" class="load">
            <Loading
              :percnet="state.percent"
              style="position: absolute"
            ></Loading>
          </div>
          <table>
            <thead>
              <tr>
                <th>周日</th>
                <th>周一</th>
                <th>周二</th>
                <th>周三</th>
                <th>周四</th>
                <th>周五</th>
                <th>周六</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in state.calendar" :key="index">
                <td
                  v-for="(cell, mindex) in row"
                  :key="mindex"
                  :class="[
                    cell.className,
                    isDisable(cell) ? '' : 'disable-cell',
                    isToday(cell) ? 'today' : '',
                    isSelect(cell) ? 'is-select' : '',
                  ]"
                  :data-date="cell.month"
                  @click="date(cell)"
                >
                  <div class="num">{{ cell.date }}</div>

                  <div
                    v-show="isCurrentMonth(cell)"
                    :class="getCellClass(getValue('cop', cell))"
                  >
                    {{ getValue('cop', cell) ?? '-' }}
                  </div>
                  <div v-show="isCurrentMonth(cell)" class="c-cell">
                    <div class="ccell"></div>
                    {{ getValue('cool', cell) ?? '-' }}
                  </div>
                  <div v-show="isCurrentMonth(cell)" class="p-cell">
                    <div class="pcell"></div>
                    {{ getValue('electricity', cell) ?? '-' }}</div
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import bus from '@/utils/bus';
  import { queryCalendar, calendarRes } from '@/api/energy-analysis/calendar';
  import moment from 'moment';
  import ModuleBox from '../../common/ModuleBox2.vue';
  import Loading from '../../common/Loading.vue';

  interface CalendarCell {
    date: number;
    month: number;
    year: number;
    className: string;
  }

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '冷水机房能效日历',
      Height: `calc(100vh - 140px)`,
    },
    time: Date.now(),
    calendar: [] as CalendarCell[][],
    year: 0,
    month: 0,
    isSelect: null as null | CalendarCell,
    list: [] as calendarRes[],
    percent: 75,
    loading: false,
  });

  const getList = async (date: string) => {
    try {
      state.loading = true;
      const res = await queryCalendar(date);
      state.list = res.data;
      state.percent = 95;
      state.loading = false;
    } catch (e) {
      state.list = [];
      state.loading = false;
    }
  };

  getList(moment(state.time).format('yyyy-MM'));

  const getTotalDate = (cell: {
    year: number;
    month: number;
    date: number;
  }) => {
    return moment([cell.year, cell.month - 1, cell.date]).format('YYYY-MM-DD');
  };

  const getValue = (
    param: 'cop' | 'cool' | 'electricity',
    cell: {
      year: number;
      month: number;
      date: number;
    }
  ) => {
    if (state.list) {
      const singleList = state.list.find(
        (el) => el.date === getTotalDate(cell)
      );
      if (singleList) {
        return singleList[param];
      }
    }
    return null;
  };

  function generateCalendar(year: number, month: number): CalendarCell[][] {
    const firstDay = new Date(year, month - 1, 1).getDay(); // 获取当月第一天是星期几
    const daysInMonth = new Date(year, month, 0).getDate(); // 获取当月总天数

    const calendarCells: CalendarCell[][] = [];
    let week: CalendarCell[] = [];

    // 计算上个月在日历中的位置
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();

    // 填充日历数组
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < firstDay; i++) {
      // 上个月的日期
      const cellDate = daysInPrevMonth - firstDay + i + 1;
      week.push({
        date: cellDate,
        month: month - 1 > 0 ? month - 1 : 12,
        year: month - 1 > 0 ? year : year - 1,
        className: 'pre-date',
      });
    }

    // eslint-disable-next-line no-plusplus
    for (let day = 1; day <= daysInMonth; day++) {
      // 当前月的日期
      week.push({ date: day, month, year, className: 'now' });
      if (week.length === 7) {
        calendarCells.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      const day = week.length;
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < 8 - day; i++) {
        // 下个月的日期
        week.push({
          date: i,
          month: month + 1 > 12 ? 1 : month + 1,
          year: month + 1 > 12 ? year + 1 : year,
          className: 'next-date',
        });
        // lastWeek.push({
        //   date: i + 6,
        //   month: month + 1,
        //   year,
        //   className: 'next',
        // });
      }
      calendarCells.push(week);
      // calendarCells.push(lastWeek);
    }
    if (calendarCells.length < 6) {
      const day = week.length > 1 ? week[week.length - 1].date : 0;

      week = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < 8; i++) {
        week.push({
          date: day + i,
          month: month + 1,
          year,
          className: 'next-date',
        });
      }
      calendarCells.push(week);
    }

    return calendarCells;
  }

  state.year = new Date().getFullYear();
  state.month = new Date().getMonth() + 1;
  state.calendar = generateCalendar(state.year, state.month);

  const preTime = () => {
    if (state.month > 1) {
      state.month -= 1;
    } else {
      state.month = 12;
      state.year -= 1;
    }
    state.time = new Date(state.year, state.month - 1, 1).getTime();
    state.calendar = generateCalendar(state.year, state.month);
    state.isSelect = null;
    getList(moment(state.time).format('yyyy-MM'));
    bus.emit('month', { year: state.year, month: state.month });
  };

  const isNextTime = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    if (
      state.year < currentYear ||
      (state.year === currentYear && state.month < currentMonth)
    ) {
      return true;
    }
    return false;
  };
  const nextTime = () => {
    if (isNextTime()) {
      if (state.month < 12) {
        state.month += 1;
      } else {
        state.month = 1;
        state.year += 1;
      }
      state.time = new Date(state.year, state.month - 1, 1).getTime();
      state.calendar = generateCalendar(state.year, state.month);
      state.isSelect = null;
      getList(moment(state.time).format('yyyy-MM'));
      bus.emit('month', { year: state.year, month: state.month });
    }
  };
  const changeMonth = (
    value: Date | string | number | undefined,
    date: Date | undefined
  ) => {
    const date1 = new Date(date as Date);
    state.month = date1.getMonth() + 1;
    state.year = date1.getFullYear();
    state.calendar = generateCalendar(state.year, state.month);
    state.isSelect = null;
    getList(moment(state.time).format('yyyy-MM'));
    bus.emit('month', { year: state.year, month: state.month });
  };
  const reset = () => {
    state.year = new Date().getFullYear();
    state.month = new Date().getMonth() + 1;
    state.time = Date.now();
    state.calendar = generateCalendar(state.year, state.month);
    state.isSelect = null;
    getList(moment(state.time).format('yyyy-MM'));
    bus.emit('month', { year: state.year, month: state.month });
  };

  const isDisable = (cell: CalendarCell) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const day = currentDate.getDate();
    if (
      cell.year < currentYear ||
      (cell.year === currentYear && cell.month < currentMonth) ||
      (cell.year === currentYear &&
        cell.month === currentMonth &&
        cell.date <= day)
    ) {
      return true;
    }
    return false;
  };

  const isCurrentMonth = (cell: CalendarCell) => {
    if (cell.year === state.year && cell.month === state.month) {
      return true;
    }
    return false;
  };

  const isToday = (cell: CalendarCell) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const day = currentDate.getDate();
    if (
      cell.year === currentYear &&
      cell.month === currentMonth &&
      cell.date === day
    ) {
      return true;
    }
    return false;
  };

  const isSelect = (cell: CalendarCell) => {
    if (
      state.isSelect &&
      cell.year === state.isSelect.year &&
      cell.month === state.isSelect.month &&
      cell.date === state.isSelect.date
    ) {
      return true;
    }
    return false;
  };

  const getCellClass = (number: string | null | number) => {
    if (number === null) {
      return 'null';
    }
    if (+number < 3.5) {
      return 'urgent';
    }
    if (+number < 3.9) {
      return 'normal';
    }
    if (+number < 5.0) {
      return 'good';
    }
    return 'great';
  };

  const date = (cell: CalendarCell) => {
    if (isDisable(cell)) {
      if (cell.month !== state.month) {
        state.month = cell.month;
        state.year = cell.year;
        state.time = new Date(state.year, state.month - 1, 1).getTime();
        state.calendar = generateCalendar(state.year, state.month);
        getList(moment(state.time).format('yyyy-MM'));
      }
      state.isSelect = cell;
      bus.emit('date', state.isSelect);
    }
  };
</script>

<style scoped lang="less">
  .load {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 26%);
  }

  .calendar-contain {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: calc(100% - 40px);
    padding: 24px;
    overflow: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    .date {
      display: flex;
      align-items: center;

      .time {
        margin: 0 18px;
        color: rgb(255 255 255 / 90%);
        font-weight: 600;
        font-size: 20px;

        /* 20/EN-Medium */
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 28px; /* 140% */
        cursor: pointer;
      }

      .pre {
        width: 12px;
        height: 12px;
        cursor: pointer;
        .set-back('@/assets/imgs/energy-analysis/calendar/prev-icon.png');
      }

      .next {
        width: 12px;
        height: 12px;
        cursor: pointer;
        .set-back('@/assets/imgs/energy-analysis/calendar/next-icon.png');
      }
    }

    .list {
      display: flex;
      align-items: center;
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px;

      .cop {
        width: 114px;
        height: 24px;
        margin-right: 30px;
        background: linear-gradient(
          270deg,
          rgb(204 223 255/30%) 0%,
          rgb(204 223 255 / 0%) 100%
        );
        border-radius: 2px;
      }

      .c {
        margin-right: 30px;

        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #52c41a;
          border-radius: 10px;
        }
      }

      .p {
        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #266fe8;
          border-radius: 10px;
        }
      }
    }
  }

  .calendar {
    position: relative;
    flex: 1;
    width: 100%;
  }

  table {
    width: 100%;
    height: 100%;

    th {
      width: calc(100% / 7);
    }
  }

  tr {
    height: 60px;
    color: rgb(255 255 255 / 85%);
    font-weight: 400;
    font-size: 14px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 22px;
    text-transform: none;
    border: 1px solid #3c485c;
  }

  td {
    height: calc(100% / 6);
    padding: 5px;
    vertical-align: top;
    border: 1px solid #3c485c;
    cursor: pointer;
  }

  .disable-cell {
    cursor: not-allowed !important;
  }

  .num {
    height: 30px;
  }

  .today {
    .num {
      width: 30px;
      height: 30px;
      line-height: 32px;
      text-align: center;
      background: #3c7eff;
      border-radius: 50%;
    }
  }

  .is-select {
    background: linear-gradient(
      270deg,
      rgb(131 142 168 / 26%) 0%,
      rgb(188 201 223 / 10%) 100%
    );
    border: 1px solid #3c485c;
  }

  .pre-date,
  .next-date {
    color: rgb(255 255 255 / 30%);
  }

  .urgent {
    height: 22px;
    margin-left: 11px;
    background: linear-gradient(270deg, #ff4d4f 0%, rgb(255 77 79 / 0%) 100%);
    border-radius: 2px;
  }

  .normal {
    height: 22px;
    margin-left: 11px;
    background: linear-gradient(270deg, #faad14 0%, rgb(250 173 20 / 0%) 100%);
    border-radius: 2px;
  }

  .good {
    height: 22px;
    margin-left: 11px;
    background: linear-gradient(270deg, #719429 0%, rgb(76 148 41 / 0%) 100%);
    border-radius: 2px;
  }

  .great {
    height: 22px;
    margin-left: 11px;
    background: linear-gradient(270deg, #266fe8 0%, rgb(38 111 232 / 0%) 100%);
    border-radius: 2px;
  }

  .null {
    height: 22px;
    margin-left: 11px;
    background: linear-gradient(270deg, #ccdfff 0%, rgb(204 223 255 / 0%) 100%);
    border-radius: 2px;
    opacity: 0.3;
  }

  .c-cell {
    display: flex;
    align-items: center;
    height: 22px;

    .ccell {
      width: 6px;
      height: 6px;
      margin-right: 5px;
      background: #52c41a;
      border-radius: 50%;
    }
  }

  .p-cell {
    display: flex;
    align-items: center;
    height: 22px;

    .pcell {
      width: 6px;
      height: 6px;
      margin-right: 5px;
      line-height: 22px;
      background: #266fe8;
      border-radius: 50%;
    }
  }
</style>
