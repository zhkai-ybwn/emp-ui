<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 10:31:40
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-02-27 10:24:22
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\common\DianLiangInfo.vue
 * @Description: 光伏直驱发电-电量信息面板
-->
<template>
  <div class="dl-info-container">
    <div class="dl-text">{{ info.text }}</div>
    <div class="value-unit">
      <div
        v-if="info.isDig"
        class="dl-value"
        :text="info.value.toLocaleString('zh', { minimumFractionDigits: 1 })"
      >
        {{ info.value.toLocaleString('zh', { minimumFractionDigits: 1 }) }}
      </div>
      <div v-else class="dl-value" :text="info.value.toLocaleString()">
        {{ info.value.toLocaleString() }}
      </div>
      <div class="dl-unit">{{ info.unit }}</div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    info: {
      type: Object,
      default: () => ({
        text: '',
        value: 0,
        unit: '',
        isDig: false,
      }),
    },
  });
</script>

<style lang="less" scoped>
  .dl-info-container {
    max-width: 113px;
    height: 65px;

    .dl-text {
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 32px;
      text-align: left;
    }

    .value-unit {
      display: flex;

      .dl-value {
        width: fit-content;
        font-weight: 700;
        font-size: 26px;
        font-family: AlimamaShuHeiTi-Bold, sans-serif;
        font-style: normal;
        text-align: left;
        background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .dl-value::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(text);
      }

      .dl-unit {
        margin-top: 14px;
        margin-left: 2px;
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 10px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
      }
    }
  }
</style>
