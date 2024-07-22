import QuanChangNengHao from '@/components/home/left/QuanChangNengHao.vue';
<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 17:00:24
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:25:03
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\left\QuanChangNengHao.vue
 * @Description: 全厂能耗
-->
<template>
  <div class="enery-container">
    <QuanChangNengHaoSingle
      v-for="(item, index) in state.dataList"
      :key="index"
      :data="item"
    ></QuanChangNengHaoSingle>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { holeFactEnergyConsumption } from '@/api/data-overview/home';
  import QuanChangNengHaoSingle from './QuanChangNengHaoSingle.vue';

  const { looping } = useEchart();

  const state = reactive({
    dataList: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await holeFactEnergyConsumption();
      state.dataList = [
        {
          text: '今日全厂能耗',
          percent: data.todayHoleFactECDOD,
          value: data.todayHoleFactEC,
          unit1: 'kWh',
          unit2: 'MWh',
        },
        {
          text: '本月全厂能耗',
          percent: data.curMonHoleFactECDOD,
          value: data.curMonHoleFactEC,
          unit1: 'kWh',
          unit2: 'MWh',
        },
        {
          text: '今年全厂能耗',
          percent: data.yearHoleFactECDOD,
          value: data.yearHoleFactEC,
          unit1: 'kWh',
          unit2: 'MWh',
        },
      ];
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .enery-container {
    display: flex;
    justify-content: space-between;
    width: 480px;
    height: 120px;
    padding: 17px 26px;
    background: linear-gradient(
      270deg,
      rgb(19 54 105 / 60%) 0.06%,
      rgb(83 119 245 / 50%) 99.96%
    );
    border-radius: 2px;
    backdrop-filter: blur(5px);
  }
</style>
