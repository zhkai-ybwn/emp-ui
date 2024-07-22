<template>
  <div>
    <ModuleBox :config="state.title" :button-list="state.buttonList">
      <div class="fx-contain">
        <div v-if="state.loading" class="load">
          <Loading :percnet="state.percent"></Loading>
        </div>
        <div v-if="state.buttonList[0].title === '月数据'" class="date"
          >{{ state.year }}年{{ state.month }}月</div
        >
        <div v-if="state.buttonList[0].title === '日数据'" class="date"
          >{{ state.year }}年{{ state.month }}月{{ state.date }}日</div
        >
        <div class="chart">
          <div class="title">
            <div class="top">冷水机房能耗</div>
            <div class="middle" :data-value="state.value ? state.value : '-'">{{
              state.value ? state.value : '-'
            }}</div>
            <div class="bottom">kWh</div>
          </div>
          <AnnularChart
            :data="state.dataList"
            class="annular-chart"
          ></AnnularChart>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import bus from '@/utils/bus';
  import { querySubEnergy } from '@/api/energy-analysis/calendar';
  import moment from 'moment';
  import ModuleBox from '../../common/ModuleBox2.vue';
  import AnnularChart from '../../common/AnnularChart.vue';
  import Loading from '../../common/Loading.vue';

  const state = reactive({
    year: 0,
    month: 0,
    date: 0,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '分项能耗',
      Height: `calc((100vh - 164px)/2)`,
    },
    buttonList: [{ title: '月数据' }],
    value: undefined,
    dataList: [],
    percent: 75,
    loading: false,
  });
  state.year = new Date().getFullYear();
  state.month = new Date().getMonth() + 1;

  const getList = async (date: string) => {
    try {
      state.loading = true;
      const res = await querySubEnergy(date);
      state.dataList = res.data;
      state.value = res.data[0].totalE;
      state.percent = 95;
      state.loading = false;
    } catch (e) {
      state.dataList = [];
      state.value = undefined;
      state.loading = false;
    }
  };
  getList(moment([state.year, state.month - 1]).format('YYYY-MM'));

  bus.on('date', (params: any) => {
    state.buttonList = [{ title: '日数据' }];
    state.year = params.year;
    state.month = params.month;
    state.date = params.date;

    getList(
      moment([state.year, state.month - 1, state.date]).format('YYYY-MM-DD')
    );
  });
  bus.on('month', (params: any) => {
    state.buttonList = [{ title: '月数据' }];
    state.year = params.year;
    state.month = params.month;

    getList(moment([state.year, state.month - 1]).format('YYYY-MM'));
  });
</script>

<style scoped lang="less">
  .load {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.26);
  }
  .fx-contain {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: calc(100% - 40px);
    // padding: 24px;
    font-family: HarmonyOS-Regular, sans-serif;
    position: relative;

    .date {
      margin: 24px 24px 0;
      height: 10%;
      color: rgb(255 255 255 / 85%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      text-align: left;
    }

    .chart {
      position: relative;
      height: 90%;

      .title {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        width: 100%;
        font-family: HarmonyOS-Regular, sans-serif;
        text-align: center;
        transform: translate(-50%, -50%);

        .top {
          height: 19px;
          color: transparent;
          font-weight: 400;
          font-size: 16px;
          font-style: normal;
          line-height: 19px;
          vertical-align: baseline;
          background: linear-gradient(90deg, #fff 0%, #b0d0ff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 4px rgb(43 102 255 / 80%);
            content: '冷水机房能耗';
          }
        }

        .middle {
          height: 20px;
          color: transparent;
          font-weight: 400;
          font-size: 24px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
          line-height: 20px;
          vertical-align: baseline;
          background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(data-value);
          }
        }

        .bottom {
          height: 20px;
          color: transparent;
          font-weight: 400;
          font-size: 12px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
          line-height: 20px;
          text-transform: none;
          vertical-align: baseline;
          background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: 'kWh';
          }
        }
      }

      .annular-chart {
        height: 100%;
      }
    }
  }
</style>
