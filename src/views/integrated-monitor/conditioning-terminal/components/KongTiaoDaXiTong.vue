<template>
  <div class="contain">
    <div class="conditioning-terminal">
      <div
        class="a1"
        :class="state.res.largeSystemA.tka1Status ? 'on' : 'off'"
      ></div>
      <div
        class="a2"
        :class="state.res.largeSystemA.tka2Status ? 'on' : 'off'"
      ></div>
      <div
        class="a3"
        :class="state.res.largeSystemA.tka3Status ? 'r-on' : 'r-off'"
      ></div>
      <div
        class="a4"
        :class="state.res.largeSystemA.tka4Status ? 'on' : 'off'"
      ></div>
      <div
        class="b1"
        :class="state.res.largeSystemB.tkb1Status ? 'on' : 'off'"
      ></div>
      <div
        class="b2"
        :class="state.res.largeSystemB.tkb2Status ? 'on' : 'off'"
      ></div>
      <div
        class="b3"
        :class="state.res.largeSystemB.tkb3Status ? 'l-on' : 'l-off'"
      ></div>
      <div
        class="b4"
        :class="state.res.largeSystemB.tkb4Status ? 'on' : 'off'"
      ></div>
      <div class="temp1">
        <div class="top">
          <div class="num">{{ state.res.largeSystemA.ha01TT ?? '--' }}</div>
          <div class="title">T</div>
        </div>
        <div class="bottom">
          <div class="num">{{ state.res.largeSystemA.ha01MT ?? '--' }}</div>
          <div class="title">H</div>
        </div>
      </div>
      <div class="temp2">
        <div class="top">
          <div class="title">T</div>
          <div class="num">{{ state.res.largeSystemB.hb01TT ?? '--' }}</div>
        </div>
        <div class="bottom">
          <div class="title">H</div>
          <div class="num">{{ state.res.largeSystemB.hb01MT ?? '--' }}</div>
        </div>
      </div>
      <div class="temp3">
        <div class="top">
          <div class="num">{{ state.res.largeSystemA.ha02TT ?? '--' }}</div>
          <div class="title">T</div>
        </div>
        <div class="bottom">
          <div class="num">{{ state.res.largeSystemA.ha02MT ?? '--' }}</div>
          <div class="title">H</div>
        </div>
      </div>
      <div class="temp4">
        <div class="top">
          <div class="title">T</div>
          <div class="num">{{ state.res.largeSystemB.hb02TT ?? '--' }}</div>
        </div>
        <div class="bottom">
          <div class="title">H</div>
          <div class="num">{{ state.res.largeSystemB.hb02MT ?? '--' }}</div>
        </div>
      </div>
      <div class="temp5">
        <div class="top">
          <div class="num">{{ state.res.largeSystemA.ha03TT ?? '--' }}</div>
          <div class="title">T</div>
        </div>
        <div class="bottom">
          <div class="num">{{ state.res.largeSystemA.ha03MT ?? '--' }}</div>
          <div class="title">H</div>
        </div>
      </div>
      <div class="temp6">
        <div class="top">
          <div class="title">T</div>
          <div class="num">{{ state.res.largeSystemB.hb03TT ?? '--' }}</div>
        </div>
        <div class="bottom">
          <div class="title">H</div>
          <div class="num">{{ state.res.largeSystemB.hb03MT ?? '--' }}</div>
        </div>
      </div>
      <div class="temp7">
        <div class="top">
          <div class="num">{{ state.res.largeSystemA.ha04TT ?? '--' }}</div>
          <div class="title">T</div>
        </div>
        <div class="bottom">
          <div class="num">{{ state.res.largeSystemA.ha04MT ?? '--' }}</div>
          <div class="title">H</div>
        </div>
      </div>
      <div class="temp8">
        <div class="top">
          <div class="title">T</div>
          <div class="num">{{ state.res.largeSystemB.hb04TT ?? '--' }}</div>
        </div>
        <div class="bottom">
          <div class="title">H</div>
          <div class="num">{{ state.res.largeSystemB.hb04MT ?? '--' }}</div>
        </div>
      </div>
      <div
        class="h-position"
        :style="{
          display: 'flex',
          position: 'absolute',
          width: '3.4375rem',
          justifyContent: 'center',
          top: `${state.hposition[1][0]}`,
          left: `${state.hposition[1][1]}`,
        }"
      >
        {{ state.res.largeSystemA.gaugeColdA ?? '- -' }}
      </div>
      <div
        class="h-position"
        :style="{
          display: 'flex',
          position: 'absolute',
          width: '3.4375rem',
          justifyContent: 'center',
          top: `${state.hposition[1][0]}`,
          left: `30.9375rem`,
        }"
        >{{ state.res.largeSystemA.ktA1EC ?? '- -' }}</div
      >
      <div
        class="h-position"
        :style="{
          display: 'flex',
          position: 'absolute',
          width: '3.4375rem',
          justifyContent: 'center',
          top: `${state.hposition[2][0]}`,
          left: `${state.hposition[2][1]}`,
        }"
      >
        {{ state.res.largeSystemB.ktB1EC ?? '- -' }}
      </div>
      <div
        class="h-position"
        :style="{
          display: 'flex',
          position: 'absolute',
          width: '3.4375rem',
          justifyContent: 'center',
          top: `${state.hposition[2][0]}`,
          left: `71.2rem`,
        }"
        >{{ state.res.largeSystemB.gaugeColdB ?? '- -' }}</div
      >
      <div
        class="h-position"
        :style="{
          display: 'flex',
          position: 'absolute',
          width: '10rem',
          justifyContent: 'center',
          top: `${state.hposition[3][0]}`,
          left: `${state.hposition[3][1]}`,
        }"
      >
        <div>{{ state.res.largeSystemA.hpfa1 ?? '- -' }}</div>
      </div>
      <div
        class="h-position"
        :style="{
          display: 'flex',
          position: 'absolute',
          width: '10rem',
          justifyContent: 'center',
          top: `${state.hposition[4][0]}`,
          left: `${state.hposition[4][1]}`,
        }"
      >
        <div>{{ state.res.largeSystemB.hpfb1 ?? '- -' }}</div>
      </div>
    </div>

    <div class="bottom-box">
      <ModuleBox :config="state.title1" class="box1" style="margin-right: 2%">
        <div v-if="state.allNull1" class="empty">
          <div class="img"></div>
          <div class="text">暂无数据</div>
        </div>
        <div v-if="!state.allNull1" class="item-list">
          <div class="temp">
            <div v-for="(item, index) in state.box1.temp" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">℃</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
          <div class="wet">
            <div v-for="(item, index) in state.box1.wet" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">%</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
          <div class="co">
            <div v-for="(item, index) in state.box1.co" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">ppm</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
          <div class="pm">
            <div v-for="(item, index) in state.box1.PM" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">μg/m3</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </ModuleBox>
      <ModuleBox :config="state.title2" class="box2">
        <div v-if="state.allNull2" class="empty">
          <div class="img"></div>
          <div class="text">暂无数据</div>
        </div>
        <div v-if="!state.allNull2" class="item-list">
          <div class="temp">
            <div v-for="(item, index) in state.box2.temp" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">℃</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
          <div class="wet">
            <div v-for="(item, index) in state.box2.wet" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">%</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
          <div class="co">
            <div v-for="(item, index) in state.box2.co" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">ppm</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
          <div class="pm">
            <div v-for="(item, index) in state.box2.PM" :key="index">
              <div class="value">
                {{ item.value ?? '- -' }} <span class="unit">μg/m3</span>
              </div>
              <div class="title1">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </ModuleBox>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue';
  import {
    getLargeSystemData,
    getPlatformData,
    getStationHallData,
  } from '@/api/integrated-monitor/conditioning-terminal';
  import useEchart from '@/hooks/useEchart';
  import ModuleBox from '../../common/ModuleBox.vue';

  // @ts-ignore
  const { looping } = useEchart({});

  const state = reactive({
    allNull1: true,
    allNull2: true,
    title1: {
      Width: '45%',
      titleHeight: '2.5rem',
      text: '站厅空气质量实时数据',
      textEn: '',
      Height: '16rem',
    },
    title2: {
      Width: '35%',
      titleHeight: '2.5rem',
      text: '站台空气质量实时数据',
      textEn: '',
      Height: '16rem',
    },
    res: {
      largeSystemA: {
        gaugeColdA: null,
        ktA1EC: null,
        tka3Status: false,
        ha03TT: null,
        ha03MT: null,
        tka4Status: false,
        tka2Status: false,
        ha02MT: null,
        tka1Status: false,
        ha01TT: null,
        hpfa1: null,
        ha04TT: null,
        ha02TT: null,
        ha01MT: null,
        ha04MT: null,
      },
      largeSystemB: {
        gaugeColdB: null,
        ktB1EC: null,
        tkb4Status: false,
        tkb3Status: false,
        hpfb1: null,
        hb04TT: null,
        hb04MT: null,
        hb01TT: null,
        hb01MT: null,
        tkb2Status: false,
        tkb1Status: false,
        hb02TT: null,
        hb02MT: null,
        hb03TT: null,
        hb03MT: null,
      },
    },
    box1: {
      temp: [
        { title: '温度1', value: null },
        { title: '温度2', value: null },
        { title: '温度3', value: null },
        { title: '温度4', value: null },
        { title: '温度5', value: null },
      ],
      wet: [
        { title: '湿度1', value: null },
        { title: '湿度2', value: null },
        { title: '湿度3', value: null },
        { title: '湿度4', value: null },
        { title: '湿度5', value: null },
      ],
      co: [
        { title: '二氧化碳1', value: null },
        { title: '二氧化碳2', value: null },
        { title: '二氧化碳3', value: null },
        { title: '二氧化碳4', value: null },
      ],
      PM: [
        { title: 'PM-A03', value: null },
        { title: 'PM-A04', value: null },
        { title: 'PM-B03', value: null },
        { title: 'PM-B04', value: null },
      ],
    },
    box2: {
      temp: [
        { title: '温度1', value: null },
        { title: '温度2', value: null },
        { title: '温度3', value: null },
        { title: '温度4', value: null },
      ],
      wet: [
        { title: '湿度1', value: null },
        { title: '湿度2', value: null },
        { title: '湿度3', value: null },
        { title: '湿度4', value: null },
      ],
      co: [
        { title: '二氧化碳1', value: null },
        { title: '二氧化碳2', value: null },
        { title: '二氧化碳3', value: null },
        { title: '二氧化碳4', value: null },
      ],
      PM: [
        { title: 'PM-A03', value: null },
        { title: 'PM-A04', value: null },
        { title: 'PM-B03', value: null },
        { title: 'PM-B04', value: null },
      ],
    },
    hposition: {
      '1': ['23.8125rem', '27.5rem'],
      '2': ['23.8125rem', '68rem'],
      '3': ['31.875rem', '20.4rem'],
      '4': ['31.875rem', '71.6rem'],
    },
  });

  const fetchData = () => {
    getLargeSystemData()
      .then((res) => {
        state.res = res.data;
      })
      .catch(() => {
        //
      });
    getStationHallData()
      .then((res1) => {
        state.box1 = {
          temp: [
            { title: '温度1', value: res1.data.temp1 },
            { title: '温度2', value: res1.data.temp2 },
            { title: '温度3', value: res1.data.temp3 },
            { title: '温度4', value: res1.data.temp4 },
            { title: '温度5', value: res1.data.temp5 },
          ],
          wet: [
            { title: '湿度1', value: res1.data.humidity1 },
            { title: '湿度2', value: res1.data.humidity2 },
            { title: '湿度3', value: res1.data.humidity3 },
            { title: '湿度4', value: res1.data.humidity4 },
            { title: '湿度5', value: res1.data.humidity5 },
          ],
          co: [
            { title: '二氧化碳1', value: res1.data.carbonDioxide1 },
            { title: '二氧化碳2', value: res1.data.carbonDioxide2 },
            { title: '二氧化碳3', value: res1.data.carbonDioxide3 },
            { title: '二氧化碳4', value: res1.data.carbonDioxide4 },
          ],
          PM: [
            { title: 'PM-A01', value: res1.data.pmA01 },
            { title: 'PM-A02', value: res1.data.pmA02 },
            { title: 'PM-B01', value: res1.data.pmB01 },
            { title: 'PM-B02', value: res1.data.pmB02 },
          ],
        };
        state.allNull1 = Object.values(res1).every((value) => value === null);
      })
      .catch(() => {
        //
      });
    getPlatformData()
      .then((res2) => {
        state.box2 = {
          temp: [
            { title: '温度1', value: res2.data.temp1 },
            { title: '温度2', value: res2.data.temp2 },
            { title: '温度3', value: res2.data.temp3 },
            { title: '温度4', value: res2.data.temp4 },
          ],
          wet: [
            { title: '湿度1', value: res2.data.humidity1 },
            { title: '湿度2', value: res2.data.humidity2 },
            { title: '湿度3', value: res2.data.humidity3 },
            { title: '湿度4', value: res2.data.humidity4 },
          ],
          co: [
            { title: '二氧化碳1', value: res2.data.carbonDioxide1 },
            { title: '二氧化碳2', value: res2.data.carbonDioxide2 },
            { title: '二氧化碳3', value: res2.data.carbonDioxide3 },
            { title: '二氧化碳4', value: res2.data.carbonDioxide4 },
          ],
          PM: [
            { title: 'PM-A03', value: res2.data.pmA03 },
            { title: 'PM-A04', value: res2.data.pmA04 },
            { title: 'PM-B03', value: res2.data.pmB03 },
            { title: 'PM-B04', value: res2.data.pmB04 },
          ],
        };
        state.allNull2 = Object.values(res2).every((value) => value === null);
      })
      .catch(() => {
        //
      });
    // try {
    //   const [res, res1, res2] = await Promise.all([
    //     getLargeSystemData(),
    //     getStationHallData(),
    //     getPlatformData(),
    //   ]);
    //   state.res = res.data;

    //   state.box1 = {
    //     temp: [
    //       { title: '温度1', value: res1.data.temp1 },
    //       { title: '温度2', value: res1.data.temp2 },
    //       { title: '温度3', value: res1.data.temp3 },
    //       { title: '温度4', value: res1.data.temp4 },
    //       { title: '温度5', value: res1.data.temp5 },
    //     ],
    //     wet: [
    //       { title: '湿度1', value: res1.data.humidity1 },
    //       { title: '湿度2', value: res1.data.humidity2 },
    //       { title: '湿度3', value: res1.data.humidity3 },
    //       { title: '湿度4', value: res1.data.humidity4 },
    //       { title: '湿度5', value: res1.data.humidity5 },
    //     ],
    //     co: [
    //       { title: '二氧化碳1', value: res1.data.carbonDioxide1 },
    //       { title: '二氧化碳2', value: res1.data.carbonDioxide2 },
    //       { title: '二氧化碳3', value: res1.data.carbonDioxide3 },
    //       { title: '二氧化碳4', value: res1.data.carbonDioxide4 },
    //     ],
    //     PM: [
    //       { title: 'PM-A01', value: res1.data.pmA01 },
    //       { title: 'PM-A02', value: res1.data.pmA02 },
    //       { title: 'PM-B01', value: res1.data.pmB01 },
    //       { title: 'PM-B02', value: res1.data.pmB02 },
    //     ],
    //   };
    //   state.allNull1 = Object.values(res1).every((value) => value === null);

    //   state.box2 = {
    //     temp: [
    //       { title: '温度1', value: res2.data.temp1 },
    //       { title: '温度2', value: res2.data.temp2 },
    //       { title: '温度3', value: res2.data.temp3 },
    //       { title: '温度4', value: res2.data.temp4 },
    //     ],
    //     wet: [
    //       { title: '湿度1', value: res2.data.humidity1 },
    //       { title: '湿度2', value: res2.data.humidity2 },
    //       { title: '湿度3', value: res2.data.humidity3 },
    //       { title: '湿度4', value: res2.data.humidity4 },
    //     ],
    //     co: [
    //       { title: '二氧化碳1', value: res2.data.carbonDioxide1 },
    //       { title: '二氧化碳2', value: res2.data.carbonDioxide2 },
    //       { title: '二氧化碳3', value: res2.data.carbonDioxide3 },
    //       { title: '二氧化碳4', value: res2.data.carbonDioxide4 },
    //     ],
    //     PM: [
    //       { title: 'PM-A03', value: res2.data.pmA03 },
    //       { title: 'PM-A04', value: res2.data.pmA04 },
    //       { title: 'PM-B03', value: res2.data.pmB03 },
    //       { title: 'PM-B04', value: res2.data.pmB04 },
    //     ],
    //   };
    //   state.allNull2 = Object.values(res2).every((value) => value === null);
    // } catch (err) {
    //   // 错误处理
    // }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .contain {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .conditioning-terminal {
    position: relative;
    width: 102.5rem;
    height: 33.4375rem;
    margin: 0 auto;
    background-image: url('@/assets/imgs/integrated-monitor/daxitong.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .bottom-box {
    display: flex;
    flex: 1;
    // align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    // margin-bottom: 2.875rem;
    .box2 {
      .item-list {
        height: 100%;
        padding: 1.25rem 0;
        padding-left: 10%;

        .title1 {
          margin-top: 0.3125rem;
          color: rgb(198 209 219 / 60%);
          font-weight: 400;
          font-size: 0.625rem;
          font-family: SourceHanSansCN-Regular, sans-serif;
          font-style: normal;
        }

        .unit {
          color: #c6d1db;
          font-weight: 400;
          font-size: 0.625rem;
          font-style: normal;
        }

        .value {
          color: #f2f6fa;
          font-weight: 600;
          font-size: 1.125rem;
          font-family: Barlow-Italic, sans-serif;
          font-style: normal;
        }
      }

      .temp {
        display: flex;
        align-items: center;
        height: 25%;

        > div {
          width: 25%;
        }

        .value {
          color: #64fbff;
          font-weight: 600;
          font-size: 1.125rem;
          font-family: Barlow-Italic, sans-serif;
          font-style: normal;
        }
      }

      .wet,
      .co,
      .pm {
        display: flex;
        align-items: center;
        height: 25%;

        > div {
          width: 25%;
        }
      }
    }

    .box1 {
      .item-list {
        height: 100%;
        padding: 1.25rem 0;
        padding-left: 10%;

        .title1 {
          margin-top: 0.3125rem;
          color: rgb(198 209 219 / 60%);
          font-weight: 400;
          font-size: 0.625rem;
          font-family: SourceHanSansCN-Regular, sans-serif;
          font-style: normal;
        }

        .unit {
          color: #c6d1db;
          font-weight: 400;
          font-size: 0.5rem;
          font-style: normal;
        }

        .value {
          color: #f2f6fa;
          font-weight: 600;
          font-size: 1.125rem;
          font-family: Barlow-Italic, sans-serif;
          font-style: normal;
        }
      }

      .temp {
        display: flex;
        align-items: center;
        height: 25%;

        > div {
          width: 20%;
        }

        .value {
          color: #64fbff;
          font-weight: 600;
          font-size: 1.125rem;
          font-family: Barlow-Italic, sans-serif;
          font-style: normal;
        }
      }

      .wet,
      .co,
      .pm {
        display: flex;
        align-items: center;
        height: 25%;

        > div {
          width: 20%;
        }
      }
    }
  }

  .a1 {
    position: absolute;
    top: 20.125rem;
    left: 9.5rem;
  }

  .a2 {
    position: absolute;
    top: 16.8125rem;
    left: 9.5rem;
  }

  .a3 {
    position: absolute;
    top: 24.8125rem;
    left: 15.25rem;
  }

  .a4 {
    position: absolute;
    top: 28rem;
    left: 9.5rem;
  }

  .b1 {
    position: absolute;
    top: 19.875rem;
    left: 91.6875rem;
  }

  .b2 {
    position: absolute;
    top: 17.1875rem;
    left: 91.6875rem;
  }

  .b3 {
    position: absolute;
    top: 24.8125rem;
    left: 85.875rem;
  }

  .b4 {
    position: absolute;
    top: 28rem;
    left: 93.4375rem;
  }

  .temp1 {
    position: absolute;
    top: 3.9375rem;
    left: 10.3125rem;
  }

  .temp2 {
    position: absolute;
    top: 3.9375rem;
    left: 86.875rem;
  }

  .temp3 {
    position: absolute;
    top: 13.4375rem;
    left: 12.875rem;
  }

  .temp4 {
    position: absolute;
    top: 13.4375rem;
    left: 84rem;
  }

  .temp5 {
    position: absolute;
    top: 16.6875rem;
    left: 41.125rem;
  }

  .temp6 {
    position: absolute;
    top: 16.6875rem;
    left: 55.875rem;
  }

  .temp7 {
    position: absolute;
    top: 30.5625rem;
    left: 41.125rem;
  }

  .temp8 {
    position: absolute;
    top: 30.5625rem;
    left: 55.875rem;
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

  .l-on {
    width: 1.75rem;
    height: 1.25rem;
    .set-back('@/assets/imgs/integrated-monitor/lfa-on.png');
  }

  .l-off {
    width: 1.75rem;
    height: 1.25rem;
    .set-back('@/assets/imgs/integrated-monitor/lfa-off.png');
  }

  .top {
    display: flex;
    margin-bottom: 0.3125rem;
  }

  .bottom {
    display: flex;
  }

  .temp1,
  .temp3,
  .temp5,
  .temp7 {
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
  }

  .temp2,
  .temp4,
  .temp6,
  .temp8 {
    .num {
      width: 2.5rem;
      height: 1rem;
      margin-left: 0.3125rem;
      color: #fff;
      font-weight: 400;
      font-size: 0.75rem;
      font-family: Inter-Regular, sans-serif;
      line-height: 1rem;
    }
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
    color: #fff;
    font-weight: 400;
    font-size: 0.75rem;
    font-family: Inter-Regular, sans-serif;
    line-height: 0.875rem;
    text-align: center;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .img {
      width: 1.5rem;
      height: 1.5rem;
      .set-back('@/assets/imgs/integrated-monitor/empty.png');
    }

    .text {
      color: #7787a2;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 24px;
      text-align: center;
      text-transform: none;
    }
  }
</style>
