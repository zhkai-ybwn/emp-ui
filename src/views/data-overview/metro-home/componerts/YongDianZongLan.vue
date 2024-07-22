<template>
  <div>
    <Title :title="'用电总览'">
      <div class="button-list">
        <div
          v-for="item in state.buttonList"
          :key="item.key"
          :class="item.key === state.time ? 'active' : 'inactive'"
          @click="change(item.key)"
        >
          {{ item.title }}
        </div>
      </div>
    </Title>
    <div class="contain">
      <div class="top">
        <div class="img"></div>
        <div class="item">
          <div class="item1">
            <div
              ><span class="value">{{
                state.acFullEnergy
                  ? parseFloat(state.acFullEnergy).toFixed(2)
                  : '- -'
              }}</span
              ><span class="unit">{{
                state.acFullEnergy ? state.acFullEnergy.split(' ')[1] : ''
              }}</span></div
            >
            <div class="title">空调系统</div>
          </div>
          <div class="line"></div>
          <div class="item2">
            <div
              ><span class="value">{{
                state.chillRoomEnergy
                  ? parseFloat(state.chillRoomEnergy).toFixed(2)
                  : '- -'
              }}</span
              ><span class="unit">{{
                state.chillRoomEnergy.split(' ')[1]
              }}</span></div
            >
            <div class="title">制冷机房</div>
          </div>
          <div class="item3">
            <div
              ><span class="value">{{
                state.acTerminalEnergy
                  ? parseFloat(state.acTerminalEnergy).toFixed(2)
                  : '- -'
              }}</span
              ><span class="unit">{{
                state.acTerminalEnergy.split(' ')[1]
              }}</span></div
            >
            <div class="title">末端系统</div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">制冷机房设备用电</div>
        <Empty
          v-if="!state.detail || (state.detail.length === 0 && !state.loading)"
          style="height: 150px"
        ></Empty>
        <Loading v-if="state.loading" style="height: 150px"></Loading>
        <div
          v-if="state.detail && state.detail.length !== 0 && !state.loading"
          class="chart"
        >
          <SheBeiChart class="shebei" :data-list="state.detail"></SheBeiChart>
          <div class="detail">
            <div
              v-for="(item, index) in state.detail"
              :key="index"
              class="item"
            >
              <div
                class="block"
                :style="{ background: colorList[index] }"
              ></div>
              <div class="info">
                <div class="name">{{ item.title }}</div>
                <div class="value">{{
                  item.value ? parseFloat(item.value).toFixed(2) : '- -'
                }}</div>
                <div class="unit">{{ item.unit }}</div>
                <div class="line"></div>
                <div class="percent" :style="{ color: colorList[index] }"
                  >{{ item.percent ? item.percent : '- -' }}%</div
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { getEnergyOverviewVO } from '@/api/data-overview/metro-home';
  import Title from '../common/Title.vue';
  import SheBeiChart from '../common/SheBeiChart.vue';
  import Loading from '../common/Loading.vue';
  import Empty from '../common/Empty.vue';

  interface Energy {
    energy: string;
    energyPercent: string;
  }

  const colorList = [
    'rgba(7, 166, 255,  0.9)',
    'rgba(69, 244, 245,  0.9)',
    'rgba(255, 208, 118,  0.9)',
    'rgba(255, 255, 255,  0.9)',
    'rgba(109, 148, 198, 0.9)',
  ];

  const state = reactive({
    buttonList: [
      { title: '日', key: '1' },
      { title: '月', key: '2' },
      { title: '年', key: '3' },
    ],
    time: '1',
    loading: false,
    detail: [
      {
        title: '冷水机组',
        unit: 'kWh',
        value: '',
        percent: '',
      },
      {
        title: '冷水泵',
        unit: 'kWh',
        value: '',
        percent: '',
      },
      {
        title: '冷却水泵',
        unit: 'kWh',
        value: '',
        percent: '',
      },
      {
        title: '冷却塔',
        unit: 'kWh',
        value: '',
        percent: '',
      },
      {
        title: '其他',
        unit: 'kWh',
        value: '',
        percent: '',
      },
    ],
    acFullEnergy: '',
    chillRoomEnergy: '',
    acTerminalEnergy: '',
  });

  const fetchData = async () => {
    try {
      state.loading = true;
      const { data } = await getEnergyOverviewVO(state.time);
      state.acFullEnergy = data.acFullEnergy;
      state.chillRoomEnergy = data.chillRoomEnergy;
      state.acTerminalEnergy = data.acTerminalEnergy;
      if (data.chillRoomDeviceEnergyList.length < 5) {
        state.detail = [
          {
            title: '冷水机组',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '冷水泵',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '冷却水泵',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '冷却塔',
            unit: 'kWh',
            value: '',
            percent: '',
          },
        ];
      } else {
        state.detail = [
          {
            title: '冷水机组',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '冷水泵',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '冷却水泵',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '冷却塔',
            unit: 'kWh',
            value: '',
            percent: '',
          },
          {
            title: '其他',
            unit: 'kWh',
            value: '',
            percent: '',
          },
        ];
      }
      data.chillRoomDeviceEnergyList.forEach((el: Energy, index: number) => {
        state.detail[index].value = el.energy;
        state.detail[index].percent = el.energyPercent;
      });
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      state.loading = false;
    }
  };
  fetchData();

  const change = (key: string) => {
    state.time = key;
    fetchData();
  };
</script>

<style scoped lang="less">
  .button-list {
    display: flex;

    .active {
      width: 26px;
      height: 20px;
      margin-left: 8px;
      color: #c9e2fa;
      font-weight: 500;
      font-size: 12px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      line-height: 20px;
      text-align: center;
      background: linear-gradient(180deg, #1698f4 0%, #03a7ff 80%);
      cursor: pointer;
    }

    .inactive {
      width: 26px;
      height: 20px;
      margin-left: 8px;
      color: #51aaff;
      font-weight: 500;
      font-size: 12px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      line-height: 20px;
      text-align: center;
      cursor: pointer;

      .set-back('@/assets/imgs/metro-home/normal.png');
    }
  }

  .contain {
    margin-top: 16px;

    .top {
      display: flex;
      padding-right: 7px;
      align-items: center;
      width: 100%;
      height: 64px;
      background: linear-gradient(
        90deg,
        rgb(15 31 48 / 8%) 0%,
        rgb(16 66 140 / 30%) 50%,
        rgb(14 31 47 / 9%) 100%
      );

      .img {
        width: 50px;
        height: 50px;
        margin-top: 13px;
        margin-right: 10px;
        .set-back('@/assets/imgs/metro-home/energy-icon.png');
      }

      .item {
        width: calc(100% - 60px);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .title {
        margin-top: 9px;
        width: 56px;
        height: 16px;
        color: #f0f7fd;
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 16px;
        text-align: center;
        text-shadow: 0 1px 4px rgb(0 133 255 / 70%);
      }

      .unit {
        width: 21px;
        height: 12px;
        margin-left: 4px;
        color: #b4c0cc;
        font-weight: 400;
        font-size: 10px;
        font-family: Inter-Regular, sans-serif;
        font-style: normal;
        line-height: 12px;
        text-transform: none;
      }

      .item2 .value,
      .item3 .value {
        width: 60px;
        height: 20px;
        font-weight: 600;
        font-size: 20px;
        font-family: Barlow-Bold-Italic, sans-serif;
        font-style: normal;
        line-height: 20px;
        background: linear-gradient(180deg, #ffffff 0%, #9cc4ff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        // text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.32),
        //   0px 0px 5px rgba(0, 102, 255, 0.49);
      }
      .item1 .value {
        width: 60px;
        height: 20px;
        font-weight: 600;
        font-size: 20px;
        font-family: Barlow-SemiBold, sans-serif;
        font-style: normal;
        line-height: 20px;
        background: linear-gradient(180deg, #fff 0%, #ffe39d 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 0 2px rgb(255 255 255 / 42%),
          0 0 5px rgb(15 53 255 / 23%);
      }

      .line {
        width: 1px;
        height: 50px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.04) 0%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0.04) 100%
        );
      }
    }
    .bottom {
      margin-top: 20px;
      .title {
        width: 100%;
        height: 28px;
        background: rgba(0, 130, 255, 0.14);
        border-left: 1px solid #349fff;
        font-family: HarmonyOS-Regular, sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        line-height: 28px;
        padding-left: 7px;
      }

      .chart {
        display: flex;
        margin-top: 20px;
        height: 130px;
        width: 100%;

        .shebei {
          width: 40%;
        }

        .detail {
          width: 60%;
          padding-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item {
            display: flex;
            width: 100%;
            height: 16px;
            .block {
              width: 12px;
              height: 6px;
              margin-top: 5px;
              margin-right: 5px;
            }
            .info {
              display: flex;
              align-items: center;
              flex: 1;
              height: 21px;
              background: linear-gradient(
                90deg,
                rgba(16, 66, 140, 0) 7%,
                rgba(16, 66, 140, 0.4) 7%,
                rgba(14, 31, 47, 0.2) 100%
              );
            }
            .name {
              font-family: HarmonyOS-Regular, sans-serif;
              font-weight: 400;
              font-size: 14px;
              color: #e3eaf0;
              width: 60px;
            }
            .value {
              font-family: Barlow-SemiBold, sans-serif;
              font-weight: 500;
              font-size: 14px;
              color: #e3eaf0;
              flex: 1;
              text-align: right;
              margin-right: 3px;
            }
            .unit {
              font-family: Barlow-Medium, sans-serif;
              font-weight: 400;
              font-size: 14px;
              color: #c6d1db;
            }
            .line {
              background: #ffffff20;
              margin-left: 10px;
              height: 12px;
              width: 1px;
            }
            .percent {
              font-family: Barlow-Medium, sans-serif;
              font-weight: 500;
              font-size: 14px;
              width: 45px;
              text-align: right;
            }
          }
        }
      }
    }
  }
</style>
