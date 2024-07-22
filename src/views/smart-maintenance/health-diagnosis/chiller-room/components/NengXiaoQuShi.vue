<template>
  <ModuleBox :config="state.title" class="box">
    <div class="chart">
      <div class="cur">
        <div class="check">
          <div class="name">瞬时COP</div>
          <a-checkbox-group v-model="state.checked1">
            <a-checkbox
              v-for="(item, index) in state.titleList1"
              :key="index"
              :value="index"
            >
              <div :style="{ color: colorList[index] }">{{ item }}</div>
            </a-checkbox>
          </a-checkbox-group>
        </div>
        <LineChart
          v-if="
            !state.loading1 && state.dataList1 && state.dataList1.length !== 0
          "
          :data="state.dataList1"
          :title="state.titleList1"
          :check="state.checked1"
          :color-list="colorList"
          :point-list="state.pointIds1"
        ></LineChart>
        <a-spin
          v-if="state.loading1"
          :loading="state.loading1"
          tip="加载中"
          style="display: flex; align-items: center; justify-content: center"
        >
        </a-spin>
        <div
          v-if="
            !state.loading1 &&
            (!state.dataList1 || state.dataList1.length === 0)
          "
          class="empty"
        >
          <div class="img"></div>
          <div class="text">&nbsp;暂无数据</div>
        </div>
      </div>
      <div class="ave">
        <div class="check">
          <div class="name">平均COP</div>
          <a-checkbox-group v-model="state.checked2">
            <a-checkbox
              v-for="(item, index) in state.titleList2"
              :key="index"
              :value="index"
            >
              <div :style="{ color: colorList[index] }">{{ item }}</div>
            </a-checkbox>
          </a-checkbox-group>
        </div>
        <LineChart
          v-if="
            !state.loading2 && state.dataList2 && state.dataList2.length !== 0
          "
          :data="state.dataList2"
          :title="state.titleList2"
          :check="state.checked2"
          :color-list="colorList"
          :point-list="state.pointIds2"
        ></LineChart>
        <a-spin
          v-if="state.loading2"
          :loading="state.loading1"
          tip="加载中"
          style="display: flex; align-items: center; justify-content: center"
        >
        </a-spin>
        <div
          v-if="
            !state.loading2 &&
            (!state.dataList2 || state.dataList2.length === 0)
          "
          class="empty"
        >
          <div class="img"></div>
          <div class="text">&nbsp;暂无数据</div>
        </div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { getCOPLineChartData } from '@/api/small-maintenance/newHealth';
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import LineChart from '@/views/smart-maintenance/components/LineChart.vue';

  const colorList = ['#76E144', '#0079FF'];

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '36px',
      text: '能效趋势',
      textEn: '',
      Height: '48%',
      bgClass: 'shadow-contain',
    },
    loading1: false,
    loading2: false,
    dataList1: [],
    dataList2: [],
    titleList1: ['系统瞬时COP', '机组瞬时COP'],
    titleList2: ['系统平均COP', '机组平均COP'],
    checked1: [0, 1],
    checked2: [0, 1],
    pointIds1: [
      '291183464819990360',
      '291183464821038952',
      '291183464822087537',
    ],
    pointIds2: [
      '291183464806358777',
      '291183464806358776',
      '291183464822087538',
    ],
  });

  const fetchData1 = () => {
    state.loading1 = true;
    getCOPLineChartData({ pointIds: state.pointIds1 })
      .then((res) => {
        state.dataList1 = res.data;
      })
      .catch(() => {
        state.dataList1 = [];
      })
      .finally(() => {
        state.loading1 = false;
      });
  };
  fetchData1();

  const fetchData2 = () => {
    state.loading2 = true;
    getCOPLineChartData({ pointIds: state.pointIds2 })
      .then((res) => {
        state.dataList2 = res.data;
      })
      .catch(() => {
        state.dataList2 = [];
      })
      .finally(() => {
        state.loading2 = false;
      });
  };
  fetchData2();
</script>

<style lang="less" scoped>
  .chart {
    height: calc(100% - 36px);
    padding: 0 16px;

    .cur {
      height: 50%;
    }

    .ave {
      height: 50%;
    }

    .check {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 30px;

      .name {
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        line-height: 20px;
      }
    }
  }

  .box {
    margin-bottom: 16px;
  }

  .shadow-contain {
    backdrop-filter: blur(10px);
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 40px);
    margin: 0 auto;
    background: rgb(53 81 145 / 10%);
    border-radius: 4px;
    backdrop-filter: blur(5px);

    .img {
      width: 24px;
      height: 24px;
      .set-back('@/assets/imgs/load-forecast/no-data.png');
    }

    .text {
      color: #7787a2;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px;
      text-align: center;
    }
  }

  :deep(.arco-spin.arco-spin-loading.arco-spin-with-tip) {
    width: 100%;
    height: calc(100% - 40px);
    margin: 0 auto;
    background: rgb(53 81 145 / 10%);
    border-radius: 4px;
    backdrop-filter: blur(5px);
  }

  :deep(.arco-spin.arco-spin-with-tip) {
    width: 100%;
    height: calc(100% - 40px);
    margin: 0 auto;
    background: rgb(53 81 145 / 10%);
    border-radius: 4px;
    backdrop-filter: blur(5px);
  }
</style>
