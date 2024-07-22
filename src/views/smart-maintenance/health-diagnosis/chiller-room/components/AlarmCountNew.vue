<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-03-11 09:31:38
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-26 09:13:50
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\chiller-room\components\AlarmCountNew.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="alarm-count">
    <div class="alarm-amount">
      <div class="alarm-run">
        <div class="icon"></div>
        <div class="info">
          <div
            :class="[
              'value',
              state.pointDetail.alarmingCount > 0
                ? 'value-red'
                : 'value-normal',
            ]"
            :text="state.pointDetail.alarmingCount"
          >
            {{ state.pointDetail.alarmingCount }}<span>个</span>
          </div>
          <div class="text" :text="'报警中'">报警中</div>
        </div>
      </div>
      <div class="alarm-current">
        <div class="icon"></div>
        <div class="info">
          <div
            class="value value-normal"
            :text="state.pointDetail.todayAlarmCount"
          >
            {{ state.pointDetail.todayAlarmCount }}<span>个</span>
          </div>
          <div class="text" :text="'今日报警数'">今日报警数</div>
        </div>
      </div>
    </div>
    <div class="op-box">
      <div
        v-for="(item, index) in state.pointDetail.pointList"
        :key="index"
        :class="[
          'op-item',
          item.alarmLevel ? 'op-item-alarm' : 'op-item-normal',
          index < 3 ? 'op-item-short' : 'op-item-long',
        ]"
      >
        <div class="name-level">
          <div class="item-name"
            >{{ item.pointDisplayName
            }}<span>{{ item.unit && `(${item.unit})` }}</span></div
          >
          <div
            v-if="item.alarmLevel"
            class="item-level"
            :style="{ background: getLevelColor(item.alarmLevel) }"
            >{{ item.alarmLevel }}</div
          >
        </div>

        <div class="item-value" :text="item.pointValue">{{
          item.pointValue ? item.pointValue : '-'
        }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    PointDetail,
    DeviceAlarmReq,
    getTotalPointDetail,
  } from '@/api/small-maintenance/health';
  import { useRoute } from 'vue-router';

  const state = reactive({
    pointDetail: {} as PointDetail,
  });

  const route = useRoute();
  // #region 逻辑
  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: [
        'INSTANT_SCOP',
        'AVG_SCOP',
        'HEAT_BALANCE',
        'TOTAL_TRANSPORT',
        'TOTAL_TRANSPORT',
        'TOTAL_ENERGY',
        'TOTAL_COOL',
      ],
      timeType: 0,
    }
  ) => {
    try {
      const { data } = await getTotalPointDetail(params);
      state.pointDetail = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  fetchData();

  const getLevelColor = (level: string): string => {
    const colorMap: Record<string, string> = {
      提示: '#18A02E',
      一般: '#1890FF',
      严重: '#FA8214',
      致命: '#FF4D4F',
    };

    return colorMap[level] || '#18A02E';
  };

  // #endregion
</script>

<style scoped lang="less">
  .alarm-count {
    width: 28.5%;
    height: 290px;

    .alarm-amount {
      display: inline-flex;
      gap: 16%;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 23px 56px 23px 36px;
      background: linear-gradient(
        270deg,
        rgb(157 180 220 / 6%) 0%,
        rgb(85 137 255 / 30%) 100%
      );
      border-radius: 4px;

      .icon {
        width: 54px;
        height: 54px;

        .set-back('@/assets/imgs/smart/health/alarm-count-icon.png');
      }

      .info {
        margin-left: 24px;
      }

      .value {
        font-weight: 400;
        font-size: 28px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: 20px;

        span {
          font-size: 14px;
        }
      }

      .value-normal {
        background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        &::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(text);
        }
      }

      .value-red {
        color: #ff4d4f;
      }

      .text {
        margin-top: 7px;
        font-weight: 400;
        font-size: 20px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: 20px;
        background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        &::before {
          position: absolute;
          z-index: -1;
          text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          content: attr(text);
        }
      }

      .alarm-run {
        display: flex;
      }

      .alarm-current {
        display: flex;
      }
    }

    .op-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 248px;
      margin-top: 6px;

      .op-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        // width: 48%;
        margin-top: 10px;
        // padding: 0 8px;
        border-radius: 4px;

        .name-level {
          display: flex;
          align-items: center;

          .item-name {
            width: max-content;
            color: rgb(255 255 255 / 80%);
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 32px;
            letter-spacing: 0.15px;

            span {
              font-size: 12px;
            }
          }

          .item-level {
            display: inline-flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 28px;
            margin-left: 4px;
            padding: 2px 6px;
            color: #f7f7f9;
            border-radius: 2px;
          }
        }

        .item-value {
          font-weight: 400;
          font-size: 24px;
          font-family: YouSheBiaoTiHei, sans-serif;
          font-style: normal;
          line-height: 20px;
          background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(text);
          }
        }
      }

      .op-item-normal {
        background: linear-gradient(
          270deg,
          rgb(157 180 220 / 6%) 0%,
          rgb(85 137 255 / 30%) 100%
        );
      }

      .op-item-alarm {
        background: linear-gradient(
          270deg,
          rgb(220 157 157 / 6%) 0%,
          rgb(255 85 85 / 30%) 100%
        );
      }

      .op-item-short {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        align-self: stretch;
        justify-content: center;
        width: 30.79%;
        height: 80px;
        padding: 8px 16px;
      }

      .op-item-long {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
        align-self: stretch;
        justify-content: center;
        width: 48.73%;
        height: 74px;
        padding: 8px 16px;
      }
    }
  }
</style>
