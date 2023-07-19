<script setup lang="ts">

import {useAdminStore} from "@/stores/adminState";

const store = useAdminStore();

store.headerVis = true


import {
  GoodsFilled, UserFilled, Shop, Platform, BrushFilled
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <!--侧边栏-->
  <!--  <h5 class="mb-2" style="display: flex">基础信息管理</h5>-->
  <el-menu
      default-active="3"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="width: 100%;height: 100%"
  >

    <el-menu-item index="3"  @click="store.contentVisible=3">
      <el-icon>
        <BrushFilled/>
      </el-icon>
      <span>商家管理</span>
    </el-menu-item>
<!--    <el-menu-item index="4" @click="store.contentVisible=4">-->
<!--      <el-icon>-->
<!--        <Shop/>-->
<!--      </el-icon>-->
<!--      <span>店铺管理</span>-->
<!--    </el-menu-item>-->
<!--    <el-menu-item index="1" @click="store.contentVisible=1">-->
<!--      <el-icon>-->
<!--        <GoodsFilled/>-->
<!--      </el-icon>-->
<!--      <span>商品管理</span>-->
<!--    </el-menu-item>-->
    <el-menu-item index="2" @click="store.contentVisible=2">
      <el-icon>
        <UserFilled/>
      </el-icon>
      <span>用户管理</span>
    </el-menu-item>


    <el-menu-item index="5" @click="store.contentVisible=5">
      <el-icon>
        <Platform/>
      </el-icon>
      <span>审核管理</span>
    </el-menu-item>

  </el-menu>


</template>

<style scoped>

</style>