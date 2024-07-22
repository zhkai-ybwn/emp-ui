<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-10 13:43:36
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:34:10
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\chiller-room\components\DeviceStatusCard.vue
 * @Description: 设备信息面板
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    :class="[
      cardInfo.pointDetailVoList && cardInfo.pointDetailVoList.length > 0
        ? 'alarm'
        : 'normal',
      'device-status-card',
    ]"
  >
    <div class="status-title">
      <div style="display: flex; align-items: center">
        <div
          :class="[
            'status',
            cardInfo.runningStatus ? 'status-open' : 'status-close',
          ]"
        ></div>
        <div class="title">{{ cardInfo.deviceName }}</div>
      </div>

      <div
        v-if="
          cardInfo.pointDetailVoList && cardInfo.pointDetailVoList.length > 0
        "
        class="view"
        @click="goDevice"
        >查看</div
      >
    </div>
    <div class="info">
      <div v-if="cardInfo.instantPower" class="power">
        <div class="title">功率</div>
        <div class="value"
          >{{ cardInfo.instantPower && Number(cardInfo.instantPower).toFixed(1)
          }}<span class="unit">kw</span></div
        >
      </div>
      <div v-if="cardInfo.frequency" class="frequency">
        <div class="title">频率</div>
        <div class="value"
          >{{ cardInfo.frequency && Number(cardInfo.frequency).toFixed(1)
          }}<span class="unit">Hz</span></div
        >
      </div>
      <div v-if="cardInfo.instantCop" class="ins-cop">
        <div class="title">瞬时COP</div>
        <div class="value"
          >{{ cardInfo.instantCop && Number(cardInfo.instantCop).toFixed(1)
          }}<span class="unit" style="opacity: 0">kw</span>
        </div>
      </div>
      <div v-if="cardInfo.avgCop" class="ave-co">
        <div class="title">平均COP</div>
        <div class="value"
          >{{ cardInfo.avgCop && Number(cardInfo.avgCop).toFixed(1)
          }}<span class="unit" style="opacity: 0">kw</span>
        </div>
      </div>
    </div>
    <div
      v-if="cardInfo.pointDetailVoList && cardInfo.pointDetailVoList.length > 0"
      class="alarm-info"
    >
      <div
        v-for="(item, index) in cardInfo.pointDetailVoList"
        :key="index"
        class="alarm-item"
      >
        <div class="alarm-title">{{ item.alarmTitle }}</div>
        <div
          class="alarm-level"
          :style="{
            background: `${state.alarmLevelConfig[item.alarmLevel.code].color}`,
          }"
          >{{ state.alarmLevelConfig[item.alarmLevel.code].text }}</div
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { reactive } from 'vue';

  const props = defineProps({
    cardInfo: {
      type: Object,
      default: () => ({
        avgCop: true,
        deviceId: 0,
        deviceName: '',
        frequency: '',
        instantCop: true,
        instantPower: '',
        pointDetailVoList: [
          {
            alarmLevel: {
              code: 0,
              mes: '',
              value: 0,
            },
            alarmTitle: '',
          },
        ],
        runningStatus: false,
      }),
    },
  });

  const state = reactive({
    alarmLevelConfig: [
      {},
      { color: '#18A02E', text: '提示' },
      { color: '#1890FF', text: '一般' },
      { color: '#FA8214', text: '严重' },
      { color: '#FF4D4F', text: '致命' },
    ],
  });

  const router = useRouter();

  const newRoute =
    // @ts-ignore
    JSON.parse(window.localStorage.getItem('newRoute'));

  const goDevice = () => {
    try {
      const { name } = newRoute.children.find(
        (subChild: any) => subChild.meta.deviceId === props.cardInfo.deviceId
      ) || { path: null, name: null };
      router.push({ name });
    } catch (e) {
      router.push('report-center/manage');
    }
  };

  // #region 样式
  // #endregion

  // #region 逻辑
  // #endregion
</script>

<style scoped lang="less">
  .device-status-card {
    padding: 6px 8px;

    .status-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .status {
        width: 20px;
        height: 20px;
      }

      .status-open {
        .set-back('@/assets/imgs/smart/health/device_status_open.svg');
      }

      .status-close {
        .set-back('@/assets/imgs/smart/health/device_status_close.svg');
      }

      .title {
        margin-left: 4px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 32px;
        letter-spacing: 0.15px;
      }

      .view {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 41px;
        height: 24px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 12px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 32px;
        letter-spacing: 0.15px;
        background: rgb(255 255 255 / 10%);
        border-radius: 2px;
        cursor: pointer;
        pointer-events: all;

        &:hover {
          background: rgb(255 255 255 / 26%);
          border-radius: 2px;
        }
      }
    }

    .info {
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1px 0;
      }

      color: rgb(255 255 255 / 90%);
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;

      .title {
        font-weight: 400;
      }

      .value {
        font-weight: 500;

        .unit {
          font-size: 12px;
        }
      }
    }

    .alarm-info {
      .alarm-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 5px;

        .alarm-title {
          color: rgb(255 255 255 / 90%);
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.28px;
        }

        .alarm-level {
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: fit-content;
          margin-left: 14px;
          padding: 2px 4px;
          color: #f7f7f9;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          border-radius: 2px;
        }
      }
    }
  }

  .normal {
    background: rgb(19 24 35 / 60%);
    border-radius: 4px;
    // backdrop-filter: blur(5px);
  }

  .alarm {
    background: linear-gradient(
        270deg,
        rgb(220 157 157 / 10%) 0%,
        rgb(255 85 85 / 50%) 100%
      ),
      rgb(0 0 0 / 30%);
    border-radius: 4px;
    // backdrop-filter: blur(15px);
  }
</style>
