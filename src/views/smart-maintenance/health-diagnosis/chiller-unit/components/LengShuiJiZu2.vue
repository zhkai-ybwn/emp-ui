<template>
  <div style="width: calc(33% - 24px)">
    <ModuleBox :config="state.title" style="box-shadow: none"></ModuleBox>
    <div class="unit">
      <div class="button">
        <!-- <div :class="props.data.runningStatus ? 'on' : 'off'"></div> -->
        <div v-if="props.data.runningStatus" class="model-status-open"></div>
        <div v-else class="model-status-close"></div>
        <div class="status">{{
          props.data.runningStatus ? '开机' : '关机'
        }}</div>
      </div>
      <img src="@/assets/imgs/smart/health/main.png" alt="" class="image" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ModuleBox from '../../../components/ModuleBox.vue';

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });
  const state = reactive({
    title: {
      Width: '100%',
      titleHeight: '41px',
      text: '冷水机组#2',
      textEn: 'CHILLER#2',
      Height: '41px',
    },
  });
</script>

<style lang="less" scoped>
  .unit {
    position: relative;
    width: 100%;
    height: 319px;
    padding: 16px;
    background: rgb(255 255 255 / 2%);

    .button {
      // position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 36px;
      padding: 8px;
      background: rgb(77 119 211 / 20%);
      border-radius: 4px;

      .status {
        margin-left: 3px;
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.32px;
      }

      .on {
        width: 28px;
        height: 24px;
        .set-back('@/assets/imgs/smart/health/on.png');
      }

      .off {
        width: 28px;
        height: 24px;
        .set-back('@/assets/imgs/smart/health/off.png');
      }

      .model-status-open {
        width: 20px;
        height: 20px;
        .set-back('@/assets/imgs/smart/health/device_status_open.svg');
      }

      .model-status-close {
        width: 20px;
        height: 20px;
        .set-back('@/assets/imgs/smart/health/device_status_close.svg');
      }
    }

    .image {
      position: absolute;
      top: -1%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
