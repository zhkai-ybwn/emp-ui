<template>
  <div>
    <ModuleBox :config="state.title" :button-list="state.buttonList">
      <div class="nengxiao-contain">
        <div v-if="state.loading" class="load">
          <Loading
            :percnet="state.percent"
            style="position: absolute"
          ></Loading>
        </div>
        <div v-if="state.buttonList[0].title === '月数据'" class="date"
          >{{ state.year }}年{{ state.month }}月</div
        >
        <div v-if="state.buttonList[0].title === '日数据'" class="date"
          >{{ state.year }}年{{ state.month }}月{{ state.date }}日</div
        >
        <div class="rule">
          <div class="top">
            <div class="ave" :style="{ left: getRule(state.averageCOP) + '%' }">
              <div class="text">行业平均</div>
              <div class="img"></div>
            </div>
            <div class="now" :style="{ left: getRule(state.currentCOP) + '%' }">
              <div class="text">当前({{ format(state.currentCOP) }})</div>
              <div class="img"></div>
            </div>
          </div>
          <div class="middle">
            <div
              v-for="(item, index) in state.fourList"
              :key="index"
              :class="item.class"
            >
              <div class="text1"> {{ item.title }}</div>
            </div>
          </div>
          <div class="down">
            <div
              v-for="(item, index) in state.ruleList"
              :key="index"
              class="grid"
            >
              <div class="num"> {{ item }}</div>
            </div>
          </div>
        </div>
        <div class="section">
          <div
            v-for="(item, index) in state.sectionList"
            :key="index"
            class="item"
          >
            <div class="icon"></div>
            <div class="title">{{ item.title }}</div>
            <div class="num">
              {{ format(item.num) }}<span class="unit">{{ item.unit }}</span>
            </div>
            <div v-if="item.icon" class="elec">
              <a-tooltip content-class="report-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2351_3816)">
                    <path
                      d="M7.99998 14.6666C9.84091 14.6666 11.5076 13.9204 12.714 12.714C13.9204 11.5075 14.6666 9.84085 14.6666 7.99992C14.6666 6.15899 13.9204 4.49232 12.714 3.28587C11.5076 2.07945 9.84091 1.33325 7.99998 1.33325C6.15905 1.33325 4.49238 2.07945 3.28593 3.28587C2.07951 4.49232 1.33331 6.15899 1.33331 7.99992C1.33331 9.84085 2.07951 11.5075 3.28593 12.714C4.49238 13.9204 6.15905 14.6666 7.99998 14.6666Z"
                      stroke="#5F7292"
                      stroke-width="1.33333"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 8H11"
                      stroke="#5F7292"
                      stroke-width="1.33"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 4.5L8 7L10.5 4.5"
                      stroke="#5F7292"
                      stroke-width="1.33"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8 7V12"
                      stroke="#5F7292"
                      stroke-width="1.33"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 10H10.5"
                      stroke="#5F7292"
                      stroke-width="1.33"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2351_3816">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <template #content>
                  <div>电价：{{ format(state.eprice) }}元/kWh</div>
                </template>
              </a-tooltip></div
            >
          </div>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script lang="ts" setup>
  import bus from '@/utils/bus';
  import { queryCOP } from '@/api/energy-analysis/calendar';
  import moment from 'moment';
  import ModuleBox from '../../common/ModuleBox2.vue';
  import Loading from '../../common/Loading.vue';

  const state = reactive({
    year: 0,
    month: 0,
    date: 0,
    title: {
      Width: '100%',
      titleHeight: '40px',
      text: '能效评价(COP)',
      Height: `calc((100vh - 164px)/2)`,
    },
    buttonList: [{ title: '月数据' }],
    ruleList: [
      '',
      '',
      '2.9',
      '',
      '3.2',
      '',
      '3.5',
      '',
      '3.9',
      '',
      '4.4',
      '',
      '5.0',
      '',
      '5.9',
      '',
      '7.0',
      '',
    ],
    fourList: [
      {
        title: '急需改善',
        class: 'urgent',
      },
      {
        title: '一般',
        class: 'normal',
      },
      {
        title: '良好',
        class: 'good',
      },
      {
        title: '优秀',
        class: 'great',
      },
    ],
    sectionList: [
      {
        title: '电量',
        num: undefined,
        unit: 'kWh',
        icon: false,
      },
      {
        title: '冷量',
        num: undefined,
        unit: 'kWh',
        icon: false,
      },
      {
        title: '电费',
        num: undefined,
        unit: '元',
        icon: true,
      },
      {
        title: '冷量单价',
        num: undefined,
        unit: '元/kWh',
        icon: false,
      },
    ],
    eprice: undefined,
    currentCOP: 0,
    averageCOP: 0,
    percent: 75,
    loading: false,
  });

  const getDataList = async (date: string) => {
    try {
      state.loading = true;
      const res = await queryCOP(date);
      state.percent = 95;
      state.sectionList[0].num = res.data.electricity;
      state.sectionList[1].num = res.data.cool;
      state.sectionList[2].num = res.data.echarge;
      state.sectionList[3].num = res.data.coolPrice;
      state.eprice = res.data.eprice;
      state.currentCOP = res.data.currentCOP;
      state.averageCOP = res.data.averageCOP;
      state.loading = false;
    } catch (e) {
      state.sectionList[0].num = undefined;
      state.sectionList[1].num = undefined;
      state.sectionList[2].num = undefined;
      state.sectionList[3].num = undefined;
      state.eprice = undefined;
      state.currentCOP = 0;
      state.averageCOP = 0;
      state.loading = false;
    }
  };

  const format = (value: string | number | undefined) => {
    if (value) {
      return value;
    }
    return '-';
  };

  const getRule = (num: number | string) => {
    if (+num > 10) {
      num = 10;
    }
    let rule = 0;
    if (+num < 2.9) {
      rule = ((1 / 9) * +num) / 2.9;
    } else if (+num < 3.5) {
      rule = 1 / 9 + ((2 / 9) * (+num - 2.9)) / 0.6;
    } else if (+num < 3.9) {
      rule = 3 / 9 + (((+num - 3.5) / 0.4) * 1) / 9;
    } else if (+num < 4.4) {
      rule = 4 / 9 + (((+num - 3.9) / 0.5) * 1) / 9;
    } else if (+num < 5.0) {
      rule = 5 / 9 + (((+num - 4.4) / 0.6) * 1) / 9;
    } else if (+num < 5.9) {
      rule = 6 / 9 + (((+num - 5.0) / 0.9) * 1) / 9;
    } else if (+num < 7.0) {
      rule = 7 / 9 + (((+num - 5.9) / 1.1) * 1) / 9;
    } else {
      rule = 8 / 9 + (((+num - 7.0) / 3) * 1) / 9;
    }

    return rule * 100;
  };
  state.year = new Date().getFullYear();
  state.month = new Date().getMonth() + 1;

  getDataList(moment([state.year, state.month - 1]).format('YYYY-MM'));
  bus.on('date', (params: any) => {
    state.buttonList = [{ title: '日数据' }];
    state.year = params.year;
    state.month = params.month;
    state.date = params.date;

    getDataList(
      moment([state.year, state.month - 1, state.date]).format('YYYY-MM-DD')
    );
  });
  bus.on('month', (params: any) => {
    state.buttonList = [{ title: '月数据' }];
    state.year = params.year;
    state.month = params.month;
    getDataList(moment([state.year, state.month - 1]).format('YYYY-MM'));
  });
</script>

<style scoped lang="less">
  .load {
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.26);
  }
  .nengxiao-contain {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 40px);
    font-family: HarmonyOS-Regular, sans-serif;

    .date {
      padding: 24px 24px 0;
      height: 10%;
      color: rgb(255 255 255 / 85%);
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      text-align: left;
    }

    .rule {
      padding: 0 24px;
      margin: 0 16px;
    }

    .top {
      position: relative;
      width: 100%;
      height: 30px;

      .ave {
        position: absolute;
        top: -6px;
        // right: 0;
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 12px;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.24px;
        // transition: 0.1s;

        .text {
          width: fit-content;
          transform: translate(-50%, 10px);
        }

        .img {
          width: 34px;
          height: 32px;
          transform: translateX(-50%);
          .set-back('@/assets/imgs/energy-analysis/calendar/arrow.png');
        }
      }

      .now {
        position: absolute;
        top: -14.8px;
        // left: 0;
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 13px;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.32px;
        // transition: 0.1s;

        .text {
          width: max-content;
          transform: translate(-50%, 8px);
        }

        .img {
          width: 44px;
          height: 72px;
          transform: translateX(-50%);
          .set-back('@/assets/imgs/energy-analysis/calendar/arrowlight.png');
        }
      }
    }

    .middle {
      display: flex;
      margin-bottom: 5px;
      color: transparent;
      font-weight: 400;
      font-size: 16px;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0.32px;

      .text1 {
        background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
        background-clip: text;
        /* stylelint-disable */
        -webkit-background-clip: text;

        &::before {
          position: absolute;
          text-shadow: 0 0 4px rgb(43 102 255 / 80%);
          content: attr(text);
        }
      }

      .urgent {
        flex: 3;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(
          270deg,
          #ff4d4f 0%,
          rgb(255 77 79 / 0%) 100.25%
        );
        border-radius: 2px;

        // &::before {
        //   position: absolute;
        //   text-shadow: 0 0 4px rgb(43 102 255 / 80%);
        //   content: attr(text);
        // }
      }

      .normal {
        flex: 1;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(
          270deg,
          #faad14 0.49%,
          rgb(250 173 20 / 0%00.51%) ;
        );
        border-radius: 2px;
      }

      .good {
        flex: 2;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(
          270deg,
          #719429 -0.12%,
          rgb(76 148 41 / 0%) 100.25%
        );
        border-radius: 2px;
      }

      .great {
        flex: 3;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: linear-gradient(
          270deg,
          #266fe8 0.06%,
          rgb(38 111 232 / 0%) 100%
        );
        border-radius: 2px;
      }
    }

    .down {
      display: flex;
      width: 100%;
      height: 12px;
      border-right: 1px solid rgb(255 255 255 / 60%);
    }

    .grid {
      flex: 1;

      .num {
        margin-top: 12px;
        color: rgb(255 255 255 / 85%);
        font-weight: 400;
        font-size: 16px;
        font-family: HarmonyOS-regular, sans-serif;
        line-height: normal;
        letter-spacing: 0.32px;
        transform: translateX(-40%);
      }

      /* 偶数位格子样式 */
      &:nth-child(even) {
        height: 7px;
        border-left: 1px solid rgb(255 255 255 / 60%);
      }

      /* 奇数位格子样式 */
      &:nth-child(odd) {
        height: 12px;
        border-left: 1px solid rgb(255 255 255 / 60%);
      }
    }

    .section {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      margin: 30px auto 24px;
      padding: 0 30px;

      .item {
        display: flex;
        align-items: center;
        width: 49%;
        // height: 75px;
        margin-top: 3%;
        .set-back('@/assets/imgs/energy-analysis/calendar/back.png');

        .icon {
          width: 24px;
          height: 24px;
          margin-left: 8px;
          .set-back('@/assets/imgs/energy-analysis/calendar/back-arrow.png');
        }

        .title {
          flex-basis: 80px;
          color: transparent;
          font-weight: 400;
          font-size: 16px;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.32px;
          background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;

          &::before {
            position: absolute;
            text-shadow: 0 0 4px rgb(43 102 255 / 80%);
            content: attr(text);
          }
        }

        .num {
          color: rgb(255 255 255 / 85%);
          font-weight: 400;
          font-size: 16px;
          font-style: normal;
          line-height: normal;
          letter-spacing: 0.32px;

          .unit {
            font-size: 12px;
          }
        }

        .elec {
          margin-top: 5px;
          margin-left: 8px;
          cursor: pointer;

          svg {
            outline: none;

            &:hover path {
              stroke: rgb(151 163 183);
            }
          }
        }
      }
    }
  }
</style>
