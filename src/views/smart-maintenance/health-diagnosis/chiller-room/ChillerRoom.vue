<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-08 11:26:25
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-11 10:53:03
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\chiller-room\ChillerRoom.vue
 * @Description: 冷水机房
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->

<template>
  <div class="main-box">
    <div class="chiller-room">
      <Breadcrumb class="bread" :items="['智慧运维', '健康诊断', '冷水机房']" />
      <div class="switch-2d-3d">
        <div :class="get3DClass" @click="switchTo3D">3D</div>
        <div :class="get2DClass" @click="switchTo2D">2D</div>
      </div>
      <video
        :key="currentVideo"
        class="video-background"
        preload="auto"
        loop
        playsinline
        autoplay
        tabindex="-1"
        muted
      >
        <source :src="currentVideo" />
      </video>
      <div class="card-box">
        <DeviceStatusCard
          v-for="(item, index) in state.deviceAlarmInfo"
          :key="index"
          :card-info="item"
          class="card-item"
          :style="{
            top: `${
              state.currentView === 1
                ? state.card3DPositions[index][0]
                : state.card2DPositions[index][0]
            }`,
            left: `${
              state.currentView === 1
                ? state.card3DPositions[index][1]
                : state.card2DPositions[index][1]
            }`,
          }"
        ></DeviceStatusCard>
      </div>
      <div class="status-legend">
        <div class="status-open"></div>
        <div class="text">开机</div>
        <div class="status-close"></div>
        <div class="text">关机</div>
      </div>
      <div class="channel-info">
        <div
          v-for="(item, index) in state.channelInfo"
          :key="index"
          class="channel-item"
        >
          <div :class="['icon', `channel-icon${index}`]"></div>
          <div class="channel-text">{{ item.text }}</div>
        </div>
      </div>
      <AlarmCountNew class="ac"></AlarmCountNew>
      <WaterSystemEfficiency class="wse"></WaterSystemEfficiency>
      <div v-if="false" class="alarm-box-3d">
        <div
          v-for="(item, index) in state.alarm3DPositions"
          :key="index"
          :class="['alarm-item-3d', `alarm-item-3d-${index}`]"
          :style="{
            top: `${
              state.currentView === 1
                ? state.alarm3DPositions[index][0]
                : state.alarm2DPositions[index][0]
            }`,
            left: `${
              state.currentView === 1
                ? state.alarm3DPositions[index][1]
                : state.alarm2DPositions[index][1]
            }`,
          }"
        >
        </div>
      </div>
    </div>
    <div class="blur-box"></div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, computed } from 'vue';
  import {
    getTotalDeviceDetail,
    DeviceAlarmReq,
    DeviceAlarmRes,
  } from '@/api/small-maintenance/health';
  import open1 from '@/assets/imgs/smart/health/room1_tower1_open.mp4';
  import open1_2d from '@/assets/imgs/smart/health/room1_tower1_open_2d.mp4';
  import open2 from '@/assets/imgs/smart/health/room1_tower2_open.mp4';
  import open2_2d from '@/assets/imgs/smart/health/room1_tower2_open_2d.mp4';
  import allOpen from '@/assets/imgs/smart/health/room1_all_open.mp4';
  import allOpen_2d from '@/assets/imgs/smart/health/room1_all_open_2d.mp4';
  import allClose from '@/assets/imgs/smart/health/room1_all_close.mp4';
  import allClose_2d from '@/assets/imgs/smart/health/room1_all_close_2d.mp4';
  import { useRoute } from 'vue-router';
  import DeviceStatusCard from './components/DeviceStatusCard.vue';
  import AlarmCountNew from './components/AlarmCountNew.vue';
  import WaterSystemEfficiency from './components/WaterSystemEfficiency.vue';

  const state = reactive({
    videos: [open1, open2, allOpen, allClose],
    videos_2d: [open1_2d, open2_2d, allOpen_2d, allClose_2d],
    deviceAlarmInfo: [] as DeviceAlarmRes[],
    // 1是3D 2是2D
    currentView: 1,
    // 3D模式下card的位置信息
    card3DPositions: [
      ['19%', '15%'],
      ['29%', '13%'],
      ['37%', '28%'],
      ['58%', '23%'],
      ['25%', '47%'],
      ['47%', '44%'],
      ['38%', '61%'],
      ['55%', '59%'],
    ],
    // 2D模式下card的位置信息
    card2DPositions: [
      ['29%', '15%'],
      ['44%', '15%'],
      ['40%', '28%'],
      ['67%', '28%'],
      ['23%', '43%'],
      ['51%', '43%'],
      ['26%', '60%'],
      ['47%', '60%'],
    ],
    channelInfo: [
      {
        text: '冷水供水',
      },
      {
        text: '冷水回水',
      },
      {
        text: '冷却水供水',
      },
      {
        text: '冷却水回水',
      },
    ],
    alarm3DPositions: [['26.5%', '19.5%']],
    alarm2DPositions: [[]],
  });

  const route = useRoute();

  // #region 样式
  const get3DClass = computed(() =>
    state.currentView === 1 ? 'three-active' : 'three-normal'
  );
  const get2DClass = computed(() =>
    state.currentView === 2 ? 'two-active' : 'two-normal'
  );

  // #endregion

  // #region 逻辑
  const switchTo3D = () => {
    state.currentView = 1;
  };
  const switchTo2D = () => {
    state.currentView = 2;
  };
  const computeCurrentVideo = () => {
    const runningStatus0 = state.deviceAlarmInfo[0]
      ? state.deviceAlarmInfo[0].runningStatus
      : false;
    const runningStatus1 = state.deviceAlarmInfo[1]
      ? state.deviceAlarmInfo[1].runningStatus
      : false;

    if (runningStatus0 && runningStatus1) {
      return state.currentView === 1 ? state.videos[2] : state.videos_2d[2];
    }
    if (runningStatus0) {
      return state.currentView === 1 ? state.videos[0] : state.videos_2d[0];
    }
    if (runningStatus1) {
      return state.currentView === 1 ? state.videos[1] : state.videos_2d[1];
    }
    return state.currentView === 1 ? state.videos[3] : state.videos_2d[3];
  };
  const currentVideo = computed(() => computeCurrentVideo());
  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: ['RUNNING_STATUS'],
      timeType: 0,
    }
  ) => {
    try {
      const { data } = await getTotalDeviceDetail(params);
      state.deviceAlarmInfo = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  fetchData();
  // #endregion
</script>

<script lang="ts">
  export default {
    name: 'ChillerRoom',
  };
</script>

<style scoped lang="less">
  .main-box {
    position: relative;
    width: 100%;
    height: 100%;

    .blur-box {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 520px;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgb(19 24 35 / 0%),
        #182434 68%,
        #162233 85.5%,
        #181d28 100%
      );
      backdrop-filter: blur(2px);
    }

    // .blur-box-3d {
    //   background: linear-gradient(
    //     90deg,
    //     rgb(19 24 35 / 0%),
    //     #182434 68%,
    //     #162233 85.5%,
    //     #181d28 100%
    //   );
    // }

    // .blur-box-2d {
    //   background: linear-gradient(
    //     90deg,
    //     rgb(19 24 35 / 0%),
    //     #182434 68%,
    //     #162233 85.5%,
    //     #181d28 100%
    //   );
    // }
    .chiller-room {
      position: relative;
      width: 100%;
      height: 100%;

      .switch-2d-3d {
        position: absolute;
        top: 30px;
        right: 32%;
        z-index: 3;
        display: flex;
        width: 106px;
        height: 40px;
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.32px;
        cursor: pointer;

        .three-active {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 10px 16px;
          background: rgb(19 24 35 / 60%);
          border: 2px solid #455ddc;
          border-radius: 4px 0 0 4px;
        }

        .two-active {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 10px 16px;
          background: rgb(19 24 35 / 60%);
          border: 2px solid #455ddc;
          border-radius: 0 4px 4px 0;
        }

        .two-normal {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 53px;
          height: 40px;
          padding: 10px 16px;
          background: linear-gradient(
            270deg,
            rgb(53 81 145 / 30%) 0%,
            rgb(157 180 220 / 0%) 100%
          );
          border-radius: 0 4px 4px 0;

          &:hover {
            background: linear-gradient(
              270deg,
              rgb(53 81 145 / 30%) 0%,
              rgb(157 180 220 / 0%) 100%
            );
            border: 1px solid #455ddc;
            border-radius: 0 4px 4px 0;
          }
        }

        .three-normal {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 53px;
          height: 40px;
          padding: 10px 16px;
          background: linear-gradient(
            270deg,
            rgb(157 180 220 / 0%) 0%,
            rgb(53 81 145 / 30%) 100%
          );
          border-radius: 4px 0 0 4px;

          &:hover {
            background: linear-gradient(
              270deg,
              rgb(157 180 220 / 0%) 0%,
              rgb(53 81 145 / 30%) 100%
            );
            border: 1px solid #455ddc;
            border-radius: 4px 0 0 4px;
          }
        }
      }

      .bread {
        position: absolute;
        z-index: 2;
        margin-left: 24px;
      }

      .video-background {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        width: 100%;
        height: 100%;
        min-height: 800px;
        object-fit: cover;
        transform: translate(-60%, -50%);
      }

      .card-box {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        width: 100%;
        height: 100%;
        transform: translate(-60%, -50%);
        pointer-events: none;

        .card-item {
          position: absolute;
        }
      }

      .status-legend {
        position: absolute;
        bottom: 30px;
        left: 30%;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        background: rgb(77 119 211 / 20%);
        border-radius: 4px;

        .status-open {
          width: 20px;
          height: 20px;
          .set-back('@/assets/imgs/smart/health/device_status_open.svg');
        }

        .status-close {
          width: 20px;
          height: 20px;
          margin-left: 17px;
          .set-back('@/assets/imgs/smart/health/device_status_close.svg');
        }

        .text {
          margin-left: 7px;
          color: rgb(255 255 255 / 90%);
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.32px;
        }
      }

      .channel-info {
        position: absolute;
        right: 32%;
        bottom: 30px;
        z-index: 2;
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 128px;
        height: 156px;
        padding: 8px;
        background: rgb(53 81 145 / 30%);
        border-radius: 4px;

        .channel-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;

          .icon {
            width: 8px;
            height: 8px;
          }

          .channel-icon0 {
            .set-back('@/assets/imgs/smart/health/channel_icon1.svg');
          }

          .channel-icon1 {
            .set-back('@/assets/imgs/smart/health/channel_icon2.svg');
          }

          .channel-icon2 {
            .set-back('@/assets/imgs/smart/health/channel_icon3.svg');
          }

          .channel-icon3 {
            .set-back('@/assets/imgs/smart/health/channel_icon4.svg');
          }

          .channel-text {
            margin-left: 6px;
            color: rgb(255 255 255 / 90%);
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.32px;
          }
        }
      }

      .ac {
        position: absolute;
        top: 30px;
        right: 24px;
        z-index: 2;
      }

      .wse {
        position: absolute;
        top: 410px;
        right: 24px;
        z-index: 2;
      }

      .alarm-box-3d {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 100%;
        height: 100%;
        transform: translate(-60%, -50%);
        pointer-events: none;

        .alarm-item-3d {
          position: absolute;
        }

        .alarm-item-3d-0 {
          width: 165.5px;
          height: 187.61px;

          .set-back('@/assets/imgs/smart/health/device_3d_alarm1.png');
        }
      }
    }
  }
</style>
