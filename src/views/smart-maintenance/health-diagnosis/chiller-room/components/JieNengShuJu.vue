<template>
  <ModuleBox :config="state.title" :button-list="state.buttonList" class="box">
    <div class="list">
      <div v-for="(item, index) in state.dataList" :key="index" class="item">
        <div class="icon">
          <img :src="item.icon" alt="" class="icon-img" />
        </div>
        <div class="detai">
          <div class="title">
            {{ item.title }}
          </div>
          <div
            class="value"
            :data-value="item.value ? Number(item.value).toFixed(2) : '-'"
          >
            {{ item.value ? Number(item.value).toFixed(2) : '-' }}
          </div>
        </div>
      </div>
    </div>
  </ModuleBox>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import { getEnergySavingData } from '@/api/small-maintenance/newHealth';
  import ModuleBox from '@/views/smart-maintenance/components/ModuleBox.vue';
  import energy1 from '@/assets/imgs/smart/health/energy1.png';
  import energy2 from '@/assets/imgs/smart/health/energy2.png';
  import energy3 from '@/assets/imgs/smart/health/energy3.png';

  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '36px',
      text: '节能数据',
      textEn: '',
      Height: '27%',
      bgClass: 'shadow-contain',
      size: 14,
    },
    buttonList: [{ title: '开始时间：2024年1月1日' }],
    loading: false,
    dataList: [
      {
        icon: energy1,
        title: '节约电能 (kWh)',
        value: null,
      },
      {
        icon: energy2,
        title: '节约标煤 (t)',
        value: null,
      },
      {
        icon: energy3,
        title: 'CO₂减排 (kg)',
        value: null,
      },
      {
        icon: energy3,
        title: 'SO₂减排 (kg)',
        value: null,
      },
    ],
  });
  const fetchData = async () => {
    try {
      const { data } = await getEnergySavingData();
      state.dataList[0].value = data.saveEnergy;
      state.dataList[1].value = data.saveCoal;
      state.dataList[2].value = data.co2;
      state.dataList[3].value = data.so2;
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
      flex-wrap: wrap;
      align-content: space-between;
      justify-content: space-between;
      height: calc(100% - 36px);
      padding: 16px;
      font-family: HarmonyOS-Regular, sans-serif;

      .item {
        display: flex;
        align-items: center;
        // justify-content: center;
        width: 48%;
        height: 45%;
        padding-left: 16px;
        background: linear-gradient(
          270deg,
          rgb(157 180 220 / 6%) 0%,
          rgb(85 137 255 / 30%) 100%
        );
        border-radius: 4px;

        .icon-img {
          width: 3.75rem;
          height: 3.75rem;
          margin-right: 1rem;
        }

        .title {
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 14px;
          line-height: 32px;
        }

        .value {
          font-weight: 400;
          font-size: 20px;
          font-family: YouSheBiaoTiHei, sans-serif;
          font-style: normal;
          line-height: 20px;
          //   text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
          background: linear-gradient(90deg, #fff 0%, #c1daff 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          &::before {
            position: absolute;
            z-index: -1;
            text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
            content: attr(data-value);
          }
        }
      }
    }
  }

  .shadow-contain {
    backdrop-filter: blur(10px);
  }
</style>
