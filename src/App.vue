<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import AdminUserView from "@/views/AdminUser/AdminUserView.vue";
import RemovalOfProductsView from "@/views/MerchantUser/RemovalOfProductsView.vue";
import RegularUserMain from "@/views/RegularUser/RegularUserMain.vue";

if (sessionStorage.getItem("adminUserInfo")){
  useUserStore().setAdminUserInfo(JSON.parse(sessionStorage.getItem("adminUserInfo")!))
}
if (sessionStorage.getItem("merchantUserInfo")){
  useUserStore().setMerchantUserInfo(JSON.parse(<string>sessionStorage.getItem("merchantUserInfo")))
}

window.addEventListener('beforeunload',()=>{
  sessionStorage.setItem("adminUserInfo",JSON.stringify(useUserStore().getAdminUserInfo()))
  sessionStorage.setItem("merchantUserInfo",JSON.stringify(useUserStore().getMerchantUserInfo()))
})
</script>

<template>
  <div id="app">
    <n-watermark
        content=""
        cross
        fullscreen
        font-style="italic"
        :font-size="16"
        :line-height="16"
        :width="384"
        :font-color="'#d29898'"
        :height="384"
        :x-offset="12"
        :y-offset="60"
        :rotate="-15"
    />
<!--    <MainComShow />-->
<!--    <RouterView />-->
<!--    <admin-user-view />-->
<!--    <regular-user-main />-->
    <RouterView/>
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
