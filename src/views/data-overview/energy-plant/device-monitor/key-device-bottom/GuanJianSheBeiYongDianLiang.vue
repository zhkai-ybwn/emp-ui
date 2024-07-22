<template>
  <div class="guanjian">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="progress-list">
        <div
          v-for="(item, index) in state.dataList"
          :key="index"
          class="progress-item"
        >
          <div class="info">
            <div :class="['pro-index', `pro-index${index}`]">{{
              index + 1
            }}</div>
            <div class="pro-name">{{ item[0] }}</div>
            <div class="pro-value">{{ item[1] }}<span> kWh</span></div>
          </div>
          <ProgressCom
            :percent="(item[1] / state.maxValue) * 100"
            :colors="index > 2 ? state.colorsNormal : state.colorsTop"
            :config="{ width: 512, height: 3 }"
          ></ProgressCom>
        </div>
      </div>
    </ModuleBox>
    <ButtonGroup
      :label-data="state.btnList"
      :btn-module-key="state.btnModuleKey"
      class="btn-group"
    ></ButtonGroup>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { useStore } from '@/store';
  import { keyEquECTop5 } from '@/api/data-overview/device-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import ButtonGroup from '../../common/ButtonGroup.vue';
  import ProgressCom from '../../common/Progress.vue';

  const state = reactive({
    titleConfig: {
      text: '关键设备用电量排名Top5',
      width: 576,
      height: 40,
    },
    boxConfig: {
      width: 576,
      height: 228,
    },
    btnList: [
      {
        key: 'day',
        label: '今日',
      },
      {
        key: 'month',
        label: '本月',
      },
      {
        key: 'year',
        label: '全年',
      },
    ],
    btnModuleKey: 3,
    dataList: [],
    colorsTop: ['rgba(143, 235, 255, 1)', 'rgba(44, 119, 233, 1)'],
    colorsNormal: ['rgba(75, 89, 124, 1)', 'rgba(161, 182, 208, 1)'],
    maxValue: 0,
  });

  const { looping } = useEchart();
  const keyDevice = computed(() => useStore().keyDevice);

  const fetchData = async () => {
    const formData = new FormData();
    formData.append('dimension', keyDevice.value);
    try {
      const { data } = await keyEquECTop5(formData);
      state.dataList = Object.entries(data);
      state.dataList.sort((a, b) => b[1] - a[1]);
      // 找到最大值
      state.maxValue = state.dataList.length > 0 ? state.dataList[0][1] : 1;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  watch(keyDevice, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      fetchData();
    }
  });

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .guanjian {
    position: relative;
    width: 576px;
    margin-right: 24px;

    .progress-list {
      position: absolute;
      left: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 512px;
      height: 215px;

      .progress-item {
        .info {
          display: flex;
          align-items: center;
          margin-bottom: 5px;

          .pro-index {
            width: 16px;
            color: #fff;
            font-weight: 700;
            font-size: 16px;
            font-family: Barlow-Italic, sans-serif;
            font-style: italic;
            line-height: normal;
            letter-spacing: 0.8px;
            text-align: center;
          }

          .pro-index0 {
            width: 16px;
            height: 16px;

            .set-back('@/assets/imgs/energy-plant/pm1-bg.png');
          }

          .pro-index1 {
            width: 16px;
            height: 16px;

            .set-back('@/assets/imgs/energy-plant/pm2-bg.png');
          }

          .pro-index2 {
            width: 16px;
            height: 16px;

            .set-back('@/assets/imgs/energy-plant/pm3-bg.png');
          }

          .pro-name {
            width: 300px;
            margin-left: 8px;
            color: #fff;
            font-weight: 400;
            font-size: 14px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: normal;
          }

          .pro-value {
            width: 212px;
            color: #fff;
            font-weight: 500;
            font-size: 20px;
            font-family: Barlow-Italic, sans-serif;
            font-style: italic;
            line-height: normal;
            text-align: right;

            span {
              color: rgb(255 255 255 / 65%);
              font-weight: 350;
              font-size: 14px;
              font-family: HarmonyOS-Regular, sans-serif;
              font-style: normal;
              line-height: normal;
            }
          }
        }
      }
    }

    .btn-group {
      position: absolute;
      top: 6px;
      right: 16px;
    }
  }
</style>
