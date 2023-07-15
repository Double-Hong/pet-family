<template>

  <div v-if="store.currentShopId==0">
    <h1 style="text-align: center">当前未选择店铺，前往店铺管理选择店铺</h1>
  </div>
  <div class="commodity" v-else>
    <h1 style="text-align: center">{{ store.currentShopName }}商品</h1>
    <!--表格-->
    <el-input v-model="search" placeholder="请输入关键字" style="width: 20%;position: absolute;left: 0.5%;top: 9.5%"
              clearable/>
    <el-select v-model="select" style="position: absolute;top: 9.5%;left: 80%;">
      <el-option style="color: #ff5300" label="全部" value=""/>
      <el-option style="color: #ff5300" label="上架中" value="上架中"/>
      <el-option style="color: #ff5300" label="未上架" value="未上架"/>
      <el-option style="color: #ff5300" label="已删除" value="已删除"/>
    </el-select>
    <div style="position: absolute;width: 100%;top: 15%">

      <el-table
          :data="filter"
          height="560px"
          :header-cell-style="{background: '#ff5300', color: '#fff' }"
      >
        <el-table-column label="商品id" prop="id"/>
        <el-table-column label="名称" prop="commodityName"/>
        <el-table-column label="类型" prop="typeName"/>
        <el-table-column label="介绍" prop="introduce"/>
        <el-table-column label="图片">
          <template #default="scope">
            <el-image :src="scope.row.photo" style="width: 80px;height: 80px"/>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.state=='上架中'" size="large" type="success">上架中</el-tag>
            <el-tag v-else-if="scope.row.state=='未上架'" size="large" type="warning">未上架</el-tag>
            <el-tag v-else size="large" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            label="执行操作"
        >
          <template #default="scope">

            <el-popconfirm title="确认下架吗" @confirm="sureTakeOff(scope.row)" confirm-button-text="确认"
                           cancel-button-text="取消" confirm-button-type="success" cancel-button-type="danger">
              <template #reference>
                <el-button v-if="scope.row.state=='上架中'" size="small" icon="delete" type="danger">下架商品
                </el-button>
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

interface Commodity {
  commodity_id: string
  type: string
  name: string
  brand: string
  introduce: string
  price: string
  sale_volume: string
  photo: string
}

const store = useAdminStore()
const commodityList: ComGoodsView[] = reactive([])


import {computed, onMounted, reactive, ref} from 'vue'
import {useAdminStore} from "@/stores/adminState";
import type {ComGoodsView} from "@/utils/adminInterface";
import {ElMessage} from "element-plus";


onMounted(() => {
  request.get("/administrator-entity/getComGoodsByShopId/" + store.currentShopId).then((res) => {
    commodityList.splice(0, commodityList.length)
    commodityList.push(...res.data)
    console.log(res.data)
  })
})

//筛选
const search = ref('')
const select = ref('上架中')

const filter = computed(() => {
  return commodityList.filter((item) => {
    return (item.commodityName.includes(search.value) || item.id.toString().includes(search.value) || item.introduce.includes(search.value)
            || item.typeName.includes(search.value))
        && (item.state.includes(select.value))
  })
})

const load = () => {//查询方法,在页面加载的时候调用
  request.get("/commodity", {//传入三个参数：当前页，pageSize，关键词搜索
    params: {
      pageNum: this.currentPage,
      pageSize: this.pageSize,
      search: this.search
    }
  }).then(res => {
    console.log(res)
    this.tableData = res.data.records//res返回结果里的records数据赋值给tableData
    this.total = res.data.total
  })
}

//确认下架
const sureTakeOff = (row: ComGoodsView) => {//下架商品,我这写的删除
  request.get("/administrator-entity/takeOffCommodityById/" + row.id + "," + store.currentShopId).then(res => {
    commodityList.splice(0, commodityList.length)
    commodityList.push(...res.data)
    ElMessage.success("下架成功")
  })
}

//分页
const changePage = reactive({
  currentPage: 1, //默认当前页面为1
  total: Number('10'), //总共有多少数据
})
//这里是获取当前页数
const handleCurrentChange = (val) => {
  changePage.currentPage = val
}


</script>


<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
