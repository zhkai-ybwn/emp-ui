<template>
  <div class="alarm">
    <div class="section1">
      <div class="img">
        <img
          src="@/assets/imgs/smart/health/alarm-count-icon.png"
          alt=""
          width="54"
          height="54"
        />
      </div>
      <div class="text">
        <div
          :class="props.data.alarmingCount || 0 > 0 ? 'alarmtext' : ''"
          style="font-size: 28px"
          >{{ props.data.alarmingCount || 0
          }}<span style="font-size: 14px">个</span></div
        >
        <div>报警中</div>
      </div>
    </div>
    <div class="section2">
      <div class="img">
        <img
          src="@/assets/imgs/smart/health/alarm-count-icon.png"
          alt=""
          width="54"
          height="54"
        />
      </div>
      <div class="text">
        <div style="font-size: 28px"
          >{{ props.data.todayAlarmCount || 0
          }}<span style="font-size: 14px">个</span></div
        >
        <div>今日报警数</div>
      </div>
    </div>
    <div class="section3">
      <div class="img">
        <img
          src="@/assets/imgs/smart/health/alarm-icon.png"
          alt=""
          width="54"
          height="54"
        />
      </div>
      <div class="text">
        <div style="font-size: 28px"
          >{{ props.data.todayRate || 0
          }}<span style="font-size: 14px">%</span></div
        >
        <div>今日处理率</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });
</script>

<style lang="less" scoped>
  .alarm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: calc(17% - 12px);
    height: 360px;
    padding: 2.5% 1.5%;
    background: linear-gradient(
      270deg,
      rgb(157 180 220 / 6%) 0%,
      rgb(85 137 255 / 30%) 100%
    );
    border-radius: 4px;

    > div {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      width: 90%;
      margin: 0 auto;
    }

    .img {
      width: 54px;
      height: 54px;
      .set-back('@/assets/imgs/smart/health/alarm-back.png');
    }

    .text {
      width: 60%;
      margin-left: 24px;
      font-weight: 400;
      font-size: 20px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: 20px; /* 100% */
      // text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
      background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &::before {
        position: absolute;
        z-index: -1;
        text-shadow: 0 0 2px rgb(0 121 255 / 80%), 0 0 5px #06f;
        content: attr(text);
      }
    }

    .alarmtext {
      color: #ff4d4f;
      font-weight: 400;
      font-size: 20px;
      font-family: YouSheBiaoTiHei, sans-serif;
      font-style: normal;
      line-height: 20px; /* 142.857% */
      text-shadow: 0 0 2px rgb(124 120 86 / 80%), 0 0 5px #962222;
      -webkit-text-fill-color: #ff4d4f;
    }
  }
</style>
