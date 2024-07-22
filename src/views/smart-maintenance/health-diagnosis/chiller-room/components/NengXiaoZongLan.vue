<template>
  <ModuleBox :config="state.title" class="box">
    <div class="contain">
      <div class="chart">
        <div v-for="(item, index) in state.chartList" :key="index" class="item">
          <div class="ring">
            <RingChart :data="item.value"></RingChart>
          </div>
          <div class="name">{{ item.title }}</div>
        </div>
      </div>
      <div class="info">
        <div class="item1">
          <div class="title">瞬时SCOP</div>
          <div class="value" :data-value="state.dataList.instantSCOP ?? '-'">
            {{ state.dataList.instantSCOP ?? '-' }}
          </div>
        </div>
        <div class="item2">
          <div class="title">平均SCOP</div>
          <div class="value" :data-value="state.dataList.avgSCOP ?? '-'">
            {{ state.dataList.avgSCOP ?? '-' }}
          </div>
        </div>
        <div class="item3">
          <div class="title">热平衡系数</div>
          <div
            class="value"
            :data-value="state.dataList.heatBalanceCoefficient ?? '-'"
          >
            {{ state.dataList.heatBalanceCoefficient ?? '-' }}
          </div>
        </div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { getEnergyOverview } from '@/api/small-maintenance/newHealth';
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import RingChart from '@/views/smart-maintenance/components/RingChart.vue';

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '36px',
      text: 'COP总览',
      textEn: '',
      Height: '28%',
      bgClass: 'shadow-contain',
    },
    loading: false,
    chartList: [
      {
        title: '系统瞬时COP',
        value: null as null | number,
      },
      {
        title: '系统平均COP',
        value: null as null | number,
      },
      {
        title: '机组瞬时COP',
        value: null as null | number,
      },
      {
        title: '机组平均COP',
        value: null as null | number,
      },
    ],
    dataList: {
      instantSCOP: null as null | number,
      avgSCOP: null as null | number,
      heatBalanceCoefficient: null as null | number,
    },
  });

  const fetchData = async () => {
    try {
      const { data } = await getEnergyOverview();
      state.dataList = data;
      state.chartList[0].value = data.sysInstantCOP;
      state.chartList[1].value = data.sysAvgCOP;
      state.chartList[2].value = data.chillingInstantCOP;
      state.chartList[3].value = data.chillingAvgCOP;
    } catch (err) {
      state.chartList[0].value = null;
      state.chartList[1].value = null;
      state.chartList[2].value = null;
      state.chartList[3].value = null;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .contain {
    height: calc(100% - 36px);
    padding: 0 16px 12px;

    .chart {
      display: flex;
      justify-content: space-between;
      height: 65%;

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 25%;
        height: 100%;

        .ring {
          height: 70px;
          // .back {
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          //   width: 98px;
          //   height: 60px;
          //   .set-back('@/assets/imgs/smart/health/ring.png');
          // }
        }

        .name {
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          text-align: center;
        }
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      height: 35%;

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 31%;
        height: 100%;
        padding-left: 16px;
        background: linear-gradient(
          270deg,
          rgb(157 180 220 / 6%) 0%,
          rgb(85 137 255 / 30%) 100%
        );
        border-radius: 4px;
      }

      .title {
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        line-height: 1.5;
      }

      .value {
        font-weight: 400;
        font-size: 20px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(data-value);
        }
      }
    }
  }

  .box {
    margin-bottom: 16px;
  }

  .shadow-contain {
    backdrop-filter: blur(10px);
  }
</style>
