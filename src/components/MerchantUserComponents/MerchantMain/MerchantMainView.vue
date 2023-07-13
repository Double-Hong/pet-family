<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, h, Component} from "vue";
import {NIcon} from 'naive-ui'
import type {MenuOption} from 'naive-ui'
import {RouterLink} from 'vue-router'
import ManageOneShop from "@/components/MerchantUserComponents/MerchantMain/ManageOneShop.vue";
import {ElMessage} from "element-plus";

const router = useRouter();

const nowShopId = router.currentRoute.value.params.shopId as string

onMounted(() => {
  console.log("nowShopId: ", nowShopId);
})


//导航

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'baseInfo',
              }
            },
            {default: () => '商品管理'}
        ),
    key: '商品信息',
  },
  // {
  //   key: 'divider-1',
  //   type: 'divider',
  //   props: {
  //     style: {
  //       marginLeft: '32px'
  //     }
  //   }
  // },
  {
    label: '订单管理',
    key: '订单管理',
  },
  {
    label: '运营管理',
    key: '运营管理',
  },
]
const handleUpdateValue = (key: string, item: MenuOption) => {
}
</script>

<template>
  <div class="main-class">
    <el-container class="main-container">
      <el-header>
        <div class="main-header-left">
          <p>左侧</p>
        </div>
        <div class="main-header-main">
<!--          <p>中间导航</p>-->
          <n-menu :options="menuOptions" mode="horizontal" default-value="菜单信息" @update:value="handleUpdateValue"/>
        </div>
        <div class="main-header-right">
          <p>右侧</p>
        </div>
      </el-header>
      <el-main>
        <RouterView :nowShop="nowShopId"/>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.main-class {
  width: 100%;
  height: 92%;
  margin: 0;
  padding: 0;
//background-color: #5b6de3;
}

.main-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
//background-color: #5b6de3;
}

.main-left {
  height: 100%;
  width: 15%;
  float: left;
  background-color: #5b6de3;
}

.main-main {
  height: 100%;
  width: 85%;
  float: left;
  background-color: #2c3e50;
}

.main-header-left {
  height: 100%;
  width: 20%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #5b6de3;
}

.main-header-main {
  height: 100%;
  width: 60%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #bdbbf8;
}

.main-header-right {
  height: 100%;
  margin: 0;
  width: 20%;
  padding: 0;
  float: left;
  background-color: rgba(227, 133, 133, 0.98);
}
</style>

<!--//.el-header{-->
<!--////background-color: #a60b0b;-->
<!--//  padding: 0;-->
<!--//  margin: 0;-->
<!--//}-->
<!--//.el-main{-->
<!--////background-color: #5b6de3;-->
<!--//  padding: 0;-->
<!--//  margin: 0;-->
<!--//  height: 100%;-->
<!--//}-->
