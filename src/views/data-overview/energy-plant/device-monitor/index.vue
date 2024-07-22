<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-04 10:32:05
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-05 13:23:23
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\index.vue
 * @Description: 设备态势监控入口组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <ScaleBox
    :width="1920"
    :height="1080"
    bgc="transparent"
    :delay="100"
    :is-flat="true"
  >
    <div class="device-pv-bg">
      <div class="device-monitor-container">
        <SwitchButton
          :class="[deviceType === 0 ? 'swb0' : 'swb1']"
        ></SwitchButton>
        <div v-if="deviceType === 0">
          <DongXiLianDong class="switch"></DongXiLianDong>
          <KongTiaoSheBeiXinXi class="ktsbxx"></KongTiaoSheBeiXinXi>
          <ZongHeLouKongTiaoYongDianLiang
            class="zhlkt"
          ></ZongHeLouKongTiaoYongDianLiang>
          <AirEquStatus class="aes"></AirEquStatus>
          <YongDianLiangQuShi class="ydlqs"></YongDianLiangQuShi>
          <KongTiaoKaiQiLv class="ktkql"></KongTiaoKaiQiLv>
          <ConditionerEast v-if="region === 0" class="east"></ConditionerEast>
          <ConditionerWest v-if="region === 1" class="west"></ConditionerWest>
        </div>
        <div v-if="deviceType === 1">
          <DeviceStateInfo class="dsi"></DeviceStateInfo>
          <KeyStatusMonitor class="ksm"></KeyStatusMonitor>
          <IndoorEnvironment
            :data="state.modalObj"
            class="ie"
          ></IndoorEnvironment>
          <KeyEquModel class="kem"></KeyEquModel>
          <KeyEquModal
            v-if="state.isHover"
            :data="state.modalObj"
            :class="`kem-modal${state.idx}`"
          ></KeyEquModal>
          <BottomBox class="bottom"></BottomBox>
        </div> </div
    ></div>
  </ScaleBox>
</template>

<script setup>
  import ScaleBox from 'vue3-scale-box';
  import { useStore } from '@/store';
  import bus from '@/utils/bus';
  import SwitchButton from './SwitchButton.vue';
  import DeviceStateInfo from './DeviceStateInfo.vue';
  import KeyStatusMonitor from './KeyStatusMonitor.vue';
  import IndoorEnvironment from './IndoorEnvironment.vue';
  import KeyEquModel from './KeyEquModel.vue';
  import KeyEquModal from './KeyEquModal.vue';
  import BottomBox from './key-device-bottom/BottomBox.vue';
  import DongXiLianDong from './conditioner-device/DongXiLianDong.vue';
  import KongTiaoSheBeiXinXi from './conditioner-device/KongTiaoSheBeiXinXi.vue';
  import ZongHeLouKongTiaoYongDianLiang from './conditioner-device/ZongHeLouKongTiaoYongDianLiang.vue';
  import AirEquStatus from './AirEquStatus.vue';
  import YongDianLiangQuShi from './YongDianLiangQuShi.vue';
  import KongTiaoKaiQiLv from './KongTiaoKaiQiLv.vue';
  import ConditionerEast from './ConditionerEast.vue';
  import ConditionerWest from './ConditionerWest.vue';

  const state = reactive({
    isHover: false,
    idx: '',
    modalObj: {},
  });

  const deviceType = computed(() => useStore().deviceType);
  const region = computed(() => useStore().region);

  bus.on('modal', (x) => {
    state.isHover = true;
    state.modalObj = x.item;
    state.idx = x.index;
  });
  bus.on('closeModal', () => {
    state.isHover = false;
  });
</script>

<script>
  export default {
    name: 'DeviceMonitor',
  };
</script>

<style lang="less" scoped>
  .device-pv-bg {
    width: 1920px;
    height: 1080px;
    .set-back('@/assets/imgs/energy-plant/pv-device-bg.png');

    .device-monitor-container {
      position: relative;
      width: 1920px;
      height: 1080px;

      .swb0 {
        position: absolute;
        top: 94px;
        z-index: 2;
      }

      .swb1 {
        position: absolute;
        top: 126px;
        z-index: 2;
      }

      .dsi {
        position: absolute;
        top: 117px;
        left: 320px;
      }

      .ksm {
        position: absolute;
        top: 80px;
        right: 24px;
      }

      .ie {
        position: absolute;
        top: 378px;
        left: 24px;
        z-index: 2;
      }

      .kem {
        position: absolute;
        top: 182px;
        left: 0;
        z-index: 1;
      }

      .kem-modal0 {
        position: absolute;
        top: 222px;
        left: 400px;
        z-index: 2;
      }

      .kem-modal1 {
        position: absolute;
        top: 273px;
        left: 583px;
        z-index: 2;
      }

      .kem-modal2 {
        position: absolute;
        top: 408px;
        left: 542px;
        z-index: 2;
      }

      .kem-modal3 {
        position: absolute;
        top: 355px;
        left: 542px;
        z-index: 2;
      }

      .kem-modal4 {
        position: absolute;
        top: 413px;
        left: 668px;
        z-index: 2;
      }

      .kem-modal5 {
        position: absolute;
        top: 412px;
        left: 732px;
        z-index: 2;
      }

      .kem-modal6 {
        position: absolute;
        top: 394px;
        left: 817px;
        z-index: 2;
      }

      .kem-modal7 {
        position: absolute;
        top: 376px;
        left: 1010px;
        z-index: 2;
      }

      .kem-modal8 {
        position: absolute;
        top: 376px;
        left: 200px;
        z-index: 2;
      }

      .kem-modal9 {
        position: absolute;
        top: 376px;
        left: 277px;
        z-index: 2;
      }

      .bottom {
        position: absolute;
        top: 766px;
      }

      .switch {
        position: absolute;
        top: 329px;
        left: 20px;
        z-index: 2;
      }

      .ktsbxx {
        position: absolute;
        top: 118px;
        left: 320px;
      }

      .zhlkt {
        position: absolute;
        top: 625px;
        right: 23px;
      }

      .aes {
        position: absolute;
        top: 80px;
        right: 23px;
      }

      .ydlqs {
        position: absolute;
        top: 763px;
        left: 23px;
      }

      .ktkql {
        position: absolute;
        top: 763px;
        left: 831px;
      }

      .east {
        position: absolute;
        top: 196px;
        left: 24px;
      }

      .west {
        position: absolute;
        top: 196px;
        left: 24px;
      }
    }
  }
</style>
