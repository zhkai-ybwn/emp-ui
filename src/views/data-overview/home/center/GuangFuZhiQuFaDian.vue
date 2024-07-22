<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 10:21:04
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-01 14:08:07
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\center\GuangFuZhiQuFaDian.vue
 * @Description: 光伏直驱发电
-->
<template>
  <div class="gfzqfd-container">
    <ModuleTitle
      :config="{ width: 796, height: 40, title: state.moduleTitle }"
    ></ModuleTitle>
    <div class="upper-area">
      <!-- 电量 -->
      <div class="dl-area">
        <div class="dl-icon"></div>
        <DianLiangInfo :info="state.dlInfo1"></DianLiangInfo>
        <DianLiangInfo :info="state.dlInfo2"></DianLiangInfo>
        <DianLiangInfo :info="state.dlInfo3"></DianLiangInfo>
      </div>
      <!-- 碳排放 -->
      <div class="carbon-area">
        <div class="carbon-icon"></div>
        <DianLiangInfo :info="state.carbonInfo"></DianLiangInfo>
      </div>
    </div>
    <div class="lower-area">
      <div class="gf-icon"></div>
      <GuangFuGonglv class="gfgl" :info="state.gfInfo1"></GuangFuGonglv>
      <div class="gf-box">
        <GuangFuInfo :info="state.gfInfo2"></GuangFuInfo>
        <GuangFuInfo :info="state.gfInfo3"></GuangFuInfo>
        <GuangFuInfo :info="state.gfInfo4"></GuangFuInfo>
        <GuangFuInfo :info="state.gfInfo5"></GuangFuInfo>
      </div>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { photovoltaicInfo } from '@/api/data-overview/home';
  import ModuleTitle from '../common/ModuleTitle.vue';
  import DianLiangInfo from './DianLiangInfo.vue';
  import GuangFuInfo from './GuangFuInfo.vue';
  import GuangFuGonglv from './GuangFuGonglv.vue';

  const { looping } = useEchart();
  const state = reactive({
    moduleTitle: '光伏直驱发电',
    dlInfo1: {
      text: '今日发电量',
      value: 0,
      unit: 'kWh',
      isDig: true,
    },
    dlInfo2: {
      text: '累计发电量',
      value: 0,
      unit: 'kWh',
      isDig: false,
    },
    dlInfo3: {
      text: '主机用电量',
      value: 0,
      unit: 'kWh',
      isDig: false,
    },
    carbonInfo: {
      text: '累计碳减排',
      value: 0,
      unit: '吨',
    },
    gfInfo1: {
      text: '当前功率',
      value: 0,
      unit: 'kW',
    },
    gfInfo2: {
      text: '背板温度',
      value: 0,
      unit: '℃',
    },
    gfInfo3: {
      text: '环境风速',
      value: 0,
      unit: 'm/s',
    },
    gfInfo4: {
      text: '环境温度',
      value: 0,
      unit: '℃',
    },
    gfInfo5: {
      text: '环境湿度',
      value: 0,
      unit: '%',
    },
  });

  const fetchData = async () => {
    try {
      const { data } = await photovoltaicInfo(state.currentDate);
      state.dlInfo1.value = data.todayElecGen.toFixed(1);
      state.dlInfo2.value = data.totalElecGen.toFixed(0);
      state.dlInfo3.value = data.mainEngineConsumption.toFixed(1);
      state.carbonInfo.value = data.totalCarbonEmissionReduction.toFixed(1);
      state.gfInfo1.value = Math.abs(data.currentP).toFixed(0);
      state.gfInfo2.value = data.backplaneTemperature.toFixed(0);
      state.gfInfo3.value = data.envWindSpeed.toFixed(1);
      state.gfInfo4.value = data.envTemperature.toFixed(1);
      state.gfInfo5.value = data.envHumidity.toFixed(1);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .gfzqfd-container {
    position: relative;
    width: 796px;
    height: 290px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .upper-area {
      position: absolute;
      top: 77px;
      left: 36px;
      display: flex;
      justify-content: space-between;
      width: 724px;
      height: 80px;

      .dl-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 471px;
        height: 80px;

        .dl-icon {
          width: 80px;
          height: 80px;

          .set-back('@/assets/imgs/home/dianliang-icon.png');
        }
      }

      .carbon-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 194px;
        height: 80px;

        .carbon-icon {
          width: 80px;
          height: 80px;

          .set-back('@/assets/imgs/home/carbon-icon.png');
        }
      }
    }

    .lower-area {
      position: absolute;
      top: 180px;
      left: 21px;
      display: flex;
      align-items: center;
      width: 760px;
      height: 80px;

      .gf-icon {
        width: 120px;
        height: 80px;

        .set-back('@/assets/imgs/home/guangfu-icon.png');
      }

      .gfgl {
        position: absolute;
        left: 134px;
      }

      .gf-box {
        position: absolute;
        left: 297px;
        display: flex;
        justify-content: space-around;
        width: 460px;
      }
    }
  }
</style>
