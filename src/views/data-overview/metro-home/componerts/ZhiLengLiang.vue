<template>
  <div style="height: 196px">
    <Title :title="'水系统累计制冷量'"></Title>
    <div
      v-if="!state.loading && state.chartList && state.chartList.length !== 0"
      class="contain"
    >
      <div class="chart">
        <LoopChart :data="state.chartList"></LoopChart>
        <div class="title">累计制冷</div>
      </div>
      <div class="detail">
        <div class="total">
          <div class="name">制冷机房</div>
          <div class="value">
            {{ Number(state.chillerRoomCapacity).toLocaleString() }}
            <span class="unit">kWh</span>
          </div>
        </div>
        <div v-for="(item, index) in state.dataList" :key="index" class="item">
          <div
            class="block"
            :style="{ background: item.color, width: '12px', height: '6px' }"
          ></div>
          <div class="title">{{ item.deviceName }}</div>
          <div class="value">{{
            item.waterChillCapacity
              ? parseFloat(item.waterChillCapacity).toFixed(1)
              : '- -'
          }}</div>
          <div class="unit">{{ item.unit }}</div>
          <div class="line"></div>
          <div class="percent" :style="{ color: item.color }"
            >{{
              item.capacityPercent
                ? parseFloat(item.capacityPercent).toFixed(1)
                : '- -'
            }}%</div
          >
        </div>
      </div>
    </div>
    <Empty
      v-if="
        !state.loading &&
        (!state.chartList || (state.chartList && state.chartList.length === 0))
      "
      style="height: 160px"
    ></Empty>
    <Loading v-if="state.loading" style="height: 160px"></Loading>
  </div>
</template>

<script lang="ts" setup>
  import { getChillerRoomCapacity } from '@/api/data-overview/metro-home';
  import Title from '../common/Title.vue';
  import LoopChart from '../common/LoopChart.vue';
  import Empty from '../common/Empty.vue';
  import Loading from '../common/Loading.vue';

  const colorList = ['#00A7FF', '#00FFFF', '#3AFF8C'];

  interface Capacity {
    capacityPercent: string;
    deviceName: string;
    waterChillCapacity: string;
  }

  interface RoomCapacity extends Capacity {
    color: string;
    unit: string;
  }

  interface ChartCapacity {
    value: string;
    name: string;
  }

  const state = reactive({
    loading: false,
    chillerRoomCapacity: '',
    dataList: [] as RoomCapacity[],
    chartList: [] as ChartCapacity[],
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await getChillerRoomCapacity();
      state.chillerRoomCapacity = data.chillerRoomCapacity;
      data.waterChillCapacityList.forEach((el: Capacity, index: number) => {
        state.dataList.push({
          ...el,
          color: colorList[index],
          unit: 'kWh',
        });
        state.chartList.push({
          value: el.waterChillCapacity,
          name: el.deviceName,
        });
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .contain {
    display: flex;
    height: 160px;

    .chart {
      position: relative;
      width: 37%;
      height: 100%;

      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        font-weight: 400;
        font-size: 12px;
        font-family: HarmonyOS-Regular, sans-serif;
        background: linear-gradient(186deg, #fff 5.79%, #9cc4ff 96.02%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        transform: translate(-50%, -50%);
        -webkit-text-fill-color: transparent;
      }
    }

    .detail {
      width: 63%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .total {
        // margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 26px;
        background: linear-gradient(
          90deg,
          rgba(16, 66, 140, 0.3) 0%,
          rgba(14, 31, 47, 0.1) 100%
        );
        border-left: 1px solid #349fff;
        padding-left: 7px;

        .name {
          font-family: HarmonyOS-Regular, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #c6d1db;
        }

        .value {
          font-family: Barlow-Regular, sans-serif;
          font-weight: 600;
          font-size: 20px;
          color: #81ffff;

          .unit {
            font-family: Inter-Regular, sans-serif;
            font-weight: 400;
            font-size: 10px;
            color: #b4c0cc;
          }
        }
      }
      .item {
        // margin-top: 20px;
        display: flex;
        align-items: center;
        height: 21px;
        background: linear-gradient(
          90deg,
          rgba(16, 66, 140, 0) 7%,
          rgba(16, 66, 140, 0.4) 7%,
          rgba(14, 31, 47, 0.2) 100%
        );

        .title {
          margin-left: 4px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #e3eaf0;
          line-height: 16px;
        }

        .value {
          flex: 1;
          margin-right: 2px;
          font-family: Barlow-Medium, sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #e3eaf0;
          line-height: 16px;
          text-align: right;
        }

        .unit {
          font-family: Barlow-Medium, sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #c6d1db;
          line-height: 16px;
        }

        .line {
          background: #ffffff20;
          height: 12px;
          width: 1px;
          margin-left: 3px;
        }

        .percent {
          width: 42px;
          font-family: Barlow-Medium, sans-serif;
          font-weight: 500;
          font-size: 14px;
          color: #00a7ff;
          line-height: 16px;
          text-align: right;
        }
      }
    }
  }
</style>
