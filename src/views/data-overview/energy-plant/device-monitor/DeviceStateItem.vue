<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-05 10:01:37
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-07 10:21:03
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\DeviceStateItem.vue
 * @Description: 设备状态Item
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="device-state-item">
    <div :class="['icon', config.type === 0 ? 'icon0' : 'icon1']"></div>
    <div class="info">
      <div class="title">{{ config.title }}</div>
      <div v-if="!Array.isArray(config.unit)" class="total-info">
        {{ data[0] }}<span>{{ config.unit }}</span>
      </div>
      <div v-else class="total-info">
        {{ data[0][0] }}<span>{{ config.unit[0] }}</span>
        <span>/</span>
        {{ data[0][1] }}<span>{{ config.unit[1] }}</span>
      </div>
      <div class="detail-info">
        <div class="detail-label">{{ config.label1 }}</div>
        <div
          v-if="config.label1"
          :class="[
            config.class1
              ? config.class1
              : data[1] > 0
              ? 'per-up'
              : data[1] < 0
              ? 'per-down'
              : 'per-text',
          ]"
        >
          {{
            config.isPer[0]
              ? data[1] === '持平'
                ? data[1]
                : Math.abs(data[1])
              : data[1]
          }}
        </div>
        <div v-if="data[1] !== '持平'" class="per-unit">{{ config.unit1 }}</div>
        <img
          v-if="config.isPer[0]"
          class="arrow"
          :src="isIncreaseOrDecrease(data[1])"
        />
        <div class="detail-label" style="margin-left: 10px">{{
          config.label2
        }}</div>
        <div
          v-if="config.label2"
          :class="[
            config.class2
              ? config.class2
              : data[2] > 0
              ? 'per-up'
              : data[2] > 0
              ? 'per-down'
              : 'per-text',
          ]"
        >
          {{
            config.isPer[1]
              ? data[2] === '持平'
                ? data[2]
                : Math.abs(data[2])
              : data[2]
          }}
        </div>
        <div v-if="data[2] !== '持平'" class="per-unit">{{ config.unit2 }}</div>
        <img
          v-if="config.isPer[1]"
          class="arrow"
          :src="isIncreaseOrDecrease(data[2])"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import increaseIcon from '@/assets/imgs/energy-plant/increase-icon.png';
  import decreaseIcon from '@/assets/imgs/energy-plant/decrease-icon.png';

  defineProps({
    config: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: Array,
      default: () => [],
    },
  });

  const isIncreaseOrDecrease = (percent) => {
    if (percent > 0) {
      return increaseIcon;
    }
    if (percent <= 0) {
      return decreaseIcon;
    }
    return null;
  };
</script>

<style lang="less" scoped>
  .device-state-item {
    display: flex;

    .icon {
      width: 78px;
      height: 78px;
    }

    .icon0 {
      .set-back('@/assets/imgs/energy-plant/device_state_type0.png');
    }

    .icon1 {
      .set-back('@/assets/imgs/energy-plant/device_state_type1.png');
    }

    .info {
      display: flex;
      flex-direction: column;

      .title {
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
      }

      .total-info {
        width: 152px;
        height: 33px;
        padding-left: 10px;
        color: #fff;
        font-weight: 400;
        font-size: 28px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-style: normal;
        line-height: normal;

        .set-back(
          '@/assets/imgs/energy-plant/device_total_bg.png'
        );

        :nth-child(1) {
          color: #fff;
          font-weight: 400;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
        }

        :nth-child(2) {
          margin-left: 5px;
          color: rgb(255 255 255 / 60%);
          font-weight: 400;
          font-size: 24px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          line-height: 16px;
        }

        :nth-child(3) {
          color: #fff;
          font-weight: 400;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
        }
      }

      .detail-info {
        display: flex;
        align-items: baseline;
        width: max-content;

        .detail-label {
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
        }

        .data-value1 {
          color: #00fff0;
          font-weight: 600;
          font-size: 18px;
          font-family: Barlow-SemiBold, sans-serif;
          font-style: normal;
          line-height: normal;

          span {
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }

        .data-value2 {
          color: #ffce21;
          font-weight: 600;
          font-size: 18px;
          font-family: Barlow-SemiBold, sans-serif;
          font-style: normal;
          line-height: normal;

          span {
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }

        .per-up {
          font-weight: 600;
          font-size: 18px;
          font-family: Barlow-SemiBold, sans-serif;
          font-style: normal;
          line-height: normal;
          background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .per-down {
          font-weight: 600;
          font-size: 18px;
          font-family: Barlow-SemiBold, sans-serif;
          font-style: normal;
          line-height: normal;
          background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .per-text {
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
        }

        .per-unit {
          margin-top: 5px;
          color: #fff;
          font-weight: 400;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
          font-style: normal;
          line-height: normal;
        }

        .arrow {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
</style>
