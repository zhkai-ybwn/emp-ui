<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 09:16:03
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 09:35:22
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\left\QuanChangZongYongDianLiang.vue
 * @Description: 全厂总用电量概况组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="power-overview-container">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="content-box">
        <QuanChangZongYongDianLiangSingle
          v-for="(item, index) in state.dataList"
          :key="index"
          :data="item"
          :config="state.config[index]"
        ></QuanChangZongYongDianLiangSingle>
      </div>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { holeFactEnergyConsumption } from '@/api/data-overview/plant-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import QuanChangZongYongDianLiangSingle from './QuanChangZongYongDianLiangSingle.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '全厂总用电量概况',
      width: 1388,
      height: 38,
    },
    boxConfig: {
      width: 1388,
      height: 131,
    },
    dataList: [],
    config: [
      {
        label: '今日全厂用电量',
        unit1: 'kWh',
        unit2: 'MWh',
        width: '250px',
        type: 0,
      },
      {
        label: '本月全厂用电量',
        unit1: 'kWh',
        unit2: 'MWh',
        width: '250px',
        type: 0,
      },
      {
        label: '全年全厂用电量',
        unit1: 'kWh',
        unit2: 'MWh',
        width: '300px',
        type: 0,
      },
      {
        label: '全年CO2减排量',
        unit1: 'kWh',
        unit2: 'MWh',
        width: '250px',
        type: 1,
      },
      {
        label: '全年节省费用',
        unit1: '万元',
        unit2: '千万元',
        width: '250px',
        type: 2,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const { data } = await holeFactEnergyConsumption();
      state.dataList = [];
      state.dataList.push({
        value: data.todayHoleFactEC,
        mom: data.todayHoleFactECQOQ,
        yoy: data.todayHoleFactECYOY,
      });
      state.dataList.push({
        value: data.curMonHoleFactEC,
        mom: data.curMonHoleFactECQOQ,
        yoy: data.curMonHoleFactECYOY,
      });
      state.dataList.push({
        value: data.curYearHoleFactEC,
        mom: 0,
        yoy: data.curYearHoleFactECYOY,
      });
      state.dataList.push({
        value: data.totalCarbonEmissionReduction,
        mom: 0,
        yoy: data.photovoltaicPowerGenYOY,
      });
      state.dataList.push({
        value: data.costSavings,
        mom: 0,
        yoy: data.photovoltaicPowerGenYOY,
      });
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .power-overview-container {
    width: 1500px;
    height: 169px;

    .content-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1290px;
      height: 131px;
      margin-left: 20px;
    }
  }
</style>
