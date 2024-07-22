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
          :style="{
            fontSize: `${config.size}px`,
          }"
          @click="toggle(item, index)"
        >
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
    <slot></slot>
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
        size: 16,
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
      height: 100%;
      line-height: 100%;
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
    background: rgb(53 81 145 / 10%);
    box-shadow: inset 0 0 22px 0 rgb(153 193 255 / 30%);
    backdrop-filter: blur(5px);
  }

  .blur-contain {
    background: rgb(255 255 255 / 2%);
  }

  .shadow-contain {
    background: rgb(53 81 145 / 10%);
    backdrop-filter: blur(5px);
  }
</style>
