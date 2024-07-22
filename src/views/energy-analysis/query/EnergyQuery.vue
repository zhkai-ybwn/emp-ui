<template>
  <div class="query-bg">
    <Breadcrumb :items="['用能分析', '能源查询']" />
    <div class="search-box">
      <a-form
        ref="queryRef"
        :model="state"
        layout="inline"
        :rules="rules"
        @submit="search"
      >
        <a-form-item field="selected" label="对象选择">
          <a-tree-select
            v-model="state.selected"
            :multiple="true"
            :max-tag-count="2"
            :allow-clear="true"
            :allow-search="true"
            :data="state.treeData"
            style="width: 305px"
            placeholder="请选择设备/对象"
            @change="treeChange"
          ></a-tree-select>
        </a-form-item>
        <a-form-item
          field="
            rangePicker"
          label="时间段选择"
          :help="
            state.rangePicker && state.rangePicker.length > 0
              ? ''
              : ' 请选择日期'
          "
          :validate-status="
            state.rangePicker && state.rangePicker.length > 0
              ? undefined
              : 'error'
          "
        >
          <template #label>
            <div
              ><span style="margin-right: 1px; color: #ff4d4f">*</span
              >时间段选择</div
            >
          </template>
          <a-range-picker
            v-model="state.rangePicker"
            shortcuts-position="left"
            :shortcuts="rangeShortcuts"
            :disabled-date="(current: any) => dayjs(current).isAfter(dayjs())"
            style="width: 300px"
            allow-clear
            popup-container=".query-bg"
          >
          </a-range-picker>
        </a-form-item>
        <a-form-item field="value" label="时间间隔">
          <a-select
            v-model="state.value"
            :style="{ width: '120px' }"
            allow-clear
            placeholder="请选择内容"
          >
            <a-option :value="1">10分钟</a-option>
            <a-option :value="2">30分钟</a-option>
            <a-option :value="3">小时</a-option>
            <a-option :value="4">天</a-option>
          </a-select>
        </a-form-item>
        <a-form-item hide-label>
          <a-space>
            <a-button type="primary" html-type="submit">
              <template #icon><icon-search /></template>查询
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item hide-label>
          <a-space>
            <a-button type="primary" @click="resetQuery">
              <template #icon><icon-refresh /></template>重置
            </a-button>
          </a-space>
        </a-form-item>
        <a-form-item hide-label style="flex: 1; justify-content: end">
          <a-space>
            <a-button type="primary" @click="exportExcel"> 导出 </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="contain">
      <ModuleBox :config="state.title">
        <div class="check">
          <a-checkbox-group v-model="state.selectBox" @change="changeBox">
            <a-checkbox
              v-for="(item, index) in state.selected"
              :key="index"
              :value="item"
            >
              <div :style="{ color: colorList[index] }">
                {{
                  state.faltTree.find((el) => +el.key === +item)
                    ? state.faltTree.find((el) => +el.key === +item)?.title
                    : ''
                }}
              </div>
            </a-checkbox>
          </a-checkbox-group>
          <div class="unit">单位：kW/kW</div>
        </div>
        <div class="chart">
          <LineChart
            v-if="state.show"
            :data="state"
            :time="state.rangePicker"
          ></LineChart>
        </div>
        <div class="table">
          <a-table
            ref="tableRef"
            row-key="id"
            :index="true"
            class="table"
            :data="state.data"
            :loading="state.loading"
            :virtual-list-props="{ height: 350 }"
            :columns="columns"
            :pagination="false"
            :bordered="false"
            size="large"
          >
          </a-table>
        </div>
      </ModuleBox>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { computed, reactive, getCurrentInstance } from 'vue';
  import { ShortcutType, Message, TableColumnData } from '@arco-design/web-vue';
  import bus from '@/utils/bus';
  import ModuleBox from '../common/ModuleBox2.vue';
  import LineChart from './components/LineChart.vue';

  // 默认配色
  const colorList = ['#4787F0', '#FA541C', '#FAAD14', '#52C41A', '#13C2C2'];

  const { proxy } = getCurrentInstance() as any;
  const rangePicker: Date[] = [];

  interface TreeNode {
    key: string;
    title: string;
    children?: TreeNode[];
  }

  function flattenArray(arr: any): TreeNode[] {
    let result: TreeNode[] = [];

    arr.forEach((item: any) => {
      result.push(item);
      if (item.children && item.children.length > 0) {
        result = result.concat(flattenArray(item.children));
      }
    });

    return result;
  }

  const columns: TableColumnData[] = [
    {
      title: '对象',
      dataIndex: 'index',
      headerCellClass: 'first-head',
      align: 'center',
    },
    {
      title: '整体值',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '平均值',
      dataIndex: 'nodeName',
      align: 'center',
    },
    {
      title: '10%最优平均值',
      dataIndex: 'classification',
      align: 'center',
    },
    {
      title: '10%最差平均值',
      dataIndex: 'energyValue',
      headerCellClass: 'last-head',
      align: 'center',
    },
  ];

  const state = reactive({
    loading: false,
    selectBox: [1],
    show: false,
    rangePicker,
    formatStr: 'YYYY-MM-DD',
    selected: [1],
    treeData: [
      {
        key: 1,
        title: '冷水机房#1',
        children: [
          {
            key: 2,
            title: '冷水机组#1',
          },
        ],
      },
      {
        key: 3,
        title: '冷水机房#2',
        children: [
          {
            key: 4,
            title: '冷水机组#1',
          },
          {
            key: 5,
            title: '冷水机组#2',
          },
          {
            key: 6,
            title: '冷水机组#3',
          },
        ],
      },
    ],
    value: 3,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '能效评价(COP)',
      Height: `calc(100vh - 240px)`,
    },
    dataList: [],
    faltTree: [] as TreeNode[],
    data: [
      {
        index: 'Object 1',
        time: 100,
        nodeName: 80,
        classification: 90,
        energyValue: 70,
      },
      {
        index: 'Object 2',
        time: 120,
        nodeName: 85,
        classification: 95,
        energyValue: 75,
      },
      {
        index: 'Object 3',
        time: 110,
        nodeName: 75,
        classification: 85,
        energyValue: 65,
      },
      {
        index: 'Object 3',
        time: 110,
        nodeName: 75,
        classification: 85,
        energyValue: 65,
      },
    ],
  });

  state.faltTree = flattenArray(state.treeData);

  const rangeShortcuts = computed<ShortcutType[]>(() => {
    return [
      {
        label: '最近一天',
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
    ];
  });

  const getCurrentTime = () => {
    const currentTime = dayjs();
    return [
      dayjs(
        currentTime.subtract(1, 'day').format(state.formatStr),
        state.formatStr
      ),
      dayjs(currentTime.format(state.formatStr), state.formatStr),
    ];
  };
  state.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());

  const treeChange = (value: any) => {
    if (value && value.length > 5) {
      // 如果选择的标签数量超过五个，则截取前五个标签
      state.selected = value.slice(0, 5);
      Message.error({
        content: '最多只能选择五个标签',
        closable: true,
        duration: 3000,
      });
    }
    state.selectBox = state.selected;
  };

  const changeBox = (value: any) => {
    console.log(value);
  };

  const fetchData = async () => {
    try {
      state.show = false;
      state.dataList = [
        // @ts-ignore
        [state.rangePicker[0], 1000],
        // @ts-ignore
        [state.rangePicker[1], 1000],
      ];
      state.show = true;
    } catch (err) {
      console.error(err);
    }
  };
  fetchData();

  const rules = {
    selected: { required: true, message: '请选择设备/对象' },
    value: { required: true, message: '请选择时间间隔' },
  };

  const search = () => {
    bus.emit('search', state);

    fetchData();
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    proxy.$refs.queryRef.resetFields();
    state.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());
    state.value = 3;
    fetchData();
  };

  const exportExcel = () => {
    try {
      Message.success({
        content: '导出成功',
        closable: true,
        duration: 3000,
      });
    } catch (err) {
      Message.error({
        content: '导出失败',
        closable: true,
        duration: 3000,
      });
    } finally {
      //
    }
  };
</script>

<style lang="less" scoped>
  .query-bg {
    position: relative;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0 24px;
    .set-back('@/assets/imgs/load-forecast/home-bg.png');

    .search-box {
      display: flex;
      align-items: center;
      height: 76px;
      margin-bottom: 24px;
      padding: 18px 24px;
      background: rgb(19 24 35 / 60%);
      border-radius: 4px;
      backdrop-filter: blur(5px);
    }

    :deep(.arco-form-item-content-flex) {
      justify-content: end;
    }

    .contain {
      display: flex;
      flex-direction: column;
      padding-bottom: 24px;

      .check {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 0 24px;

        .unit {
          height: 20px;
          color: #fff;
          font-weight: 400;
          font-size: 14px;
          font-family: HarmonyOS-Regular, sans-serif;
          line-height: 20px;
        }
      }

      .chart {
        flex: 1;
        margin-bottom: 24px;
        padding: 0 24px;
      }

      .table {
        height: 268px;
        padding: 0 24px;

        :deep(.arco-table-cell-with-sorter:hover) {
          width: fit-content;
          height: 30px;
          background: rgb(205 207 216 / 10%);
          border-radius: 4px;
        }

        :deep(.arco-table-th) {
          height: 44px;
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 20px; /* 125% */
          background: rgb(65 79 108 / 26%);

          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }

          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }

        :deep(tr.arco-table-tr:hover) {
          background: rgb(65 79 108 / 26%);

          .arco-table-td:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }

          .arco-table-td:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }

        :deep(.arco-table-td) {
          height: 70px;
          color: rgb(255 255 255 / 80%);
          font-size: 16px;
          background: transparent;
          border-color: rgb(255 255 255 /10%);
        }

        :deep(.arco-table-body) {
          background: none;
        }

        :deep(.arco-table-header) {
          // background: rgb(65 79 108 / 26%);
          background: none;
        }
      }
    }
  }

  :deep(.arco-form-item-label-col) {
    padding-right: 5px;
  }
</style>
