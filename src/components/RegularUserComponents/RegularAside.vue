<template>

  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="width: 100%;height: 100%;text-align: center"
  >
    <el-menu-item index="2" @click="store.contentVisible=1">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span>主 页</span>
    </el-menu-item>
    <el-menu-item index="4" @click="store.contentVisible=2">
      <el-icon>
        <ShoppingCart/>
      </el-icon>
      <span>购物车</span>
    </el-menu-item>
    <el-menu-item index="5" @click="store.contentVisible=3">
      <el-icon>
        <DocumentChecked/>
      </el-icon>
      <span>我的订单</span>
    </el-menu-item>
  </el-menu>

</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  ShoppingCart, DocumentChecked
} from '@element-plus/icons-vue'
import {useRegularStore} from "@/stores/RegularUser";
import {reactive} from "vue";


const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}


const store = useRegularStore()

</script>

