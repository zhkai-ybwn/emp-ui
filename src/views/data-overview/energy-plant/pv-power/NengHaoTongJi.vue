<!-- 光伏发电系统能耗统计 -->
<template>
  <div class="consumption-statistics">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div
        v-for="(item, index) in state.dataList"
        :key="index"
        :class="`pv${index + 1}`"
      >
        <div class="image">
          <div class="img"></div>
          <div class="text">{{ state.title[index] }}</div>
        </div>
        <div class="day">
          <div class="num">{{ item[0] }}</div>
          <div class="text">{{ state.labelList[index][0] }}</div>
        </div>
        <div class="month">
          <div class="num">{{ item[1] }}</div>
          <div class="text">{{ state.labelList[index][1] }}</div>
        </div>
        <div class="year">
          <div class="num">{{ item[2] }}</div>
          <div class="text">{{ state.labelList[index][2] }}</div>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { eCStatistics } from '@/api/data-overview/pv-power';
  import ModuleBox from '../common/ModuleBox.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '光伏发电系统能耗统计',
      width: 460,
      height: 40,
    },
    boxConfig: {
      width: 460,
      height: 427,
    },
    title: ['主机耗电量', '并网发电量', '光伏发电量'],
    dataList: [],
    labelList: [
      ['当日耗电(kWh)', '当月耗电(kWh)', '全年耗电(kWh)'],
      ['当日发电(kWh)', '当月发电(kWh)', '全年发电(kWh)'],
      ['当日发电(kWh)', '当月发电(kWh)', '全年发电(kWh)'],
    ],
  });

  const fetchData = async () => {
    try {
      const { data } = await eCStatistics();
      state.dataList = [];
      state.dataList.push([
        data.todayMainEngryEC,
        data.curMonMainEngryEC,
        data.curYearMainEngryEC,
      ]);
      state.dataList.push([
        data.todayOnGridElecGen,
        data.curMonOnGridElecGen,
        data.curYearOnGridElecGen,
      ]);
      state.dataList.push([
        data.todayPhotovoltaicGenEc,
        data.curMonPhotovoltaicGenEc,
        data.curYearPhotovoltaicGenEc,
      ]);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .consumption-statistics {
    width: 460px;

    .pv1 {
      margin-top: 31px;

      .img {
        .set-back('@/assets/imgs/energy-plant/pv1@2x.png');
      }
    }

    .pv2 {
      .img {
        .set-back('@/assets/imgs/energy-plant/pv2@2x.png');
      }
    }

    .pv3 {
      .img {
        .set-back('@/assets/imgs/energy-plant/pv3@2x.png');
      }
    }

    .text {
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      line-height: 16px;
    }

    .num {
      margin-bottom: 3px;
      font-weight: normal;
      font-size: 24px;
      font-family: Barlow, sans-serif;
      line-height: 28px;
      background: linear-gradient(180deg, #43b0ff 0%, #fff 85%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .pv1,
    .pv2,
    .pv3 {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 436px;
      height: 109px;
      margin-right: 14px;
      margin-bottom: 19px;
      margin-left: 10px;

      .set-back('@/assets/imgs/energy-plant/pv-bg@2x.png');

      .image {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 74px;
        height: 109px;

        .img {
          width: 64px;
          height: 64px;
          margin: 5px 0;
        }

        .text {
          color: #fff;
          font-weight: 400;
          font-size: 16px;
          font-family: YouSheBiaoTiHei, sans-serif;
          line-height: 19px;
        }
      }
    }
  }
</style>
