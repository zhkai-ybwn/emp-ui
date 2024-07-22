<template>
  <div class="time-group">
    <!-- 年月日 -->
    <div class="year"
      >{{ year }}-{{ fixZero(transformMonth) }}-{{ fixZero(date) }}</div
    >
    <!-- 时间 -->
    <div class="time">
      <span>{{ fixZero(hour) }}</span>
      <span class="flash">:</span>
      <span>{{ fixZero(minute) }}</span>
      <span class="flash">:</span>
      <span>{{ fixZero(seconds) }}</span>
    </div>
  </div>
</template>

<script setup>
  const time = new Date();
  const year = ref(time.getFullYear());
  const month = ref(time.getMonth());
  const date = ref(time.getDate());
  const day = ref(time.getDay());
  const hour = ref(time.getHours());
  const minute = ref(time.getMinutes());
  const seconds = ref(time.getSeconds());
  const transformMonth = computed(() => month.value + 1);
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
    color: #bcc4d0;
    font-weight: 400;
    font-size: 16px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 14px;

    .year {
      margin-right: 10px;
    }
  }
</style>
