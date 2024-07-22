<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-02-29 14:16:32
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-09 10:32:23
 * @FilePath: \emp-admin-ui\src\views\report-center\manage\index.vue
 * @Description: 报表管理
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->

<template>
  <div class="manage">
    <Breadcrumb :items="['报表中心', '报表管理']" />
    <div class="manage-contain">
      <div class="header">
        <!-- 搜索栏 -->
        <div class="header-query">
          <a-form ref="queryRef" :model="state.queryParams" layout="inline">
            <a-form-item field="reportType" hide-label>
              <a-select
                v-model="state.queryParams.reportType"
                :options="reportTypeList"
                placeholder="报表类型"
                allow-clear
                style="width: 140px"
                @change="handleQuery"
              />
            </a-form-item>
            <a-form-item field="fromType" hide-label>
              <a-select
                v-model="state.queryParams.fromType"
                :options="fromTypeList"
                placeholder="报表来源"
                allow-clear
                style="width: 140px"
                @change="handleQuery"
              />
            </a-form-item>
            <!-- <a-form-item field="rangePicker" hide-label>
              <a-range-picker
                v-model="state.rangePicker"
                style="width: 300px"
                :disabled-date="(current) => dayjs(current).isAfter(dayjs())"
                :shortcuts="state.rangeShortcuts"
                shortcuts-position="left"
                @change="handleQuery"
              />
            </a-form-item> -->
            <a-form-item field="reportName" hide-label>
              <a-input-search
                v-model="state.queryParams.reportName"
                :style="{ width: '220px' }"
                placeholder="报表名称"
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
            <a-form-item hide-label class="button-list">
              <a-space>
                <a-button
                  type="outline"
                  :disabled="state.isDisable"
                  @click="deleteModal"
                  >删除</a-button
                >
              </a-space>
              <a-space>
                <a-popover
                  position="bottom"
                  trigger="click"
                  :content-style="{ padding: '5px' }"
                >
                  <template #content>
                    <div class="up-item">
                      <a-upload
                        ref="uploadRef"
                        action="/"
                        :auto-upload="false"
                        :show-file-list="false"
                        :multiple="false"
                        @change="onChange0"
                      >
                        <template #upload-button>
                          <a-space> 用能报表 </a-space>
                        </template>
                      </a-upload>
                    </div>
                    <div class="up-item">
                      <a-upload
                        ref="uploadRef"
                        action="/"
                        :auto-upload="false"
                        :show-file-list="false"
                        :multiple="false"
                        @change="onChange1"
                      >
                        <template #upload-button>
                          <a-space> 运维报表 </a-space>
                        </template>
                      </a-upload>
                    </div>
                  </template>
                  <a-button type="outline">
                    <span style="margin-right: 5px">上传</span>
                    <icon-loading v-if="state.loading1" />
                  </a-button>
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
                      仅支持上传20M以内的xlsx或xls文件
                    </template>
                  </a-tooltip>
                </a-popover>
              </a-space>
              <a-space>
                <a-button
                  type="primary"
                  :disabled="state.isDisable"
                  @click="downloadItem(state.rowKeys, '文件压缩包')"
                >
                  <span style="margin-right: 5px">下载</span>
                  <icon-loading v-if="state.loading2" />
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>

        <!-- 列表区域 -->
        <div class="table">
          <a-table
            ref="tableRef"
            :row-selection="state.rowSelection"
            row-key="id"
            :loading="state.tableLoad"
            :data="state.dataList"
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
            :bordered="false"
            size="large"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
            @selection-change="handleRowChange"
          >
            <template #columns>
              <a-table-column title="序号" align="center">
                <template #cell="{ rowIndex }">
                  {{
                    rowIndex +
                    1 +
                    (state.queryParams.pageNum - 1) * state.queryParams.pageSize
                  }}
                </template>
              </a-table-column>
              <a-table-column
                title="名称"
                align="center"
                :width="520"
                :tooltip="true"
                :ellipsis="true"
                data-index="reportName"
              >
              </a-table-column>
              <a-table-column
                title="报表类型"
                align="center"
                data-index="reportType"
              >
                <template #cell="{ record }">
                  {{ ['用能报表', '运维报表'][record.reportType] }}
                </template>
              </a-table-column>
              <a-table-column title="来源" align="center" data-index="fromType">
                <template #cell="{ record }">
                  {{ ['系统生成', '用户上传'][record.fromType] }}
                </template>
              </a-table-column>
              <a-table-column
                title="生成时间"
                align="center"
                data-index="createTime"
              >
                <template #cell="{ record }">
                  {{ moment(+record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
                </template>
              </a-table-column>

              <a-table-column title="操作" align="center">
                <template #cell="{ record }">
                  <a-button
                    type="text"
                    @click="downloadItem([record.id], record.reportName)"
                  >
                    <span style="margin-right: 5px">下载</span>
                    <icon-loading v-if="+state.id === +record.id" />
                    <svg
                      v-if="+state.id !== +record.id"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        class="svg-path"
                        d="M13.5059 11.4387C14.6014 10.6684 15.0711 9.27678 14.6666 8.00004C14.2621 6.72331 13.0234 6.02384 11.6842 6.02488H10.9105C10.4047 4.05381 8.73599 2.59862 6.71442 2.36578C4.69282 2.13294 2.73699 3.17064 1.79636 4.97514C0.855722 6.77964 1.12507 8.97728 2.47364 10.5012"
                        stroke="#266FE8"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        class="svg-path"
                        d="M8.0028 13.6666L8 7.66663"
                        stroke="#266FE8"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        class="svg-path"
                        d="M10.1213 11.5454L8 13.6667L5.87866 11.5454"
                        stroke="#266FE8"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a-button>
                  <a-popconfirm
                    content="确认删除该报表吗?"
                    type="warning"
                    @ok="deleteItem([record.id])"
                  >
                    <a-button type="text">
                      <span style="margin-right: 5px">删除</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          class="svg-path"
                          d="M2.66675 3.66663H13.3334"
                          stroke="#266FE8"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          class="svg-path"
                          d="M6 1.66663H10"
                          stroke="#266FE8"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          class="svg-path"
                          d="M4 5.66663H12V13.3333C12 13.8856 11.5523 14.3333 11 14.3333H5C4.4477 14.3333 4 13.8856 4 13.3333V5.66663Z"
                          stroke="#266FE8"
                          stroke-width="1.33333"
                          stroke-linejoin="round"
                        />
                        <path
                          class="svg-path"
                          d="M6.66675 8.33337L9.33341 11"
                          stroke="#266FE8"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          class="svg-path"
                          d="M9.33341 8.33337L6.66675 11"
                          stroke="#266FE8"
                          stroke-width="1.33333"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </a-button>
                  </a-popconfirm>
                </template>
              </a-table-column>
            </template>
            <template #empty>
              <div class="tier">
                <div class="icon"></div>
                <div class="text">暂无搜索结果</div>
              </div>
            </template>
          </a-table>
          <div v-if="state.total !== 0" class="total"
            >共{{ state.total }}项数据</div
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { Message, Modal } from '@arco-design/web-vue';
  import moment from 'moment';
  import type {
    SelectOptionData,
    TableRowSelection,
    ShortcutType,
  } from '@arco-design/web-vue/es';
  import {
    uploadReportFile,
    deleteReportFiles,
    listReports,
    downloadReportFiles,
  } from '@/api/report-center/index';

  const { proxy } = getCurrentInstance() as any;

  const reportTypeList = ref<SelectOptionData[]>([
    {
      value: '0',
      label: '用能报表',
    },
    {
      value: '1',
      label: '运维报表',
    },
  ]);
  const fromTypeList = ref<SelectOptionData[]>([
    {
      value: '0',
      label: '系统生成',
    },
    {
      value: '1',
      label: '用户上传',
    },
  ]);

  const state = reactive({
    id: '',
    files: [],
    rowKeys: [] as Array<string | number>,
    isDisable: true,
    loading1: false,
    loading2: false,
    formatStr: 'YYYY-MM-DD',
    rowSelection: {
      type: 'checkbox',
      showCheckedAll: true,
      onlyCurrent: true,
    } as TableRowSelection,
    dataList: [],
    tableLoad: false,
    total: 0,
    rangePicker: [] as Date[],
    // 查询参数
    queryParams: {
      startTime: '',
      endTime: '',
      reportType: '',
      fromType: '',
      pageNum: 1,
      pageSize: 15,
      reportName: '',
    },
    rangeShortcuts: [
      {
        label: '最近一个月',
        value: () => [dayjs().toDate(), dayjs().subtract(1, 'month').toDate()],
      },
      {
        label: '最近三个月',
        value: () => [dayjs().toDate(), dayjs().subtract(3, 'month').toDate()],
      },
      {
        label: '最近半年',
        value: () => [dayjs().toDate(), dayjs().subtract(6, 'month').toDate()],
      },
    ] as ShortcutType[],
  });

  const getCurrentTime = () => {
    const currentTime = dayjs(); // 获取当前时间
    const oneYearAgoTime = currentTime.subtract(1, 'year'); // 获取一年前的时间
    return [
      dayjs(oneYearAgoTime.format(state.formatStr)),
      dayjs(currentTime.format(state.formatStr)),
    ];
  };

  /**
   * 查询
   */
  const handleQuery = async () => {
    try {
      state.tableLoad = true;
      state.queryParams.startTime = '';
      state.queryParams.endTime = '';
      if (state.rangePicker?.length > 0) {
        state.queryParams.startTime = dayjs(state.rangePicker[0]).format(
          state.formatStr
        );
        state.queryParams.endTime = dayjs(state.rangePicker[1]).format(
          state.formatStr
        );
      }
      const { data } = await listReports(state.queryParams);
      state.dataList = data.records;
      state.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      state.tableLoad = false;
    }
  };

  onMounted(() => {
    // state.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());
    handleQuery();
  });

  /**
   * 下载
   */
  const downloadItem = async (x: Array<string | number>, fileName: any) => {
    try {
      let blob;

      const res = await downloadReportFiles(x);
      const contentDispositionHeader = res.headers['content-disposition'];
      const match = /filename="(.*?)"/.exec(contentDispositionHeader);

      if (match && match[1]) {
        // 解码文件名
        const encodedFilename = match[1];
        const decodedFilename = decodeURIComponent(encodedFilename);
        fileName = decodedFilename;
      }

      if (x.length === 1) {
        state.id = x[0] as string;
        blob = new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });
      } else {
        state.loading2 = true;
        blob = new Blob([res.data], {
          type: 'application/octet-stream;charset=utf-8',
        });
      }

      const downloadElement = document.createElement('a');
      const href = window.URL.createObjectURL(blob);
      downloadElement.style.display = 'none';
      downloadElement.href = href;

      // 下载后文件名
      downloadElement.download = fileName;
      document.body.appendChild(downloadElement);

      // 点击下载
      downloadElement.click();

      // 下载完成，移除元素
      document.body.removeChild(downloadElement);
      // 释放掉 blob 对象
      window.URL.revokeObjectURL(href);

      Message.success({
        content: '下载成功',
        closable: true,
        duration: 3000,
      });
    } catch (err) {
      Message.error({
        content: '下载失败，请再试一次',
        closable: true,
        duration: 3000,
      });
    } finally {
      state.id = '';
      state.loading2 = false;
    }
  };

  /**
   * 删除
   */
  const deleteItem = async (x: Array<string | number>) => {
    try {
      const res = await deleteReportFiles(x);
      if (res.code === 200) {
        Message.success({
          content: '删除成功',
          closable: true,
          duration: 3000,
        });
        handleQuery();
      }
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      //
    }
  };

  /**
   * 重置
   */
  const resetQuery = () => {
    proxy.$refs.queryRef.resetFields();
    // state.rangePicker = getCurrentTime().map((dayjsObj) => dayjsObj.toDate());
    state.queryParams.pageNum = 1;
    handleQuery();
  };

  /**
   * 切换页码
   *
   * @param current 页码
   */
  const handlePageChange = (current: number) => {
    state.queryParams.pageNum = current;
    handleQuery();
  };

  /**
   * 切换每页条数
   *
   * @param pageSize 每页条数
   */
  const handlePageSizeChange = (pageSize: number) => {
    state.queryParams.pageSize = pageSize;
  };

  // 行变化
  const handleRowChange = (rowKeys: (string | number)[]) => {
    state.rowKeys = rowKeys;
    if (rowKeys.length !== 0) {
      state.isDisable = false;
    } else {
      state.isDisable = true;
    }
  };

  // 上传
  const upload = async (x: string | number) => {
    try {
      state.loading1 = true;
      const formData = new FormData();
      formData.append(
        'reportFile',
        // @ts-ignore
        state.files[state.files.length - 1].file as File
      );
      const res = await uploadReportFile(x, formData);

      if (res.code === 200) {
        Message.success({
          content: '上传成功',
          closable: true,
          duration: 3000,
        });
        handleQuery();
      } else {
        Message.error({
          content: '上传失败',
          closable: true,
          duration: 3000,
        });
      }
    } catch (err) {
      // Handle error (you can report using errorHandler or other methods)
    } finally {
      state.loading1 = false;
    }
  };

  const deleteModal = () => {
    Modal.warning({
      title: '确认删除该报表吗？',
      content: '',
      hideCancel: false,
      titleAlign: 'start',
      modalClass: 'black-modal',
      async onOk() {
        deleteItem(state.rowKeys);
        proxy.$refs.tableRef.selectAll(false);
      },
    });
  };

  const onChange0 = (fileList: any) => {
    state.files = fileList;
    upload(0);
  };
  const onChange1 = (fileList: any) => {
    state.files = fileList;
    upload(1);
  };
</script>

<style lang="less" scoped>
  .manage {
    padding: 0 24px;

    .header-query {
      padding-bottom: 16px;

      .button-list {
        margin-right: 0;
        margin-left: auto;

        :deep(.arco-space-item) {
          margin-left: 24px;
        }
      }
    }

    .info {
      margin-left: 5px;
      cursor: pointer;
    }

    :deep(.arco-checkbox-icon) {
      background-color: rgb(60 72 92 / 1%);
    }

    :deep(.arco-checkbox-checked .arco-checkbox-icon) {
      background-color: #266fe8;
    }

    :deep(.arco-checkbox-indeterminate .arco-checkbox-icon) {
      background-color: #266fe8;
    }

    .manage-contain {
      width: 100%;
      padding: 24px;
      background: rgb(19 24 35 / 60%);
      border-radius: 4px;
      backdrop-filter: blur(5px);
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

    :deep(.arco-table-tr-empty td.arco-table-td) {
      border: none !important;
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

    :deep(.arco-btn-text[type='button']:hover) {
      color: #699ef5;
      background-color: transparent;

      .svg-path {
        stroke: #699ef5;
      }
    }

    :deep(.arco-btn-text[type='button']:active) {
      color: #0052d9;
      background-color: transparent;

      .svg-path {
        stroke: #0052d9;
      }
    }
  }

  :deep(.modal) {
    background-color: #000;
  }
</style>
