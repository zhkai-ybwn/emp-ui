<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-29 14:15:54
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-21 15:15:31
 * @FilePath: \emp-admin-ui\src\views\report-center\energy\index.vue
 * @Description: 用能报表
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="report-energy">
    <Breadcrumb :items="['报表中心', '用能报表']" />
    <div class="content-section">
      <div class="left-section">
        <div class="left-label">区域设备选择</div>
        <div class="project-info">
          <div class="project-icon"></div>
          <div class="project-label">{{
            state.activeTab === '1'
              ? state.areaProjectName
              : state.deviceProjectName
          }}</div>
        </div>
        <div class="tab-content">
          <a-tabs
            :active-key="state.activeTab"
            :default-active-key="state.activeTab"
            @tab-click="setActiveTab"
          >
            <a-tab-pane key="1" title="区域" class="tab-pane-content">
              <a-tree
                v-if="showAreaTree"
                :data="state.areaData"
                :default-expand-all="true"
                :field-names="{
                  key: 'areaInfoId',
                  title: 'areaInfoName',
                  children: 'children',
                }"
              ></a-tree>
            </a-tab-pane>
            <a-tab-pane key="2" title="设备" class="tab-pane-content">
              <a-tree
                v-if="showDeviceTree"
                :data="state.deviceData"
                :default-expand-all="true"
                :field-names="{
                  key: 'uniqueCode',
                  title: 'name',
                  children: 'children',
                }"
              >
              </a-tree
            ></a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="right-section">
        <div class="search-condition-section">
          <a-form ref="queryRef" :model="condition" layout="inline">
            <a-form-item field="rangePicker" hide-label>
              <a-range-picker
                v-model="condition.rangePicker"
                shortcuts-position="left"
                :shortcuts="rangeShortcuts"
                :disabled-date="(current:any) => dayjs(current).isAfter(dayjs())"
                :disabled-time="disabledDateTime"
                style="width: 420px"
                :format="'YYYY-MM-DD HH:mm'"
                show-time
                :allow-clear="false"
              >
              </a-range-picker>
            </a-form-item>
            <a-form-item field="energyType" hide-label>
              <a-select
                v-model="condition.energyType"
                style="width: 140px"
                :options="energyTypes"
                placeholder="能源类型"
                :allow-clear="true"
              ></a-select>
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
                <a-button type="primary" @click="resetQuery">
                  <template #icon><icon-refresh /></template>重置
                </a-button>
              </a-space>
            </a-form-item>
            <a-form-item hide-label class="export-btn">
              <a-space>
                <a-button type="primary">导出</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <div class="table-section">
          <a-table
            :bordered="false"
            :columns="state.columns"
            :data="state.tableData"
            :summary="summary"
            size="large"
            :pagination="{
              // showTotal: true,
              // showPageSize: true,
              total: state.total,
              current: state.queryParams.pageNum,
              pageSize: 15,
              showJumper: true,
              pageItemStyle: {
                borderRadius: ' 4px',
                border: '1px solid #3C485C',
              },
              activePageItemStyle: {
                backgroundColor: '#266FE8',
                borderRadius: ' 4px',
                color: 'rgba(255,255,255,0.85)',
              },
            }"
          >
            <template #empty>
              <div class="tier">
                <div class="icon"></div>
                <div class="text">暂无搜索结果</div>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    AreaInfo,
    listAreaTrees,
    DeviceInfo,
    listDeviceTrees,
    listAreaEnergyPages,
    listDeviceEnergyPages,
    EnergyRes,
    EnergyReq,
    Record,
  } from '@/api/report-center/index';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { ShortcutType } from '@arco-design/web-vue';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

  const { proxy } = getCurrentInstance() as any;

  const energyTypes = ref<SelectOptionData[]>([
    {
      value: '0',
      label: '电能',
    },
  ]);

  interface cloumnObj {
    title: string;
    dataIndex: string;
    align: any;
  }

  const state = reactive({
    loading: false,
    areaData: [] as AreaInfo[],
    deviceData: [] as DeviceInfo[],
    areaProjectName: '',
    deviceProjectName: '',
    activeTab: '1',
    tableData: [] as Record[],
    columns: [] as cloumnObj[],
    total: 16,
    // 查询参数
    queryParams: {
      startTime: '',
      endTime: '',
      reportType: '',
      fromType: '',
      pageNum: 1,
      pageSize: 10,
      reportName: '',
    },
  });

  const rangePicker: Date[] = [];

  const condition = reactive({
    energyType: '0',
    rangePicker,
    formatStr: 'YYYY-MM-DD HH:mm:ss',
    selectedEnergyTypeLevel: undefined as number | undefined,
  });

  const getCurrentTime = () => {
    const currentTime = dayjs();
    const todayStart = dayjs().startOf('day');
    return [
      dayjs(todayStart.format(condition.formatStr), condition.formatStr),
      dayjs(currentTime.format(condition.formatStr), condition.formatStr),
    ];
  };

  condition.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());

  const rangeShortcuts = computed<ShortcutType[]>(() => {
    return [
      {
        label: '今天开始~现在',
        value: (): Date[] => [
          dayjs().startOf('day').toDate(),
          dayjs().toDate(),
        ],
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

  const disabledHours = () => {
    const hours = [];
    const currentHour = dayjs().hour();
    // eslint-disable-next-line no-plusplus
    for (let i = currentHour + 1; i <= 24; i++) {
      hours.push(i);
    }

    return hours;
  };
  const disabledMinutes = (selectedHour: any) => {
    const minutes = [];
    const currentMinute = dayjs().minute();
    if (selectedHour === dayjs().hour()) {
      // eslint-disable-next-line no-plusplus
      for (let i = currentMinute; i <= 60; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  const disabledDateTime = (dates: any) => {
    const currentDay = dayjs();
    if (dates && dayjs(dates).isSame(currentDay, 'day')) {
      return {
        disabledHours: () => disabledHours(),
        disabledMinutes: () => disabledMinutes(dayjs(dates).hour()),
        disabledSeconds: () => [],
      };
    }
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    proxy.$refs.queryRef.resetFields();
    condition.rangePicker = getCurrentTime().map((dayjsObj) =>
      dayjsObj.toDate()
    );
  };

  const search = () => {};

  const showAreaTree = computed(() => {
    return (
      state.areaData && state.areaData.length > 0 && state.activeTab === '1'
    );
  });

  const showDeviceTree = computed(() => {
    return (
      state.deviceData && state.deviceData.length > 0 && state.activeTab === '2'
    );
  });

  const getAreaTrees = async () => {
    try {
      const { data } = await listAreaTrees();
      state.areaProjectName = data[0].areaInfoName;
      state.areaData = data[0].children;
    } catch (err) {
      // Handle error (you can report using errorHandler or other methods)
    } finally {
      console.log('');
    }
  };
  const getDevicesTrees = async () => {
    try {
      const { data } = await listDeviceTrees();
      state.deviceProjectName = data[0].name;
      state.deviceData = data[0].children;
    } catch (err) {
      // Handle error (you can report using errorHandler or other methods)
    } finally {
      console.log('');
    }
  };
  const getAreaTableData = async () => {
    try {
      const params = {
        areaInfoId: 0,
        classificationCode: '',
        endTime: '',
        page: 1,
        pageNum: 1,
        pageSize: 10,
        size: 10,
        startTime: '',
      };
      const { data } = await listAreaEnergyPages(params);
      state.tableData = data.records;
      state.columns = Object.keys(data.records[0])
        .filter((key) => key !== 'report_time')
        .map((key) => ({
          title: key,
          dataIndex: key,
          align: 'center',
        }));
      state.columns.unshift({
        title: '时间',
        dataIndex: 'report_time',
        align: 'center',
      });
    } catch (err) {
      // Handle error (you can report using errorHandler or other methods)
    } finally {
      console.log('');
    }
  };
  const summary = () => {
    const lastRecord = state.tableData[state.tableData.length - 1];
    const c = {};
    let flag = false;
    // @ts-ignore
    state.columns.forEach((item, index) => {
      if (item.dataIndex !== 'report_time') {
        // @ts-ignore
        c[item.dataIndex] = flag
          ? // @ts-ignore
            lastRecord.totalValue[index - 1]
          : // @ts-ignore
            lastRecord.totalValue[index];
      } else {
        // @ts-ignore
        c[item.dataIndex] = '总计';
        flag = true;
      }
    });
    return [c];
  };
  onMounted(() => {
    getAreaTrees();
    getDevicesTrees();
    getAreaTableData();
  });
  const setActiveTab = (v: any) => {
    if (v === '1') getAreaTrees();
    if (v === '2') getDevicesTrees();
    state.activeTab = v;
  };
</script>

<style lang="less" scoped>
  .report-energy {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 1.5%;
    overflow-y: auto;
    // .set-back('@/assets/imgs/load-forecast/home-bg.png');
    .content-section {
      display: flex;

      .left-section {
        width: 11.96%;
        background: rgb(19 24 35 / 60%);
        border-right: 1px solid rgb(56 63 97 / 26%);
        border-radius: 4px 0 0 4px;
        backdrop-filter: blur(5px);

        .left-label {
          display: flex;
          align-items: center;
          height: 56px;
          padding: 8px 16px;
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 22px;
        }

        .project-info {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 4px 16px;
          background: linear-gradient(
            270deg,
            rgb(131 142 168 / 26%) 0%,
            rgb(188 201 223 / 10%) 100%
          );
          border-bottom: 1px solid rgb(56 63 97 / 26%);
          border-radius: 2px;

          .project-icon {
            width: 16px;
            height: 16px;
            .set-back('@/assets/imgs/report-center/project-label-icon.png');
          }

          .project-label {
            color: #266fe8;
            font-weight: 400;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            line-height: 24px;
          }
        }

        .tab-content {
          .tab-pane-content {
            max-height: 792px;
            overflow-y: auto;
          }
        }
      }

      .right-section {
        width: 88.04%;
        padding: 24px;
        background: rgb(19 24 35 / 60%);
        border-radius: 0 4px 4px 0;
        backdrop-filter: blur(5px);

        .search-condition-section {
          .export-btn {
            margin-right: 0;
            margin-left: auto;
          }
        }

        .table-section {
          margin-top: 14px;

          .tier {
            top: 0;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 804px;
            background: rgb(56 63 97 / 26%);
            border-radius: 0 0 4px 4px;

            .icon {
              width: 160px;
              height: 160px;
              background-image: url('@/assets/imgs/manage/table-no-data.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }

            .text {
              color: #a5a9b8;
              font-weight: 400;
              font-size: 16px;
              font-family: SourceHanSansCN-Regular, sans-serif;
              font-style: normal;
              text-align: right;
            }
          }

          //
          // #region 表格样式重写
          :deep(.arco-table-content) {
            tbody {
              order: 1 !important;
            }
          }

          :deep(.arco-form-item-label-col) {
            padding: 0;
          }

          :deep(.arco-form-item-layout-inline) {
            margin-right: 30px;
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
            color: rgb(255 255 255 / 80%);
            font-size: 16px;
            background: transparent;
            border-color: rgb(255 255 255 /10%);
          }

          :deep(li.arco-pagination-item.arco-pagination-item-ellipsis) {
            border: none !important;
          }

          :deep(span.arco-pagination-item) {
            border: none !important;
          }

          :deep(
              .arco-table-tr-empty .arco-table-cell.arco-table-cell-align-left
            ) {
            padding: 0;
          }
          // #endregion
        }
      }
    }
  }
</style>
