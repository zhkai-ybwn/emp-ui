<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-20 15:53:41
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-01 14:28:42
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\right\GuanJianSheBeiKaiDongLv.vue
 * @Description: 关键设备开动率
-->
<template>
  <div class="gjsbkdl-container">
    <ModuleTitle
      :config="{
        width: 480,
        height: 40,
        title: state.moduleTitle,
        subTitle: '今日内',
      }"
    ></ModuleTitle>
    <div class="kdl-box">
      <KaiDongLvSingle
        v-for="(item, index) in state.deviceList"
        :key="index"
        :info="item"
      ></KaiDongLvSingle>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { keyEquipmentAcRate } from '@/api/data-overview/home';
  import KaiDongLvSingle from './KaiDongLvSingle.vue';
  import ModuleTitle from '../common/ModuleTitle.vue';

  const { looping } = useEchart();

  const state = reactive({
    moduleTitle: '关键设备开动率',
    deviceList: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await keyEquipmentAcRate();
      state.deviceList = data.actuationDetailVoList;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .gjsbkdl-container {
    position: relative;
    width: 480px;
    height: 578px;
    background: rgb(6 12 28 / 50%);
    backdrop-filter: blur(7.5px);

    .kdl-box {
      position: absolute;
      top: 71px;
      left: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 400px;
      height: 474px;
    }
  }
</style>
