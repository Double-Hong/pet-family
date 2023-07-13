<script setup lang="ts">

import AdminHeader from "@/components/AdminUserComponents/AdminHeader.vue";
import AdminAside from "@/components/AdminUserComponents/AdminAside.vue";
import AdminCommodity from "@/components/AdminUserComponents/AdminCommodity.vue";
import AdminMerchant from "@/components/AdminUserComponents/AdminMerchant.vue";
import {ref} from "vue";
import {useAdminStore} from "@/stores/adminState";
import AdminRegular from "@/components/AdminUserComponents/AdminRegular.vue";
import AdminShop from "@/components/AdminUserComponents/AdminShop.vue";
import AdminAudit from "@/components/AdminUserComponents/AdminAudit.vue";

const store = useAdminStore();

const Visible = ref(1)
</script>

<template>
  <!--  导航栏-->
  <div style="position: fixed;top: 0;left: 0;width: 100%;height: 11%">
    <AdminHeader/>
  </div>


  <!--  <div style="display: flex">-->
  <!--    <SelfAdmin/>-->
  <!--  </div>-->

  <!--  表格-->

  <div style="display: flex">
    <div style="position:fixed;top: 11%;left: 0;width: 12%;height: 89%;">
      <AdminAside/>
    </div>

    <div style="position: absolute;top:11%;left: 12%;width: 88%;height: 89%">
      <AdminCommodity v-if="store.contentVisible==1"/>
      <AdminRegular v-if="store.contentVisible==2"/>
      <AdminMerchant v-if="store.contentVisible==3"/>
      <AdminShop v-if="store.contentVisible==4"/>
      <AdminAudit v-if="store.contentVisible==5"/>
    </div>
  </div>

  <!--    <div style="display: flex">-->
  <!--      <Register/>-->
  <!--    </div>-->

  <RouterView/>
</template>

<style scoped>

</style>
