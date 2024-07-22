<template>
  <div class="ktxt-container">
    <ModuleBox :config="state.title">
      <a-spin
        v-if="state.loading"
        :loading="state.loading"
        style="
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 340px;
        "
        tip="加载中"
      ></a-spin>
      <div class="detail">
        <div class="left">
          <div class="all">
            <div class="text1">今日总能耗<span>（kWh）</span></div>
            <div class="num">{{
              state.dataList?.totalE?.toFixed(2).toLocaleString() ?? '-'
            }}</div>
          </div>
          <div class="yoy">
            <div class="text1">同比</div>
            <div class="num">
              <img
                :src="
                  state.dataList?.todayYoY > 0
                    ? up
                    : state.dataList?.todayYoY < 0
                    ? down
                    : ''
                "
                alt=""
                width="14"
                height="12"
                style="margin-left: -24px"
              />
              {{
                !isNaN(state.dataList?.todayYoY)
                  ? abs(state.dataList?.todayYoY)
                    ? Number(abs(state.dataList?.todayYoY)).toFixed(1)
                    : '-'
                  : state.dataList?.todayYoY ?? '-'
              }}
              <span v-if="!isNaN(state.dataList?.todayYoY)">%</span></div
            >
          </div>
          <div class="mom">
            <div class="text1">环比</div>
            <div class="num">
              <img
                :src="
                  state.dataList?.todayMoM > 0
                    ? up
                    : state.dataList?.todayMoM < 0
                    ? down
                    : ''
                "
                alt=""
                width="14"
                height="12"
                style="margin-left: -24px"
              />
              {{
                !isNaN(state.dataList?.todayMoM)
                  ? abs(state.dataList?.todayMoM)
                    ? Number(abs(state.dataList?.todayMoM)).toFixed(1)
                    : '-'
                  : state.dataList?.todayMoM ?? '-'
              }}
              <span v-if="!isNaN(state.dataList?.todayMoM)">%</span></div
            >
          </div>
        </div>
        <div class="right">
          <div class="text2">单位：kWh</div>
          <div class="unit">
            <span
              style="
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 8px;
                background: #266fe8;
              "
            ></span>
            <span style="margin-right: 24px">今日</span>
            <span
              style="
                display: inline-block;
                width: 10px;
                height: 10px;
                margin-right: 8px;
                background: rgb(38 111 232 / 20%);
              "
            ></span>
            <span>昨日</span>
          </div>
        </div>
      </div>
      <EnergyBarTrendChart
        v-if="
          !state.loading &&
          state.dataList?.today &&
          state.dataList?.yesterday &&
          (state.dataList?.today?.length !== 0 ||
            state.dataList?.yesterday?.length !== 0)
        "
        class="chart"
        :data="state.dataList"
      />
      <div
        v-if="
          ((!state.dataList?.today && !state.dataList?.yesterday) ||
            (state.dataList?.today?.length === 0 &&
              state.dataList?.yesterday?.length === 0)) &&
          state.loading === false
        "
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
      <!-- @click="
          router.push({
            name: 'ConsumptionPanel',
          })
        " -->
      <div class="more">今日内</div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { holeFactoryEnergyInfo } from '@/api/integrated-monitor/energy-monitor';
  import up from '@/assets/icons/png/up@2x.png';
  import down from '@/assets/icons/png/down@2x.png';
  import ModuleBox from '../../common/ModuleBox.vue';
  import EnergyBarTrendChart from '../../common/EnergyBarTrendChart.vue';

  const router = useRouter();

  interface DataList {
    today: {
      ts: string;
      value: number;
    }[];
    todayMoM: number;
    todayYoY: number;
    totalE: number;
    yesterday: {
      ts: string;
      value: number;
    }[];
  }

  const state = reactive({
    loading: false,
    dataList: {} as DataList,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '总用能趋势',
      textEn: '',
      Height: '382px',
    },
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await holeFactoryEnergyInfo();
      state.dataList = data;
    } catch (err) {
      state.dataList = {} as DataList;
    } finally {
      state.loading = false;
    }
  };
  fetchData();

  // 取绝对值
  const abs = (num: number | string) => {
    if (!num) return num;
    if (+num > 0) {
      return num;
    }
    return -num;
  };
</script>

<style lang="less" scoped>
  .more {
    position: absolute;
    top: 10px;
    right: 16px;
    color: rgb(255 255 255 / 85%);
    font-weight: 400;
    font-size: 14px;
    font-family: SourceHanSansCN-Normal, sans-serif;
    font-style: normal;
    line-height: normal;
    text-align: right;
    // cursor: pointer;

    // &:hover {
    //   color: #266fe8;
    // }
  }

  .detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 25%;
    padding: 2%;

    .left {
      display: flex;
      align-items: center;

      .text1 {
        margin-bottom: 5px;
        color: #c6d1db;
        font-weight: 400;
        font-size: 12px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 20px; /* 166.667% */

        span {
          color: rgb(255 255 255 / 40%);
          font-weight: 400;
          font-size: 10px;
          font-style: normal;
          line-height: 21px; /* 210% */
        }
      }

      .all {
        margin-right: 44px;

        .num {
          color: transparent;
          font-weight: 400;
          font-size: 30px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
          line-height: normal;
          background: linear-gradient(180deg, #fff 15.91%, #4787f0 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
        }
      }

      .yoy,
      .mom {
        margin-right: 44px;

        .num {
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 20px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
          line-height: normal;

          span {
            font-weight: 400;
            font-size: 10px;
            font-style: normal;
            line-height: 16px; /* 160% */
            text-align: right;
          }
        }
      }
    }

    .right {
      margin-left: auto;
      color: #fff;
      font-weight: 400;
      font-size: 12px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 20px; /* 166.667% */

      .text2 {
        width: fit-content;
        margin-bottom: 10px;
        margin-left: auto;
      }
    }
  }

  .empty {
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 340px;
  }

  .img {
    width: 98px;
    height: 60px;
    background-image: url('@/assets/imgs/energy-analysis/empty-image.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .text {
    color: #7787a2;
    font-weight: 400;
    font-size: 16px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 24px; /* 150% */
  }

  .chart {
    height: 65%;
  }
</style>
