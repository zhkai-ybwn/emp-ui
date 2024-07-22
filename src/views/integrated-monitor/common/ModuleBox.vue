<template>
  <div
    :class="[config.bgClass ? config.bgClass : 'contain']"
    :style="{
      width: `${config.Width}`,
      height: `${config.Height}`,
    }"
  >
    <div
      class="md-title-container"
      :style="{
        width: `${config.Width}px`,
        height: `${config.titleHeight}`,
      }"
    >
      <div class="border-sign"></div>
      <div class="arrow-sign"></div>
      <div class="text" :text="config.text">{{ config.text }}</div>
      <div class="text-en">{{ config.textEn }}</div>
      <div class="button-list">
        <div
          v-for="(item, index) in buttonList"
          :key="index"
          class="button"
          :class="index === active ? 'active' : 'normal'"
          @click="toggle(item, index)"
        >
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
    <slot></slot>
    <div class="box-triangle-container">
      <div class="left-triangle"></div>
      <div class="right-triangle"></div>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['change']);
  defineProps({
    config: {
      type: Object,
      default: () => ({
        titleWidth: 0,
        titleHeight: 0,
        text: '',
        textEn: '',
        bodyWidth: 0,
        bodyHeight: 0,
        bgClass: 'contain',
      }),
    },
    buttonList: {
      type: Array,
      default: () => [],
    },
  });

  const active = ref(0);

  const toggle = (item, index) => {
    emit('change', item);
    active.value = index;
  };
</script>

<style lang="less" scoped>
  .md-title-container {
    position: relative;
    display: flex;
    align-items: center;
    .set-back(
        '@/assets/imgs/load-forecast/title-background.png'
      );

    .border-sign {
      width: 4px;
      height: 100%;
      background: #96aadb;
    }

    .arrow-sign {
      width: 24px;
      height: 24px;
      margin-left: 8px;

      .set-back(
        '@/assets/imgs/load-forecast/module-title-sign-left.png'
      );
    }

    .text {
      margin-left: 3px;
      font-weight: 400;
      font-size: 20px;
      font-family: YouSheBiaoTiHei, sans-serif;
      line-height: 23px;
      background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text::before {
      position: absolute;
      z-index: -1;
      text-shadow: 0 0 4px rgb(43 102 255 / 80%);
      content: attr(text);
    }

    .text-en {
      margin-top: 4px;
      margin-left: 12px;
      color: #7e8298;
      font-weight: 400;
      font-size: 12px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: normal;
      text-transform: uppercase;
    }

    .button-list {
      display: flex;
      margin-left: auto;
      font-weight: 400;
      font-size: 16px;
      font-family: HarmonyOS-Regular, sans-serif;

      .button {
        padding: 11px 16px;
        cursor: pointer;

        &:hover {
          .set-back(
          '@/assets/imgs/load-forecast/title-hover.png'
        );
        }
      }

      .active {
        .set-back(
          '@/assets/imgs/load-forecast/title-active.png'
        );

        div {
          background: linear-gradient(180deg, #fff 27.19%, #b0d0ff 75.44%);
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .normal {
        .set-back(
          '@/assets/imgs/load-forecast/title-out.png'
        );

        div {
          background: linear-gradient(
            180deg,
            rgb(255 255 255 / 40%) 27.19%,
            rgb(176 208 255 / 40%) 75.44%
          );
          background-clip: text;
          /* stylelint-disable */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }

  .contain {
    background: linear-gradient(
      180deg,
      rgb(12 28 43 / 60%) 0%,
      rgb(31 47 80 / 60%) 100%
    );
    border-bottom: 1px solid rgb(204 224 255 / 70%);
    box-shadow: 0 0 22px 0 rgb(153 193 255 / 30%) inset;
    // filter: blur(1px);
    backdrop-filter: blur(1px);
  }

  .blur-contain {
    background: rgb(255 255 255 / 2%);
  }

  .box-triangle-container {
    .left-triangle {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 20px;
      height: 20px;

      .set-back('@/assets/imgs/load-forecast/left-triangle.png');
    }

    .right-triangle {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 20px;
      height: 20px;

      .set-back(
        '@/assets/imgs/load-forecast/right-triangle.png'
      );
    }
  }
</style>
