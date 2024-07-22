<template>
  <div class="chilled-water-pump">
    <Breadcrumb class="bread" :items="['智慧运维', '健康诊断', '冷却塔#2']" />
    <div class="content-box">
      <ModuleBox :config="state.title" class="m-box">
        <div class="model-box">
          <div class="model-status">
            <div
              v-if="state.partPointDetail.runningStatus"
              class="model-status-open"
            ></div>
            <div v-else class="model-status-close"></div>
            <div class="status-text">{{
              state.partPointDetail.runningStatus ? '开机' : '关机'
            }}</div>
          </div>
          <div
            :class="
              state.partPointDetail.runningStatus ? 'model-on' : 'model-off'
            "
          ></div>
        </div>
      </ModuleBox>
      <div class="alarm-info">
        <div
          v-for="(item, index) in state.alarmInfo"
          :key="index"
          class="alarm-item"
        >
          <img
            v-if="item.icon === 0"
            src="../../../../assets/imgs/smart/health/alarm-count-icon.png"
          />
          <img
            v-if="item.icon === 1"
            src="../../../../assets/imgs/smart/health/alarm-icon.png"
          />
          <div class="info">
            <div
              :class="[
                item.red && Number(item.value) > 0 ? 'value-red' : 'value',
              ]"
              :text="item.value"
            >
              {{ item.value }}<span>{{ item.unit }}</span>
            </div>
            <div class="label" :text="item.label">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="alarm-list">
        <div
          v-for="(item, index) in state.partPointDetail.pointList"
          :key="index"
          :class="['list-item', getItemClass(index, item)]"
        >
          <div class="point-display-name">{{ item.pointDisplayName }}</div>
          <div class="point-value">
            {{ item.pointValue }}<span>{{ item.unit }}</span>
          </div>
          <div :class="['alarm-level', getLevelClass(item)]">{{
            item.alarmLevel
              ? item.alarmLevel
              : item.pointDisplayName.includes('时间')
              ? ''
              : '正常'
          }}</div>
          <div
            v-if="item.alarmLevel && item.alarmLevel !== '正常'"
            class="view"
            @click="check"
            >查看</div
          >
        </div>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-list">
        <FrequencyPowerTimeChart class="chart-item"></FrequencyPowerTimeChart>
        <FrequencyPowerCurveChart class="chart-item"></FrequencyPowerCurveChart>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    getPartPointDetail,
    DeviceAlarmReq,
    PartPointDetail,
    Point,
  } from '@/api/small-maintenance/health';
  import { useRoute, useRouter } from 'vue-router';
  import ModuleBox from '../../components/ModuleBox.vue';
  import FrequencyPowerTimeChart from './components/FrequencyPowerTimeChart.vue';
  import FrequencyPowerCurveChart from './components/FrequencyPowerCurveChart.vue';

  const route = useRoute();
  const router = useRouter();
  const { deviceId } = route.meta;

  interface AlarmInfo {
    label: string;
    unit: string;
    value: number | string;
    icon: number;
    red: boolean;
  }

  const state = reactive({
    title: {
      Width: 'calc(33% - 24px)',
      titleHeight: '41px',
      text: '冷却塔#2',
      textEn: 'Cooling water pump#2',
      bgClass: 'blur-contain',
      Height: '100%',
    },
    partPointDetail: {} as PartPointDetail,
    alarmInfo: [] as AlarmInfo[],
  });

  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(deviceId),
      pointTypes: [],
      timeType: 0,
    }
  ) => {
    try {
      const { data } = await getPartPointDetail(params);
      state.partPointDetail = data;
      state.alarmInfo = [
        {
          label: '报警中',
          unit: '个',
          value: data.alarmingCount,
          icon: 0,
          red: true,
        },
        {
          label: '今日报警数',
          unit: '个',
          value: data.todayAlarmCount,
          icon: 0,
          red: false,
        },
        {
          label: '今日处理率',
          unit: '%',
          value: data.todayRate,
          icon: 1,
          red: false,
        },
      ];
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  fetchData();
  const getItemClass = (index: number, item: Point) => {
    if (item.pointDisplayName.includes('时间')) {
      return 'time-item';
    }
    if (item.alarmLevel) {
      return 'alarm-item';
    }
    return 'normal-item';
  };
  const getLevelClass = (item: Point) => {
    if (item.alarmLevel === '提示') return 'bg tishi';
    if (item.alarmLevel === '一般') return 'bg yiban';
    if (item.alarmLevel === '严重') return 'bg yanzhong';
    if (item.alarmLevel === '致命') return 'bg zhiming';
    return '';
  };

  const check = () => {
    router.push({
      name: 'Realtime',
    });
  };
</script>

<style lang="less" scoped>
  .chilled-water-pump {
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0 24px;
    overflow: auto;

    .set-back('@/assets/imgs/smart/health/chilled-water-pump-bg.png');

    .content-box {
      display: flex;
      // justify-content: space-between;
      width: 100%;
      height: 360px;
      margin-bottom: 24px;

      .m-box {
        height: 100%;
        margin-right: 24px;

        .model-box {
          position: relative;
          height: 100%;

          .model-status {
            position: absolute;
            top: 16px;
            left: 16px;
            display: inline-flex;
            gap: 6px;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 36px;
            padding: 8px;
            background: rgb(77 119 211 / 20%);
            border-radius: 4px;

            .model-status-open {
              width: 20px;
              height: 20px;
              .set-back('@/assets/imgs/smart/health/device_status_open.svg');
            }

            .model-status-close {
              width: 20px;
              height: 20px;
              .set-back('@/assets/imgs/smart/health/device_status_close.svg');
            }

            .status-text {
              color: rgb(255 255 255 / 90%);
              font-weight: 400;
              font-size: 16px;
              font-family: HarmonyOS-Regular, sans-serif;
              font-style: normal;
              line-height: normal;
              letter-spacing: 0.32px;
            }
          }

          .model-off {
            position: absolute;
            left: 50%;
            width: 380px;
            height: 350px;
            transform: translateX(-50%);

            .set-back('@/assets/imgs/smart/health/coolingTower.png');
          }

          .model-on {
            position: absolute;
            left: 50%;
            width: 380px;
            height: 350px;
            transform: translateX(-50%);

            .set-back('@/assets/imgs/smart/health/coolingtower-video.png');
          }
        }
      }

      .alarm-list {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: space-between;
        width: calc(50% - 12px);
        height: 100%;
        padding-right: 4px;
        overflow-y: scroll;
        background: rgb(255 255 255 / 2%);
        border-radius: 4px;

        .list-item {
          display: flex;
          align-items: center;
          width: 49.5%;
          height: 22.22%;
          margin-bottom: 10px;
          border-radius: 4px;

          .point-display-name {
            width: 36.1%;
            padding-left: 4.12%;
            color: rgb(255 255 255 / 80%);
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 32px;
            letter-spacing: 0.15px;
          }

          .point-value {
            width: 21.3%;
            padding-left: 15%;
            color: #fff;
            font-weight: 400;
            font-size: 20px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 32px;
            letter-spacing: 0.15px;

            span {
              color: rgb(255 255 255 / 80%);
              font-weight: 400;
              font-size: 12px;
              font-family: HarmonyOS-Regular, sans-serif;
              font-style: normal;
              line-height: 32px;
              letter-spacing: 0.15px;
            }
          }

          .alarm-level {
            width: fit-content;
            margin-left: 15%;
            color: rgb(255 255 255 / 80%);
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: normal;
            letter-spacing: 0.32px;
          }

          .bg {
            display: inline-flex;
            gap: 10px;
            align-items: center;
            justify-content: center;
            width: fit-content;
            min-width: 45px;
            padding: 2px 6px;
            border-radius: 2px;
          }

          .tishi {
            background: #18a02e;
          }

          .yiban {
            background: #1890ff;
          }

          .yanzhong {
            background: #fa8214;
          }

          .zhiming {
            background: #ff4d4f;
          }

          .view {
            display: flex;
            flex-shrink: 0;
            gap: 10px;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: 24px;
            margin-left: 5px;
            padding: 10px;
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

            &:hover {
              background: rgb(255 255 255 / 20%);
            }
          }
        }

        .time-item {
          background: rgb(255 255 255 / 5%);
        }

        .normal-item {
          background: linear-gradient(
            270deg,
            rgb(157 180 220 / 6%) 0%,
            rgb(85 137 255 / 30%) 100%
          );
        }

        .alarm-item {
          background: linear-gradient(
            270deg,
            rgb(220 157 157 / 6%) 0%,
            rgb(255 85 85 / 30%) 100%
          );
        }
      }

      .alarm-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 16%;
        margin-right: 24px;
        padding: 2.5% 1.5%;
        background: linear-gradient(
          270deg,
          rgb(157 180 220 / 6%) 0%,
          rgb(85 137 255 / 30%) 100%
        );
        border-radius: 4px;

        .alarm-item {
          display: flex;
          align-items: center;
          width: 85%;
          margin: 0 auto;

          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 24px;

            .value {
              font-weight: 400;
              font-size: 28px;
              font-family: YouSheBiaoTiHei, sans-serif;
              font-style: normal;
              line-height: 20px;
              background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;

              span {
                font-size: 14px;
              }

              &::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
                content: attr(text);
              }
            }

            .value-red {
              color: #ff4d4f;
              font-weight: 400;
              font-size: 28px;
              font-family: YouSheBiaoTiHei, sans-serif;
              font-style: normal;
              line-height: 20px;

              span {
                font-size: 14px;
              }

              &::before {
                position: absolute;
                z-index: -1;
                text-shadow: 0 0 2px rgb(124 120 86 / 80%), 0 0 5px #962222;
                content: attr(text);
              }
            }

            .label {
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
          }
        }
      }
    }

    .chart-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      // height: calc(100vh - 420px);
      // margin: 24px 0;
      // padding-right: 4px;
      // overflow-y: scroll;
      .chart-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;

        .chart-item {
          width: calc(50% - 12px);
        }
      }
    }
  }
</style>
