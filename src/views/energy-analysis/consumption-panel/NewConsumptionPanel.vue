<template>
  <div class="energy-analysis-bg">
    <Breadcrumb :items="['用能分析', '能耗分析']" />
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
            @change="onChange"
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
            <a-button type="primary" @click="search">
              <template #icon><icon-search /></template>查询
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item hide-label>
          <a-space>
            <a-button type="outline" @click="resetQuery">
              <template #icon><icon-refresh /></template>重置
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item hide-label style="margin-left: auto">
          <a-space>
            <a-button type="primary" @click="search">导出</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-box">
      <div class="chart">
        <div class="top">
          <div class="unit">单位：kWh</div>
          <div class="button-list">
            <div class="item">
              <div
                :class="state.buttonId === 1 ? 'active' : 'normal'"
                style="
                  border-top-left-radius: 2px;
                  border-bottom-left-radius: 2px;
                "
                @click="state.buttonId = 1"
                >用电量</div
              >
              <div
                :class="state.buttonId === 2 ? 'active' : 'normal'"
                @click="state.buttonId = 2"
                >标准煤</div
              >
              <div
                :class="state.buttonId === 3 ? 'active' : 'normal'"
                style="
                  border-top-right-radius: 2px;
                  border-bottom-right-radius: 2px;
                "
                @click="state.buttonId = 3"
                >碳排放</div
              >
            </div>
          </div>
        </div>
        <div class="center">
          <BarLineChart></BarLineChart>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="table">
        <NengHaoTable></NengHaoTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'dayjs/locale/zh-cn';
  import { TreeNodeData } from '@arco-design/web-vue';
  import NengHaoTable from './components/NengHaoTable.vue';
  import BarLineChart from './components/BarLineChart.vue';

  const state = reactive({
    areaData: [] as TreeNodeData[],
    areaCode: undefined as any,
    energyType: [] as TreeNodeData[],
    energyTypeCode: undefined as any,
    formatStr: 'YYYY-MM-DD',
    selectedEnergyTypeLevel: undefined as number | undefined,
    timeType: 0,
    time: Date.now() as number | undefined,
    buttonId: 1,
  });

  const getKeyLevel = (data: any, key: any) => {
    const foundItem = data.find((item: any) => item.code === key);
    return foundItem ? foundItem.level : null;
  };

  const onChange = (value: any) => {
    state.selectedEnergyTypeLevel = getKeyLevel(state.energyType, value);
  };

  const search = () => {};

  const resetQuery = () => {};
</script>

<style lang="less" scoped>
  .energy-analysis-bg {
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
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-top: 24px;
      background: rgb(83 109 167 / 10%);

      .chart {
        flex: 1;
        padding: 0 20px;

        .top {
          display: flex;
          justify-content: space-between;
          margin: 14px 0;

          .unit {
            color: #fff;
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            line-height: 20px;
          }

          .button-list {
            .item {
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              width: 162px;
              height: 24px;
              background: linear-gradient(
                180deg,
                rgb(107 183 255 / 0%),
                rgb(107 183 255 / 100%)
              );
              border-radius: 2px;
            }

            .active {
              width: 52.5px;
              height: 22.5px;
              color: #c9e2fa;
              font-weight: 400;
              font-size: 14px;
              font-family: HarmonyOS-Regular, sans-serif;
              line-height: 24px;
              text-align: center;
              background: #4289ff;
              cursor: pointer;
            }

            .normal {
              width: 52.5px;
              height: 22.5px;
              color: rgb(81 170 255 / 80%);
              font-weight: 400;
              font-size: 14px;
              font-family: HarmonyOS-Regular, sans-serif;
              line-height: 24px;
              text-align: center;
              background: #233c62;
              cursor: pointer;
            }
          }
        }
      }

      .table {
        height: 173px;
        margin-top: 3vh;
        margin-bottom: 5vh;
        padding: 0 27px 0 30px;
      }
    }
  }

  :deep(.arco-form-item-label-col) {
    padding-right: 0;

    .arco-form-item-label {
      color: #505674;
    }
  }
</style>
