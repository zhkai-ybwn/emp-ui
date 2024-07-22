<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-30 09:31:47
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-21 09:00:00
 * @FilePath: \emp-admin-ui\src\views\energy-analysis\consumption-panel\components\NengHaoMingXi.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="nhmx-container">
    <ModuleBox :config="state.title">
      <a-table
        v-show="state.data.length !== 0"
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
        <template #energyValue="{ record }">
          <div>{{ record.energyValue }}kWh</div>
        </template>
      </a-table>
      <div
        v-if="state.data.length === 0 && state.loading === false"
        class="empty"
      >
        <div class="img"></div>
        <div class="text">&nbsp;暂无数据</div>
      </div>
      <a-tooltip content="导出表格">
        <div class="export" @click="exportDetail"></div>
      </a-tooltip>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import { Message, TableColumnData } from '@arco-design/web-vue';

  import {
    ECDetails,
    DetailParams,
    exportECDetails,
  } from '@/api/energy-analysis/consumption-panel';
  import bus from '@/utils/bus';
  // import debounce from 'lodash/debounce';
  import throttle from 'lodash/throttle';
  import ModuleBox from '../../common/ModuleBox.vue';

  const columns: TableColumnData[] = [
    {
      title: '序号',
      dataIndex: 'index',
      headerCellClass: 'first-head',
      // width: 100,
    },
    {
      title: '时间',
      dataIndex: 'time',
      // sortable: {
      //   sortDirections: ['ascend', 'descend'],
      // },
      width: 450,
    },
    {
      title: '区域',
      dataIndex: 'nodeName',
      cellClass: 'two-line',
    },
    {
      title: '能耗类型',
      dataIndex: 'classification',
    },
    {
      title: '能耗值',
      slotName: 'energyValue',
      dataIndex: 'energyValue',
      headerCellClass: 'last-head',
    },
  ];

  const state = reactive({
    total: 0,
    data: [],
    index: 0,
    scrollEventAdded: false,
    params: [] as DetailParams,
    loading: false,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '能耗明细',
      textEn: 'Energy consumption details',
      Height: '458px',
    },
    pageNum: 1,
  });

  const exportDetail = async () => {
    try {
      const { data: res } = await exportECDetails(state.params);

      // @ts-ignore
      const url = URL.createObjectURL(res);

      // 创建一个 <a> 元素用于触发下载
      const link = document.createElement('a');
      link.href = url;
      link.download = 'exported_data.xlsx'; // 设置下载文件名

      // 将 <a> 元素添加到页面中并触发下载
      document.body.appendChild(link);
      link.click();

      // 清理资源
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
      if (res) {
        Message.success({
          content: '下载成功',
          closable: true,
          duration: 3000,
        });
      } else {
        Message.error({
          content: '下载失败，请再试一次',
          closable: true,
          duration: 3000,
        });
      }
    } catch (err) {
      //   console.error(err);
    } finally {
      //
    }
  };

  const list = () => {
    const menu = document.querySelector('.arco-virtual-list');
    const items = document.querySelector(
      '.arco-virtual-list .arco-table-element'
    );

    const loadMore = async () => {
      function calculateScrollHeight() {
        return items && menu ? items.clientHeight - menu.scrollTop : 0;
      }
      // if (!state.scrollEventAdded) {
      // window.requestAnimationFrame(async () => {
      // state.scrollEventAdded = false;
      // 调用函数计算 scroll 的值
      const scroll = calculateScrollHeight();
      if (scroll < 355 && state.pageNum * 6 <= state.total) {
        state.pageNum += 1;
        const { data: res } = await ECDetails(state.params, {
          pageNumber: state.pageNum,
          pageSize: 6,
        });

        // @ts-ignore
        const detail = res.records.map((item) => {
          state.index += 1;
          return {
            index: state.index,
            ...item,
          };
        });

        // @ts-ignore
        state.data.push(...detail);
      }
      // });

      //   state.scrollEventAdded = true;
      // }
    };

    // function throttledLoadMore() {

    //   throttle(loadMore, 500);
    // }

    // const throttledLoadMore = throttle(loadMore, 1000);
    // if (menu && items) {
    //   menu.removeEventListener('scroll', throttledLoadMore);
    //   menu.addEventListener('scroll', throttledLoadMore, {
    //     passive: true,
    //   });
    // }

    const throttledLoadMore = throttle(loadMore, 800);
    const throttledLoadMoreHandler = function () {
      throttledLoadMore();
    };

    if (menu && items) {
      // menu.removeEventListener('mousewheel', throttledLoadMoreHandler);
      menu.addEventListener('mousewheel', throttledLoadMoreHandler, {
        passive: true,
      });
    }
  };

  const fetchData = async (params: DetailParams) => {
    try {
      state.loading = true;
      state.pageNum = 1;
      const { data: res } = await ECDetails(params, {
        pageNumber: state.pageNum,
        pageSize: 6,
      });

      state.data = [];
      state.index = 0;
      // @ts-ignore
      state.total = res.total;

      // @ts-ignore
      const detail = res.records.map((item) => {
        state.index += 1;
        return {
          index: state.index,
          ...item,
        };
      });
      // @ts-ignore
      state.data.push(...detail);
    } catch (err) {
      state.data = [];
    } finally {
      state.loading = false;
    }
  };

  onMounted(() => {
    list();
  });
  bus.on('detail-consumption', (params: any) => {
    state.params = params;
    fetchData(params);
  });
</script>

<style lang="less" scoped>
  .table {
    margin: 20px 24px 0;
  }

  :deep(.two-line .arco-table-td-content) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

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

  .empty {
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 410px;
    backdrop-filter: blur(100px);
  }

  .img {
    width: 98px;
    height: 60px;
    .set-back('@/assets/imgs/energy-analysis/empty-image.png');
  }

  .text {
    color: #7787a2;
    font-weight: 400;
    font-size: 16px;
    font-family: HarmonyOS-Regular, sans-serif;
    font-style: normal;
    line-height: 24px; /* 150% */
  }

  .export {
    position: absolute;
    top: 10px;
    right: 30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    .set-back('@/assets/icons/png/export@2x.png');

    &:hover {
      .set-back('@/assets/icons/png/export-hover.png');
    }

    &:active {
      .set-back('@/assets/icons/png/export-pressed.png');
    }
  }
</style>
