<template>
  <div class="app-container">
    <Breadcrumb :items="['报警管理', '实时报警']" />
    <!-- 头部区域 -->
    <div class="header">
      <!-- 搜索栏 -->
      <a-form ref="queryRef" :model="data" layout="inline">
        <a-form-item field="rangePicker" hide-label>
          <a-range-picker
            v-model="data.rangePicker"
            style="width: 300px"
            :disabled-date="(current) => dayjs(current).isAfter(dayjs())"
            @change="handleQuery"
          />
        </a-form-item>
        <a-form-item field="areaCode">
          <a-tree-select
            v-model="data.areaCode"
            :data="data.areaData"
            :load-more="loadMore"
            placeholder="报警区域"
            allow-clear
            style="width: 220px"
            @change="handleQuery"
          ></a-tree-select>
        </a-form-item>
        <a-form-item field="alarmClass" hide-label>
          <a-select
            v-model="data.alarmClass"
            :options="alarmType"
            placeholder="报警类型"
            allow-clear
            style="width: 150px"
            @change="handleQuery"
          />
        </a-form-item>
        <a-form-item field="alarmLevel" hide-label>
          <a-select
            v-model="data.alarmLevel"
            placeholder="报警等级"
            allow-clear
            style="width: 150px"
            @change="handleQuery"
          >
            <a-option value="4" label="致命">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame 48288">
                  <circle id="Ellipse 88" cx="6" cy="6" r="4" fill="#FF4D4F" />
                </g>
              </svg>
              &nbsp;&nbsp;致命
            </a-option>
            <a-option value="3" label="严重">
              <!-- <img src="../../../assets/imgs/manage/select-option-yz.svg" /> -->
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame 48288">
                  <circle id="Ellipse 88" cx="6" cy="6" r="4" fill="#FA8214" />
                </g>
              </svg>
              &nbsp;&nbsp;严重
            </a-option>
            <a-option value="2" label="一般">
              <!-- <img src="../../../assets/imgs/manage/select-option-yb.svg" />
               -->
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame 48288">
                  <circle id="Ellipse 88" cx="6" cy="6" r="4" fill="#1890FF" />
                </g>
              </svg>
              &nbsp;&nbsp;一般
            </a-option>
            <a-option value="1" label="提示">
              <!-- <img src="../../../assets/imgs/manage/select-option-ts.svg" /> -->
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Frame 48288">
                  <circle id="Ellipse 88" cx="6" cy="6" r="4" fill="#18A02E" />
                </g>
              </svg>
              &nbsp;&nbsp;提示
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="content" hide-label>
          <a-input-search
            v-model="data.content"
            :style="{ width: '220px' }"
            placeholder="报警对象/报警信息"
            allow-clear
            search-button
            @press-enter="handleQuery"
            @search="handleQuery"
          />
        </a-form-item>
        <a-form-item hide-label>
          <a-space>
            <a-button type="primary" @click="resetQuery">
              <template #icon><icon-refresh /></template>重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>

    <!-- 列表区域 -->
    <div class="contain">
      <a-table
        ref="tableRef"
        row-key="id"
        :data="data.dataList"
        :loading="data.tableLoad"
        :pagination="{
          // showTotal: true,
          // showPageSize: true,
          total: data.total,
          current: data.pageNum,
          showJumper: true,
          baseSize: 6,
          bufferSize: 2,
          pageItemStyle: { borderRadius: ' 4px', border: '1px solid #3C485C' },
          activePageItemStyle: {
            backgroundColor: '#266FE8',
            borderRadius: ' 4px',
            color: 'rgba(255,255,255,0.85)',
          },
        }"
        :bordered="false"
        size="large"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #columns>
          <a-table-column title="报警时间" align="center">
            <template #cell="{ record }">
              <span style="margin-right: 5px; color: rgb(255 255 255 / 26%)">{{
                record.firstTime ? record.firstTime.split(' ')[0] : '-'
              }}</span>
              <span>{{
                record.firstTime
                  ? record.firstTime.split(' ')[1]
                  : record.firstTime
              }}</span>
            </template>
          </a-table-column>
          <a-table-column title="报警等级" align="center">
            <template #cell="{ record }">
              <span>
                <a-tag :color="getTagColor(record.alarmLevel.mes)">
                  {{ record.alarmLevel.mes }}
                </a-tag>
              </span>
            </template>
          </a-table-column>
          <a-table-column
            title="报警对象"
            data-index="deviceName"
            align="center"
          />
          <a-table-column
            title="报警区域"
            data-index="areaName"
            align="center"
          />
          <a-table-column
            title="报警信息"
            data-index="alarmContent"
            :tooltip="true"
            :ellipsis="true"
            :header-cell-style="{ padding: '0 150px' }"
            align="left"
            :width="400"
          />
          <a-table-column
            title="处理建议"
            :tooltip="true"
            :ellipsis="true"
            data-index="dealAdvice"
            align="center"
          />
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-popconfirm
                content="确认处理该条报警信息吗?"
                type="warning"
                @ok="dealAlarmF(record.alarmInfoId)"
              >
                <a-button type="primary">处理</a-button>
              </a-popconfirm>
              <a-button
                type="text"
                style="margin-left: 24px"
                @click="showDetailModal(record.alarmInfoId)"
                >详情</a-button
              ></template
            >
          </a-table-column>
        </template>
        <template #empty>
          <div class="tier">
            <div class="icon"></div>
            <div class="text">暂无搜索结果</div>
          </div>
        </template>
      </a-table>
      <div v-if="data.total !== 0" class="total">共{{ data.total }}项数据</div>

      <!-- <div v-if="data.tableLoad" class="tier">
        <a-spin dot tip="加载中" />
      </div> -->
      <!-- <div v-if="data.dataList.length <= 0" class="tier">
        <div class="icon"></div>
        <div class="text">暂无搜索结果</div>
      </div> -->
    </div>
    <DetailModal
      v-if="data.showDetail"
      :alarm-info-id="data.currentAlarmId"
      class="dam"
    ></DetailModal>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import { TreeNodeData, Message } from '@arco-design/web-vue';
  import '@/assets/style/dark.less';
  import bus from '@/utils/bus';
  import DetailModal from '@/components/manage/common/DetailModal.vue';
  import useEchart from '@/hooks/useEchart';
  import {
    listRealAlarms,
    Param,
    RealAlarm,
    listAreaInfos,
    dealAlarm,
  } from '@/api/alarm';

  const { proxy } = getCurrentInstance() as any;
  // @ts-ignore
  const { looping } = useEchart();

  const alarmType = ref<SelectOptionData[]>([
    {
      value: '0',
      label: '设备',
    },
    {
      value: '1',
      label: '事件',
    },
  ]);
  const rangePicker: Date[] = [];

  const data = reactive({
    tableLoad: false,
    rangePicker,
    areaData: [],
    alarmClass: undefined,
    alarmLevel: undefined,
    areaCode: undefined,
    content: undefined,
    pageNum: 1,
    pageSize: 10,
    formatStr: 'YYYY-MM-DD',
    dataList: [] as RealAlarm[],
    total: 0,
    showDetail: false,
    currentAlarmId: 0,
  });

  onMounted(() => {
    getAreaList(0);
    // getData();
  });

  const getCurrentTimeAndOneWeekAgo = () => {
    const currentTime = dayjs();
    const oneWeekAgo = currentTime.subtract(1, 'week');
    return [
      dayjs(oneWeekAgo.format(data.formatStr), data.formatStr),
      dayjs(currentTime.format(data.formatStr), data.formatStr),
    ];
  };
  data.rangePicker = getCurrentTimeAndOneWeekAgo().map((dayjsObj) =>
    dayjsObj.toDate()
  );

  // 区域
  const getAreaList = async (parentId: any) => {
    const params = new FormData();
    params.append('parentId', parentId);
    try {
      // @ts-ignore
      const { data: res } = await listAreaInfos(params);
      // @ts-ignore
      data.areaData = res.map((item: any) => ({
        title: item.areaInfoName,
        value: item.id,
        parentId: item.id,
        key: item.areaInfoCode,
      }));
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  const loadMore = (nodeData: TreeNodeData): Promise<void> => {
    const nodeD = nodeData as any;
    const { value } = nodeD;
    const params = new FormData();
    params.append('parentId', `${value}`);
    return new Promise((resolve) => {
      setTimeout(async () => {
        // @ts-ignore
        const { data: res } = await listAreaInfos(params);
        nodeData.children = res.map((item: any) => ({
          title: item.areaInfoName,
          value: item.id,
          parentId: item.parentId,
          key: item.areaInfoCode,
          isLeaf: !item.hasChild,
        }));
        resolve();
      }, 100);
    });
  };

  /**
   * 查询列表
   *
   * @param params 查询参数
   */

  const getParam = () => {
    const param: Param = {};
    if (data.alarmClass) {
      param.alarmClass = {
        code: 0,
        mes: '',
        value: data.alarmClass,
      };
    }
    if (data.alarmLevel) {
      param.alarmLevel = {
        code: 0,
        mes: '',
        value: data.alarmLevel,
      };
    }
    if (data.areaCode) param.areaCode = data.areaCode;

    if (data.content) param.content = data.content;
    if (data.rangePicker?.length > 0) {
      param.startTime = `${dayjs(data.rangePicker[0]).format(
        data.formatStr
      )} 00:00:00`;
      param.endTime = `${dayjs(data.rangePicker[1]).format(
        data.formatStr
      )} 23:59:59`;
    }
    param.pageNum = data.pageNum;
    param.pageSize = data.pageSize;
    return param;
  };

  const fetchData = async () => {
    data.tableLoad = true;
    try {
      const { data: res } = await listRealAlarms(getParam());
      data.dataList = res.records;
      data.total = res.total;
      data.pageNum = res.current;
      data.pageSize = res.size;
      data.tableLoad = false;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  const dealAlarmF = async (record: string) => {
    const params = new FormData();
    params.append('alarmInfoId', record);
    try {
      const res = await dealAlarm(params);
      if (res.code === 200) {
        Message.success({
          content: '处理成功，可进入历史报警查看',
          closable: true,
        });
        fetchData();
      } else if (res.code === 1001) {
        Message.error({
          content: res.message,
          closable: true,
        });
        fetchData();
      } else {
        Message.error({
          content: '处理失败，请联系管理员',
          closable: true,
        });
        fetchData();
      }
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  /**
   * 查询
   */
  const handleQuery = () => {
    fetchData();
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    proxy.$refs.queryRef.resetFields();
    data.rangePicker = getCurrentTimeAndOneWeekAgo().map((dayjsObj) =>
      dayjsObj.toDate()
    );
    handleQuery();
  };

  /**
   * 切换页码
   *
   * @param current 页码
   */
  const handlePageChange = (current: number) => {
    data.pageNum = current;
    fetchData();
  };

  /**
   * 切换每页条数
   *
   * @param pageSize 每页条数
   */
  const handlePageSizeChange = (pageSize: number) => {
    data.pageSize = pageSize;
    fetchData();
  };

  const getTagColor = (mes: string): string => {
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

  const showDetailModal = (record: number) => {
    data.currentAlarmId = record;
    data.showDetail = true;
  };
  bus.on('close-detail-modal', () => {
    data.showDetail = false;
  });

  looping(fetchData, 300 * 1000);
</script>

<script lang="ts">
  export default {
    name: 'Realtime',
  };
</script>

<style scoped lang="less">
  // .app-container {
  //   position: relative;
  // }
  .header {
    // height: 76px;
    padding: 22px 24px;
    background: rgb(19 24 35 / 60%);
    border-radius: 4px;
    backdrop-filter: blur(5px);
  }

  .contain {
    position: relative;
    padding: 24px;
    background: rgb(19 24 35 / 60%);
    border-radius: 4px;
    backdrop-filter: blur(5px);
  }

  .arco-form-item {
    margin-bottom: 0;
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

  :deep(.arco-table-tr-empty .arco-table-cell.arco-table-cell-align-left) {
    padding: 0;
  }

  .tier {
    // position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 600px;
    // margin: 161px 0 0 24px;
    background: rgb(56 63 97 / 26%);
    border-radius: 0 0 4px 4px;
    // backdrop-filter: blur(100px);
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

  .total {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: rgb(255 255 255 / 60%);
    font-weight: 400;
    font-size: 14px;

    /* Body 正文/2-Regular */
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 22px; /* 157.143% */
  }

  .dam {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
