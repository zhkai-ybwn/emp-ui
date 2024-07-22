<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-21 12:59:28
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-18 11:03:17
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\center\QuYuNengHaoSingle.vue
 * @Description: 区域能耗信息面板单个
-->
<template>
  <div class="qynh-signle-container">
    <div class="info-box">
      <div class="upper-box">
        <div class="sign" :style="{ '--color': `${info.color}` }"></div>
        <div class="text">{{ info.text }}</div>
      </div>
      <div class="value-unit">
        <div class="value">{{ state.num ? state.num : '-' }}</div>
        <div class="unit">{{ state.unit }}</div>
      </div>
    </div>
    <div class="icon"></div>
  </div>
</template>

<script setup>
  const props = defineProps({
    info: {
      type: Object,
      default: () => ({
        text: '',
        color:
          'linear-gradient(180deg, #1890FF 0%, rgba(24, 144, 255, 0.20) 100%)',
        value: 0,
        unit: 'kWh',
      }),
    },
  });

  const state = reactive({
    num: undefined,
    unit: 'kWh',
  });

  const change = () => {
    if (props.info.value) {
      if (props.info.value.toLocaleString().length > 6) {
        state.num = (props.info.value / 1000).toFixed(2).toLocaleString();
        state.unit = 'MWh';
      } else {
        state.num = props.info.value.toFixed(2).toLocaleString();
        state.unit = 'kWh';
      }
    }
  };
  change();

  watch(props.info, () => {
    change();
  });
</script>

<style lang="less" scoped>
  .qynh-signle-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .info-box {
      display: flex;
      flex-direction: column;
      width: fit-content;
      height: fit-content;
      padding: 6px 10px;
      background: rgb(6 12 28 / 26%);
      border-radius: 4px;
      backdrop-filter: blur(5px);

      .upper-box {
        display: flex;
        align-items: center;

        .sign {
          width: 10px;
          height: 10px;
          background: var(--color);
        }

        .text {
          margin-left: 5px;
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 16px;
          font-family: HarmonyOS-Regular, sans-serif;
          font-style: normal;
          line-height: 32px;

          /* 200% */
        }
      }

      .value-unit {
        display: flex;
        color: rgb(255 255 255 / 90%);
        font-weight: 700;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 28px;

        /* 140% */
        .value {
          font-size: 20px;
        }

        .unit {
          margin-top: 3px;
          margin-left: 2px;
          font-size: 12px;
        }
      }
    }

    .icon {
      width: 37.24px;
      height: 40px;
      margin-top: 8px;

      .set-back('@/assets/imgs/home/marker-icon.png');
    }
  }
</style>
