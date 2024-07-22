<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 09:10:11
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:38:16
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\IndoorEnvironment.vue
 * @Description: 室内环境参数
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="indoor-environment-container">
    <div class="title">室内环境参数</div>
    <div class="co-box">
      <div class="co-icon"></div>
      <div class="co-label">CO浓度：</div>
      <div class="co-value">
        {{ state.coDepth || '-' }}
        <span v-if="state.coDepth">ppm</span>
      </div>
    </div>
    <div class="so2-box">
      <div class="so2-icon"></div>
      <div class="so2-label">SO₂浓度：</div>
      <div class="so2-value">
        {{ state.so2Depth || '-' }}
        <span v-if="state.so2Depth">ppm</span>
      </div>
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
    coDepth: 0,
    so2Depth: 0,
  });

  const fetchData = async () => {
    const formData = new FormData();
    formData.append(
      'nodeId',
      props.data.nodeId ? props.data.nodeId : 'TJ000016'
    );
    try {
      const { data } = await keyEquInfo(formData);
      state.coDepth = data.coDepth;
      state.so2Depth = data.so2Depth;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .indoor-environment-container {
    position: relative;
    width: 212px;
    height: 174px;

    .set-back('@/assets/imgs/energy-plant/indoor_envir_bg.png');

    .title {
      position: absolute;
      top: 27px;
      left: 21px;
      width: 170px;
      height: 21px;
      padding-left: 31px;
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;

      .set-back('@/assets/imgs/energy-plant/indoor_envir_title_bg.png');
    }

    .co-box {
      position: absolute;
      top: 64px;
      left: 22px;
      display: flex;
      align-items: center;

      .co-icon {
        width: 24px;
        height: 24px;

        .set-back('@/assets/imgs/energy-plant/co_icon.png');
      }

      .co-label {
        margin-left: 8px;
        color: rgb(255 255 255 / 65%);
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
        text-align: right;
      }

      .co-value {
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        font-family: Barlow-Italic, sans-serif;
        font-style: italic;
        line-height: normal;

        span {
          color: rgb(255 255 255 / 65%);
          font-weight: 350;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
          text-align: right;
        }
      }
    }

    .so2-box {
      position: absolute;
      top: 108px;
      left: 22px;
      display: flex;
      align-items: center;

      .so2-icon {
        width: 24px;
        height: 24px;

        .set-back('@/assets/imgs/energy-plant/so2_icon.png');
      }

      .so2-label {
        margin-left: 8px;
        color: rgb(255 255 255 / 65%);
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
        text-align: right;
      }

      .so2-value {
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        font-family: Barlow-Italic, sans-serif;
        font-style: italic;
        line-height: normal;

        span {
          color: rgb(255 255 255 / 65%);
          font-weight: 350;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
          text-align: right;
        }
      }
    }
  }
</style>
