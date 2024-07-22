<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-11 13:53:47
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:53:59
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\pv-power\ShiWaiHuanJingCanShu.vue
 * @Description: 室外环境参数
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="swhjcs-container">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="info-list">
        <div
          v-for="(item, index) in state.dataList"
          :key="index"
          class="info-item"
        >
          <img class="icon" :src="state.icons[index]" />
          <div class="value-name">
            <div class="value"
              >{{ item.value ? Number(item.value).toFixed(1) : '-'
              }}<span v-if="item.value">{{ item.unit }}</span></div
            >
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import tIcon from '@/assets/imgs/energy-plant/temperature_icon.png';
  import hIcon from '@/assets/imgs/energy-plant/humidity_icon.png';
  import sIcon from '@/assets/imgs/energy-plant/wind_speed_icon.png';
  import { enviConditions } from '@/api/data-overview/pv-power';
  import ModuleBox from '../common/ModuleBox.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '室外环境参数',
      width: 460,
      height: 40,
    },
    boxConfig: {
      width: 460,
      height: 228,
    },
    icons: [tIcon, hIcon, tIcon, sIcon, tIcon, sIcon],
    dataList: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await enviConditions();
      state.dataList = [];
      state.dataList.push({
        name: '背板温度',
        value: data.backplaneTemperature,
        unit: '℃',
      });
      state.dataList.push({
        name: '环境湿度',
        value: data.envHumidity,
        unit: '%',
      });
      state.dataList.push({
        name: '露点温度',
        value: data.dew_pTemperature,
        unit: '℃',
      });
      state.dataList.push({
        name: '风速/2分钟',
        value: data.envWindSpeed2M,
        unit: 'm/s',
      });
      state.dataList.push({
        name: '环境温度',
        value: data.envTemperature,
        unit: '℃',
      });
      state.dataList.push({
        name: '风速/10分钟',
        value: data.envWindSpeed10M,
        unit: 'm/s',
      });
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .swhjcs-container {
    .info-list {
      display: flex;
      flex-wrap: wrap;
      width: 460px;
      height: 228px;
      padding: 18px 63px 12px 62px;

      .info-item {
        display: flex;
        width: 167.5px;

        .icon {
          width: 48px;
          height: 48px;
        }

        .value-name {
          margin-left: 12px;

          .value {
            font-weight: 600;
            font-size: 24px;
            font-family: Barlow-Italic, sans-serif;
            font-style: italic;
            line-height: normal;
            background: linear-gradient(180deg, #43b0ff 0%, #fff 65.43%);
            background-clip: text;
            /* stylelint-disable */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            span {
              color: rgb(255 255 255 / 85%);
              font-weight: 400;
              font-size: 14px;
              font-family: HarmonyOS-Regular, sans-serif;
              font-style: normal;
              line-height: normal;
            }
          }

          .name {
            color: #fff;
            font-weight: 400;
            font-size: 14px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }
      }
    }
  }
</style>
