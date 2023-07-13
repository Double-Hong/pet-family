<template>

<div v-if="store.currentShopId==0">
  <h1 style="text-align: center">当前未选择店铺，前往店铺管理选择店铺</h1>
</div>

  <div class="commodity" v-else>
    <h1 style="text-align: center">{{store.currentShopName}}商品</h1>
      <!--表格-->
      <div style="margin: 10px 0">
        <el-input v-model="input" placeholder="请输入关键字" style="width: 30%;padding-left: 1%" clearable/>
        <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
<!--        <el-button type="primary" @click="add">新增</el-button>-->
    <el-table
        :data="commodityList"
        :header-cell-style="{background: '#409EFF', color: '#fff' }"
    >
     <el-table-column label="商品id" prop="id"/>
      <el-table-column label="名称" prop="commodityName" />
      <el-table-column label="类型" prop="typeName" />
      <el-table-column label="图片">
        <template #default="scope">
          <el-image :src="scope.row.photo" style="width: 80px;height: 80px" />
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

          <el-popconfirm title="确认下架吗" @confirm="takeOff(scope.row.id)">
            <template #reference>
              <el-button size="small" icon="delete" type="danger">下架商品</el-button>
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
  commodity_id:string
  type: string
  name: string
  brand: string
  introduce: string
  price:string
  sale_volume:string
  photo:string
}

const store = useAdminStore()
const commodityList : ComGoodsView[] = reactive([])


import {onMounted, reactive, ref} from 'vue'
import {useAdminStore} from "@/stores/adminState";
import type {ComGoodsView} from "@/utils/adminInterface";
const input = ref('')//搜索
const totalNum = ref(0)//总条数
const pageSize = ref(10)//每页条数
const currentPage = ref(1)//当前页

onMounted(() => {
  request.get("/administrator-entity/getComGoodsByShopId/"+store.currentShopId).then((res) => {
    commodityList.splice(0,commodityList.length)
    commodityList.push(...res.data)
    console.log(res.data)
  })
})


const tableRowClassName = ({
                             row,
                             rowIndex,
                           }: {
  row: Commodity
  rowIndex: number
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}



const tableData:Commodity[] = [
  {
    commodity_id:'000001',
    type: '玩具',
    name:'猫爬架',
    brand: '宠宝',
    introduce: '这是一些介绍',
    price:'133',
    sale_volume:'481',
    photo:'一些照片',
  },
  {
    commodity_id:'000002',
    type: '玩具',
    name:'逗猫棒',
    brand: '宠宝',
    introduce: '这是一些介绍',
    price:'131',
    sale_volume:'405',
    photo:'一些照片',
  },
  {
    commodity_id:'000003',
    type: '零食',
    name:'冻干',
    brand: '宠宝',
    introduce: '这是一些介绍',
    price:'101',
    sale_volume:'200',
    photo:'一些照片',
  },

]

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

const takeOff = (id) => {//下架商品,我这写的删除
  console.log(id)
  request.delete("/commodity/" + id).then(res => {//通过映射让后台获取到id
    if (res.data.code === '0') {
      this.$message({
        type: "success",
        message: "删除成功！！"
      })
    } else {
      this.$message({
        type: "error",
        message: res.data.message
      })
    }
    this.load()//刷新页面表格数据
  })
}

//分页
const changePage = reactive({
  currentPage:1, //默认当前页面为1
  total: Number('10'), //总共有多少数据
})
//这里是获取当前页数
const handleCurrentChange = (val)=> {
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