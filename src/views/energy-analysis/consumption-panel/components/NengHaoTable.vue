<template>
  <table>
    <thead>
      <th></th>
      <th></th>
      <th>能耗总计</th>
      <th>最大值</th>
      <th>最小值</th>
      <th>平均值</th>
    </thead>
    <tbody v-if="!state.loading && state.dataList !== null">
      <tr>
        <td rowspan="3" class="time">2098/2/23</td>
        <td class="half-border">-</td>
        <td class="half-border"></td>
        <td class="half-border"></td>
        <td class="half-border"></td>
        <td class="half-border"></td>
      </tr>
      <tr>
        <td class="all-border">同比</td>
        <td class="all-border"></td>
        <td class="all-border"></td>
        <td class="all-border"></td>
        <td class="all-border" style="border-right: none"></td>
      </tr>
      <tr>
        <td class="all-border">环比</td>
        <td class="all-border"></td>
        <td class="all-border"></td>
        <td class="all-border"></td>
        <td class="all-border" style="border-right: none"></td>
      </tr>
    </tbody>
  </table>
  <a-spin
    v-if="state.loading"
    :loading="state.loading"
    tip="加载中"
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 132px;
    "
  ></a-spin>

  <Empty
    v-if="!state.loading && state.dataList === null"
    style="height: 132px"
  ></Empty>
</template>

<script lang="ts" setup>
  import Empty from '../../common/Empty.vue';

  const state = reactive({
    loading: false,
    dataList: 1,
  });
</script>

<style scoped lang="less">
  table {
    width: 100%;
    font-family: HarmonyOS-Regular, sans-serif;

    th {
      height: 40px;
      color: rgb(255 255 255 / 90%);
      font-weight: 400;
      font-size: 16px;
      line-height: 20px;
      background: #2b4062;
    }

    td {
      height: 44px;
      color: rgb(255 255 255 / 90%);
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      background: rgb(43 64 98 / 45%);
    }

    td.all-border {
      border: 1px solid rgb(255 255 255 / 10%);
    }

    td.half-border {
      background-color: rgb(30 83 171 / 58%);
      border-left: 1px solid rgb(255 255 255 / 10%);
    }

    .time {
      border-bottom: 1px solid rgb(255 255 255 / 10%);
    }
  }
</style>
