<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-31 10:33:44
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-07 16:34:56
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\right\GuanJianSheBeiYongDian.vue
 * @Description: 关键设备用电量排名统计组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="factory-ac-power">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="card-info">
        <div class="today">
          <div class="label">今日总耗电量</div>
          <div class="value">
            {{
              state.todayTotalEC.toLocaleString().length > 5
                ? (state.todayTotalEC / 1000).toFixed(0).toLocaleString()
                : state.todayTotalEC.toFixed(0).toLocaleString()
            }}
            <span>{{
              state.todayTotalEC.toLocaleString().length > 5 ? 'MWh' : 'kWh'
            }}</span>
          </div>
        </div>
        <div class="yestoday">
          <div class="label">昨日总耗电量</div>
          <div class="value">
            {{
              state.yesterdayTotalEC.toLocaleString().length > 5
                ? (state.yesterdayTotalEC / 1000).toFixed(0).toLocaleString()
                : state.yesterdayTotalEC.toFixed(0).toLocaleString()
            }}
            <span>{{
              state.yesterdayTotalEC.toLocaleString().length > 5 ? 'MWh' : 'kWh'
            }}</span>
          </div>
        </div>
      </div>
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
            <div class="pro-name">{{ item.alias }}</div>
            <div class="pro-value">{{ item.v }}<span> kWh</span></div>
          </div>
          <ProgressCom
            :percent="(item.v / state.todayTotalEC) * 100"
            :colors="index > 2 ? state.colorsNormal : state.colorsTop"
          ></ProgressCom>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { keyEquipmentEC } from '@/api/data-overview/plant-monitor';
  import ModuleBox from '../../common/ModuleBox.vue';
  import ProgressCom from '../../common/Progress.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '关键设备用电量排名统计',
      width: 460,
      height: 40,
    },
    boxConfig: {
      width: 460,
      height: 587,
    },
    dataList: [],
    todayTotalEC: 0,
    yesterdayTotalEC: 0,
    colorsTop: ['rgba(143, 235, 255, 1)', 'rgba(44, 119, 233, 1)'],
    colorsNormal: ['rgba(75, 89, 124, 1)', 'rgba(161, 182, 208, 1)'],
  });

  const fetchData = async () => {
    try {
      const { data } = await keyEquipmentEC();
      state.dataList = data.ecranking;
      state.todayTotalEC = data.todayTotalEC;
      state.yesterdayTotalEC = data.yesterdayTotalEC;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .factory-ac-power {
    position: relative;

    .card-info {
      position: absolute;

      .today {
        position: absolute;
        top: 32px;
        left: 24px;
        width: 198px;
        height: 88px;

        .set-back('@/assets/imgs/energy-plant/guanjianshebei-bg.png');
      }

      .yestoday {
        position: absolute;
        top: 32px;
        left: 238px;
        width: 198px;
        height: 88px;

        .set-back('@/assets/imgs/energy-plant/guanjianshebei-bg.png');
      }

      .label {
        position: absolute;
        top: 17px;
        left: 39px;
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        font-family: SourceHanSansCN-Regular, sans-serif;
        font-style: normal;
        line-height: normal;
      }

      .value {
        position: absolute;
        top: 38px;
        left: 38px;
        color: #fff;
        font-weight: 400;
        font-size: 32px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-style: normal;
        line-height: normal;

        span {
          color: rgb(255 255 255 / 65%);
          font-weight: 400;
          font-size: 14px;
          font-family: Inter-Regular, sans-serif;
          font-style: normal;
          line-height: normal;
        }
      }
    }

    .progress-list {
      position: absolute;
      top: 144px;
      left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 412px;
      height: 418px;

      .progress-item {
        .info {
          display: flex;
          align-items: center;
          margin-bottom: 5px;

          .pro-index {
            color: #fff;
            font-weight: 700;
            font-size: 16px;
            font-family: Barlow-Italic, sans-serif;
            font-style: italic;
            line-height: normal;
            letter-spacing: 0.8px;
            text-align: cent0er;
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
            width: fit-content;
            margin-left: 8px;
            color: #fff;
            font-weight: 400;
            font-size: 14px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: normal;
          }

          .pro-value {
            width: max-content;
            margin-left: auto;
            color: #fff;
            font-weight: 500;
            font-size: 20px;
            font-family: Barlow-Italic, sans-serif;
            font-style: italic;
            line-height: normal;

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
  }
</style>
