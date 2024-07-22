<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-29 14:15:54
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-13 14:22:48
 * @FilePath: \emp-admin-ui\src\views\report-center\energy\index.vue
 * @Description: 用能报表
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="report-energy">
    <Breadcrumb :items="['报表中心', '运维报表']" />
    <div class="content-section">
      <div class="left-section">
        <div class="left-label">设备选择</div>
        <div class="project-info">
          <div class="project-icon"></div>
          <div class="project-label">{{ state.areaProjectName }}</div>
        </div>
        <div class="tab-content">
          <a-tree
            :data="state.deviceData"
            :default-expand-all="true"
            :field-names="{
              key: 'uniqueCode',
              title: 'name',
              children: 'children',
            }"
          >
          </a-tree>
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
                :time-picker-props="{
                  type: 'time-range',
                  format: 'HH:mm',
                  position: 'bl',
                }"
                :allow-clear="false"
              >
              </a-range-picker>
              <a-tooltip content-class="report-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  class="info"
                >
                  <g clip-path="url(#clip0_1783_26185)">
                    <path
                      d="M7.99967 14.6667C9.84061 14.6667 11.5073 13.9205 12.7137 12.7141C13.9201 11.5076 14.6663 9.84097 14.6663 8.00004C14.6663 6.15911 13.9201 4.49244 12.7137 3.28599C11.5073 2.07957 9.84061 1.33337 7.99967 1.33337C6.15874 1.33337 4.49207 2.07957 3.28563 3.28599C2.0792 4.49244 1.33301 6.15911 1.33301 8.00004C1.33301 9.84097 2.0792 11.5076 3.28563 12.7141C4.49207 13.9205 6.15874 14.6667 7.99967 14.6667Z"
                      stroke="#5F7292"
                      stroke-width="1.33333"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 9.54159V8.20825C9.10457 8.20825 10 7.31282 10 6.20825C10 5.10369 9.10457 4.20825 8 4.20825C6.89543 4.20825 6 5.10369 6 6.20825"
                      stroke="#5F7292"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.00033 12.5415C8.46056 12.5415 8.83366 12.1684 8.83366 11.7082C8.83366 11.248 8.46056 10.8749 8.00033 10.8749C7.54009 10.8749 7.16699 11.248 7.16699 11.7082C7.16699 12.1684 7.54009 12.5415 8.00033 12.5415Z"
                      fill="#5F7292"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1783_26185">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <template #content>
                  日期只筛选列表“开启率”与“报警次数”
                </template>
              </a-tooltip>
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
            <template #num="{ rowIndex }">
              {{
                rowIndex +
                1 +
                (state.queryParams.pageNum - 1) * state.queryParams.pageSize
              }}
            </template>

            <template #total>
              <div class="total">
                <div class="alarm">致命</div>
                <div>报警数/总数</div>
              </div>
            </template>

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
  } from '@/api/report-center/index';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { ShortcutType } from '@arco-design/web-vue';

  const { proxy } = getCurrentInstance() as any;

  interface cloumnObj {
    title: string;
    dataIndex?: string;
    slotName?: string;
    align: any;
  }

  const state = reactive({
    loading: false,
    areaData: [] as AreaInfo[],
    deviceData: [] as DeviceInfo[],
    areaProjectName: '',
    deviceProjectName: '',
    tableData: [
      {
        areaInfoNameSeq: '41',
        deadlyAlarmCount: 0,
        deviceInfoCode: '23',
        deviceInfoName: '123',
        installTime: '12',
        openRate: '421',
        runningTime: '124',
        totalAlarmCount: 0,
        totalRunningTime: '12',
      },
    ],
    columns: [
      {
        title: '序号',
        slotName: 'num',
        align: 'center',
      },
      {
        title: '设备名称',
        dataIndex: 'deviceInfoName',
        align: 'center',
      },
      {
        title: '设备编码',
        dataIndex: 'deviceInfoCode',
        align: 'center',
      },
      {
        title: '所在区域',
        dataIndex: 'areaInfoNameSeq',
        align: 'center',
      },
      {
        title: '安装日期',
        dataIndex: 'installTime',
        align: 'center',
      },
      {
        title: '运行时间',
        dataIndex: 'runningTime',
        align: 'center',
      },
      {
        title: '累计运行时间',
        dataIndex: 'totalRunningTime',
        align: 'center',
      },
      {
        title: '开启率',
        dataIndex: 'openRate',
        align: 'center',
      },
      {
        titleSlotName: 'total',
        dataIndex: 'totalAlarmCount',
        align: 'center',
      },
    ] as cloumnObj[],
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
    formatStr: 'YYYY-MM-DD HH:mm',
    selectedEnergyTypeLevel: undefined as number | undefined,
  });

  const getCurrentTime = () => {
    const currentTime = dayjs();
    const time = dayjs().subtract(7, 'day');
    return [
      dayjs(time.format(condition.formatStr), condition.formatStr),
      dayjs(currentTime.format(condition.formatStr), condition.formatStr),
    ];
  };

  condition.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());

  const rangeShortcuts = computed<ShortcutType[]>(() => {
    return [
      {
        label: '最近一个月',
        value: () => [dayjs().subtract(1, 'month').toDate(), dayjs().toDate()],
      },
      {
        label: '最近三个月',
        value: () => [dayjs().subtract(3, 'month').toDate(), dayjs().toDate()],
      },
      {
        label: '最近半年',
        value: () => [dayjs().subtract(6, 'month').toDate(), dayjs().toDate()],
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

  const getAreaTrees = async () => {
    try {
      const { data } = await listAreaTrees();
      state.areaProjectName = data[0].areaInfoName;
      state.areaData = data[0].children;
    } catch (err) {
      // Handle error (you can report using errorHandler or other methods)
    } finally {
      //
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
      //
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
      // state.tableData = data.records;
    } catch (err) {
      // Handle error (you can report using errorHandler or other methods)
    } finally {
      console.log('');
    }
  };

  onMounted(() => {
    getAreaTrees();
    getDevicesTrees();
    getAreaTableData();
  });
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

          .info {
            margin-left: 9px;
            outline: none;
            cursor: pointer;

            &:hover path {
              stroke: rgb(188 196 208);
            }
          }
        }

        .table-section {
          margin-top: 14px;

          .total {
            display: flex;
            align-items: center;

            .alarm {
              width: 44px;
              height: 28px;
              margin-right: 5px;
              line-height: 28px;
              text-align: center;
              background: #ff4d4f;
              border-radius: 2px;
            }
          }

          .tier {
            top: 0;
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 700px;
            // background: rgb(56 63 97 / 26%);
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

          :deep(.arco-table-tr-empty td.arco-table-td) {
            border: none !important;
          }
        }
      }
    }
  }
</style>
