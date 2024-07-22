<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 10:46:12
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:39:54
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\KeyEquModal.vue
 * @Description: 关键设备弹窗
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="key-equ-modal">
    <div class="title">{{ data.title }}</div>
    <div class="current-status">
      <div class="label">当前状态：</div>
      <div v-if="state.currentStatus" class="running">
        <div class="run-sign"></div>
        <div>{{ state.currentStatus === null ? '加载中' : '运行中' }}</div>
      </div>
      <div v-if="!state.currentStatus" class="close">
        <div class="close-sign"></div>
        <div>{{ state.currentStatus === null ? '加载中' : '关闭' }}</div>
      </div>
    </div>
    <div class="today-ec">
      <div class="label">今日用电：</div>
      <div class="value">{{ state.todayEC }}<span>kWh</span></div>
    </div>
    <div class="run-time">
      <div class="label">运行时长：</div>
      <div class="value">{{ state.runTime }}<span>小时</span></div>
    </div>
    <div class="current-p">
      <div class="label">当前功率：</div>
      <div class="value">{{ state.currentP }}<span>kW</span></div>
    </div>
    <div class="area">
      <div class="label">所在区域：</div>
      <div class="value">能源制造厂区</div>
    </div>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { keyEquInfo } from '@/api/data-overview/device-monitor';

  const { looping } = useEchart();

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        title: '立式加工中心850',
        nodeId: 0,
      }),
    },
  });

  const state = reactive({
    currentP: 0,
    currentStatus: null,
    runTime: 0,
    todayEC: 0,
  });

  const fetchData = async () => {
    const formData = new FormData();
    formData.append('nodeId', props.data.nodeId);
    try {
      const { data } = await keyEquInfo(formData);
      state.currentP = data.currentP;
      state.currentStatus = data.currentStatus;
      state.runTime = data.runTime;
      state.todayEC = data.todayEC;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .key-equ-modal {
    position: relative;
    width: 354px;
    height: 190px;

    .set-back('@/assets/imgs/energy-plant/key_equ_modal_bg.png');

    .title {
      position: absolute;
      top: 21px;
      left: 41px;
      color: #fff;
      font-weight: 400;
      font-size: 18px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.9px;
    }

    .current-status {
      position: absolute;
      top: 68px;
      left: 35px;
      display: flex;
      align-items: center;

      .running {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 62px;
        height: 22px;
        color: #54ffc1;
        font-weight: 400;
        font-size: 12px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.6px;
        background: rgb(84 255 193 / 10%);
        border: 1px solid rgb(84 255 193 / 40%);
        border-radius: 6px;

        .run-sign {
          width: 4px;
          height: 4px;
          margin-right: 2px;
          background: #54ffc1;
          border: 1px solid rgb(84 255 193 / 60%);
          border-radius: 3px;
        }
      }

      .close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 62px;
        height: 22px;
        color: rgb(255 255 255 / 60%);
        font-weight: 400;
        font-size: 12px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.6px;
        background: rgb(255 255 255 / 10%);
        border: 1px solid rgb(255 255 255 / 40%);
        border-radius: 6px;

        .close-sign {
          width: 4px;
          height: 4px;
          margin-right: 2px;
          background: rgb(255 255 255 / 60%);
          border: 1px solid rgb(255 255 255 / 60%);
          border-radius: 3px;
        }
      }
    }

    .today-ec {
      position: absolute;
      top: 68px;
      left: 195px;
      display: flex;
      align-items: center;
    }

    .run-time {
      position: absolute;
      top: 98px;
      left: 35px;
      display: flex;
      align-items: center;
    }

    .current-p {
      position: absolute;
      top: 98px;
      left: 195px;
      display: flex;
      align-items: center;
    }

    .area {
      position: absolute;
      top: 127px;
      left: 35px;
      display: flex;
      align-items: center;
    }

    .label {
      color: rgb(255 255 255 / 65%);
      font-weight: 350;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.7px;
    }

    .value {
      color: #fff;
      font-weight: 350;
      font-size: 14px;
      font-family: SourceHanSansCN-Normal, sans-serif;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.7px;
    }
  }
</style>
