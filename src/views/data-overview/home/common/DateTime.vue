<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 10:26:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:24:42
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\common\DateTime.vue
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
    <!-- 分隔符 -->
    <div class="separator"></div>
    <!-- 年月日 -->
    <span>{{ year }}-{{ fixZero(transformMonth) }}-{{ fixZero(date) }}</span>
    <!-- 分隔符 -->
    <div class="separator"></div>
    <!-- 星期 -->
    <span class="xingqi">{{ xingqi }}</span>
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
    justify-content: space-evenly;
    width: 345px;
    height: 42px;
    color: rgb(255 255 255 / 90%);
    font-weight: 400;
    font-size: 20px;
    font-family: HarmonyOS-Regular, serif;
    background-clip: text;
    /* stylelint-disable */
    -webkit-background-clip: text;

    > span {
      &:nth-of-type(1) {
        position: relative;
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 20px;
        font-family: HarmonyOS-Regular, serif;
        letter-spacing: 1.9px;
      }
    }

    .xingqi {
      color: rgb(255 255 255 / 90%);
      font-weight: 400;
      font-size: 20px;
      font-family: HarmonyOS-Regular, serif;
    }

    .time {
      color: rgb(255 255 255 / 90%);
      font-weight: 400;
      font-size: 20px;
      font-family: HarmonyOS-Regular, serif;
    }

    .separator {
      width: 0;
      height: 22px;
      border: 1px solid rgb(255 255 255 / 60%);
      border-radius: 0;
    }
  }

  .flash {
    position: relative;
    top: -2px;
  }
</style>
