<template>

  <div v-if="store.currentMerchantId==0" style="text-align: center"><h1>当前未选择商家，前往商家管理选择商家</h1></div>
  <div v-else class="commodity">

    <h1 style="text-align: center">{{store.currentMerchantName}}</h1>

    <div style="margin: 10px 0">
      <el-input v-model="input" placeholder="请输入关键字" style="width: 30%;padding-left: 1%" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      <el-table
          :data="shopList"
          height="500px"
          :header-cell-style="{background: '#409EFF', color: '#fff' }"
      >
        <el-table-column label="店铺id" prop="id" width="100px" />
        <el-table-column label="店铺名" prop="name" />
        <el-table-column label="店铺介绍" prop="introduce" />
        <el-table-column label="店铺地址" prop="address" />
        <el-table-column label="店铺图标">
          <template #default="scope">
            <el-image :src="scope.row.avatar" style="width: 80px;height: 80px"/>
          </template>
        </el-table-column>
        <el-table-column label="营业状态" >
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
            <el-button size="default" type="primary" @click="lookCommodityByShopId(scope.row)">查看商品</el-button>
            <el-popconfirm title="确认封禁吗" @confirm="bannedShop(scope.row.id)">
              <template #reference>
                <el-button size="default" icon="delete" type="danger">关闭店铺</el-button>
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
import {onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";

const store = useAdminStore();
interface Shop{
  id:number,
  name: string,
  introduce: string,
  merchantId:number,
  address:string,
  avatar:string,
  shopStatus:string,
}

const shopList:Shop[]=reactive([])

onMounted(()=>{
  request.get("/administrator-entity/getAllShopByMerchantId/"+store.currentMerchantId).then(res=>{
    console.log(res)
    shopList.splice(0,shopList.length)
    shopList.push(...res.data)
  })
})

//通过店铺id查看该店铺下的商品
const lookCommodityByShopId=(row:Shop)=>{
  store.currentShopId=row.id
  store.currentShopName=row.name
  store.contentVisible=1
}


const input = ref('')
const tableRowClassName = ({
                             row,
                             rowIndex,
                           }: {
  row: Shop
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const load = () => {//查询方法,在页面加载的时候调用
  request.get("/shop/getAllShop").then(res => {
    console.log(res)
  })
}

const bannedShop= (row: Shop) => {//禁用
  request.put("/shop/ban/" ).then(res => {
    console.log(res)
    this.load()
  })
}

</script>


<style scoped>

</style>
