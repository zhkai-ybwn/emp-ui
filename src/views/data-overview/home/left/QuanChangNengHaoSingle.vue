<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-09 15:17:08
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-29 08:42:21
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\left\QuanChangNengHaoSingle.vue
 * @Description: 全场能耗单个
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="qcnhs-container">
    <div class="text">{{ data.text }}</div>
    <div class="value-unit">
      <div
        class="value"
        :text="
          data.value.toLocaleString().length > 7
            ? (data.value / 1000).toFixed(1).toLocaleString()
            : data.value.toFixed(1).toLocaleString()
        "
      >
        {{
          data.value.toLocaleString().length > 7
            ? (data.value / 1000).toFixed(1).toLocaleString()
            : data.value.toFixed(1).toLocaleString()
        }}
      </div>
      <div class="unit">{{
        data.value.toLocaleString().length > 7 ? data.unit2 : data.unit1
      }}</div>
    </div>
    <div class="hb-box">
      <div class="hb">环比</div>
      <img
        v-if="isIncreaseOrDecrease(data.percent)"
        class="sign"
        :src="isIncreaseOrDecrease(data.percent)"
      />
      <div class="percent-unit-box">
        <svg
          v-if="data.percent === '持平'"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="4"
          viewBox="0 0 10 4"
          fill="none"
          style="margin-right: 4px"
        >
          <path d="M0 2H10" stroke="#4FD164" stroke-width="3" />
        </svg>
        <div :class="data.percent === '持平' ? 'percent-text' : 'percent'">{{
          data.percent === '持平' ? data.percent : Math.abs(data.percent)
        }}</div>
        <div v-if="data.percent !== '持平'" class="percent-unit">%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import redArrow from '@/assets/imgs/home/red-arrow.png';
  import greenArrow from '@/assets/imgs/home/green-arrow.png';

  defineProps({
    data: {
      type: Object,
      default: () => ({
        // 文本
        text: '',
        // 增减百分比
        percent: 0,
        // 能耗
        value: 0,
        // 能耗单位
        unit: '',
      }),
    },
    isShowPer: {
      type: Boolean,
      default: false,
    },
  });
  const isIncreaseOrDecrease = (percent) => {
    if (percent > 0) {
      return redArrow;
    }
    if (percent <= 0) {
      return greenArrow;
    }
    return null;
  };
</script>

<style lang="less" scoped>
  .qcnhs-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .text {
      color: rgb(255 255 255 / 80%);
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
    }

    .value-unit {
      display: flex;

      .value {
        width: fit-content;
        font-weight: 400;
        font-size: 26px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-style: normal;
        text-align: left;
        background: var(
          --unnamed,
          linear-gradient(180deg, #fff 0%, #c1daff 100%)
        );
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .value::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(text);
      }

      .unit {
        margin-top: 10px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 12px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
      }
    }

    .hb-box {
      display: flex;
      align-items: center;
      width: fit-content;

      .hb {
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 10px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        text-transform: capitalize;
      }

      .sign {
        width: 11px;
        height: 15.3px;
        margin-left: 4px;
      }

      .percent-unit-box {
        display: flex;
        align-items: center;
        margin-left: 4px;

        .percent {
          color: rgb(255 255 255 / 90%);
          font-weight: 500;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
        }

        .percent-text {
          color: rgba(255, 255, 255, 0.9);
          font-family: 'HarmonyOS Sans SC';
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }

        .percent-unit {
          margin-top: 4px;
          margin-left: 4px;
          color: rgb(255 255 255 / 90%);
          font-weight: 400;
          font-size: 10px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          text-transform: capitalize;
        }
      }
    }
  }
</style>
