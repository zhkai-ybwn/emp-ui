<template>
  <div class="a-bg">
    <div class="a1" :class="state.info.k1A1Status ? 'on' : 'off'"></div>
    <div class="a2" :class="state.info.k1A2Status ? 'on' : 'off'"></div>
    <div class="a3" :class="state.info.k1A3Status ? 'r-on' : 'r-off'"></div>
    <div class="a4" :class="state.info.k1A4Status ? 'on' : 'off'"></div>
    <div class="temp1">
      <div class="top">
        <div class="num">{{ state.info.k1HA01TT ?? '--' }}</div>
        <div class="title">T</div>
      </div>
      <div class="bottom">
        <div class="num">{{ state.info.k1HA01MT ?? '--' }}</div>
        <div class="title">H</div>
      </div>
    </div>
    <div class="temp2">
      <div class="top">
        <div class="num">{{ state.info.k1hA02TT ?? '--' }}</div>
        <div class="title">T</div>
      </div>
      <div class="bottom">
        <div class="num">{{ state.info.k1hA02MT ?? '--' }}</div>
        <div class="title">H</div>
      </div>
    </div>
    <div class="xk1">
      {{ state.info.gaugeCold ?? '--' }}
    </div>
    <div class="xk2"> {{ state.info.xkA1EC ?? '--' }}</div>
    <div class="xhpf">{{ state.info.xhPFA1 ?? '--' }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getASystemData } from '@/api/integrated-monitor/conditioning-terminal';
  import useEchart from '@/hooks/useEchart';

  // @ts-ignore
  const { looping } = useEchart({});

  const state = reactive({
    info: {
      k1A1Status: false,
      gaugeCold: null,
      xkA1EC: null,
      k1HA01TT: null,
      k1HA01MT: null,
      k1A2Status: false,
      k1A3Status: false,
      xhPFA1: null,
      k1A4Status: false,
      k1hA02TT: null,
      k1hA02MT: null,
    },
  });

  const fetchData = async () => {
    try {
      const res = await getASystemData();
      state.info = res.data;
    } catch (err) {
      //
    } finally {
      //
    }
  };
  // fetchData();
  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .a-bg {
    position: relative;
    width: 102.4375rem;
    height: 38rem;
    margin: 0 auto;
    .set-back('@/assets/imgs/integrated-monitor/Aduan.png');

    .a1 {
      position: absolute;
      top: 23.3125rem;
      left: 9.75rem;
    }

    .a2 {
      position: absolute;
      top: 32.3125rem;
      left: 9.75rem;
    }

    .a3 {
      position: absolute;
      top: 29.75rem;
      left: 15.3125rem;
    }

    .a4 {
      position: absolute;
      top: 32.3125rem;
      left: 41.625rem;
    }

    .temp1 {
      position: absolute;
      top: 21.125rem;
      left: 50rem;
    }

    .temp2 {
      position: absolute;
      top: 35rem;
      left: 50rem;
    }

    .xk1 {
      position: absolute;
      top: 28rem;
      left: 27.875rem;
      width: 3.4375rem;
      color: #fff;
      font-weight: 400;
      font-size: 0.75rem;
      font-family: Inter-Regular, sans-serif;
      line-height: 0.875rem;
      text-align: center;
    }

    .xk2 {
      position: absolute;
      top: 28rem;
      left: 31rem;
      width: 3.4375rem;
      color: #fff;
      font-weight: 400;
      font-size: 0.75rem;
      font-family: Inter-Regular, sans-serif;
      line-height: 0.875rem;
      text-align: center;
    }

    .xhpf {
      position: absolute;
      top: 36rem;
      left: 20.3rem;
      width: 10rem;
      color: #fff;
      font-weight: 400;
      font-size: 0.75rem;
      font-family: Inter-Regular, sans-serif;
      line-height: 0.875rem;
      text-align: center;
    }

    .on {
      width: 1.25rem;
      height: 1.75rem;
      .set-back('@/assets/imgs/integrated-monitor/fa-on.png');
    }

    .off {
      width: 1.25rem;
      height: 1.75rem;
      .set-back('@/assets/imgs/integrated-monitor/fa-off.png');
    }

    .r-on {
      width: 1.75rem;
      height: 1.25rem;
      .set-back('@/assets/imgs/integrated-monitor/rfa-on.png');
    }

    .r-off {
      width: 1.75rem;
      height: 1.25rem;
      .set-back('@/assets/imgs/integrated-monitor/rfa-off.png');
    }

    .top {
      display: flex;
      margin-bottom: 0.3125rem;
    }

    .bottom {
      display: flex;
    }

    .num {
      width: 2.5rem;
      height: 1rem;
      margin-right: 0.3125rem;
      color: #fff;
      font-weight: 400;
      font-size: 0.75rem;
      font-family: Inter-Regular, sans-serif;
      line-height: 1rem;
      text-align: right;
    }

    .title {
      width: 1.75rem;
      height: 1rem;
      color: #fff;
      font-weight: 400;
      font-size: 0.75rem;
      font-family: SourceHanSansCN-Regular, sans-serif;
      line-height: 1rem;
      text-align: center;
      background: #4787f0;
      border: 0.0625rem solid #266fe8;
    }
  }
</style>
