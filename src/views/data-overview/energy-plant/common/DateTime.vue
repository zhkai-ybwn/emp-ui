<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 10:26:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-03 10:35:32
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\DateTime.vue
 * @Description: 日期组件
-->
<template>
  <div class="time-group">
    <!-- 时间 -->
    <div class="time">
      <span>{{ fixZero(hour) }}</span>
      <span class="flash">:</span>
      <span>{{ fixZero(minute) }}</span>
      <span class="flash">:</span>
      <span>{{ fixZero(seconds) }}</span>
    </div>
    <div class="year-week">
      <!-- 星期 -->
      <div class="week">{{ xingqi }}</div>
      <!-- 年月日 -->
      <div class="year"
        >{{ year }}-{{ fixZero(transformMonth) }}-{{ fixZero(date) }}</div
      >
    </div>
  </div>
</template>

<script setup>
  const time = new Date();
  const dates = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  const year = ref(time.getFullYear());
  const month = ref(time.getMonth());
  const date = ref(time.getDate());
  const day = ref(time.getDay());
  const hour = ref(time.getHours());
  const minute = ref(time.getMinutes());
  const seconds = ref(time.getSeconds());
  const transformMonth = computed(() => month.value + 1);
  const xingqi = computed(() => dates[day.value]);
  const fixZero = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  };

  const updateDate = () => {
    const newTime = new Date();
    year.value = newTime.getFullYear();
    month.value = newTime.getMonth();
    date.value = newTime.getDate();
    day.value = newTime.getDay();
    hour.value = newTime.getHours();
    minute.value = newTime.getMinutes();
    seconds.value = newTime.getSeconds();
  };

  const timer = ref();

  onMounted(() => {
    timer.value = setInterval(() => {
      updateDate();
    }, 1000);
  });

  onUnmounted(() => {
    if (timer.value) {
      clearInterval(timer.value);
    }
  });
</script>

<style lang="less" scoped>
  .time-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 238px;
    margin-right: 24px;

    .time {
      width: 128px;
      margin-left: 20px;
      color: #fff;
      font-weight: 500;
      font-size: 36px;
      font-family: Barlow-Normal-Medium-Italic, sans-serif;
      line-height: normal;
    }

    .year-week {
      width: 70px;
      margin-left: 10px;
      color: rgb(255 255 255 / 85%);
      font-weight: 400;
      font-size: 14px;
      line-height: normal;

      .week {
        font-family: SourceHanSansCN-Normal, sans-serif;
      }

      .year {
        font-family: Barlow-Italic, sans-serif;
      }
    }
  }
</style>
