<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-31 10:33:29
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-05 12:57:07
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\right\XingZhengZuZhiYongDian.vue
 * @Description: 行政组织用电量当月排名top5组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="factory-ac-power">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="bar-box">
        <BarChart :data="state.dataList.slice(0, 5)"></BarChart>
      </div>
    </ModuleBox>
    <div class="all-btn" @click="getAll">查看全部</div>
    <XingZhengPaiMingModal
      v-bind="$attrs"
      :data="state.dataList"
      class="pm-modal"
      :style="pmStyle"
    >
    </XingZhengPaiMingModal>
  </div>
  <div v-if="state.showModal" class="modal"></div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import bus from '@/utils/bus';
  import { getAdmOrgECinfo } from '@/api/data-overview/plant-monitor';
  import XingZhengPaiMingModal from './XingZhengPaiMingModal.vue';
  import BarChart from '../../common/BarChart.vue';
  import ModuleBox from '../../common/ModuleBox.vue';

  const { looping } = useEchart();

  const right = ref(-480);

  const state = reactive({
    titleConfig: {
      text: '行政组织用电量当月排名top5',
      width: 460,
      height: 40,
    },
    boxConfig: {
      width: 460,
      height: 261,
    },
    dataList: [],
    showModal: false,
  });

  const pmStyle = computed(() => ({
    right: `${right.value}px`,
  }));

  const fetchData = async () => {
    try {
      const { data } = await getAdmOrgECinfo();
      state.dataList = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  const getAll = () => {
    state.showModal = true;
    right.value = 0;
  };

  bus.on('close-pm-modal', () => {
    right.value = -480;
    state.showModal = false;
  });

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .factory-ac-power {
    position: relative;

    .bar-box {
      padding: 20px 20px 18px;
    }

    .all-btn {
      position: absolute;
      top: 0;
      right: 16px;
      color: rgb(255 255 255 / 65%);
      font-weight: 400;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular, sans-serif;
      font-style: normal;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }

    .pm-modal {
      position: absolute;
      top: -20px;
      z-index: 3;
      transition: 0.5s;
    }
  }

  .modal {
    position: relative;
    top: -325px;
    left: -1436px;
    z-index: 2;
    width: 1920px;
    height: 1000px;
    background: rgb(20 36 74 / 37%);
  }
</style>
