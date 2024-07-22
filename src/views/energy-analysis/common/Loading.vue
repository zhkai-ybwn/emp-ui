<template>
  <div class="loading">
    <div class="percent" :style="{ width: `${props.percnet}%` }"></div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    percnet: {
      type: Number,
      default() {
        return 0;
      },
    },
  });
</script>

<style lang="less" scoped>
  .loading {
    width: 100%;
    height: 4px;
    background: #5f7292;
    border-radius: 27px;

    .percent {
      height: 4px;
      background: #266fe8;
      border-radius: 27px;
      transition: 1s;
      animation: fill 1s;
    }
  }

  @keyframes fill {
    from {
      width: 0;
    }

    to {
      width: 75%;
    }
  }
</style>
