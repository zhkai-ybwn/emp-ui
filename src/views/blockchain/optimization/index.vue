<template>
  <div class="contain">
    <!-- <iframe
      src="http://221.226.82.186:40040/zdxy/index.html#/sim"
      style="width: 100%; height: 100%; border: none"
    ></iframe> -->
    <embed
      src="http://221.226.82.186:40040/zdxy/index.html#/sim"
      style="width: 100%; height: 100%; border: none"
    />
    <!-- <iframe
      :src="`http://localhost:3000/#/chart/preview/1808775451195805698?param=${state.token}`"
      style="width: 100%; height: 100%; border: none"
    ></iframe> -->
  </div>
</template>

<!-- <script setup>
  import router from '@/router';

  import { getToken } from '@/utils/auth';

  const token = `Bearer ${getToken()}`;

  const state = {
    token,
  };
  // 假设这是父页面的JavaScript代码
  window.addEventListener(
    'message',
    function (event) {
      // 检查消息来源的域

      console.log('Received message from iframe:', event.data);
      // 可以在这里编写代码来处理接收到的消息
      router.push({ name: 'UserCenter', query: { back: true } });
    },
    false
  );
</script> -->

<script>
  export default {
    name: 'Optimization',
  };
</script>

<style lang="less" scoped>
  .contain {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
