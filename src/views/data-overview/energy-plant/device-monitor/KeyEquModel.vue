<!--
 * @Author: zhangk 13182353591@163.com
 * @Date: 2023-12-07 10:23:25
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-04-02 14:18:49
 * @FilePath: \emp-admin-ui\src\views\data-overview\energy-plant\device-monitor\KeyEquModel.vue
 * @Description: 关键设备模型
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="key-equ-model">
    <div
      v-for="(item, index) in state.icons"
      :key="index"
      :class="`icon${index}`"
      class="icon"
    >
      <div
        :class="
          state.status.find((el) => el.eqName === item.title)
            ? `img${index}-on`
            : `img${index}-off`
        "
        class="img"
        @mouseenter="onOver(item, index)"
        @mouseout="onOut"
      ></div>
      <div class="info">
        <div
          :class="[
            state.status.find((el) => el.eqName === item.title) ? 'on' : 'off',
            state.status.find((el) => el.eqName === item.title),
          ]"
        >
        </div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div class="text">
      <div class="on">
        <div class="sign"></div>
        <div class="label">运行中</div>
        <div class="value">{{ state.runningNum || '-' }}<span>台</span></div>
      </div>
      <div class="off">
        <div class="sign"></div>
        <div class="label">关机</div>
        <div class="value">{{ state.closeNum || '-' }}<span>台</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import bus from '@/utils/bus';
  import useEchart from '@/hooks/useEchart';
  import {
    equOverview,
    keyEquStatusMonitor,
  } from '@/api/data-overview/device-monitor';

  const state = reactive({
    icons: [
      {
        title: '喷漆房(容器)',
        nodeId: 'TJ000022',
        icons: '',
      },
      {
        title: '管板焊机',
        nodeId: 'TJ000021',
        icons: '',
      },
      {
        title: '立式加工中心850',
        nodeId: 'TJ000011',
        icons: '',
      },
      {
        title: '管板清洗机',
        nodeId: 'TJ000012',
        icons: '',
      },
      {
        title: '龙门加工中心216',
        nodeId: 'TJ000013',
        icons: '',
      },
      {
        title: '龙门加工中心4033',
        nodeId: 'TJ000014',
        icons: '',
      },
      {
        title: '筒体清洗机',
        nodeId: 'TJ000015',
        icons: '',
      },
      {
        title: '等离子切割机',
        nodeId: 'TJ000016',
        icons: '',
      },
      {
        title: '喷漆房(ORC)',
        nodeId: 'TJ000018',
        icons: '',
      },
      {
        title: '喷漆房(满液)',
        nodeId: 'TJ000019',
        icons: '',
      },
    ],
    closeNum: 0,
    runningNum: 0,
    status: [],
  });

  const { looping } = useEchart();

  const onOver = (item, index) => {
    bus.emit('modal', { item, index });
  };

  const onOut = () => {
    bus.emit('closeModal');
  };

  const fetchData = async () => {
    try {
      const { data } = await equOverview();
      state.closeNum = data.offNum;
      state.runningNum = data.runningNum;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  const status = async () => {
    try {
      const { data } = await keyEquStatusMonitor();
      state.status = data.filter((el) => el.status === true);
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  looping(fetchData, 900 * 1000);
  looping(status, 900 * 1000);
</script>

<style lang="less" scoped>
  .key-equ-model {
    position: relative;
    width: 1478px;
    height: 550px;

    .set-back('@/assets/imgs/energy-plant/key_equ_model.png');

    .icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .title {
        margin-left: 5px;
        color: #fff;
        font-weight: 400;
        font-family: YouSheBiaoTiHei, sans-serif;
        line-height: 28px;
        text-shadow: 0 0 4px #004a80;
      }

      .on {
        width: 5px;
        height: 5px;

        .set-back('@/assets/imgs/energy-plant/key-on@2x.png');
      }

      .off {
        width: 5px;
        height: 5px;

        .set-back('@/assets/imgs/energy-plant/key-off@2x.png');
      }

      .img {
        cursor: pointer;
      }
    }

    .icon0 {
      position: absolute;
      top: 117px;
      left: 267px;

      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon1 {
      position: absolute;
      top: 191px;
      left: 491px;

      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon2 {
      .img {
        position: absolute;
        top: 195px;
        left: 792px;
      }

      .info {
        position: absolute;
        top: 171px;
        left: 661px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon3 {
      .img {
        position: absolute;
        top: 143px;
        left: 813px;
      }

      .info {
        position: absolute;
        top: 120px;
        left: 777px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon4 {
      .img {
        position: absolute;
        top: 196px;
        left: 843px;
      }

      .info {
        position: absolute;
        top: 171px;
        left: 854px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon5 {
      .img {
        position: absolute;
        top: 198px;
        left: 903px;
      }

      .info {
        position: absolute;
        top: 239px;
        left: 904px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon6 {
      .img {
        position: absolute;
        top: 178px;
        left: 993px;
      }

      .info {
        position: absolute;
        top: 154px;
        left: 993px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon7 {
      .img {
        position: absolute;
        top: 128px;
        left: 1178px;
      }

      .info {
        position: absolute;
        top: 110px;
        left: 1170px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon8 {
      .img {
        position: absolute;
        top: 413px;
        left: 269px;
      }

      .info {
        position: absolute;
        top: 389px;
        left: 243px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .icon9 {
      .img {
        position: absolute;
        top: 409px;
        left: 298px;
      }

      .info {
        position: absolute;
        top: 419px;
        left: 370px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 28px;
        padding: 0 15px;
        font-size: 13px;

        .set-back('@/assets/imgs/energy-plant/key-back.png');
      }
    }

    .img0-on,
    .img7-on,
    .img9-on {
      width: 76px;
      height: 76px;

      .set-back('@/assets/imgs/energy-plant/key-on-big@2x.png');

      &:hover {
        .set-back('@/assets/imgs/energy-plant/light-on-big@2x.png');
      }
    }

    .img1-on,
    .img2-on,
    .img3-on,
    .img4-on,
    .img5-on,
    .img6-on,
    .img8-on {
      width: 44px;
      height: 44px;

      .set-back('@/assets/imgs/energy-plant/key-on-small@2x.png');

      &:hover {
        .set-back('@/assets/imgs/energy-plant/light-on-small@2x.png');
      }
    }

    .img0-off,
    .img7-off,
    .img9-off {
      width: 76px;
      height: 76px;

      .set-back('@/assets/imgs/energy-plant/key-off-big@2x.png');

      &:hover {
        .set-back('@/assets/imgs/energy-plant/light-off-big@2x.png');
      }
    }

    .img1-off,
    .img2-off,
    .img3-off,
    .img4-off,
    .img5-off,
    .img6-off,
    .img8-off {
      width: 44px;
      height: 44px;

      .set-back('@/assets/imgs/energy-plant/key-off-small@2x.png');

      &:hover {
        .set-back('@/assets/imgs/energy-plant/light-off-small@2x.png');
      }
    }

    .text {
      position: absolute;
      top: 530px;
      display: flex;
      justify-content: center;
      width: 100%;

      .label {
        margin-left: 8px;
        color: #fff;
        font-weight: 350;
        font-size: 14px;
        font-family: SourceHanSansCN-Normal, sans-serif;
        font-style: normal;
        line-height: normal;
      }

      .on {
        display: flex;
        align-items: center;

        .sign {
          width: 10px;
          height: 10px;
          background: rgb(0 255 240 / 80%);
          border: 1px solid #00fff0;
        }

        .value {
          margin-left: 8px;
          color: #00fff0;
          font-weight: 600;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          font-style: italic;
          line-height: normal;

          span {
            color: #fff;
            font-weight: 350;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }
      }

      .off {
        display: flex;
        align-items: center;

        .sign {
          width: 10px;
          height: 10px;
          margin-left: 48px;
          background: rgb(255 184 0 / 80%);
          border: 1px solid #ffb800;
        }

        .value {
          margin-left: 8px;
          color: #ffb800;
          font-weight: 600;
          font-size: 20px;
          font-family: Barlow-Italic, sans-serif;
          font-style: italic;
          line-height: normal;

          span {
            color: #fff;
            font-weight: 350;
            font-size: 14px;
            font-family: SourceHanSansCN-Normal, sans-serif;
            font-style: normal;
            line-height: normal;
          }
        }
      }
    }
  }
</style>
