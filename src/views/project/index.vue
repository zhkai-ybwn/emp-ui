<template>
  <div class="contain">
    <iframe
      :key="'jotform-iframe-' + iframeSrc"
      :src="iframeSrc"
      style="width: 100%; height: 100%; border: none"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
  import { getToken } from '@/utils/auth';
  import { useGoviewStore } from '@/store';
  import { listRoute } from '@/api/auth';

  const goViewStore = useGoviewStore();
  const iframeSrcC = computed(() => {
    return goViewStore.iframeSrc
      ? goViewStore.iframeSrc
      : localStorage.getItem('iframeSrc');
  });
  const iframeSrc = ref('');
  const token = `Bearer ${getToken()}`;

  onMounted(() => {
    const url = goViewStore.iframeSrc
      ? goViewStore.iframeSrc
      : localStorage.getItem('iframeSrc');
    iframeSrc.value = `${url}?param=${token}`;
  });

  watch(iframeSrcC, (newValue, oldValue) => {
    listRoute();
    if (newValue !== oldValue) {
      iframeSrc.value = `${newValue}?param=${token}`;
    }
  });
</script>

<style lang="less" scoped>
  .contain {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
