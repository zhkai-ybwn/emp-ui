<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-13 15:36:45
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:58:20
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\pv-power\PvModel.vue
 * @Description: 光伏直驱发电组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="pv-model-container">
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.modularMachine1Status,
        label: '模块机',
        type: 1,
      }"
      :style="{
        top: `${state.positions[0][0]}px`,
        left: `${state.positions[0][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.modularMachine2Status,
        label: '模块机',
        type: 1,
      }"
      :style="{
        top: `${state.positions[1][0]}px`,
        left: `${state.positions[1][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.modularMachine3Status,
        label: '模块机',
        type: 1,
      }"
      :style="{
        top: `${state.positions[2][0]}px`,
        left: `${state.positions[2][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.modularMachine4Status,
        label: '模块机',
        type: 1,
      }"
      :style="{
        top: `${state.positions[3][0]}px`,
        left: `${state.positions[3][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.chilledWaterPump1Status,
        label: '冷水泵',
        type: 3,
      }"
      :style="{
        top: `${state.positions[4][0]}px`,
        left: `${state.positions[4][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.chilledWaterPump2Status,
        label: '冷水泵',
        type: 3,
      }"
      :style="{
        top: `${state.positions[5][0]}px`,
        left: `${state.positions[5][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.mainEngineStatus,
        label: '磁悬浮主机',
        type: 2,
      }"
      :style="{
        top: `${state.positions[6][0]}px`,
        left: `${state.positions[6][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.coolingWaterPump1Status,
        label: '冷却水泵',
        type: 3,
      }"
      :style="{
        top: `${state.positions[7][0]}px`,
        left: `${state.positions[7][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.coolingWaterPump2Status,
        label: '冷却水泵',
        type: 3,
      }"
      :style="{
        top: `${state.positions[8][0]}px`,
        left: `${state.positions[8][1]}px`,
      }"
    ></PvStatusModal>
    <PvStatusModal
      class="pos-abu"
      :status-info="{
        status: state.coolingTowerStatus,
        label: '冷却塔',
        type: 3,
      }"
      :style="{
        top: `${state.positions[9][0]}px`,
        left: `${state.positions[9][1]}px`,
      }"
    ></PvStatusModal>
    <div class="text">
      <div class="on"
        >运行中<span>{{ state.runningNum }}</span
        >台</div
      >
      <div class="off"
        >关机<span>{{ state.offNum }}</span
        >台</div
      >
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { equipmentStatus } from '@/api/data-overview/pv-power';
  import PvStatusModal from './PvStatusModal.vue';

  const { looping } = useEchart();

  const state = reactive({
    positions: [
      [76, 609],
      [76, 701],
      [76, 792],
      [76, 883],
      [205, 780],
      [179, 883],
      [310, 480],
      [383, 685],
      [342, 788],
      [370, 1020],
    ],
    chilledWaterPump1Status: '',
    chilledWaterPump2Status: '',
    coolingTowerStatus: '',
    coolingWaterPump1Status: '',
    coolingWaterPump2Status: '',
    equipmentTotalNum: '',
    mainEngineStatus: '',
    modularMachine1Status: '',
    modularMachine2Status: '',
    modularMachine3Status: '',
    modularMachine4Status: '',
    offNum: '',
    runningNum: '',
  });

  const fetchData = async () => {
    try {
      const { data } = await equipmentStatus();
      state.chilledWaterPump1Status = data.chilledWaterPump1Status;
      state.chilledWaterPump2Status = data.chilledWaterPump2Status;
      state.coolingTowerStatus = data.coolingTowerStatus;
      state.coolingWaterPump1Status = data.coolingWaterPump1Status;
      state.coolingWaterPump2Status = data.coolingWaterPump2Status;
      state.equipmentTotalNum = data.equipmentTotalNum;
      state.mainEngineStatus = data.mainEngineStatus;
      state.modularMachine1Status = data.modularMachine1Status;
      state.modularMachine2Status = data.modularMachine2Status;
      state.modularMachine3Status = data.modularMachine3Status;
      state.modularMachine4Status = data.modularMachine4Status;
      state.offNum = data.offNum;
      state.runningNum = data.runningNum;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .pv-model-container {
    position: relative;
    width: 1388px;
    height: 516px;

    .set-back('@/assets/imgs/energy-plant/pv_model_bg.png');

    .pos-abu {
      position: absolute;
    }

    .text {
      position: absolute;
      bottom: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;

      .on {
        margin-right: 50px;

        span {
          margin-left: 8px;
          color: #00fff0;
          font-weight: normal;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          vertical-align: bottom;
        }

        &::before {
          position: absolute;
          top: 8px;
          left: 582px;
          width: 10px;
          height: 10px;
          background-color: #00fff0;
          content: '';
        }
      }

      .off {
        span {
          margin-left: 8px;
          color: #ffb800;
          font-weight: normal;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          vertical-align: bottom;
        }

        &::before {
          position: absolute;
          top: 8px;
          left: 709px;
          width: 10px;
          height: 10px;
          background-color: #ffb800;
          content: '';
        }
      }
    }
  }
</style>
