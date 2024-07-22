<template>
  <div class="energy-rank-bg">
    <Breadcrumb :items="['用能分析', '能耗排名']" />
    <div class="search-box">
      <a-form ref="queryRef" :model="state" layout="inline">
        <a-form-item field="areaCode" label="区域：">
          <a-tree-select
            v-model="state.areaCode"
            :data="state.areaData"
            style="width: 220px"
            placeholder="区域"
            :field-names="{
              key: 'code',
              title: 'name',
              children: 'child',
            }"
            :allow-clear="false"
            popup-container=".energy-analysis-bg"
          ></a-tree-select>
        </a-form-item>
        <a-form-item field="areaCode" label="设备：">
          <a-tree-select
            v-model="state.areaCode"
            :data="state.areaData"
            style="width: 220px"
            placeholder="设备"
            :field-names="{
              key: 'code',
              title: 'name',
              children: 'child',
            }"
            :allow-clear="false"
            popup-container=".energy-analysis-bg"
          ></a-tree-select>
        </a-form-item>
        <a-form-item field="energyType" label="能耗类型：">
          <a-tree-select
            v-model="state.energyTypeCode"
            :data="state.energyType"
            placeholder="能耗类型"
            :allow-clear="false"
            style="width: 130px"
            :field-names="{
              key: 'code',
              title: 'name',
              children: 'child',
            }"
            popup-container=".energy-analysis-bg"
          ></a-tree-select>
        </a-form-item>
        <a-form-item field="rangePicker" label="时间：">
          <a-select
            v-model="state.timeType"
            :style="{ width: '80px', marginRight: '10px' }"
            @change="state.time = undefined"
          >
            <a-option :value="0">日</a-option>
            <a-option :value="1">周</a-option>
            <a-option :value="2">月</a-option>
            <a-option :value="3">年</a-option>
          </a-select>
          <a-date-picker
            v-if="state.timeType === 0"
            v-model="state.time"
            style="width: 200px"
          />
          <a-week-picker
            v-if="state.timeType === 1"
            v-model="state.time"
            style="width: 200px"
          />
          <a-month-picker
            v-if="state.timeType === 2"
            v-model="state.time"
            style="width: 200px"
          />
          <a-year-picker
            v-if="state.timeType === 3"
            v-model="state.time"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item hide-label>
          <a-space>
            <a-button type="primary">
              <template #icon><icon-search /></template>查询
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item hide-label>
          <a-space>
            <a-button type="outline">
              <template #icon><icon-refresh /></template>重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-box">
      <PaiMingTable></PaiMingTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { ShortcutType, TreeNodeData } from '@arco-design/web-vue';
  import bus from '@/utils/bus';
  import PaiMingTable from '@/views/energy-analysis/rank/components/PaiMingTable.vue';

  const state = reactive({
    areaData: [] as TreeNodeData[],
    areaCode: undefined as any,
    energyType: [] as TreeNodeData[],
    energyTypeCode: undefined as any,
    timeType: 0,
    time: Date.now() as number | undefined,
  });
</script>

<style lang="less" scoped>
  .energy-rank-bg {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0 24px;
    .set-back('@/assets/imgs/load-forecast/home-bg.png');

    .search-box {
      display: flex;
      align-items: center;
      padding: 18px 24px 10px;
      background: rgb(19 24 35 / 60%);
      border-radius: 4px;
      backdrop-filter: blur(5px);
    }

    .content-box {
      flex: 1;
      margin-top: 24px;
      margin-bottom: 24px;
      overflow-y: auto;
    }
  }
</style>
