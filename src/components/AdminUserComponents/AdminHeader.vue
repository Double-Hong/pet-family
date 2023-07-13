<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<template>
<!--  导航栏-->
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        style="width: 100%;height: 100%"
    >
      <el-menu-item index="0">
        <el-image style="height: 50px" src="src/assets/shopbot-icon-removebg-preview.png"></el-image >
      </el-menu-item>
      <h2 style="width: 100%;text-align: center;font-family: 'Microsoft YaHei UI',serif ">宠物之家后台管理</h2>
      <div class="flex-grow" />
      <el-menu-item index="1">主页</el-menu-item>
      <el-sub-menu index="2" >
        <template #title>
        <el-avatar shape="square" size="small" src="src/assets/logo.svg"></el-avatar>
        </template>
        <el-menu-item index="2-1" >个人信息管理
        </el-menu-item>
        <el-menu-item index="2-2">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>


</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>