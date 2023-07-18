<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, h} from "vue";
import type {MenuOption} from 'naive-ui'
import {RouterLink} from 'vue-router'

const router = useRouter();

const nowShopId = router.currentRoute.value.params.shopId as number

onMounted(() => {
  // console.log("nowShopId: ", nowShopId);
  router.push({
    name: 'baseInfo'
  })
})


//导航

// function renderIcon(icon: Component) {
//   return () => h(NIcon, null, {default: () => h(icon)})
// }

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
    value: '商品信息',
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
    label: () =>
        h(
            RouterLink,{
              to:{
                name:'order-manage'
              }
            },
            {default: () => '订单管理'}
        )
    ,
    key: '订单管理',
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'operation',
              }
            },
            {default: () => '运营管理'}
        ),
    key: '运营管理',
    value: '运营管理',
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'comments',
              }
            },
            {default: () => '用户评论'}
        ),
    key:'用户评论',
    value:'用户评论',
  }
]
const handleUpdateValue = (key: string, item: MenuOption) => {
}
</script>

<template>
  <div class="main-class">
    <el-container class="main-container">
      <el-header style="background-color: #F9F0DA">
        <div class="main-header-left">
          <el-button style="margin-top: 10px" text icon="back" size="default" @click="()=>{router.push('/merch-grid-view/all-shops')}">返回</el-button>
        </div>
        <div class="main-header-main">
          <n-menu :options="menuOptions" mode="horizontal" default-value="菜单信息" @update:value="handleUpdateValue"/>
        </div>
        <div class="main-header-right">

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

}

.main-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
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
  background-color: #F9F0DA;
}

.main-header-main {
  height: 100%;
  width: 60%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #F9F0DA;
}

.main-header-right {
  height: 100%;
  margin: 0;
  width: 20%;
  padding: 0;
  float: left;
  background-color: #F9F0DA;
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
