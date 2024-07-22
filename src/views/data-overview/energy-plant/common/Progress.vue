<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 13:17:25
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-03 10:39:33
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\common\Progress.vue
 * @Description: 进度条
-->
<!-- 进度条 -->
<template>
  <div
    class="progress-container"
    :style="{
      '--widthx': `${config.width}px`,
      '--heightx': `${config.height}px`,
    }"
  >
    <!-- 进度条外部框 -->
    <div class="progress-bar animation">
      <!-- 进度条内部框 -->
      <div
        class="inner"
        :style="{
          '--progress': `${percent}%`,
          '--colors2': colors[0],
          '--colors3': colors[1],
        }"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    percent: {
      type: Number,
      default: 0,
    },
    colors: {
      type: Array,
      default: () => ['rgba(24, 144, 255, 1)', 'rgba(24, 144, 255, 0.2)'],
    },
    config: {
      type: Object,
      default: () => ({
        width: 412,
        height: 3,
      }),
    },
  });
</script>

<style lang="less" scoped>
  @keyframes loading {
    from {
      width: 0;
    }

    to {
      width: var(--progress);
    }
  }

  .progress-container {
    position: relative;
    width: var(--widthx);
    height: var(--heightx);
    background: rgb(255 255 255 / 10%);

    .progress-bar {
      position: relative;
      width: var(--widthx);
      height: var(--heightx);

      .inner {
        position: relative;
        display: block;
        width: var(--progress);
        height: var(--heightx);
        background: linear-gradient(
          270deg,
          var(--colors2) 0%,
          var(--colors3) 100%
        );
        animation: loading 0.5s linear;
        content: '';
      }
    }
  }
</style>
