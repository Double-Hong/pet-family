<script setup lang="ts">

import {computed, onMounted, reactive, ref, watch} from "vue";
import type {comGoodsView, comTypeCount} from "@/pojo/data-entity";
import request from "@/utils/request";

const props = defineProps({
  nowShopId: {
    type: Number,
    required: true
  }
})
const nowShopId = props.nowShopId

const value = ref('')
const options = ref<comTypeCount[]>([])
const allComGoodsInfo = reactive({
  value: [{
    brandName: "",
    commodityName: "",
    id: 0,
    introduce: "",
    photo: "",
    price: 0,
    saleVolume: 2,
    shopId: 2,
    shopName: "",
    typeName: "",
    state: "",
  }]
})
const tableData:comGoodsView[] = reactive([])
const filterType = (value: string, row: comGoodsView) => {
  return row.typeName === value
}
interface option {
  text: string,
  value: string
}
const filterOption:option[] = reactive([])


onMounted(() => {
  console.log(nowShopId)
  request.post("/commodity-entity/getCommodityTypeByShopId/" + nowShopId).then(res => {
    options.value.push(...res.data)
    filterOption.push(...res.data.map(item => {
      return {
        value: item.comTypeName,
        text: item.comTypeName
      }
    }))
  })
  request.get("/commodity-entity/selectComGoodsViewByShopId/" + nowShopId).then(res => {
    allComGoodsInfo.value.splice(0,allComGoodsInfo.value.length)
    allComGoodsInfo.value.push(...res.data)
    allComGoodsInfo.value.forEach((item,index) => {
      if(item.state === "已删除"){
        allComGoodsInfo.value.splice(index,1)
      }
    })
    tableData.push(...allComGoodsInfo.value)
    console.log(tableData)
  })
})
</script>

<template>
  <div class="main-class-show-com">
    <div class="main-class-show-com-header">
      <!--      <el-row>-->
      <!--        <el-col :span="6">-->
      <!--          <span>筛选：</span>-->
      <!--          <el-select v-model="value" placeholder="Select">-->
      <!--            <el-option-->
      <!--                v-for="item in options"-->
      <!--                :key="item.comTypeName"-->
      <!--                :label="item.comTypeName"-->
      <!--                :value="item.comTypeName"-->
      <!--            />-->
      <!--          </el-select>-->
      <!--          <el-button type="info" plain @click="value=''">all</el-button>-->
      <!--        </el-col>-->
      <!--        <el-col :span="18"/>-->
      <!--      </el-row>-->
    </div>
    <div class="main-class-show-com-main">
      <el-table ref="tableRef" :data="tableData" stripe height="500px" style="width: 100%"
                :header-cell-style="{'background-color': '#7175c4', 'color': '#000'}"
      >
        <el-table-column type="index" width="50px" />
        <el-table-column prop="brandName" label="品牌" width="auto"/>
        <el-table-column prop="typeName" label="商品类型" width="auto"
                         :filters="filterOption"
                         :filter-method="filterType"
                         filter-placement="bottom-end"
        />
        <el-table-column prop="commodityName" label="商品名" width="auto"/>
        <el-table-column prop="introduce" label="商品介绍" width="auto"/>
        <el-table-column label="商品图片" width="auto">
          <template #default="scope">
            <el-image :src="scope.row.photo"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格/元" width="auto"/>
        <el-table-column prop="saleVolume" label="销量" width="auto"/>
        <el-table-column prop="state" label="状态" width="auto"/>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.main-class-show-com {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.main-class-show-com-header {
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>
