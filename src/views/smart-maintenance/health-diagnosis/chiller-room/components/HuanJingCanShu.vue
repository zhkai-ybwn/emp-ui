<template>
  <ModuleBox :config="state.title" class="box">
    <div class="list">
      <div v-for="(item, index) in state.dataList" :key="index" class="item">
        <div class="icon">
          <img :src="item.icon" alt="" class="icon-img" />
        </div>
        <div class="value">
          {{ item.value ? parseFloat(item.value) : '-' }}
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="title">
          {{ item.title }}
        </div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { getEnvironmentalParam } from '@/api/small-maintenance/newHealth';
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import icon1 from '@/assets/imgs/smart/health/icon1.png';
  import icon2 from '@/assets/imgs/smart/health/icon2.png';
  import icon3 from '@/assets/imgs/smart/health/icon3.png';
  import icon4 from '@/assets/imgs/smart/health/icon4.png';

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '36px',
      text: '环境参数',
      textEn: '',
      Height: '18%',
      bgClass: 'shadow-contain',
    },
    loading: false,
    dataList: [
      {
        icon: icon1,
        title: '湿球温度',
        value: null,
        unit: '℃',
      },
      {
        icon: icon2,
        title: '露点温度',
        value: null,
        unit: '℃',
      },
      {
        icon: icon3,
        title: '绝对湿度',
        value: null,
        unit: '%',
      },
      {
        icon: icon4,
        title: '焓值',
        value: null,
        unit: 'kJ/kg',
      },
    ],
  });

  const fetchData = async () => {
    try {
      const { data } = await getEnvironmentalParam();
      state.dataList[0].value = data.wetBulbTemp;
      state.dataList[1].value = data.dewPointTemp;
      state.dataList[2].value = data.absoluteHumidity;
      state.dataList[3].value = data.enthalpyValue;
    } catch (err) {
      state.dataList[0].value = null;
      state.dataList[1].value = null;
      state.dataList[2].value = null;
      state.dataList[3].value = null;
    }
  };
  fetchData();
</script>

<style lang="less" scoped>
  .box {
    margin-bottom: 16px;

    .list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: calc(100% - 36px);
    }

    .item {
      font-family: HarmonyOS-Regular, sans-serif;
      text-align: center;

      .value {
        height: 30px;
        color: #fff;
        font-weight: 500;
        font-size: 18px;
        font-style: normal;
        line-height: 30px;
      }

      .unit {
        color: rgb(255 255 255 / 60%);
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
        line-height: 16px;
      }

      .title {
        color: rgb(255 255 255 / 60%);
        font-weight: 400;
        font-size: 14px;
        font-style: normal;
      }

      .icon-img {
        width: 2.625rem;
        height: 2.625rem;
      }
    }
  }

  .shadow-contain {
    backdrop-filter: blur(10px);
  }
</style>
