<template>
  <div class="switch">
    <div class="region">
      <div :class="[region === 0 ? 'active' : 'normal']" @click="setRegion(0)">
        综合楼东区
      </div>
      <div :class="[region === 1 ? 'active' : 'normal']" @click="setRegion(1)">
        综合楼西区
      </div>
    </div>
    <div :class="[region === 0 ? 'top' : 'bottom']" class="floor">
      <div :class="[floor === 1 ? 'active' : 'normal']" @click="setFloor(1)">
        1F
      </div>
      <div :class="[floor === 2 ? 'active' : 'normal']" @click="setFloor(2)">
        2F
      </div>
      <div :class="[floor === 3 ? 'active' : 'normal']" @click="setFloor(3)">
        3F
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from '@/store';

  const region = computed(() => useStore().region);

  const setRegion = (value) => {
    useStore().setRegion(value);
    useStore().setFloor(1);
  };

  const floor = computed(() => useStore().floor);

  const setFloor = (value) => {
    useStore().setFloor(value);
  };
</script>

<style lang="less" scoped>
  .switch {
    display: flex;
    color: #fff;

    .region {
      font-size: 18px;
      font-family: YouSheBiaoTiHei, sans-serif;

      div {
        width: 130px;
        height: 48px;
        margin-right: 12px;
        margin-bottom: 24px;
        line-height: 48px;
        text-align: center;
      }
    }

    .floor {
      font-family: 'Source Han Sans CN-Medi', sans-serif;
      font-family: 16px;

      div {
        width: 48px;
        height: 48px;
        margin-bottom: 8px;
        line-height: 48px;
        text-align: center;
      }
    }

    .active {
      .set-back('@/assets/imgs/energy-plant/btn_bg_active.png');

      cursor: pointer;
    }

    .normal {
      .set-back('@/assets/imgs/energy-plant/btn_bg_normal.png');

      cursor: pointer;
    }

    .bottom {
      margin-top: 73px;
    }
  }
</style>
