<template>
  <!--  顶部导航-->
  <div style="position: absolute;top: 0;left: 0;width: 100%;height: 11%">
    <RegularHeader/>
  </div>

  <div style="display:flex;">
    <div style="position: absolute;top: 11%;left: 0;width: 12%;height: 89%">
      <RegularAside/>
    </div>

    <div style="position: absolute;top:11%;left: 12%;width: 88%;height: 89%">
      <Supermarket v-if="store.contentVisible==1"/>
<!--      <RegularHome v-if="store.contentVisible==1"/>-->
      <RegularShoppingCart v-if="store.contentVisible==2"/>
      <RegularOrderInfo v-if="store.contentVisible==3"/>
      <RegularInfo v-if="store.contentVisible==4"/>
    </div>

  </div>


</template>

<script setup lang="ts">
import RegularHeader from "@/components/RegularUserComponents/RegularHeader.vue";
import Supermarket from "@/components/RegularUserComponents/Supermarket.vue";
import RegularAside from "@/components/RegularUserComponents/RegularAside.vue";
import {useRegularStore} from "@/stores/RegularUser"
import RegularShoppingCart from "@/components/RegularUserComponents/RegularShoppingCart.vue";
import RegularOrderInfo from "@/components/RegularUserComponents/RegularOrderInfo.vue";
import RegularInfo from "@/components/RegularUserComponents/RegularInfo.vue";

const store = useRegularStore()

</script>

<style scoped>

</style>
