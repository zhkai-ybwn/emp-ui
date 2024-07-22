<template>
  <div>
    <Title :title="'站台空气质量'"></Title>
    <div class="contain">
      <div v-for="(item, index) in state.dataList" :key="index" class="item">
        <div class="top">
          <div class="value">
            {{
              props.data[item.value]
                ? parseFloat(props.data[item.value]).toFixed(2)
                : '- -'
            }}
          </div>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Title from '../common/Title.vue';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({
        platformCO2: '',
        platformHumidity: '',
        platformPM: '',
        platformTemp: '',
      }),
    },
  });

  const state = reactive({
    dataList: [
      {
        title: '温度',
        value: 'platformTemp',
        unit: '℃',
      },
      {
        title: '湿度',
        value: 'platformHumidity',
        unit: '%',
      },
      {
        title: '二氧化碳浓度',
        value: 'platformCO2',
        unit: 'ppm',
      },
      {
        title: 'PM2.5',
        value: 'platformPM',
        unit: 'μg/m3',
      },
    ],
  });
</script>

<style lang="less" scoped>
  .contain {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;

    .item {
      .top {
        display: flex;
        align-items: baseline;
        margin-bottom: 9px;
      }

      .value {
        font-weight: 600;
        font-size: 20px;
        font-family: Barlow-SemiBold, sans-serif;
        text-shadow: 0 0 10px rgb(0 0 0 / 32%), 0 0 15px rgb(0 102 255 / 49%);
        background: linear-gradient(90deg, #fff 0%, #9cc4ff 100%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-right: 4px;
      }

      .unit {
        font-family: Inter-Regular, sans-serif;
        font-weight: 400;
        font-size: 10px;
        color: #b4c0cc;
        line-height: 12px;
      }

      .title {
        font-family: HarmonyOS-Regular, sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: #f0f7fd;
        text-shadow: 0px 1px 4px rgba(0, 133, 255, 0.7);
      }
    }
  }
</style>
