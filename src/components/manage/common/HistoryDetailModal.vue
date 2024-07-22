<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-11-09 09:31:42
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-07 15:42:34
 * @FilePath: \emp-admin-ui\src\components\manage\common\HistoryDetailModal.vue
 * @Description: 报警详情 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="blur-box">
    <div class="alarm-detail-modal">
      <div class="tool-box">
        <!-- 标题、关闭按钮 -->
        <div class="title-close">
          <div class="title">报警详情</div>
          <div class="close" @click="closeDetailModal"></div>
        </div>
      </div>
      <div class="info-box">
        <!-- 报警等级、状态、次数 -->
        <div class="level-status-count">
          <div
            class="level"
            :style="{
              background: getLevelColor(state.alarmLevel.mes),
              borderColor: getLevelColor(state.alarmLevel.mes),
            }"
          >
            {{ state.alarmLevel.mes }}
          </div>
          <div class="status">报警中</div>
          <div class="status">{{ `${state.alarmCount}次` }}</div>
        </div>
        <!-- 报警信息、处理建议 -->
        <div class="info-advice">
          {{
            formatInfo(state.alarmTxt).split(',').join('，').replace('\n', '')
          }}
        </div>
        <div class="position-section common-label-text">
          <!-- 报警区域 -->
          <div class="alarm-area">
            <span class="label">报警区域：</span>
            <span class="text">{{ formatInfo(state.areaName) }}</span>
          </div>
          <!-- 设备名称 -->
          <div class="device-name">
            <span class="label">设备名称：</span>
            <span class="text">{{ formatInfo(state.deviceName) }}</span>
          </div>
          <!-- 报警指标 -->
          <div class="alarm-index">
            <span class="label">报警指标：</span>
            <span class="text">{{ formatInfo(state.indicatorName) }}</span>
          </div>
        </div>
        <div class="time-section common-label-text">
          <!-- 首次报警时间、恢复时间 -->
          <div class="first-restore-time">
            <div class="first">
              <span class="label">首次报警时间：</span>
              <span class="text">{{ formatInfo(state.firstTime) }}</span>
            </div>
            <div class="restore">
              <span class="label">恢复时间：</span>
              <span class="text">{{ formatInfo(state.recoverTime) }}</span>
            </div>
          </div>
          <!-- 最近报警时间、处理时间 -->
          <div class="recently-deal-time">
            <div class="recently">
              <span class="label">最近报警时间：</span>
              <span class="text">{{ formatInfo(state.lastTime) }}</span>
            </div>
            <div class="deal">
              <span class="label">处理时间：</span>
              <span class="text">{{ formatInfo(state.dealTime) }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 报警历史履历 -->
      <div class="table-box">
        <a-table
          :row-key="(record) => record.alarmInfoId"
          :data="state.historyList"
          :pagination="pagination"
          :columns="state.columns"
          :ellipsis="true"
          :bordered="false"
          @page-change="handlePageChange"
        >
          <template #index="{ rowIndex }">
            {{ rowIndex + 1 + (state.current - 1) * state.pageSize }}
          </template>
        </a-table>
        <div v-if="state.tableLoad" class="loading-tier">
          <a-spin tip="加载中" />
        </div>
        <div v-if="state.historyList.length <= 0" class="empty-tier">
          <div class="icon"></div>
          <div class="null-text">数据走失了~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import bus from '@/utils/bus';
  import { getHisAlarmDetail } from '@/api/alarm';

  const props = defineProps({
    alarmInfoId: {
      type: Number,
      default: 1,
    },
  });

  const state = reactive({
    current: 1,
    pageSize: 5,
    alarmCount: 0,
    alarmLevel: {
      mes: '',
    },
    alarmTxt: '',
    areaName: '',
    deviceName: '',
    indicatorName: '',
    firstTime: '',
    recoverTime: '',
    lastTime: '',
    dealTime: '',
    historyList: [],
    columns: [
      {
        title: '序号',
        dataIndex: 'index',
        slotName: 'index',
        key: 'index',
        align: 'center',
        ellipsis: true,
        width: 100,
      },
      {
        title: '时间',
        key: 'alarmTime',
        dataIndex: 'alarmTime',
        align: 'center',
        ellipsis: true,
        width: 200,
      },
      {
        title: '报警信息',
        key: 'alarmContent',
        dataIndex: 'alarmContent',
        ellipsis: true,
        align: 'center',
        width: 300,
      },
      {
        title: '报警值',
        key: 'indicatorValue',
        dataIndex: 'indicatorValue',
        ellipsis: true,
        align: 'center',
        width: 100,
      },
    ],
    tableLoad: false,
    total: 0,
  });

  const pagination = computed(() => ({
    total: state.total,
    // current: state.current,
    pageSize: state.pageSize,
    showTotal: true,
    defaultPageSize: 10,
    showSizeChanger: false, // 是否显示pagesize选择
    showQuickJumper: true, // 是否显示跳转窗
    pageItemStyle: { borderRadius: ' 4px', border: '1px solid #3C485C' },
    activePageItemStyle: {
      backgroundColor: '#266FE8',
      borderRadius: ' 4px',
      color: 'rgba(255,255,255,0.85)',
    },
  }));

  const getParam = () => {
    // const param: {
    //   alarmInfoId?: number,
    //   pageNum?: number,
    //   pageSize?: number,
    // } = {};
    const param = {};
    if (props.alarmInfoId) {
      param.alarmInfoId = props.alarmInfoId;
    }
    if (state.current) param.pageNum = state.current;
    if (state.pageSize) param.pageSize = state.pageSize;
    return param;
  };

  const getData = async () => {
    state.tableLoad = true;
    try {
      const res = await getHisAlarmDetail(getParam());
      state.total = res.data.pageResult.total;
      const detail = res.data.alarmDetailSimpleVO;
      state.alarmCount = detail.alarmCount;
      state.alarmLevel = detail.alarmLevel;
      state.alarmTxt = detail.alarmTxt;
      state.areaName = detail.areaName;
      state.deviceName = detail.deviceName;
      state.indicatorName = detail.indicatorName;
      state.firstTime = detail.firstTime;
      state.recoverTime = detail.recoverTime;
      state.lastTime = detail.lastTime;
      state.dealTime = detail.dealTime;
      state.historyList = res.data.pageResult.records;
      state.tableLoad = false;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  // 列表当前页更改
  const handlePageChange = (pag) => {
    state.current = pag;
    // state.pageSize = pag.pageSize;
    getData();
  };

  const closeDetailModal = () => {
    bus.emit('close-detail-modal');
  };

  const getLevelColor = (mes) => {
    switch (mes) {
      case '严重':
        return '#FA8214';
      case '致命':
        return '#FF4D4F';
      case '一般':
        return '#1890FF';
      case '提示':
        return '#18A02E';
      default:
        return '#1890FF';
    }
  };

  const formatInfo = (text) => text || '-';

  onMounted(() => {
    document.body.style.overflow = 'hidden';
    getData();
  });

  onBeforeUnmount(() => {
    document.body.style.overflow = '';
  });
</script>

<style lang="less" scoped>
  body {
    overflow: hidden;
  }

  .blur-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 26%);

    .alarm-detail-modal {
      display: flex;
      flex-direction: column;
      width: 43.75%;
      min-width: 776px;
      height: fit-content;
      padding: 32px;
      background: #2f3746;
      border-radius: 8px;
      box-shadow: 0 8px 10px -5px rgb(0 0 0 / 8%),
        0 16px 24px 2px rgb(0 0 0 / 4%), 0 6px 30px 5px rgb(0 0 0 / 5%);

      .tool-box {
        height: 3.5%;

        .title-close {
          display: flex;
          justify-content: space-between;

          .title {
            overflow: hidden;
            color: rgb(255 255 255 / 90%);
            font-weight: 500;
            font-size: 16px;
            font-family: HarmonyOS-Regular, sans-serif;
            font-style: normal;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .close {
            width: 20px;
            height: 20px;
            background-image: url('@/assets/imgs/manage/detail-close-icon.svg');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
          }
        }
      }

      .info-box {
        display: flex;
        flex-direction: column;
        height: fit-content;
        margin-top: 24px;

        .level-status-count {
          display: flex;
          justify-content: flex-start;
          color: #f7f7f9;
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 24px;
          text-align: center;

          .level {
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: fit-content;
            padding: 2px 6px;
            border: 1px solid;
            border-radius: 2px;
          }

          .status {
            display: flex;
            align-items: center;
            justify-content: center;
            width: fit-content;
            height: fit-content;
            margin-left: 16px;
            padding: 2px 6px;
            background: rgb(255 77 79 / 26%);
            border: 1px solid #ff4d4f;
            border-radius: 2px;
          }
        }

        .info-advice {
          margin-top: 16px;
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 24px;
        }

        .common-label-text {
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 24px;

          .label {
            color: rgb(255 255 255 / 40%);
          }

          .text {
            color: rgb(255 255 255 / 80%);
          }
        }

        .position-section {
          margin-top: 16px;
        }

        .time-section {
          margin-top: 16px;

          .first-restore-time {
            display: flex;

            .restore {
              margin-left: 38px;
            }
          }

          .recently-deal-time {
            display: flex;

            .deal {
              margin-left: 38px;
            }
          }
        }
      }

      .table-box {
        position: relative;
        height: 48.33%;
        margin-top: 24px;

        ::v-deep(.arco-table-th) {
          height: 36px !important;
          color: rgb(255 255 255 / 80%);
          background: rgb(17 29 44 / 60%) !important;

          &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }

          &:last-child {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }

          &::before {
            display: none;
          }
        }

        .loading-tier {
          position: absolute;
          top: 36px;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 80%;
          background: rgb(20 27 41 / 26%);
          border-radius: 0 0 4px 4px;
          backdrop-filter: blur(100px);
        }

        .empty-tier {
          position: absolute;
          top: 36px;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 80%;
          background: rgb(20 27 41 / 26%);
          border-radius: 0 0 4px 4px;
          backdrop-filter: blur(100px);

          .icon {
            width: 54px;
            height: 36px;
            background-image: url('../../../assets/imgs/manage/modal-no-data.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .null-text {
            width: 78px;
            height: 24px;
            color: #a5a9b8;
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-style: normal;
            line-height: 24px;
            text-align: center;
          }
        }
      }
    }
  }

  .ee {
    color: blue !important;
  }

  :deep(li.arco-pagination-item.arco-pagination-item-ellipsis) {
    border: none !important;
  }

  :deep(span.arco-pagination-item) {
    border: none !important;
  }
</style>
