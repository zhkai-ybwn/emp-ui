<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-10-25 13:14:18
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-03-28 16:09:47
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\plant-monitor\left\QuanChangZongYongDianLiangSingle.vue
 * @Description: 全厂总用电量概况内部单个组件
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="power-overview-single" :style="{ '--widthx': config.width }">
    <div :class="['left-box', `left-icon${config.type}`]"></div>
    <div class="right-box">
      <div class="label">{{ config.label }}</div>
      <div class="value">
        {{
          data.value.toLocaleString().length > 10
            ? (data.value / 1000).toFixed(2).toLocaleString()
            : data.value.toFixed(2).toLocaleString()
        }}
        <span class="space">&nbsp;</span>
        <span>{{
          data.value.toLocaleString().length > 10 ? config.unit2 : config.unit1
        }}</span>
      </div>
      <div class="comparison-section">
        <div v-if="data.yoy" class="yoy">
          <div class="yoy-text">同比</div>
          <div class="yoy-value-unit">
            <div
              :class="[
                data.yoy > 0
                  ? 'yoy-value-in'
                  : data.yoy < 0
                  ? 'yoy-value-de'
                  : 'yoy-value-text',
              ]"
            >
              {{ data.yoy === '持平' ? data.yoy : Math.abs(data.yoy) }}
            </div>
            <div v-if="data.yoy !== '持平'" class="yoy-unit">%</div>
          </div>
          <img class="yoy-arrow" :src="isIncreaseOrDecrease(data.yoy)" />
        </div>
        <div v-if="data.mom" class="mom">
          <div class="mom-text">环比</div>
          <div class="mom-value-unit">
            <div
              :class="[
                data.mom > 0
                  ? 'mom-value-in'
                  : data.mom < 0
                  ? 'mom-value-de'
                  : 'mom-value-text',
              ]"
            >
              {{ data.mom === '持平' ? data.mom : Math.abs(data.mom) }}
            </div>
            <div v-if="data.mom !== '持平'" class="mom-unit">%</div>
          </div>
          <img class="mom-arrow" :src="isIncreaseOrDecrease(data.mom)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import increaseIcon from '@/assets/imgs/energy-plant/increase-icon.png';
  import decreaseIcon from '@/assets/imgs/energy-plant/decrease-icon.png';

  defineProps({
    data: {
      type: Object,
      default: () => ({
        value: 0,
        mom: 0,
        yoy: 0,
        unit: '',
      }),
    },
    config: {
      type: Object,
      default: () => ({
        label: '',
        type: 0,
        width: '',
      }),
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
  .power-overview-single {
    display: flex;
    width: var(--widthx);

    .left-box {
      width: 78px;
      height: 78px;
    }

    .left-icon0 {
      .set-back('@/assets/imgs/energy-plant/power-overview-single-icon0.png');
    }

    .left-icon1 {
      .set-back('@/assets/imgs/energy-plant/power-overview-single-icon1.png');
    }

    .left-icon2 {
      .set-back('@/assets/imgs/energy-plant/power-overview-single-icon2.png');
    }

    .right-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      // width: 152px;
      .label {
        color: #fff;
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
      }

      .value {
        display: flex;
        align-items: center;
        width: fit-content;
        height: 33px;
        padding-left: 10px;
        color: #fff;
        font-weight: 400;
        font-size: 28px;
        font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
        font-style: normal;
        line-height: normal;

        .set-back('@/assets/imgs/energy-plant/powerview-value-bg.png');

        .space {
          font-size: 25px;
        }

        span {
          margin-top: 10px;
          font-weight: 350;
          font-size: 14px;
          font-family: SourceHanSansCN-Normal, sans-serif;
        }
      }

      .comparison-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: max-content;
        height: 21px;
        background: linear-gradient(
          90deg,
          rgb(53 100 191 / 35%) 0.01%,
          rgb(27 76 171 / 0%) 105.95%
        );

        .yoy {
          display: flex;
          align-items: center;
          justify-content: space-evenly;

          .yoy-text {
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-style: normal;
            line-height: 21px;
            text-align: center;
          }

          .yoy-value-unit {
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: normal;
            line-height: 21px;

            .yoy-value-in {
              font-weight: 600;
              font-size: 18px;
              font-family: Barlow-SemiBold, sans-serif;
              background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .yoy-value-de {
              font-weight: 600;
              font-size: 18px;
              font-family: Barlow-SemiBold, sans-serif;
              background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .yoy-value-text {
              color: rgb(255 255 255 / 85%);
              font-weight: 400;
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, sans-serif;
              font-style: normal;
              line-height: 21px;
            }

            .yoy-unit {
              margin-top: 3px;
              color: rgb(255 255 255 / 85%);
              font-weight: 400;
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, sans-serif;
            }
          }

          .yoy-arrow {
            width: 12px;
            height: 12px;
          }
        }

        .mom {
          display: flex;
          align-items: center;
          justify-content: space-evenly;

          .mom-text {
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-style: normal;
            line-height: 21px;
          }

          .mom-value-unit {
            display: flex;
            align-items: center;
            font-style: normal;
            line-height: 21px;

            .mom-value-in {
              font-weight: 600;
              font-size: 18px;
              font-family: Barlow-SemiBold, sans-serif;
              background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .mom-value-de {
              font-weight: 600;
              font-size: 18px;
              font-family: Barlow-SemiBold, sans-serif;
              background: linear-gradient(180deg, #c6ffd6 0%, #08a534 100%);
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .mom-value-text {
              color: rgb(255 255 255 / 85%);
              font-weight: 400;
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, sans-serif;
              font-style: normal;
              line-height: 21px;
            }

            .mom-unit {
              margin-top: 3px;
              color: rgb(255 255 255 / 85%);
              font-weight: 400;
              font-size: 14px;
              font-family: SourceHanSansCN-Regular, sans-serif;
            }
          }

          .mom-arrow {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
</style>
