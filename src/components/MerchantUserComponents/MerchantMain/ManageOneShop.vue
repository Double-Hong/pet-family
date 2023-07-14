<script setup lang="ts">
import {defineAsyncComponent, onMounted} from "vue";


const props = defineProps({
  nowShop: {
    type: Number,
    required: true
  }
})
onMounted(() => {
  // console.log("nowShop: ", props.nowShop);
})

const MainComShow = defineAsyncComponent(() => import('@/components/MerchantUserComponents/MerchantMain/MainComShow.vue'))
const ListingProductsView = defineAsyncComponent(() => import('@/views/MerchantUser/ListingProductsView.vue'))
const RemovalOfProductsView = defineAsyncComponent(() => import('@/views/MerchantUser/RemovalOfProductsView.vue'))
</script>

<template>
  <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
    <el-tab-pane label="商品信息">
      <KeepAlive>
          <MainComShow :nowShopId="props.nowShop"/>
      </KeepAlive>
    </el-tab-pane>
    <el-tab-pane label="商品上架">
        <ListingProductsView :nowShopId="props.nowShop"/>
    </el-tab-pane>
    <el-tab-pane label="商品下架">
        <RemovalOfProductsView :nowShopId="props.nowShop"/>
    </el-tab-pane>
    <!--    <el-tab-pane label="Role">Role</el-tab-pane>-->
    <!--    <el-tab-pane label="Task">Task</el-tab-pane>-->
  </el-tabs>
</template>

<style scoped>

</style>
