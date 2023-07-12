<script setup lang="ts">

import MainAllowShops from "@/components/MerchantUserComponents/MerchantMain/MainAllowShops.vue";
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
html,body,#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: -8px;
  position: fixed;
  font-family: 'Helvetica Neue', Helvetica, Avenir, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
