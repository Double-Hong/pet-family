<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      style="height: 100%;width: 100%"
  >
    <div style="position: absolute;width: 100%;height: 100%;top:0;left: 0">
  <h1 style="text-align: center;font-family: 楷体,serif">宠物之家</h1>
    </div>
    <el-sub-menu index="2" style="position: absolute;right: 0;height: 100%">
      <template #title><el-icon><Setting/></el-icon>设置</template>
      <el-menu-item index="2-1" @click="store.contentVisible=4"><el-icon size="28"><User /></el-icon><span>个人信息</span></el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3" @click="Out"><logout theme="outline" size="28" fill="#dd6675"/>&nbsp;&nbsp;<span style="color: #dd6675">登出</span></el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Setting,User } from '@element-plus/icons-vue'
import {Logout} from "@icon-park/vue-next"
const activeIndex = ref('1')
import {useRegularStore} from "@/stores/RegularUser";
import {ElMessage} from "element-plus";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const store = useRegularStore()

//登出
const Out = ()=>{
  store.contentVisible=1
  ElMessage({
    message: '登出',
    type: 'success'
  })
}

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>