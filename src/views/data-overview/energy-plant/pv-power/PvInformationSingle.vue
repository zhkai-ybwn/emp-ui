<template>
  <div class="single">
    <div :class="props.index != 4 ? 'left-box' : 'left-co2'"></div>
    <div class="right-box">
      <div class="label">{{ data.title }}</div>
      <div class="value">
        {{ data.num.toLocaleString() }}
        <span class="space">&nbsp;</span>
        <span>{{ props.index != 4 ? 'kWh' : '吨标煤' }}</span>
      </div>
      <div class="section">
        <div v-if="props.index < 3" class="yoy">
          <div class="yoy-text">昨日</div>
          <div class="yoy-value">
            {{ data.ynum }}
          </div>
          <div class="yoy-text">kWh</div>
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div class="mom">
          <div class="mom-text">{{ data.rateT }}</div>
          <div
            v-if="data.rate != 0"
            :class="
              data.rate > 0
                ? 'mom-value'
                : data.rate < 0
                ? 'mom-value-down'
                : 'mom-value-text'
            "
          >
            {{ data.rate }}
          </div>
          <div v-if="data.rate !== '持平'" class="mom-text">%</div>
          <img class="mom-arrow" :src="isIncreaseOrDecrease(data.rate)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import increaseIcon from '@/assets/imgs/energy-plant/increase-icon.png';
  import decreaseIcon from '@/assets/imgs/energy-plant/decrease-icon.png';

  const props = defineProps({
    index: {
      type: Number,
      default: 2,
    },
    data: {
      type: Object,
      default: () => ({
        title: '',
        num: 0,
        ynum: 0,
        rate: 0,
      }),
    },
  });

  const isIncreaseOrDecrease = (percent) => {
    if (percent > 0) {
      return increaseIcon;
    }
    if (percent < 0) {
      return decreaseIcon;
    }
    return null;
  };
</script>

<style lang="less" scoped>
  .single {
    display: flex;
    justify-content: space-between;
    width: fit-content;

    .left-box {
      width: 78px;
      height: 78px;

      .set-back('@/assets/imgs/energy-plant/power-overview-single-icon0.png');
    }

    .left-co2 {
      width: 78px;
      height: 78px;

      .set-back('@/assets/imgs/energy-plant/co2.png');
    }

    .right-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

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

      .section {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        width: fit-content;
        height: 21px;
        background: linear-gradient(
          90deg,
          rgb(53 100 191 / 35%) 0.01%,
          rgb(27 76 171 / 0%) 105.95%
        );

        .yoy {
          display: flex;
          align-items: baseline;
          justify-content: space-evenly;

          .yoy-text {
            width: fit-content;
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-style: normal;
            line-height: 21px;
            text-align: center;
          }

          .yoy-value {
            color: #00fff0;
            font-size: 18px;
            line-height: 22px;
          }
        }

        .mom {
          display: flex;
          align-items: baseline;
          justify-content: space-evenly;

          .mom-text {
            color: rgb(255 255 255 / 85%);
            font-weight: 400;
            font-size: 14px;
            font-family: SourceHanSansCN-Regular, sans-serif;
            font-style: normal;
            line-height: 21px;
          }

          .mom-value {
            font-weight: 600;
            font-size: 18px;
            font-family: Barlow-SemiBold, sans-serif;
            background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
            background-clip: text;
            /* stylelint-disable */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .mom-value-down {
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

          .mom-arrow {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
</style>
