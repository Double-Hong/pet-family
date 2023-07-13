<template>
  <div class="commodity">
    <div style="margin: 10px 0">
      <el-input v-model="input" placeholder="请输入关键字" style="width: 30%;padding-left: 1%" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="onMounted">查询</el-button>
      <el-table
          :data="merchantList"
          :header-cell-style="{background: '#409EFF', color: '#fff' }"
      >
        <el-table-column label="商家id" prop="merchantUserId"/>
        <el-table-column label="商家名" prop="merchantName"/>
        <el-table-column label="商家地址" prop="merchantAddress"/>
        <el-table-column label="商家联系方式" prop="phone"/>
        <el-table-column label="邮箱" prop="email"/>
        <el-table-column label="商家图标">
          <template #default="scope">
            <el-image :src="scope.row.avatar" style="width: 80px;height: 80px"/>
          </template>
        </el-table-column>
        <el-table-column label="执行操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="lookShopByMerchantId(scope.row)">查看店铺</el-button>
            <el-popconfirm title="确认强制封禁账号吗" @confirm="bannedMerchant(scope.row.id)">
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

import {onMounted, reactive, ref} from 'vue'
import {useAdminStore} from "@/stores/adminState";
import type {MerchantUser, MerchantUserView} from "@/utils/adminInterface";

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
  store.currentMerchantName=row.merchantName
  store.contentVisible=4
}

//添加商家
// const addMerchant = () => {
//   request.post()
// }

const bannedMerchant = (row: MerchantUser) => {//禁用
  // request.put("/merchant/ban/" + row.regularUserId).then(res => {
  //   console.log(res)
  //   this.load()
  // })
}

const tableData: MerchantUser[] = [
  {
    merchantUserId: 's00001',
    merchantName: 'loving Cat',
    merchantAddress: '重庆',
    loginId: '11',
  }
]
</script>


<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

</style>