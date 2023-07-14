<template>
  <div class="commodity">
    <el-input v-model="search" placeholder="请输入关键字" style="width: 20%;position: absolute;left: 0.5%;top: 9.5%"
              clearable/>
    <h1 style="text-align: center">商家信息管理</h1>
    <div style="position: absolute;top: 15%;width: 100%;">
      <el-table
          :data="filter"
          height="560px"
          :header-cell-style="{background: '#ff5300', color: '#fff' }"
      >
        <el-table-column label="商家id" prop="merchantUserId"/>
        <el-table-column label="商家账号" prop="loginId"/>
        <el-table-column label="商家名" prop="merchantName"/>
        <el-table-column label="商家地址" prop="merchantAddress"/>
        <el-table-column label="商家联系方式" prop="phone"/>
        <el-table-column label="邮箱" prop="email" width="200px"/>
        <el-table-column label="商家图标">
          <template #default="scope">
            <el-image :src="scope.row.avatar" style="width: 80px;height: 80px"/>
          </template>
        </el-table-column>
        <el-table-column label="执行操作" width="300px">
          <template #default="scope">
            <el-button size="small" type="danger" @click="lookShopByMerchantId(scope.row)">查看店铺</el-button>
            <el-popconfirm title="确认强制封禁账号吗" @confirm="">
              <template #reference>
                <el-button size="small" icon="delete" type="danger">封禁</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>


      </el-table>

    </div>
  </div>
</template>


<script setup lang="ts">
import {request} from "@/utils/request";


const store = useAdminStore();

import {computed, onMounted, reactive, ref} from 'vue'
import {useAdminStore} from "@/stores/adminState";
import type {MerchantUserView} from "@/utils/adminInterface";

const input = ref('')


const merchantList: MerchantUserView[] = reactive([])
//加载页面
onMounted(() => {
  request.get("/administrator-entity/getAllMerchantUser").then(res => {
    console.log(res.data)
    merchantList.splice(0, merchantList.length)
    merchantList.push(...res.data)
  })
})

/**
 * 点击查看该商家旗下的店铺
 * 修改对应的全局变量
 */
const lookShopByMerchantId = (row: MerchantUserView) => {
  store.currentShopId = 0
  store.currentMerchantId = row.merchantUserId
  store.currentMerchantName = row.merchantName
  store.contentVisible = 4
}

//添加商家
// const addMerchant = () => {
//   request.post()
// }


//筛选
const search = ref('')
const filter = computed(() => {
  return merchantList.filter((item: MerchantUserView) => {
    return item.merchantName.includes(search.value) || item.merchantUserId.toString().includes(search.value)
        || item.phone.includes(search.value) || item.email.includes(search.value) || item.merchantAddress.includes(search.value)
  })
})
</script>


<style scoped>


</style>
