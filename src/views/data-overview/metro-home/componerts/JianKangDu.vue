<template>
  <div>
    <Title :title="'制冷机房设备健康度'"></Title>
    <div v-if="!state.loading" class="chart">
      <div v-for="(item, index) in state.dataList" :key="index" class="item">
        <div class="title">{{ item.deviceName }}</div>
        <div
          class="value"
          :class="
            item.healthDegree
              ? parseFloat(item.healthDegree) < 80
                ? 'normal'
                : 'great'
              : 'none'
          "
          >{{ item.healthDegree ?? '- -' }}
          <span v-if="item.healthDegree">%</span></div
        >
        <div class="bar-box">
          <div class="bar">
            <div
              class="value-bar"
              :class="
                parseFloat(item.healthDegree) < 80 ? 'normal-bar' : 'great-bar'
              "
              :style="{ width: `calc(${item.healthDegree}% - 2px)` }"
            ></div>
            <div v-if="item.healthDegree" class="value-end"></div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="state.loading" style="height: 240px"></Loading>
  </div>
</template>

<script lang="ts" setup>
  import { listDeviceHealthDegree } from '@/api/data-overview/metro-home';
  import Title from '../common/Title.vue';
  import Loading from '../common/Loading.vue';

  interface Health {
    deviceId: number;
    deviceName: string;
    healthDegree: string;
  }

  const state = reactive({
    loading: false,
    dataList: [] as Health[],
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await listDeviceHealthDegree();
      state.dataList = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      state.loading = false;
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .chart {
    height: 230px;
    margin-top: 10px;
    overflow: auto;

    .item {
      display: flex;
      align-items: center;
      height: 35px;

      .title {
        width: 80px;
        color: #e3eaf0;
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        line-height: 16px;
        text-align: right;
      }

      .normal {
        width: 50px;
        color: #ffd15c;
        font-size: 14px;
        font-family: Barlow-Normal-Medium-Italic, sans-serif;
        line-height: 16px;
        text-align: right;
      }

      .great {
        width: 50px;
        color: #21ffff;
        font-size: 14px;
        font-family: Barlow-Normal-Medium-Italic, sans-serif;
        line-height: 16px;
        text-align: right;
      }

      .none {
        width: 50px;
        color: rgb(255 255 255 / 85%);
        font-weight: normal;
        font-size: 14px;
        font-family: Barlow-Normal-Medium-Italic, sans-serif;
        text-align: right;
      }

      .bar-box {
        height: 10px;
        margin-left: 14px;

        .bar {
          display: flex;
          align-items: center;
          width: 240px;
          height: 8px;
          background: #6c829710;

          .normal-bar {
            height: 8px;
            background: linear-gradient(
              to left,
              #ffd15c 0%,
              rgb(255 209 92 / 40%) 72%
            );
          }

          .great-bar {
            height: 8px;
            background: linear-gradient(
              to left,
              #5ce4ff 0%,
              rgb(36 145 200 / 40%) 72%
            );
          }

          .value-end {
            width: 2px;
            height: 10px;
            background: #fff;
          }
        }
      }
    }
  }
</style>
