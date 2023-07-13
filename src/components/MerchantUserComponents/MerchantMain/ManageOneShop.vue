<script setup lang="ts">
import {onMounted} from "vue";
import MainComShow from "@/components/MerchantUserComponents/MerchantMain/MainComShow.vue";


const props = defineProps({
  nowShop: {
    type: String,
    required: true
  }
})

onMounted(()=>{
  console.log("nowShop: ", props.nowShop);
})
</script>

<template>
  <el-tabs tab-position="left" style="height: 100%" class="demo-tabs">
    <el-tab-pane label="商品信息">
      <main-com-show :nowShopId="props.nowShop"/>
    </el-tab-pane>
    <el-tab-pane label="商品上架">商品上架</el-tab-pane>
    <el-tab-pane label="商品下架">商品下架</el-tab-pane>
<!--    <el-tab-pane label="Role">Role</el-tab-pane>-->
<!--    <el-tab-pane label="Task">Task</el-tab-pane>-->
  </el-tabs>
</template>

<style scoped>

</style>
