<template>
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%">
    <table>
      <thead>
        <th style="width: 80px">排名</th>
        <th style="text-align: left">排名对象</th>
        <th>能耗</th>
        <th>同比能耗值</th>
        <th>同比增长率</th>
      </thead>
      <tbody v-if="!state.loading && state.dataList !== null">
        <tr
          v-for="(item, index) in state.dataList"
          :key="index"
          :class="index > 2 ? 'normal' : 'top'"
        >
          <td class="icon">
            <div> {{ index + 1 }}</div>
          </td>
          <td class="name">{{ item.name }}</td>
          <td class="bar-item">
            <div class="bar">
              <div class="inner-bar" :style="{ width: '20%' }"></div>
            </div>
            <div class="value">
              {{ item.value }}
            </div>
          </td>
          <td
            style="width: 15%; border-right: 1px solid rgb(255 255 255 / 10%)"
          >
            {{ item.value }}
          </td>
          <td style="width: 15%">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
    <a-spin
      v-if="state.loading"
      :loading="state.loading"
      tip="加载中"
      style="
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        background: rgb(83 109 167 / 10%);
      "
    ></a-spin>
    <Empty
      v-if="!state.loading && state.dataList === null"
      style="flex: 1"
    ></Empty>
  </div>
</template>

<script lang="ts" setup>
  import Empty from '../../common/Empty2.vue';

  const state = reactive({
    loading: false,
    dataList: [
      { name: '综合楼东', value: 23112 },
      { name: 'ew', value: 2 },
      { name: '12312', value: 34 },
      { name: '12q12', value: 34 },
      { name: '1af2312', value: 23112 },
      { name: 'we', value: 234 },
      { name: '12312', value: 35 },
      { name: '12312', value: 23112 },
      { name: '12312', value: 34 },
      { name: 'qwe', value: 345 },
      { name: '12312', value: 65 },
      { name: '12312', value: 24 },
      { name: '12312', value: 543 },
    ],
  });
</script>

<style scoped lang="less">
  table {
    width: 100%;
    font-family: HarmonyOS-Regular, sans-serif;

    thead {
      position: sticky;
      top: 0;
      height: 56px;
      color: #fff;
      font-size: 16px;
      font-style: normal;
      line-height: 20px;
      text-align: center;
      background: #2b4062;

      th {
        height: 56px;
        font-weight: 400;
      }
    }

    tbody {
      width: 100%;
      font-weight: 400;
      font-size: 16px;
      font-style: normal;
      line-height: 19px;

      tr {
        height: 66px;
        border-top: 1px solid rgb(255 255 255 / 10%);
        border-bottom: 1px solid rgb(255 255 255 / 10%);

        &:hover {
          background: rgb(30 83 171 / 58%);
          cursor: pointer;
        }
      }

      td {
        text-align: center;
      }

      .icon {
        width: 80px;
      }

      .name {
        width: 10%;
        text-align: left;
      }

      .bar-item {
        display: flex;
        align-items: center;
        justify-content: space-around;
        height: 66px;
        border-right: 1px solid rgb(255 255 255 / 10%);
        border-left: 1px solid rgb(255 255 255 / 10%);

        .bar {
          flex: 1;
          height: 10px;
          margin-left: 33px;
          background: rgb(255 255 255 / 26%);
          border-radius: 10px;
        }

        .value {
          width: 100px;
          margin-left: 20px;
          text-align: left;
        }
      }

      .normal {
        color: #c9cdd0;

        .icon {
          display: flex;
          justify-content: center;

          div {
            width: 20px;
            height: 24px;
            line-height: 24px;
            background-image: url('@/assets/imgs/energy-analysis/rank/normal.png');
          }
        }

        .inner-bar {
          height: 10px;
          background: #1890ff;
          border-radius: 10px;
        }
      }

      .top {
        color: #ffd15c;

        .icon {
          display: flex;
          justify-content: center;

          div {
            width: 20px;
            height: 24px;
            line-height: 24px;
            background-image: url('@/assets/imgs/energy-analysis/rank/top.png');
          }
        }

        .inner-bar {
          height: 10px;
          background: #ffd15c;
          border-radius: 10px;
        }
      }
    }
  }
</style>
