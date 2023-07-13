<template>
  <div>
    <div style="margin: 2%">
      <el-input placeholder="请输入商品名称搜索商品" v-model="search" style="width: 40%"></el-input>
    </div>
    <el-table :data="filterState" stripe height="600px" style="width: 100%"
              :header-cell-style="{'background-color': '#7175c4', 'color': '#000'}"
    >
      <el-table-column prop="brandName" label="品牌" width="auto"/>
      <el-table-column prop="commodityName" label="商品名" width="auto"/>
      <el-table-column prop="introduce" label="商品介绍" width="auto"/>
      <el-table-column label="商品图片">
        <template #default="scope">
          <el-image :src="scope.row.photo"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格/元" width="auto"/>
      <el-table-column prop="typeName" label="商品类型" width="auto"/>
      <el-table-column prop="saleVolume" label="销量" width="auto"/>
      <el-table-column prop="state" label="状态" width="auto"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="onListingProduct(scope.row)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
        title="商品下架"
        v-model="sureListingDialogVisible"
        center
        width="30%"
    >
      <span style="margin-left: 20%">确定下架<span
          style="color: brown">{{ GoodsInfo.ListingProductInfo.brandName }}</span>品牌的<span
          style="color: aqua">{{ GoodsInfo.ListingProductInfo.commodityName }}</span> 吗？</span>
      <template #footer>
        <el-button @click="sureListingDialogVisible=false">取消</el-button>
        <el-button @click="makeSureListingProducts">确定</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import type {
  comGoodsView,
  commodity
} from "@/pojo/interface";
import {ElMessage} from "element-plus";

const search = ref("")

const sureListingDialogVisible = ref(false)

const makeSureListingProducts = () => {

  request.get("/commodity-entity/selectCommodityById/" + GoodsInfo.ListingProductInfo.id).then(res => {
    CommodityData.changInfo = res.data;
    CommodityData.changInfo.state = "未上架";
    request.post("/commodity-entity/updateCommodityById", CommodityData.changInfo).then((res) => {
      console.log(res);
      if (res.code == 200) {
        sureListingDialogVisible.value = false;
        GoodsData.splice(GoodsData.indexOf(GoodsInfo.ListingProductInfo), 1);
        ElMessage({
          message: '下架成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '下架失败',
          type: 'error'
        })
      }
    })
  })

}

const myPageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  shopId: 1
})
const GoodsData: comGoodsView[] = reactive([]);
const GoodsInfo = reactive({
  ListingProductInfo: {} as comGoodsView,
})
const CommodityData = reactive({
  changInfo: {} as commodity,
})
const filterState = computed(() => {

  return GoodsData.filter((item: comGoodsView) => {
    return (item.state == "上架中") && (item.commodityName.includes(search.value))
  })

})
onMounted(() => {
  request.get("/commodity-entity/selectComGoodsViewByShopId/" + myPageInfo.shopId).then((res) => {
    GoodsData.push(...res.data)

  })
})

const onListingProduct = (row) => {
  GoodsInfo.ListingProductInfo = row;
  sureListingDialogVisible.value = true;

}
</script>

<style scoped>

</style>
