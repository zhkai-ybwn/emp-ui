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
      <Breadcrumb class="bread" :items="['综合监控', '冷水机房']" />
      <div class="title">
        <div class="arrow-sign"></div>
        <div class="text" text="地铁高效机房监控">地铁高效机房监控 </div>
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
          v-for="(item, index) in state.chillerRoomDeviceDetail"
          :key="index"
          :card-info="item"
          class="card-item"
          :style="{
            bottom: `${
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
        <div
          v-for="(item, index) in state.details3D"
          :key="index"
          class="detail"
          :style="{
            top: `${
              state.currentView === 1
                ? state.details3D[index][0]
                : state.details2D[index][0]
            }`,
            left: `${
              state.currentView === 1
                ? state.details3D[index][1]
                : state.details2D[index][1]
            }`,
          }"
        >
          {{
            state.waterPipePointDetail[index]
              ? state.waterPipePointDetail[index].split(' ')[0]
              : '- -'
          }}
          <span class="unit">
            {{
              state.waterPipePointDetail[index]
                ? state.waterPipePointDetail[index].split(' ')[1]
                : ''
            }}</span
          >
        </div>
      </div>
      <div class="legend">
        <div class="status-legend">
          <div class="status-open"></div>
          <div class="text">开机</div>
          <div class="status-close"></div>
          <div class="text">关机</div>
        </div>
        <div class="switch-2d-3d">
          <div :class="get3DClass" @click="switchTo3D">3D</div>
          <div :class="get2DClass" @click="switchTo2D">2D</div>
        </div>
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
      <div class="right">
        <div class="label">
          <div
            :class="[state.activeLabel === 1 ? 'active' : 'inactive']"
            @click="state.activeLabel = 1"
          >
            <div class="label-item" data-value="运行"> 运行</div>
          </div>
          <div
            :class="[state.activeLabel === 2 ? 'active' : 'inactive']"
            @click="state.activeLabel = 2"
          >
            <div class="label-item" data-value="能效"> 能效</div>
          </div>
        </div>
        <div v-if="state.activeLabel === 1" class="operation right-box">
          <HuanJingCanShu></HuanJingCanShu>
          <NengXiaoZongLan></NengXiaoZongLan>
          <XiTongShuJu></XiTongShuJu>
        </div>
        <div v-if="state.activeLabel === 2" class="efficiency right-box">
          <JieNengShuJu></JieNengShuJu>
          <DianNengZhanBi></DianNengZhanBi>
          <NengXiaoQuShi></NengXiaoQuShi>
        </div>
      </div>
    </div>
    <div class="blur-box"></div>
  </div>
</template>

<script lang="ts" setup>
  import {
    DeviceAlarmRes,
    PointDetailVoList,
  } from '@/api/small-maintenance/health';
  import {
    getWaterPipePointDetail,
    getChillerRoomDeviceDetail,
  } from '@/api/small-maintenance/newHealth';
  import open1 from '@/assets/imgs/smart/health/room1_tower1_open.mp4';
  import open1_2d from '@/assets/imgs/smart/health/room1_tower1_open_2d.mp4';
  import open2 from '@/assets/imgs/smart/health/room1_tower2_open.mp4';
  import open2_2d from '@/assets/imgs/smart/health/room1_tower2_open_2d.mp4';
  import allOpen from '@/assets/imgs/smart/health/room1_all_open.mp4';
  import allOpen_2d from '@/assets/imgs/smart/health/room1_all_open_2d.mp4';
  import allClose from '@/assets/imgs/smart/health/room1_all_close.mp4';
  import allClose_2d from '@/assets/imgs/smart/health/room1_all_close_2d.mp4';
  import DeviceStatusCard from './components/NewDeviceStatusCard .vue';
  import DianNengZhanBi from './components/DianNengZhanBi.vue';
  import JieNengShuJu from './components/JieNengShuJu.vue';
  import NengXiaoQuShi from './components/NengXiaoQuShi.vue';
  import HuanJingCanShu from './components/HuanJingCanShu.vue';
  import NengXiaoZongLan from './components/NengXiaoZongLan.vue';
  import XiTongShuJu from './components/XiTongShuJu.vue';

  interface Pipe {
    fw01: string;
    fw02: string;
    fw06: string;
    fw07: string;
    pw01: string;
    pw02: string;
    tw01: string;
    tw02: string;
    tw03: string;
    tw04: string;
    tw11: string;
    tw12: string;
    tw13: string;
    tw14: string;
    tw15: string;
    tw16: string;
    tw17: string;
    tw18: string;
    tw19: string;
    tw20: string;
  }

  interface WaterRoom {
    deviceId: number;
    deviceName: string;
    pointDetailVoList: PointDetailVoList[];
    runningStatus: boolean;
  }

  const state = reactive({
    videos: [open1, open2, allOpen, allClose],
    videos_2d: [open1_2d, open2_2d, allOpen_2d, allClose_2d],
    deviceAlarmInfo: [] as DeviceAlarmRes[],
    // 1是3D 2是2D
    currentView: 1,
    // 3D模式下card的位置信息
    card3DPositions: [
      ['74%', '20%'],
      ['60%', '13%'],
      ['56%', '28%'],
      ['34%', '23%'],
      ['69%', '50%'],
      ['47%', '47%'],
      ['55%', '66%'],
      ['38%', '64%'],
    ],
    // 2D模式下card的位置信息
    card2DPositions: [
      ['65%', '16.5%'],
      ['29%', '16.5%'],
      ['54%', '28%'],
      ['28%', '28%'],
      ['71%', '43.5%'],
      ['44%', '43.5%'],
      ['58%', '66.5%'],
      ['39%', '66.5%'],
    ],
    details3D: {
      tw19: ['30%', '24.5%'],
      tw20: ['40.5%', '22%'],
      tw17: ['15%', '34%'],
      tw18: ['25%', '32%'],
      fw06: ['29%', '41%'],
      fw07: ['49%', '36%'],
      tw11: ['32%', '45%'],
      tw12: ['43%', '43%'],
      tw13: ['53%', '41%'],
      tw14: ['64%', '40.5%'],
      tw01: ['34%', '58%'],
      tw02: ['44%', '58.5%'],
      tw03: ['56%', '55%'],
      tw04: ['66%', '55%'],
      fw01: ['37%', '62%'],
      fw02: ['59%', '59%'],
      pw01: ['73.5%', '63%'],
      tw15: ['76.5%', '63%'],
      pw02: ['47%', '70.5%'],
      tw16: ['50%', '70.5%'],
    },
    details2D: {
      tw19: ['38%', '23%'],
      tw20: ['51%', '23%'],
      tw17: ['20%', '28.5%'],
      tw18: ['25.5%', '28.5%'],
      fw06: ['28%', '35%'],
      fw07: ['55%', '35%'],
      tw11: ['28%', '39%'],
      tw12: ['35%', '35%'],
      tw13: ['55%', '39%'],
      tw14: ['62%', '35%'],
      tw01: ['28%', '55%'],
      tw02: ['36%', '55%'],
      tw03: ['55%', '55%'],
      tw04: ['63%', '55%'],
      fw01: ['28%', '59%'],
      fw02: ['55%', '60%'],
      pw01: ['43%', '60%'],
      tw15: ['46%', '60%'],
      pw02: ['43%', '67%'],
      tw16: ['46%', '67%'],
    },
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
    activeLabel: 1,
    waterPipePointDetail: {} as Pipe,
    chillerRoomDeviceDetail: {} as WaterRoom[],
  });

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
    const runningStatus0 = state.chillerRoomDeviceDetail[0]
      ? state.chillerRoomDeviceDetail[0].runningStatus
      : false;
    const runningStatus1 = state.chillerRoomDeviceDetail[1]
      ? state.chillerRoomDeviceDetail[1].runningStatus
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

  const fectchData1 = () => {
    getChillerRoomDeviceDetail()
      .then((res) => {
        state.chillerRoomDeviceDetail = res.data;
      })
      .catch(() => {
        state.chillerRoomDeviceDetail = {} as WaterRoom[];
      });
  };
  fectchData1();
  const fectchData2 = () => {
    getWaterPipePointDetail()
      .then((res) => {
        state.waterPipePointDetail = res.data;
      })
      .catch(() => {
        state.waterPipePointDetail = {} as Pipe;
      });
  };
  fectchData2();
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

    .detail {
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 2px 2px 2px 2px;
      border: 1px solid rgba(255, 255, 255, 0.26);
      height: 22px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-weight: 400;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.9);
      line-height: 20px;
      padding: 0 3px;

      .unit {
        font-size: 12px;
      }
    }

    .chiller-room {
      position: relative;
      width: 100%;
      height: 100%;

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

      .legend {
        position: absolute;
        bottom: 30px;
        left: 25%;
        z-index: 3;
        display: flex;
      }

      .switch-2d-3d {
        z-index: 3;
        display: flex;
        width: 106px;
        height: 40px;
        // position: absolute;
        // right: 50%;
        // bottom: 30px;
        margin-left: 18px;
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
          background: rgba(255, 255, 255, 0.1);
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
          background: rgba(255, 255, 255, 0.1);
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

      .status-legend {
        // position: absolute;
        // bottom: 30px;
        // left: 30%;
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
        right: calc(40% - 90px);
        bottom: 20px;
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

      .right {
        position: absolute;
        top: 30px;
        right: 24px;
        z-index: 2;
        display: flex;
        align-items: flex-start;
        width: 40%;
        height: calc(100vh - 143px);

        .label {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          font-weight: 400;
          font-size: 18px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
          line-height: 20px;
          text-align: left;
        }

        .label-item {
          background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 48px;
        }

        .label-item::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0px 0px 2px rgba(0, 121, 255, 0.8), 0px 0px 5px #0066ff;
          content: attr(data-value);
        }

        .active {
          font-size: 20px;
          margin-bottom: 5px;
          width: 129px;
          height: 48px;
          padding-left: 30px;
          line-height: 48px;
          cursor: pointer;
          .set-back(
          '@/assets/imgs/smart/health/active.png');
        }

        .inactive {
          font-size: 18px;
          margin-bottom: 5px;
          width: 110px;
          height: 48px;
          padding-left: 30px;
          line-height: 48px;
          cursor: pointer;
          .set-back(
          '@/assets/imgs/smart/health/inactive.png');
        }

        .right-box {
          flex: auto;
          min-width: 300px;
          height: 100%;
        }
      }

      .title {
        display: flex;
        align-items: center;
        position: absolute;
        top: 60px;
        left: 24px;
        width: 200px;
        height: 40px;
        z-index: 999;
        .set-back(
        '@/assets/imgs/load-forecast/title-background.png'
      );

        .arrow-sign {
          width: 24px;
          height: 24px;
          margin-left: 8px;

          .set-back(
          '@/assets/imgs/load-forecast/module-title-sign-left.png'
        );
        }

        .text {
          margin-left: 3px;
          font-weight: 400;
          font-size: 20px;
          font-family: YouSheBiaoTiHei, sans-serif;
          line-height: 23px;
          background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 4px rgb(43 102 255 / 80%);
          content: attr(text);
        }
      }
    }
  }
</style>
