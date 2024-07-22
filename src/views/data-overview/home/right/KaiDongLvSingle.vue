<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-21 09:02:16
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-18 10:25:00
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\right\KaiDongLvSingle.vue
 * @Description: 关键设备开动率-开动率信息面板
-->
<template>
  <div :class="['kdl-container', info.currentStatus ? 'blue' : 'gray']">
    <div class="upper-box">
      <div class="text">{{ info.deviceName }}</div>
      <div class="sign-switch">
        <div
          :class="['sign', info.currentStatus ? 'sign-green' : 'sign-white']"
        ></div>
        <div
          :class="[
            'switch',
            info.currentStatus ? 'switch-grenn' : 'switch-white',
          ]"
        >
          {{ info.currentStatus ? '开' : '关' }}
        </div>
      </div>
    </div>
    <div class="lower-box">
      <div class="value-unit">
        <div class="value">{{
          info.actuationPercent.toLocaleString('zh', {
            minimumFractionDigits: 1,
          })
        }}</div>
        <div class="unit">%</div>
      </div>
      <ProgressBar
        class="progress"
        :config="{ width: 90, height: 5 }"
        :percent="progressPer"
      ></ProgressBar>
    </div>
  </div>
</template>

<script setup>
  import ProgressBar from '../common/ProgressBar.vue';

  const props = defineProps({
    info: {
      type: Object,
      default: () => ({
        deviceName: '',
        currentStatus: null,
        actuationPercent: 0,
      }),
    },
  });

  const progressPer = computed(() => props.info.actuationPercent);
</script>

<style lang="less" scoped>
  .kdl-container {
    position: relative;
    width: 191px;
    height: 80px;
    border-radius: 2px;

    .upper-box {
      position: absolute;
      top: 10px;
      left: 16px;
      display: flex;
      justify-content: space-between;
      width: 159px;
      height: 32px;

      .text {
        color: rgb(255 255 255 / 90%);
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;
        line-height: 32px;
      }

      .sign-switch {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 31px;

        .sign {
          width: 10px;
          height: 10px;
          border-radius: 100%;
        }

        .sign-green {
          background: #4fd164;
        }

        .sign-white {
          background: #fff;
        }

        .switch {
          color: rgb(255 255 255 / 80%);
          font-weight: 400;
          font-size: 16px;
          font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
          font-style: normal;
        }
      }
    }

    .lower-box {
      position: absolute;
      top: 50px;
      left: 16px;
      display: flex;
      align-items: center;

      .value-unit {
        display: flex;
        width: 46px;
        color: rgb(255 255 255 / 90%);
        font-weight: 700;
        font-family: HarmonyOS-Regular, sans-serif;
        font-style: normal;

        .value {
          width: fit-content;
          font-size: 16px;
        }

        .unit {
          margin-top: 4px;
          margin-left: 2px;
          font-size: 10px;
        }
      }

      .progress {
        margin-left: 25px;
      }
    }
  }

  .gray {
    background: rgb(255 255 255 / 10%);
    border: 1px solid rgb(255 255 255 / 26%);
  }

  .blue {
    background: linear-gradient(
      270deg,
      rgb(14 38 73 / 60%) 0.06%,
      rgb(54 75 151 / 50%) 99.96%
    );
    border: 1px solid rgb(83 119 245 / 26%);
  }
</style>
