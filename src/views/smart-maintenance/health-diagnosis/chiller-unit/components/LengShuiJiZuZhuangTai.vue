<template>
  <div class="main">
    <div class="header">
      <div
        v-for="item in state.headerList"
        :key="item.code"
        :class="device === item.code ? 'active' : 'header-item'"
        class="header-item"
        @click="change(item.code)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="section">
      <div
        v-for="(item, index) in state.pointList"
        :key="index"
        :class="getLevelClass(item)"
      >
        <div class="text"
          >{{ item.deviceName.includes('冷水机组') ? '' : item.deviceName }}
          {{ item.pointDisplayName }}
        </div>
        <div class="num">
          {{ item.pointValue }}
          <span class="unit">{{ item.unit }}</span>
        </div>

        <div class="button">
          <div class="level">{{
            item.alarmLevel
              ? item.alarmLevel
              : item.pointDisplayName.includes('时间')
              ? ''
              : '正常'
          }}</div>
          <div
            v-if="
              item.alarmLevel === '致命' ||
              item.alarmLevel === '严重' ||
              item.alarmLevel === '一般' ||
              item.alarmLevel === '提示'
            "
            class="search"
            @click="check"
          >
            查看</div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    PointInfo,
    getPartPointDetail,
    DeviceAlarmReq,
    PartPointDetail,
    Point,
  } from '@/api/small-maintenance/health';
  import { useRoute, useRouter } from 'vue-router';

  const state = reactive({
    partPointDetail: {} as PartPointDetail,
    headerList: [
      { title: '整体', code: 'total' },
      { title: '蒸发器', code: 'CWER-CWEG-EVAP' },
      { title: '冷凝器', code: 'CWER-CWEG-COND' },
      { title: '压缩机', code: 'CWER-CWEG-COMPR' },
    ],
    pointList: [] as PointInfo[],
  });

  const route = useRoute();
  const router = useRouter();

  const device = ref('total');
  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: [],
      timeType: 0,
    }
  ) => {
    try {
      const { data } = await getPartPointDetail(params);
      state.partPointDetail = data;
      const uniqueDevices = {} as {
        [key: number]: string;
      };
      state.pointList = data.pointList
        // .sort((a, b) => a.sort - b.sort)
        .sort((a, b) => a.deviceId - b.deviceId);
      data.pointList.forEach((item: PointInfo) => {
        const { deviceId, deviceName } = item;
        uniqueDevices[deviceId] = deviceName;
      });
      // state.headerList = [{ deviceId: 0, deviceName: '整体' }];
      // state.headerList.push(
      //   ...Object.entries(uniqueDevices)
      //     .map(([deviceId, deviceName]) => ({
      //       deviceId: Number(deviceId),
      //       deviceName,
      //     }))
      //     .sort((a, b) => a.deviceId - b.deviceId)
      // );
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  (async () => {
    await fetchData();
  })();

  const change = (code: string) => {
    device.value = code;
    if (device.value !== 'total') {
      state.pointList = state.partPointDetail.pointList.filter((el: any) => {
        return el.deviceTypeCode === code;
      });
      // .sort((a, b) => a.sort - b.sort);
    } else {
      state.pointList = state.partPointDetail.pointList;
    }
  };

  const getLevelClass = (item: Point) => {
    if (item.alarmLevel === '提示') return 'tishi';
    if (item.alarmLevel === '正常') return 'normal';
    if (item.alarmLevel === '一般') return 'yiban';
    if (item.alarmLevel === '严重') return 'serious';
    if (item.alarmLevel === '致命') return 'zhiming';
    if (item.pointDisplayName.includes('时间')) return 'none';
    return 'normal';
  };

  const check = () => {
    router.push({
      name: 'Realtime',
    });
  };
</script>

<style lang="less" scoped>
  .main {
    width: calc(50% - 12px);

    .header {
      display: flex;
      color: rgb(255 255 255 / 90%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.32px;

      .header-item {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 25%;
        height: 40px;
        background: linear-gradient(
          270deg,
          rgb(157 180 220 / 0%) 0%,
          rgb(53 81 145 / 30%) 100%
        );
        cursor: pointer;

        &:first-child {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        &:last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }

        &:hover {
          background: linear-gradient(
            270deg,
            rgb(53 81 145 / 30%) 0%,
            rgb(157 180 220 / 0%) 100%
          );
          border: 1px solid #455ddc;
        }
      }

      .active {
        background: rgb(19 24 35 / 60%) !important;
        border: 2px solid #455ddc;
      }
    }

    .section {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-between;
      height: 320px;
      overflow: auto;

      > div {
        display: flex;
        align-items: center;
        width: 49.5%;
        height: 68.5px;
        margin-top: 10px;
        padding: 0 16px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        background: rgb(255 255 255 / 5%);
        border-radius: 4px;
      }

      .button {
        display: flex;
        justify-content: center;
        // flex-basis: 30%;
        // width: 100px;
        // margin-left: 10%;
        .search {
          display: flex;
          gap: 10px;
          align-items: center;
          align-self: center;
          justify-content: center;
          width: 41px;
          height: 24px;
          margin-left: 5px;
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 12px;
          letter-spacing: 0.15px;
          background: rgb(255 255 255 / 10%);
          border-radius: 2px;
          cursor: pointer;

          &:hover {
            background: rgb(255 255 255 / 26%);
          }
        }
      }

      .normal {
        background: linear-gradient(
          270deg,
          rgb(157 180 220 / 6%) 0%,
          rgb(85 137 255 / 30%) 100%
        );

        .button {
          margin-right: 20px;
        }

        .level {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 26px;
          padding: 2px 6px;
          color: #f7f7f9;
          font-weight: 400;
          font-size: 16px;
          // background: #1890ff;
          // border-radius: 2px;
        }
      }

      .yiban {
        background: linear-gradient(
          270deg,
          rgb(220 157 157 / 6%) 0%,
          rgb(255 85 85 / 30%) 100%
        );

        .level {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 26px;
          padding: 2px 6px;
          color: #f7f7f9;
          font-weight: 400;
          font-size: 16px;
          background: #1890ff;
          border-radius: 2px;
        }
      }

      .serious {
        background: linear-gradient(
          270deg,
          rgb(220 157 157 / 6%) 0%,
          rgb(255 85 85 / 30%) 100%
        );

        .level {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 26px;
          padding: 2px 6px;
          color: #f7f7f9;
          font-weight: 400;
          font-size: 16px;
          background: #fa8214;
          border-radius: 2px;
        }
      }

      .zhiming {
        background: linear-gradient(
          270deg,
          rgb(220 157 157 / 6%) 0%,
          rgb(255 85 85 / 30%) 100%
        );

        .level {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 26px;
          padding: 2px 6px;
          color: #f7f7f9;
          font-weight: 400;
          font-size: 16px;
          background: #ff4d4f;
          border-radius: 2px;
        }
      }

      .tishi {
        background: linear-gradient(
          270deg,
          rgb(220 157 157 / 6%) 0%,
          rgb(255 85 85 / 30%) 100%
        );

        .level {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 26px;
          padding: 2px 6px;
          color: #f7f7f9;
          font-weight: 400;
          font-size: 16px;
          background: #18a02e;
          border-radius: 2px;
        }
      }

      .text {
        // flex: 1;
        width: 155px;
        margin-right: 5px;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        letter-spacing: 0.15px;
      }

      .num {
        // flex-basis: content;
        flex: 1;
        // width: 30%;
        color: #fff;
        font-weight: 400;
        font-size: 20px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        letter-spacing: 0.15px;
      }

      .unit {
        // align-self: baseline;
        color: rgb(255 255 255 / 80%);
        font-weight: 400;
        font-size: 12px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        letter-spacing: 0.15px;
      }
    }
  }
</style>
