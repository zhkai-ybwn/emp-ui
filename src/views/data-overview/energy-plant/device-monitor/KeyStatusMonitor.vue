<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-06 08:44:21
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:21:10
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\KeyStatusMonitor.vue
 * @Description: 关键设备状态监控
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="key-status-monitor-container">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="list-box">
        <div class="header">
          <div
            v-for="(col, index) in state.column"
            :key="index"
            :style="{ width: `${col.width}px` }"
            class="header-item"
          >
            {{ col.label }}
          </div>
        </div>
        <div class="content">
          <div
            v-for="(row, rowIndex) in state.dataList"
            :key="rowIndex"
            :class="[
              'content-item',
              rowIndex % 2 === 0 ? 'content-item-oushu' : 'content-item-jishu',
            ]"
          >
            <div
              :style="{
                width: `${state.column[0].width}px`,
                paddingLeft: '12px',
              }"
              >{{ row.eqName }}</div
            >
            <div :style="{ width: `${state.column[1].width}px` }">
              <div v-if="row.status" class="status">
                <div class="running"></div>
                <span>运行中</span>
              </div>
              <div v-if="!row.status" class="status">
                <div class="close"> </div>
                <span>关机</span>
              </div>
            </div>
            <div :style="{ width: `${state.column[2].width}px` }"
              >{{ row.actRate }}<span>%</span></div
            >
            <div :style="{ width: `${state.column[3].width}px` }"
              >{{ row.currentP }}<span>kW</span></div
            >
          </div>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { keyEquStatusMonitor } from '@/api/data-overview/device-monitor';
  import ModuleBox from '../common/ModuleBox.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '关键设备状态监控',
      width: 460,
      height: 40,
    },
    boxConfig: {
      width: 460,
      height: 620,
    },
    column: [
      {
        label: '设备名称',
        width: '160',
      },
      {
        label: '运行状态',
        width: '100',
      },
      {
        label: '开动率',
        width: '100',
      },
      {
        label: '当前功率',
        width: '100',
      },
    ],
    dataList: [],
  });

  const fetchData = async () => {
    try {
      const { data } = await keyEquStatusMonitor();
      state.dataList = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .key-status-monitor-container {
    .list-box {
      width: 460px;
      height: 620px;
      padding: 20px 13px;

      .header {
        display: flex;
        align-items: center;
        width: 434px;
        height: 44px;
        color: #dde4fc;
        font-weight: 400;
        font-size: 15px;
        font-family: YouSheBiaoTiHei, sans-serif;
        font-style: normal;
        line-height: normal;

        .set-back('@/assets/imgs/energy-plant/keyequ_header_bg.png');

        :nth-child(1) {
          padding-left: 12px;
        }
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 530px;
        margin-top: 8px;

        .content-item {
          display: flex;
          align-items: center;
          width: 434px;
          height: 42px;
          color: rgb(255 255 255 / 90%);
          font-weight: 350;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;

          .status {
            display: flex;
            align-items: center;

            span {
              padding-left: 5px;
            }
          }

          .running {
            width: 6px;
            height: 6px;
            background: #0f6;
            border-radius: 50%;
          }

          .close {
            width: 6px;
            height: 6px;
            background: #fff;
            border-radius: 50%;
          }
        }

        .content-item-oushu {
          .set-back(
            '@/assets/imgs/energy-plant/keyequ_oushu_bg.png'
          );
        }

        .content-item-jishu {
          .set-back(
            '@/assets/imgs/energy-plant/keyequ_jishu_bg.png'
          );
        }
      }
    }
  }
</style>
