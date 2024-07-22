<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-02 10:04:18
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-28 14:42:20
 * @FilePath: \emp-admin-ui\src\views\energy-analysis\consumption-panel\components\NengHaoZongJi.vue
 * @Description: 能耗总计
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="nhzj-container">
    <div class="total-value-card">
      <div class="total-value-label">能耗总计<span> (kWh)</span></div>
      <div v-if="!state.loading">
        <div class="total-value">{{ formattedValue(state.totalValue) }}</div>
        <div class="per-section">
          <div class="qq-section">
            <div class="per-value">{{
              formattedComparison('同比', state.totalValueYOY)
            }}</div>
            <img
              v-if="state.totalValueYOY && state.totalValueYOY < 0"
              style="width: 11.6px; height: 7px; margin-left: 7px"
              :src="ArrowRed"
            />
            <img
              v-if="state.totalValueYOY && state.totalValueYOY > 0"
              style="width: 11.6px; height: 7px; margin-left: 7px"
              :src="ArrowRreen"
            />
            <span class="tooltip-qq-date">{{ getQQDate }}</span>
          </div>
          <div class="yy-section">
            <div
              class="per-value"
              :style="{
                marginLeft: state.totalValueYOY ? '24px' : '60px',
              }"
              >{{ formattedComparison('环比', state.totalValueQOQ) }}</div
            >
            <img
              v-if="state.totalValueQOQ && state.totalValueQOQ < 0"
              style="width: 11.6px; height: 7px; margin-left: 7px"
              :src="ArrowRed"
            />
            <img
              v-if="state.totalValueQOQ && state.totalValueQOQ > 0"
              style="width: 11.6px; height: 7px; margin-left: 7px"
              :src="ArrowRreen"
            /><span class="tooltip-yy-date">{{ getYYDate }}</span></div
          >
        </div>
      </div>
      <a-spin
        v-if="state.loading"
        :loading="state.loading"
        tip="加载中"
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 194px;
        "
      ></a-spin>
    </div>
    <div class="other-value-list">
      <div
        v-for="(item, index) in state.otherList"
        :key="index"
        class="other-value-item"
      >
        <div class="other-value-label"
          >{{ item.label }}<span>{{ item.unit }}</span></div
        >
        <div class="other-value">{{ formattedValue(item.value) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    ECOverAll,
    ConParams,
  } from '@/api/energy-analysis/consumption-panel';
  import bus from '@/utils/bus';
  import moment from 'moment';
  import ArrowRed from '@/assets/imgs/energy-analysis/consumption/arrow-red.png';
  import ArrowRreen from '@/assets/imgs/energy-analysis/consumption/arrow-green.png';

  interface ItemObj {
    label: string;
    unit: string;
    value: number;
  }

  const state = reactive({
    totalValue: 0,
    totalValueQOQ: 0,
    totalValueYOY: 0,
    otherList: [
      { label: '人均值', unit: '(kWh/人)', value: 0 },
      { label: '单位面积值', unit: '(kWh/m²)', value: 0 },
      {
        label: '标煤转换值',
        unit: '(kgce)',
        value: 0,
      },
      {
        label: '碳排放转换值',
        unit: '(t)',
        value: 0,
      },
    ] as ItemObj[],
    loading: false,
    startTime: '',
    endTime: '',
  });

  const fetchData = async (params: ConParams) => {
    try {
      state.loading = true;
      const { data } = await ECOverAll(params);
      state.totalValue = data.totalValue;
      state.totalValueQOQ = data.totalValueQOQ;
      state.totalValueYOY = data.totalValueYOY;
      state.otherList = [
        { label: '人均值', unit: '(kWh/人)', value: data.perCapita },
        { label: '单位面积值', unit: '(kWh/m²)', value: data.unitArea },
        {
          label: '标煤转换值',
          unit: '(kgce)',
          value: data.standardCoalConversion,
        },
        {
          label: '碳排放转换值',
          unit: '(t)',
          value: data.carbonEmissionConversion,
        },
      ];
    } catch (err) {
      console.error(err);
    } finally {
      state.loading = false;
    }
  };

  const formattedValue = (value: number) => {
    return value ? value.toLocaleString() : '- -';
  };

  const formattedComparison = (label: string, value: any) => {
    if (value === '持平') return `${label} ${value}`;
    return value ? `${label} ${Math.abs(value)} %` : `${label} --`;
  };

  const getLastYearTimePeriod = () => {
    const startMoment = moment(state.startTime);
    const endMoment = moment(state.endTime);

    const lastYearStartTime = startMoment.subtract(1, 'years');
    const lastYearEndTime = endMoment.subtract(1, 'years');
    return `比${lastYearStartTime.format(
      'YYYY-MM-DD'
    )}—${lastYearEndTime.format('YYYY-MM-DD')}`;
  };

  const getQQDate = computed(() => {
    return getLastYearTimePeriod();
  });

  const getPreviousTimePeriod = () => {
    const isSameDay = moment(state.startTime).isSame(state.endTime, 'day'); // 检查开始时间和结束时间是否是同一天
    let newStartTime;
    let newEndTime;
    if (isSameDay) {
      // 如果开始时间和结束时间是同一天，则将开始时间减去一天
      newStartTime = moment(state.startTime).subtract(1, 'day');
      newEndTime = moment(state.endTime).subtract(1, 'day');
    } else {
      // 计算时间段的长度
      const duration = moment.duration(
        moment(state.endTime).diff(moment(state.startTime))
      );
      // 计算新的开始时间和结束时间
      newStartTime = moment(state.startTime).subtract(duration);
      newEndTime = moment(state.endTime).subtract(duration);
    }
    return `比${newStartTime.format('YYYY-MM-DD')}—${newEndTime.format(
      'YYYY-MM-DD'
    )}`;
  };

  const getYYDate = computed(() => {
    return getPreviousTimePeriod();
  });

  bus.on('search-consumption', (params: any) => {
    state.startTime = params.startTime;
    state.endTime = params.endTime;
    fetchData(params);
  });
</script>

<style lang="less" scoped>
  .nhzj-container {
    .total-value-card {
      position: relative;
      width: 100%;
      height: 194px;
      .set-back('@/assets/imgs/energy-analysis/consumption/nhzj-card-bg.png');

      .total-value-label {
        position: absolute;
        top: 32px;
        left: 39px;
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 20px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.4px;

        span {
          color: rgb(255 255 255 / 40%);
          font-weight: 400;
          font-size: 12px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 20px;
        }
      }

      .total-value {
        position: absolute;
        top: 64px;
        left: 50%;
        color: rgb(255 255 255 / 85%);
        font-weight: 600;
        font-size: 46px;
        font-family: Barlow-Italic, sans-serif;
        font-style: italic;
        line-height: 60px;
        transform: translateX(-50%);
      }

      .qq-section,
      .yy-section {
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .tooltip-qq-date,
      .tooltip-yy-date {
        position: absolute;
        bottom: 125%;
        left: 50%;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        align-self: stretch;
        width: fit-content;
        min-width: 200px;
        padding: 6px 8px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 24px;
        text-align: center;
        background: rgb(0 0 0 / 85%);
        border-radius: 4px;
        transform: translateX(-50%);
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .qq-section:hover .tooltip-qq-date {
        visibility: visible;
        opacity: 1;
      }

      .yy-section:hover .tooltip-yy-date {
        visibility: visible;
        opacity: 1;
      }

      .per-section {
        position: absolute;
        top: 133px;
        left: 50%;
        display: flex;
        width: max-content;
        transform: translateX(-50%);

        .per-value {
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 29px;
        }
      }
    }

    .other-value-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      width: 100%;
      height: 192px;
      margin-top: 24px;

      .other-value-item {
        position: relative;
        width: 46.85%;
        height: 84px;
        margin-bottom: 24px;
        .set-back('@/assets/imgs/energy-analysis/consumption/other-item-bg.png');

        .other-value-label {
          position: absolute;
          top: 12px;
          left: 25px;
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 20px;
          font-family: YouSheBiaoTiHei, sans-serif;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.4px;

          span {
            color: rgb(255 255 255 / 40%);
            font-weight: 400;
            font-size: 12px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 20px;
          }
        }

        .other-value {
          position: absolute;
          top: 48px;
          left: 25px;
          color: rgb(255 255 255 / 85%);
          font-weight: 600;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          font-style: italic;
          line-height: 20px;
        }
      }
    }
  }
</style>
