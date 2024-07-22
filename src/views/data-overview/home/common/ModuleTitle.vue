<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-19 16:35:16
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-02-27 10:28:18
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\common\ModuleTitle.vue
 * @Description: 模块标题
-->
<template>
  <div
    class="m-title-container"
    :style="{ width: `${config.width}px`, height: `${config.height}px` }"
  >
    <div class="left-icon"></div>
    <div class="title-text">{{ config.title }}</div>
    <div class="sub-title-text">{{ config.subTitle }}</div>
    <div class="right-icon"></div>
    <div class="bottom-line" :style="{ width: `${config.width}px` }"></div>
  </div>
</template>

<script setup>
  defineProps({
    config: {
      type: Object,
      default: () => ({
        width: 480,
        height: 40,
        title: '全厂能耗监控',
        subTitle: '今日内',
      }),
    },
  });
</script>

<style lang="less" scoped>
  .m-title-container {
    position: relative;
    background: linear-gradient(
      270deg,
      rgb(19 54 105 / 60%) 0.06%,
      rgb(83 119 245 / 50%) 99.96%
    );

    .left-icon {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 24px;
      height: 24px;

      .set-back('@/assets/imgs/home/title-left-icon.png');
    }

    .title-text {
      position: absolute;
      top: 8px;
      left: 44px;
      font-weight: 400;
      font-size: 20px;
      font-family: PangMenZhengDaoBiaoTiTi, sans-serif;
      font-style: normal;
      line-height: 28px;
      letter-spacing: 0.4px;
      background: linear-gradient(180deg, #fff 0%, #c1daff 100%);
      background-clip: text;
      /* stylelint-disable */
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sub-title-text {
      position: absolute;
      top: 8px;
      right: 22px;
      color: #97a3b7;
      font-weight: 400;
      font-size: 14px;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      line-height: 22px;
    }

    .right-icon {
      position: absolute;
      top: 30px;
      right: 0;
      width: 21px;
      height: 12px;

      .set-back('@/assets/imgs/home/title-right-icon.png');
    }

    .bottom-line {
      position: absolute;
      top: 39px;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgb(71 145 255 / 0%) 0%,
        #65a3ff 47.4%,
        rgb(78 149 255 / 0%) 100%
      );
      filter: blur(1px);
    }
  }
</style>
