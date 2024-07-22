<template>
  <div class="a-bg">
    <div
      v-for="(item, index) in state.fposition"
      :key="index"
      :class="getClass(item, index)"
      :style="{
        position: 'absolute',
        top: `${item[0]}`,
        left: `${item[1]}`,
      }"
    >
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[1][0]}`,
        left: `${state.hposition[1][1]}`,
      }"
    >
      {{ state.info.gaugeCold3 ?? '--' }}
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[1][0]}`,
        left: `22.3rem`,
      }"
      >{{ state.info.xkB2EC ?? '--' }}</div
    >
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[2][0]}`,
        left: `${state.hposition[2][1]}`,
      }"
    >
      <div>{{ state.info.xhpfb2 ?? '--' }}</div>
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[3][0]}`,
        left: `${state.hposition[3][1]}`,
      }"
    >
      {{ state.info.gaugeCold2 ?? '--' }}
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[3][0]}`,
        left: `22.3rem`,
      }"
      >{{ state.info.xkB1EC ?? '--' }}</div
    >
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[4][0]}`,
        left: `${state.hposition[4][1]}`,
      }"
    >
      <div>{{ state.info.xhpfb1 ?? '--' }}</div>
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[5][0]}`,
        left: `${state.hposition[5][1]}`,
      }"
    >
      {{ state.info.gaugeCold4 ?? '--' }}
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[5][0]}`,
        left: `22.3rem`,
      }"
      >{{ state.info.xkB3EC ?? '--' }}</div
    >
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[6][0]}`,
        left: `${state.hposition[6][1]}`,
      }"
    >
      <div>{{ state.info.xhpfb3 ?? '--' }}</div>
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[7][0]}`,
        left: `${state.hposition[7][1]}`,
      }"
    >
      {{ state.info.gaugeCold5 ?? '--' }}
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[7][0]}`,
        left: `71.65rem`,
      }"
      >{{ state.info.xkB4EC ?? '--' }}</div
    >
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[8][0]}`,
        left: `${state.hposition[8][1]}`,
      }"
    >
      <div>{{ state.info.xhpfb4 ?? '--' }}</div>
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[9][0]}`,
        left: `${state.hposition[9][1]}`,
      }"
    >
      {{ state.info.gaugeCold6 ?? '--' }}
    </div>
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[9][0]}`,
        left: `71.65rem`,
      }"
      >{{ state.info.xkB5EC ?? '--' }}</div
    >
    <div
      class="h-position"
      :style="{
        display: 'flex',
        position: 'absolute',
        top: `${state.hposition[10][0]}`,
        left: `${state.hposition[10][1]}`,
      }"
    >
      <div>{{ state.info.xhpfb5 ?? '--' }}</div>
    </div>
    <div
      v-for="(item, index) in state.tposition"
      :key="index"
      :style="{
        position: 'absolute',
        top: `${item[0]}`,
        left: `${item[1]}`,
      }"
    >
      <div class="top">
        <div class="num">{{ state.info[`${index}TT`] ?? '--' }}</div>
        <div class="title">T</div>
      </div>
      <div class="bottom">
        <div class="num">{{ state.info[`${index}MT`] ?? '--' }}</div>
        <div class="title">H</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getBSystemData } from '@/api/integrated-monitor/conditioning-terminal';
  import useEchart from '@/hooks/useEchart';

  // @ts-ignore
  const { looping } = useEchart({});

  const state = reactive({
    info: {
      k2B1Status: false,
      gaugeCold2: null,
      xkB1EC: null,
      k1HB01TT: null,
      k1HB01MT: null,
      k2B2Status: false,
      k2B3Status: false,
      k2B4Status: false,
      k1HB02TT: null,
      k1HB02MT: null,
      xhpfb1: null,
      k3B1Status: false,
      gaugeCold3: null,
      xkB2EC: null,
      k2HB01TT: null,
      k2HB01MT: null,
      k3B2Status: false,
      k3B3Status: false,
      k3B4Status: false,
      k2HB02TT: null,
      k2HB02MT: null,
      xhpfb2: null,
      k4B1Status: false,
      gaugeCold4: null,
      xkB3EC: null,
      k3HB01TT: null,
      k3HB01MT: null,
      k4B2Status: false,
      k4B3Status: false,
      k4B4Status: false,
      k3HB02TT: null,
      k3HB02MT: null,
      xhpfb3: null,
      k5B1Status: false,
      gaugeCold5: null,
      xkB4EC: null,
      k4HB01TT: null,
      k4HB01MT: null,
      k5B2Status: false,
      k5B3Status: false,
      k5B4Status: false,
      k4HB02TT: null,
      k4HB02MT: null,
      xhpfb4: null,
      k6B1Status: false,
      gaugeCold6: null,
      xkB5EC: null,
      k5HB01TT: null,
      k5HB01MT: null,
      k6B2Status: false,
      k6B3Status: false,
      k6B4Status: false,
      k5HB02TT: null,
      k5HB02MT: null,
      xhpfb5: null,
    },
    fposition: {
      k3B1Status: ['9.6875rem', '8.1875rem'],
      k3B2Status: ['16.125rem', '8.5rem'],
      k3B3Status: ['14.375rem', '13.5rem', 'r'],
      k3B4Status: ['16.125rem', '32.1875rem'],
      k2B1Status: ['23.875rem', '8.1875rem'],
      k2B2Status: ['30.3125rem', '8.5rem'],
      k2B3Status: ['28.375rem', '13.5rem', 'r'],
      k2B4Status: ['30.3125rem', '32.1875rem'],
      k4B1Status: ['38.1875rem', '8.1875rem'],
      k4B2Status: ['44.5625rem', '8.5rem'],
      k4B3Status: ['42.5rem', '13.5rem', 'r'],
      k4B4Status: ['44.5625rem', '32.1875rem'],
      k5B1Status: ['8.1875rem', '58rem'],
      k5B2Status: ['14.5625rem', '58.125rem'],
      k5B3Status: ['12.875rem', '62.6875rem', 'r'],
      k5B4Status: ['14.5625rem', '81.75rem'],
      k6B1Status: ['23.9375rem', '58rem'],
      k6B2Status: ['30.3125rem', '58.125rem'],
      k6B3Status: ['28.625rem', '62.6875rem', 'r'],
      k6B4Status: ['30.3125rem', '81.75rem'],
    },
    tposition: {
      k2HB01: ['6.875rem', '35.9375rem'],
      k2HB02: ['14.375rem', '39.6875rem'],
      k1HB01: ['17.8125rem', '35.375rem'],
      k1HB02: ['31.875rem', '38.5rem'],
      k3HB01: ['35.625rem', '32.5rem'],
      k3HB02: ['41.5625rem', '32.5rem'],
      k4HB01: ['5.3125rem', '84.9375rem'],
      k4HB02: ['16.25rem', '87.5rem'],
      k5HB01: ['21.875rem', '84.9375rem'],
      k5HB02: ['32.5rem', '84.9375rem'],
    },
    hposition: {
      1: ['12.8125rem', '20.0625rem'],
      2: ['18.75rem', '19.9375rem'],
      3: ['26.875rem', '20.0625rem'],
      4: ['32.8125rem', '20.0625rem'],
      5: ['41.25rem', '20.2rem'],
      6: ['47.1875rem', '20.0675rem'],
      7: ['11.375rem', '69.3125rem'],
      8: ['17.1875rem', '69.5rem'],
      9: ['27.6625rem', '69.3125rem'],
      10: ['32.8125rem', '69.5rem'],
    },
  });

  const getClass = (item: Array<string>, index: string) => {
    // @ts-ignore
    if (state.info[index]) {
      return item[2] ? `${item[2]}-on` : 'on';
    }
    return item[2] ? `${item[2]}-off` : 'off';
  };

  const fetchData = async () => {
    try {
      const res = await getBSystemData();
      state.info = {
        ...res.data.bsystemK2,
        ...res.data.bsystemK3,
        ...res.data.bsystemK4,
        ...res.data.bsystemK5,
        ...res.data.bsystemK6,
      };
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
    width: 97.0625rem;
    height: 47.375rem;
    margin: 0 auto;
    .set-back('@/assets/imgs/integrated-monitor/Bduan.png');
  }

  .on {
    width: 0.8125rem;
    height: 1.125rem;
    .set-back('@/assets/imgs/integrated-monitor/fa-on.png');
  }

  .off {
    width: 0.8125rem;
    height: 1.125rem;
    .set-back('@/assets/imgs/integrated-monitor/fa-off.png');
  }

  .r-on {
    width: 1.125rem;
    height: 0.8125rem;
    .set-back('@/assets/imgs/integrated-monitor/rfa-on.png');
  }

  .r-off {
    width: 1.125rem;
    height: 0.8125rem;
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

  .h-position {
    justify-content: center;
    width: 3.4375rem;
    color: #fff;
    font-weight: 400;
    font-size: 0.6rem;
    font-family: Inter-Regular, sans-serif;
    line-height: 0.875rem;
  }
</style>
