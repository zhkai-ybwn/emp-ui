<template>
  <div class="single">
    <div class="left-box"></div>
    <div class="right-box">
      <div class="label">全厂空调总数</div>
      <div class="value">
        {{ 123 }}
        <span class="space">&nbsp;</span>
        <span>台</span>
      </div>
      <div class="section">
        <div class="yoy">
          <div class="yoy-text">多联机</div>
          <div class="yoy-value">
            {{ 123 }}
          </div>
          <div class="yoy-text">台</div>
        </div>
        <div>&nbsp;&nbsp;&nbsp;</div>
        <div class="mom">
          <div class="mom-text">室内机</div>
          <div class="mom-value">
            {{ 123 }}
          </div>
          <div class="mom-text">台</div>
          <img class="mom-arrow" :src="isIncreaseOrDecrease(1)" />
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
      }),
    },
    config: {
      type: Object,
      default: () => ({
        label: '',
        unit: '',
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
  .single {
    display: flex;
    justify-content: space-between;
    width: fit-content;

    .left-box {
      width: 78px;
      height: 78px;
      .set-back('@/assets/imgs/energy-plant/power-overview-single-icon0.png');
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
        align-items: center;
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
            color: #ffce21;
            font-size: 18px;

            .mom-value-in {
              font-weight: 600;
              font-size: 18px;
              font-family: Barlow-SemiBold, sans-serif;
              background: linear-gradient(180deg, #fff 15.91%, #f90 100%);
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              background-clip: text;
              /* stylelint-disable */
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
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
