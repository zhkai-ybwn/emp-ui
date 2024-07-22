<!-- 设备状态监控 -->
<template>
  <div class="equipment-status">
    <ModuleBox :title-config="state.titleConfig" :box-config="state.boxConfig">
      <div class="container">
        <div class="total">
          <div class="num">
            <div class="number">{{ state.total }}</div>
            <div class="text">台</div>
          </div>
          <div class="text">设备总数</div>
        </div>
        <div class="on">
          <div class="num">
            <div class="number">{{ state.run }}</div>
            <div class="text">台</div>
          </div>
          <div class="status">
            <div class="dot"></div>
            <div class="text">运行中</div>
          </div>
        </div>
        <div class="off">
          <div class="num">
            <div class="number">{{ state.close }}</div>
            <div class="text">台</div>
          </div>
          <div class="status">
            <div class="dot"></div>
            <div class="text">关机</div>
          </div>
        </div>
      </div>
    </ModuleBox>
  </div>
</template>

<script setup>
  import useEchart from '@/hooks/useEchart';
  import { equipmentStatus } from '@/api/data-overview/pv-power';
  import ModuleBox from '../common/ModuleBox.vue';

  const { looping } = useEchart();

  const state = reactive({
    titleConfig: {
      text: '设备状态监控',
      width: 460,
      height: 40,
    },
    boxConfig: {
      width: 460,
      height: 129,
    },
    total: 0,
    close: 0,
    run: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await equipmentStatus();
      state.total = data.equipmentTotalNum;
      state.run = data.runningNum;
      state.close = data.offNum;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
</script>

<style lang="less" scoped>
  .equipment-status {
    width: 460px;

    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 460px;
      height: 129px;
      padding-right: 56px;
      padding-left: 32px;

      .total {
        width: 125px;
        height: 72px;
        text-align: center;

        .set-back('@/assets/imgs/energy-plant/conditioner-icon@2x.png');

        .num {
          display: flex;
          align-items: center;
          justify-content: center;

          .number {
            margin: 2px;
            color: #fff;
            font-weight: normal;
            font-size: 20px;
            font-family: Barlow, sans-serif;
            line-height: 23px;
          }
        }
      }

      .on {
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 39px;

          .set-back('@/assets/imgs/energy-plant/on-icon@2x.png');

          .number {
            margin: 2px;
            color: #00fff0;
            font-weight: normal;
            font-size: 24px;
            font-family: Barlow, sans-serif;
            line-height: 28px;
          }
        }

        .dot {
          width: 8px;
          height: 8px;
          margin: 3px;

          .set-back('@/assets/imgs/energy-plant/rectangle-on@2x.png');
        }
      }

      .off {
        .num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 39px;

          .set-back('@/assets/imgs/energy-plant/off-icon@2x.png');

          .number {
            margin: 2px;
            color: #ffb800;
            font-weight: normal;
            font-size: 24px;
            font-family: Barlow, sans-serif;
            line-height: 28px;
          }
        }

        .dot {
          width: 8px;
          height: 8px;
          margin: 3px;

          .set-back('@/assets/imgs/energy-plant/rectangle-off@2x.png');
        }
      }

      .status {
        display: flex;
        align-items: first baseline;
        justify-content: center;
        height: 21px;
        margin-top: 5px;
      }

      .text {
        color: #fff;
        font-weight: 400;
        font-size: 14px;
        font-family: HarmonyOS-Regular, sans-serif;
        line-height: 16px;
      }
    }
  }
</style>
