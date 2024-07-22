<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2024-01-08 13:20:48
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-16 14:33:09
 * @FilePath: \emp-admin-ui\src\views\smart-maintenance\health-diagnosis\chiller-unit\ChillerUnit1.vue
 * @Description: 冷水机组#1
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="chiller-unit1">
    <Breadcrumb :items="['智慧运维', '健康诊断', '冷水机组#1']" />
    <div class="section">
      <LengShuiJiZu1 style="margin-right: 24px" :data="state.partPointDetail" />
      <AlarmInfo style="margin-right: 24px" :data="state.partPointDetail" />
      <LengShuiJiZuZhuangTaiVue />
      <ZhiLengLiangQuXianTu style="margin-top: 24px; margin-right: 24px" />
      <LengShuiJiZuCopDianZhenTu style="margin-top: 24px" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    getPartPointDetail,
    DeviceAlarmReq,
    PartPointDetail,
  } from '@/api/small-maintenance/health';
  import { useRoute } from 'vue-router';
  import LengShuiJiZuCopDianZhenTu from './components/LengShuiJiZuCopDianZhenTu.vue';
  import LengShuiJiZu1 from './components/LengShuiJiZu1.vue';
  import AlarmInfo from './components/AlarmInfo.vue';
  import LengShuiJiZuZhuangTaiVue from './components/LengShuiJiZuZhuangTai.vue';
  import ZhiLengLiangQuXianTu from './components/ZhiLengLiangQuXianTu.vue';

  interface Alarm {
    label: string;
    unit: string;
    value: number | string;
    icon: number;
    red: boolean;
  }

  const state = reactive({
    partPointDetail: {} as PartPointDetail,
    alarmInfo: [] as Alarm[],
  });

  const route = useRoute();
  const fetchData = async (
    params: DeviceAlarmReq = {
      deviceId: Number(route.meta.deviceId),
      pointTypes: [],
      timeType: 0,
    }
  ) => {
    try {
      const { data } = await getPartPointDetail(params);
      state.partPointDetail = data;
      state.alarmInfo = [
        {
          label: '报警中',
          unit: '个',
          value: data.alarmingCount,
          icon: 0,
          red: true,
        },
        {
          label: '今日报警数',
          unit: '个',
          value: data.todayAlarmCount,
          icon: 0,
          red: false,
        },
        {
          label: '今日处理率',
          unit: '%',
          value: data.todayRate,
          icon: 1,
          red: false,
        },
      ];
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  (async () => {
    await fetchData();
  })();
</script>

<script lang="ts">
  export default {
    name: 'ChillerUnit1',
  };
</script>

<style lang="less" scoped>
  .chiller-unit1 {
    height: 100%;
    padding: 0 24px 50px;
    .set-back('@/assets/imgs/smart/health/dimian.png');

    .section {
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
