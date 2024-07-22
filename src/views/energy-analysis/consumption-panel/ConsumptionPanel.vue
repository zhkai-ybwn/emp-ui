<template>
  <div class="energy-analysis-bg">
    <Breadcrumb :items="['用能分析', '能耗分析']" />
    <div class="search-box">
      <a-form ref="queryRef" :model="state" layout="inline">
        <a-form-item field="areaCode" hide-label>
          <a-tree-select
            v-model="state.areaCode"
            :data="state.areaData"
            placeholder="区域"
            style="width: 220px"
            :field-names="{
              key: 'code',
              title: 'name',
              children: 'child',
            }"
            :allow-clear="false"
            popup-container=".energy-analysis-bg"
          ></a-tree-select>
        </a-form-item>
        <a-form-item field="energyType" hide-label>
          <!-- <a-select
            v-model="state.energyType"
            style="width: 220px; margin-left: 30px"
            :options="energyTypes"
            placeholder="能耗类型"
            allow-clear
          ></a-select> -->
          <a-tree-select
            v-model="state.energyTypeCode"
            :data="state.energyType"
            placeholder="能耗类型"
            :allow-clear="false"
            style="width: 220px; margin-left: 6px"
            :field-names="{
              key: 'code',
              title: 'name',
              children: 'child',
            }"
            popup-container=".energy-analysis-bg"
            @change="onChange"
          ></a-tree-select>
        </a-form-item>
        <a-form-item field="rangePicker" hide-label>
          <a-range-picker
            v-model="state.rangePicker"
            shortcuts-position="left"
            :shortcuts="rangeShortcuts"
            :disabled-date="(current: any) => dayjs(current).isAfter(dayjs())"
            style="width: 300px; margin-left: 6px"
            :allow-clear="false"
            popup-container=".energy-analysis-bg"
          >
          </a-range-picker>
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
      </a-form>
    </div>
    <div class="content-box">
      <NengHaoQuShi class="nhqs"></NengHaoQuShi>
      <NengHaoPaiMing class="nhpm" />
      <NengHaoZhanBi class="nhzb"></NengHaoZhanBi>
      <NengHaoMingXi class="nhmx"></NengHaoMingXi>
      <NengHaoTongJi class="nhzj"></NengHaoTongJi>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import {
    queryAssetTopology,
    queryAll,
  } from '@/api/energy-analysis/consumption-panel';
  import { ShortcutType, TreeNodeData } from '@arco-design/web-vue';
  import bus from '@/utils/bus';
  import NengHaoPaiMing from './components/NengHaoPaiMing.vue';
  import NengHaoQuShi from './components/NengHaoQuShi.vue';
  import NengHaoZhanBi from './components/NengHaoZhanBi.vue';
  import NengHaoMingXi from './components/NengHaoMingXi.vue';
  import NengHaoTongJi from './components/NengHaoZongJi.vue';

  const rangePicker: Date[] = [];

  const state = reactive({
    areaData: [] as TreeNodeData[],
    areaCode: undefined as any,
    energyType: [] as TreeNodeData[],
    energyTypeCode: undefined as any,
    rangePicker,
    formatStr: 'YYYY-MM-DD',
    selectedEnergyTypeLevel: undefined as number | undefined,
  });

  const getKeyLevel = (data: any, key: any) => {
    const foundItem = data.find((item: any) => item.code === key);
    return foundItem ? foundItem.level : null;
  };

  const onChange = (value: any) => {
    state.selectedEnergyTypeLevel = getKeyLevel(state.energyType, value);
  };

  const rangeShortcuts = computed<ShortcutType[]>(() => {
    return [
      {
        label: '今日内',
        value: (): Date[] => [dayjs().toDate(), dayjs().toDate()],
      },
      {
        label: '最近一周',
        value: (): Date[] => [
          dayjs().toDate(),
          dayjs().subtract(1, 'week').toDate(),
        ],
      },
      {
        label: '最近一个月',
        value: (): Date[] => [
          dayjs().toDate(),
          dayjs().subtract(1, 'month').toDate(),
        ],
      },
      {
        label: '最近三个月',
        value: (): Date[] => [
          dayjs().toDate(),
          dayjs().subtract(3, 'month').toDate(),
        ],
      },
    ];
  });

  const getCurrentTime = () => {
    const currentTime = dayjs();
    return [
      dayjs(currentTime.format(state.formatStr), state.formatStr),
      dayjs(currentTime.format(state.formatStr), state.formatStr),
    ];
  };
  state.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());

  const fetchData = async () => {
    try {
      const { data: data1 } = await queryAssetTopology();
      const { data: data2 } = await queryAll();
      // @ts-ignore
      state.areaData = data1;
      // @ts-ignore
      state.areaCode = state.areaData[0].code;
      // @ts-ignore
      state.energyType = data2;
      // @ts-ignore
      state.energyTypeCode = state.energyType[0].code;
      state.selectedEnergyTypeLevel = getKeyLevel(
        state.energyType,
        // @ts-ignore
        state.energyType[0].code
      );
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    // proxy.$refs.queryRef.resetFields();
    state.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());
    fetchData();
  };

  // 定义一个函数来扁平化树形数据
  function treeToArray(tree: any) {
    let res = [] as any[];
    // eslint-disable-next-line no-restricted-syntax
    for (const item of tree) {
      const { child, ...i } = item;
      if (child && child.length) {
        res = res.concat(treeToArray(child));
      }
      res.push(i);
    }
    return res;
  }

  const search = () => {
    const conParams = {
      startTime: dayjs(state.rangePicker[0]).format(state.formatStr),
      endTime: dayjs(state.rangePicker[1]).format(state.formatStr),
      classificationCode: state.energyTypeCode,
      nodeId: state.areaCode,
      level: state.selectedEnergyTypeLevel,
    };
    const DetailParams = {
      startTime: dayjs(state.rangePicker[0]).format(state.formatStr),
      endTime: dayjs(state.rangePicker[1]).format(state.formatStr),
      classificationCode: state.energyTypeCode,
      nodeId: state.areaCode,
      level: state.selectedEnergyTypeLevel,
      nodeName: treeToArray(state.areaData).find(
        (el: any) => `${el.code}` === state.areaCode
      )?.name,
      classificationName: treeToArray(state.energyType).find(
        (el: any) => `${el.code}` === state.energyTypeCode
      )?.name,
    };

    bus.emit('search-consumption', conParams);
    bus.emit('detail-consumption', DetailParams);
  };

  onMounted(async () => {
    await fetchData();
    search();
  });
</script>

<style lang="less" scoped>
  .energy-analysis-bg {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 1.5%;
    overflow-y: auto;
    .set-back('@/assets/imgs/load-forecast/home-bg.png');

    .search-box {
      display: flex;
      align-items: center;
      height: 76px;
      padding: 18px 24px;
      background: rgb(19 24 35 / 60%);
      border-radius: 4px;
      backdrop-filter: blur(5px);
    }

    .nhqs {
      position: absolute;
      top: 156px;
      width: 71%;
    }

    .nhpm {
      position: absolute;
      top: 590px;
      width: 57.5%;
    }

    .nhzb {
      position: absolute;
      top: 590px;
      right: 24px;
      width: 38.5%;
    }

    .nhmx {
      position: absolute;
      top: 932px;
      width: 97.5%;
    }

    .nhzj {
      position: absolute;
      top: 156px;
      right: 24px;
      width: 25.2%;
    }
  }
</style>
