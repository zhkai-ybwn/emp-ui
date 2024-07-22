<template>
  <div class="conditioning-terminal-bg">
    <Breadcrumb :items="['综合监控', '设备监控']" class="breadcrumb" />
    <div>
      <KongTiaoDaXiTong v-if="state.system === '1'"></KongTiaoDaXiTong>
      <ADuan v-if="state.system === '2'"></ADuan>
      <BDuan v-if="state.system === '3'"></BDuan>
    </div>
    <div class="title">
      <div class="name">兴庄路站通风系统</div>
      <div class="select">
        <a-select v-model="state.system" :style="{ width: '120px' }">
          <a-option value="1">空调大系统</a-option>
          <a-option value="2">A端小系统</a-option>
          <a-option value="3">B端小系统</a-option>
        </a-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import KongTiaoDaXiTong from './components/KongTiaoDaXiTong.vue';
  import ADuan from './components/ADuan.vue';
  import BDuan from './components/BDuan.vue';

  const state = reactive({
    system: '1',
  });
</script>

<style scoped lang="less">
  .conditioning-terminal-bg {
    position: relative;
    width: 100%;
    height: 100%;
    .set-back('@/assets/imgs/load-forecast/home-bg.png');
  }

  .breadcrumb {
    padding: 0 1.5rem;
  }

  .title {
    position: absolute;
    top: 4.0625rem;
    left: 50%;
    display: flex;
    align-items: center;
    transform: translateX(-50%);

    .name {
      margin-right: 0.625rem;
      color: #fff;
      font-weight: 400;
      font-size: 1.5rem;
      font-family: HarmonyOS-Regular, sans-serif;
      font-style: normal;
      text-shadow: 0 0.25rem 0.25rem rgb(0 0 0 / 25%);
    }

    :deep(.arco-select-view-single) {
      color: #7cbfff;
      font-family: HarmonyOS-Regular, sans-serif;
      background: rgb(205 207 216 / 10%);
      border-radius: 5px;
    }

    :deep(svg.arco-icon.arco-icon-down.arco-select-view-arrow-icon) {
      fill: #7cbfff;
      stroke: #7cbfff;
    }
  }
</style>
