<script setup lang="ts">
import { ref } from 'vue'
import router from "@/router";
import {useUserStore} from "@/stores/UserStore";

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const headPhoto = useUserStore().adminUserInfo.avatar

const logout = ()=>{
  router.push("/")
  localStorage.removeItem("token")
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
        <el-image style="height: 60px;margin-left: 5%" src="src/assets/logoText.png"></el-image >
      </el-menu-item>
      <h2 style=" width: 100%;text-align: center;font-family: 'Microsoft YaHei UI',serif ">宠物之家后台管理</h2>
      <div class="flex-grow" />

      <el-sub-menu index="2" >
        <template #title>
        <el-avatar style="border-radius: 100px" shape="square" size="large" :src="headPhoto"></el-avatar>
        </template>
        <el-menu-item index="2-1" @click="router.push('/selfAdmin')">个人信息管理
        </el-menu-item>
        <el-menu-item index="2-2" @click="logout">退出登录</el-menu-item>
      </el-sub-menu>
    </el-menu>


</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

</style>