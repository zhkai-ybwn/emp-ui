<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 14:15:05
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:02:20
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\center\GuangFuGonglv.vue
 * @Description: 光伏直驱发电-光伏功率
-->
<template>
  <div class="gf-gl-container">
    <div class="text-value-unit">
      <div class="gl-text">{{ info.text }}</div>
      <div class="value-unit">
        <div class="gl-value">{{ info.value }}</div>
        <div class="gl-unit">{{ info.unit }}</div>
      </div>
    </div>
    <ProgressBar :percent="progressPer"></ProgressBar>
  </div>
</template>

<script setup>
  import ProgressBar from '../common/ProgressBar.vue';

  const props = defineProps({
    info: {
      type: Object,
      default: () => ({
        text: '当前功率',
        value: 0,
        per: 0,
        unit: 'kW',
      }),
    },
  });

  const progressPer = computed(() => (props.info.value / 60) * 100);
</script>

<style lang="less" scoped>
  .gf-gl-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 126px;
    height: 43px;

    .text-value-unit {
      display: flex;
      justify-content: space-between;

      .gl-text {
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: normal;
      }

      .value-unit {
        display: flex;
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: normal;

        .gl-value {
          font-size: 16px;
        }

        .gl-unit {
          margin-top: 6px;
          margin-left: 2px;
          font-size: 10px;
        }
      }
    }
  }
</style>
