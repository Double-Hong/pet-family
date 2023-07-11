<script setup lang="ts">

import MerchantHeader from "@/components/MerchantUserComponents/MerchantHeader.vue";
import MerchantMainView from "@/components/MerchantUserComponents/MerchantMain/MerchantMainView.vue";
</script>

<template>
  <div class="common-layout">
    <el-container class="el-container">
      <el-header class="el-header">
        <MerchantHeader />
      </el-header>
      <el-main class="el-main">
        <div class="col-grid">
          <el-row >
            <el-col :span="24"><div /></el-col>
          </el-row>
        </div>
        <MerchantMainView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout{
  width: 100%;
  height: 100%;
  margin:0;
  padding:0;
}
.el-container{
  width: 100%;
  height: 100%;
}
.el-header{
  //background-color: #a60b0b;
  padding: 0;
  margin: 0;
}
.el-main{
  //background-color: #5b6de3;
  padding: 0;
  margin: 0;
  height: 100%;
}
.col-grid{
  background-color: #2c3e50;
  height: 8%;
}
</style>
