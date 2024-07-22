<!--
 * @Author: zhangkai 2572429235@qq.com
 * @Date: 2023-09-18 09:15:01
 * @LastEditors: zhangk 13182353591@163.com
 * @LastEditTime: 2024-01-02 14:27:11
 * @FilePath: \emp-admin-ui\src\views\data-overview\home\Home.vue
-->
<template>
  <ScaleBox
    :width="1920"
    :height="1080"
    bgc="transparent"
    :delay="100"
    :is-flat="true"
  >
    <div class="home-bg">
      <DateTime v-if="false" class="locate time"></DateTime>
      <WeatherInfo v-if="false" class="locate weather"></WeatherInfo>
      <div v-if="false" class="locate home-title">
        <div class="logo"></div>
        <div class="title-text1" text="天加能源基地">天加能源基地</div>
        <div class="title-text2" text="天加能源基地">天加能源基地</div>
      </div>
      <div class="locate left-content">
        <QuanChangNengHao></QuanChangNengHao>
        <QuanChangNengHaoJianKong class="qcnhjk"></QuanChangNengHaoJianKong>
      </div>
      <div class="locate center-content">
        <QuYuNengHao class="qynh"></QuYuNengHao>
        <GuangFuZhiQuFaDian class="gfzqfd"></GuangFuZhiQuFaDian>
      </div>
      <div class="locate right-content">
        <KongTiaoNengHaoJianKong class="ktnhjk"></KongTiaoNengHaoJianKong>
        <GuanJianSheBeiKaiDongLv class="gjsbkdl"></GuanJianSheBeiKaiDongLv>
      </div>
    </div>
  </ScaleBox>
</template>

<script setup>
  import ScaleBox from 'vue3-scale-box';
  import WeatherInfo from './common/WeatherInfo.vue';
  import DateTime from './common/DateTime.vue';
  import QuanChangNengHao from './left/QuanChangNengHao.vue';
  import QuanChangNengHaoJianKong from './left/QuanChangNengHaoJianKong.vue';
  import GuangFuZhiQuFaDian from './center/GuangFuZhiQuFaDian.vue';
  import KongTiaoNengHaoJianKong from './right/KongTiaoNengHaoJianKong.vue';
  import GuanJianSheBeiKaiDongLv from './right/GuanJianSheBeiKaiDongLv.vue';
  import QuYuNengHao from './center/QuYuNengHao.vue';
</script>

<script>
  export default {
    name: 'NewHome',
  };
</script>

<style lang="less" scoped>
  .home-bg {
    position: relative;
    width: 1920px;
    height: 1080px;

    .set-back('@/assets/imgs/home/home.png');

    .locate {
      position: absolute;
    }

    .left-content {
      top: 110px;
      left: 30px;

      .qcnhjk {
        position: absolute;
        top: 150px;
        left: 0;
      }
    }

    .center-content {
      .gfzqfd {
        position: absolute;
        top: 740px;
        left: 562px;
      }

      .qynh {
        position: absolute;
        top: 110px;
        left: 562px;
      }
    }

    .right-content {
      top: 110px;
      right: 30px;

      .ktnhjk {
        position: absolute;
        top: 0;
        right: 0;
      }

      .gjsbkdl {
        position: absolute;
        top: 342px;
        right: 0;
      }
    }
  }
</style>
