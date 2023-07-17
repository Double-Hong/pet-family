<script setup lang="ts">
import {useUserStore} from "@/stores/UserStore";
import {useRegularStore} from "@/stores/RegularUser";
import AdminUserView from "@/views/AdminUser/AdminUserView.vue";
import RemovalOfProductsView from "@/views/MerchantUser/RemovalOfProductsView.vue";
import RegularUserMain from "@/views/RegularUser/RegularUserMain.vue";
import Order from "@/components/RegularUserComponents/Order.vue";
import OrderManage from "@/views/MerchantUser/OrderManage.vue";

if (sessionStorage.getItem("adminUserInfo")){
  useUserStore().setAdminUserInfo(JSON.parse(sessionStorage.getItem("adminUserInfo")!))
}
if (sessionStorage.getItem("merchantUserInfo")){
  useUserStore().setMerchantUserInfo(JSON.parse(<string>sessionStorage.getItem("merchantUserInfo")))
}
if (sessionStorage.getItem("regularUserInfo")){
  useUserStore().setRegularUserInfo(JSON.parse(<string>sessionStorage.getItem("regularUserInfo")))
}


window.addEventListener('beforeunload',()=>{
  sessionStorage.setItem("adminUserInfo",JSON.stringify(useUserStore().getAdminUserInfo()))
  sessionStorage.setItem("merchantUserInfo",JSON.stringify(useUserStore().getMerchantUserInfo()))
  sessionStorage.setItem("regularUserInfo",JSON.stringify(useUserStore().getRegularUserInfo()))
})

</script>

<template>
  <div id="app">
    <n-watermark
        content="宠宝"
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
    <RouterView/>
  </div>
</template>

<style scoped>
html,body,#app {
  width: 101%;
  height: 101%;
  padding: 0;
  margin: 0;
  position: fixed;
  font-family: 'Helvetica Neue', Helvetica, Avenir, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
