<template>

  <div v-if="store.currentMerchantId==0" style="text-align: center"><h1>当前未选择商家，前往商家管理选择商家</h1></div>
  <div v-else class="commodity">

    <h1 style="text-align: center">{{ store.currentMerchantName }}</h1>
    <el-input v-model="search" placeholder="请输入关键字" style="width: 20%;position: absolute;left: 0.5%;top: 9.5%"
                              clearable/>
    <el-select v-model="select" style="position: absolute;top: 9.5%;left: 80%;">
      <el-option style="color: #ff5300" label="全部" value="" />
      <el-option style="color: #ff5300" label="营业中" value="营业中" />
      <el-option style="color: #ff5300" label="歇业中" value="歇业中" />
    </el-select>
    <div style="position: absolute;top: 15%;width: 100%;">

      <el-table
          :data="filter"
          height="560px"
          :header-cell-style="{background: '#ff5300', color: '#fff' }"
      >
        <el-table-column label="店铺id" prop="id" align="center"/>
        <el-table-column label="店铺名" prop="name" align="center"/>
        <el-table-column label="店铺介绍" prop="introduce" align="center"/>
        <el-table-column label="店铺地址" prop="address" align="center"/>
        <el-table-column label="店铺图标" align="center">
          <template #default="scope">
            <el-image :src="scope.row.avatar" style="width: 80px;height: 80px"/>
          </template>
        </el-table-column>
        <el-table-column label="营业状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.shopStatus=='营业中'" size="large" type="success">营业中</el-tag>
            <el-tag v-else size="large" type="danger">歇业中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="操作"
            width="250"
        >
          <template #default="scope">
            <el-button size="small" type="danger"  @click="lookCommodityByShopId(scope.row)" >查看商品</el-button>
            <el-popconfirm title="确认关闭店铺" @confirm="bannedShop(scope.row)" confirm-button-text="确认"
                           cancel-button-text="取消" confirm-button-type="success" cancel-button-type="danger">
              <template #reference>
                <el-button size="small" icon="delete" type="danger">关闭店铺</el-button>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>


      </el-table>

    </div>
  </div>
</template>

<script setup lang="ts">

import {useAdminStore} from "@/stores/adminState";
import {computed, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import {ElMessage} from "element-plus";

const store = useAdminStore();

interface Shop {
  id: number,
  name: string,
  introduce: string,
  merchantId: number,
  address: string,
  avatar: string,
  shopStatus: string,
}

const shopList: Shop[] = reactive([])

onMounted(() => {
  request.get("/administrator-entity/getAllShopByMerchantId/" + store.currentMerchantId).then(res => {
    console.log(res.data)
    shopList.splice(0, shopList.length)
    shopList.push(...res.data)
  })
})

//通过店铺id查看该店铺下的商品
const lookCommodityByShopId = (row: Shop) => {
  store.currentShopId = row.id
  store.currentShopName = row.name
  store.contentVisible = 1
}

//筛选
const search = ref('')
const select = ref('营业中')

const filter = computed(() => {
  return shopList.filter((item: Shop) => {
    return (item.name.includes(search.value) || item.introduce.includes(search.value)
        || item.address?.includes(search.value) || item.id.toString().includes(search.value)) && (item.shopStatus.includes(select.value))
  })
})


const load = () => {//查询方法,在页面加载的时候调用
  request.get("/shop/getAllShop").then(res => {
    console.log(res)
  })
}

const bannedShop = (row: Shop) => {//关闭店铺
alert(row.id)
  request.get("/administrator-entity/closeShopById/"+row.id+","+store.currentMerchantId).then(res=>{
    shopList.splice(0, shopList.length)
    shopList.push(...res.data)
    ElMessage.success("关闭成功")
  })
}

</script>


<style scoped>

</style>
