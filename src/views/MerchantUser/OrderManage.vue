<template>

  <div style="padding: 10px">
    <h2>销售额：{{ totalPrice }} 订单总量：{{ totalNum }}</h2>
<!--    <el-input style="width: 300px" placeholder="请输入状态" v-model="state" clearable></el-input>-->
<!--    <el-button type="primary" @click="search" style="margin-left: 5px">查询数据</el-button>-->
    <div class="demo-date-picker">
      <div class="container">
        <div class="block">
          <el-date-picker
              v-model="value2"
              format="YYYY-MM"
              value-format="YYYY-MM"
              type="month"
              placeholder="Pick a month"
          />
          <el-button type="primary" @click="searchtime(value2)" style="margin-left: 5px">查询数据</el-button>
          <el-button type="primary" @click="searchall" style="margin-left: 5px">全部</el-button>
          <el-button type="primary" @click="searchnow" style="margin-left: 5px">已支付</el-button>
          <el-button type="primary" @click="searchpre" style="margin-left: 5px">申请退款</el-button>
          <el-button @click="addQuantity">增加库存</el-button>
          <td>{{ value2 }}</td>
        </div>
      </div>
    </div>
    <div style="margin: 10px 0">
      <table class="custom-table">
        <thead>
        <tr>
          <th style="width: 8%">订单编号</th>
          <th style="width: 8%">用户名</th>
          <th style="width: 17%">时间</th>
          <th style="width: 18%">地址</th>
          <th style="width: 10%">电话</th>
          <th style="width: 9%">状态</th>
          <th style="width: 7%">总价格</th>
          <th style="width: 30%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data,id) in tableData.filterData" :key="id">
<!--          <tr v-if="data.orderFormEntity.state !== '已付款'">-->
<!--                    <tr v-if="data.orderFormEntity.id !== '0'">-->
          <td>{{ data.orderFormEntity.id }}</td>
          <td>{{ data.orderFormEntity.name }}</td>
          <td>{{ data.orderFormEntity.time }}</td>
          <td>{{ data.orderFormEntity.address }}</td>
          <td>{{ data.orderFormEntity.phone }}</td>
          <td>{{ data.orderFormEntity.state }}</td>
          <td>{{ data.orderFormEntity.totalPrice }}</td>
          <td>
            <div class="btn-group">
              <el-button @click="showList(data.list,id)" class="details-btn">订单详情</el-button>
              <el-button link type="primary" size="small" @click="handleEdit(data.orderFormEntity,id)" class="edit-btn">编辑</el-button>
              <el-button v-if="data.orderFormEntity.state === '已付款'"
                         @click="confirmDelivery(data.orderFormEntity)"
                         class="confirm-btn green-btn">
                确认发货
              </el-button>
              <el-button v-else-if="data.orderFormEntity.state === '申请退款'"
                         @click="confirmRefund(data.orderFormEntity)"
                         class="confirm-btn red-btn">
                确认退款
              </el-button>
            </div>
          </td>
          </tr>
<!--          </tr>-->
<!--        </tr>-->
        </tbody>
      </table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="信息" width="40%">
      <el-form :model="form" label-width="100px" style="padding-right: 30px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="save(form)">确认</el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showDialog" title="订单详情" width="40%">
      <table style="width: 100%">
        <thead>
        <tr>
          <th style="width: 30%">商品ID</th>
          <th style="width: 30%">商品名字</th>
          <th style="width: 30%">数量</th>
          <th>总价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, id) in form" :key="id">
          <td>{{ data.orderGoodsEntity.id }}</td>
          <td>{{ data.name }}</td>
          <td>{{ data.orderGoodsEntity.num }}</td>
          <td>{{ data.orderGoodsEntity.totalPrice }}</td>
        </tr>
        </tbody>
      </table>
    </el-dialog>

    <el-dialog
        v-model="addQuantityVisible"
        title="增加库存"
        center
    >
      <el-form>
        <el-form-item label="商品类型">
          <el-select v-model="myPageInfo.commodityType">
            <el-option
                v-for="item in CommodityTypeData.options"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-select v-model="addQuantityForm.formInfo.commodityId" placeholder="选择商品">
            <el-option
                v-for="item in filterGoods"
                :key="item.id"
                :label="item.commodityName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="增加数量">
          <el-input-number v-model="addQuantityForm.formInfo.quantity" :min="1" :max="10000" label="请输入数量"></el-input-number>
        </el-form-item>
        <el-form-item label="仓库">
          <el-select v-model="addQuantityForm.formInfo.warehouseId" clearable placeholder="请选择仓库">
            <el-option
                v-for="item in filterWarehouse"

                :label="item.warehouseName"
                :value="item.warehouseId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addQuantityVisible=false">取消</el-button>
        <el-button type="primary" @click="makeSureAddProductQuantity">确定</el-button>
      </template>
    </el-dialog>

<!--    <el-dialog v-model = "showDialog" title="订单详情" width="40%">-->
<!--      <el-table :data="form" style="width: 100%">-->
<!--        <el-table-column prop="commodityId" label="物品Id" width="180" align="center" />-->
<!--        <el-table-column prop="num" label="物品数量" width="180" align="center" />-->
<!--        <el-table-column prop="totalPrice" label="物品总价" width="250" align="center" />-->
<!--      </el-table>-->
<!--    </el-dialog>-->
  </div>
</template>

<script lang="ts" setup>
// import {computed, reactive, ref} from "vue";
// import {h} from 'vue'
// import {ElMessage, ElMessageBox, ElPagination} from 'element-plus'
// import type {Action} from 'element-plus'
import axios, {create} from "axios";
import {timelineItemProps} from "element-plus";
import {computed, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import {addQuantityForm, brand, comGoodsView, storage, warehouse} from "@/utils/interface";
import type {commodityType} from "@/utils/interface";
import {ElMessage} from "element-plus";

const value2 = ref('')
const childBorder = ref(false)
const dialogFormVisible = ref(false)
let form = reactive({})
const globalIndex = ref(-1)   // 全局保存的编辑的行号
const state = ref()
const time = ref()
const showDialog = ref(false)
// let queryInfo = ref([
//   {
//     pagenum: 1, // 查询参数
//     pagesize: 3, // 当前页码
//     query: '' // 每页显示条数
//   }
// ])
const props = defineProps({
  nowShop: {
    type: Number,
    required: true
  }
})

let tableData = reactive({
  filterData: [{
    orderFormEntity: {
      id: '0',
      name:'ran',
      personId: '11',
      time: '2023-7-12',
      address: '重庆',
      phone: '1919191',
      state: '测试',
      totalPrice: '0'
    },
    list: []
  }]
})



const confirmDelivery = (data) =>{
  axios.get('http://localhost:9090/order-form-entity/passDeliver/'+data.id, form)
      .then(response => {
    // 处理响应
    console.log('发货成功');
  })
}
const confirmRefund = (data) =>{
  axios.get('http://localhost:9090/order-form-entity/passRet/'+data.id, form)
  console.log('退款成功');
}

// 保存数据，把数据插入到 tableData里面，并刷新页面数据，弹窗关闭
const save = (data) => {
    axios.post('http://localhost:9090/order-form-entity/updateOrder/'+data.id, form)
        .then(response => {
          // 处理响应
          console.log('保存成功');
          dialogFormVisible.value = false; // 关闭弹窗
        })
}

// 监听 页码值 改变的事件
// const handleCurrentChange = (newPage) => {
//   this.pagenum = newPage
// }

// 编辑数据，先赋值到表单 再打开弹窗
const handleEdit = (data,id) => {
  const newObj = Object.assign({}, data)
  form = reactive(newObj)
  globalIndex.value = id  // 把当前编辑的行号赋值给全局的保存的编辑的行号
  dialogFormVisible.value = true
}

const totalPrice = computed(() => {
  let sum = 0;
  for (const item of tableData.filterData) {
    sum += parseFloat(item.orderFormEntity.totalPrice);
  }
  return sum;
});
const totalNum= computed(() => {
  let numsum = 0;
  for (const item of tableData.filterData) {
    numsum ++;
  }
  return numsum;
});


const showList = (data,id) => {
    const newObj = Object.assign({}, data)
    form = reactive(newObj)
    console.log(form)
   // 显示弹窗
   showDialog.value = true
  console.log(data)
}


// 删除数据 从index的位置开始 删除1行即可
// const remove = (index) => {
//   ElMessageBox({
//     title: '是否删除此条信息',
//     showCancelButton: true,
//     confirmButtonText: '确认',
//     cancelButtonText: '取消',
//     beforeClose: (action, instance, done) => {
//       if (action === 'confirm') {
//         instance.confirmButtonLoading = true
//         this.request.delete("/order-form-entity/detOrderForm/" + this.id)
//         done()
//       } else {
//         done()
//       }
//     },
//   }).then((action) => {
//     ElMessage({
//       message: `已删除`,
//     })
//   })
// }
// const search = async () => {
//     try {
//       const response = await axios.get(`http://localhost:9090/order-form-entity/listOrder/${order_id}`);
//       tableData.filterData = response.data;
//     } catch (error) {
//       console.error(error);
//     }
// }
interface OrderFormEntity {
  id: string;
  name: string;
  personId: string;
  time: string;
  address: string;
  phone: string;
  state: string;
  totalPrice: string;
}
interface OrderData {
  orderFormEntity: OrderFormEntity;
  list: any[]; // 替换为实际的订单详情类型
}

// const search = () => {
//   let filteredData = tableData.filterData;
//   console.log('this.state.value:', state.value)
//   if (state.value != null) {
//     console.log('进入测试')
//     filteredData = filteredData.filter((data: OrderData) => {
//       // console.log('filterData:', tableData.filterData);
//       // console.log('data.orderFormEntity.state:', data.orderFormEntity.state)
//       // console.log('this.state.value:', state.value);
//       return data.orderFormEntity.time.includes(time.value)
//       // console.log('filteredData:', data);
//     })
//   }
//   console.log(filteredData)
//   tableData.filterData = filteredData
// };

// const filter=computed(()=>{
//   let filteredData = tableData.filterData;
//   return filteredData.filter(item=>item.orderFormEntity.time.includes(value2.value))
// })
const searchtime = (val:string) => {
  let filteredData = reactive([...tableData.filterData]); // 创建响应式数组副本
  console.log(value2.value);
  if (value2.value != null) {
    filteredData = filteredData.filter((data) => {
      return data.orderFormEntity.time.includes(value2.value);
    });
  }
  console.log(filteredData);
  tableData.filterData = filteredData;
};

const searchnow = () => {
  console.log(tableData.filterData)
  // axios.get("http://localhost:9090/order-form-entity/listOrder/1").then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  //   tableData.filterData.splice(0,tableData.filterData.length)
  //   tableData.filterData.push(...res.data.data)
  //   // console.log(tableData.filterData)
  // })
  let filteredData = tableData.filterData;
    filteredData = filteredData.filter((data: OrderData) => {
      console.log(data.orderFormEntity.state)
      return data.orderFormEntity.state.includes('已付款')
    })
  console.log(filteredData)
  tableData.filterData = filteredData
};
const searchall = () => {
  let filteredData = tableData.filterData;
  tableData.filterData = filteredData
  axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0,tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
    // console.log(tableData.filterData)
  })
};

const searchpre = () => {

  let filteredData = tableData.filterData;
    filteredData = filteredData.filter((data: OrderData) => {
      return data.orderFormEntity.state.includes('申请退款')
    })
  tableData.filterData = filteredData
};
// const search = () =>  {
//   const filteredData = tableData.filterData.filter((data) => {
//     return data.orderFormEntity.id.includes(order_id);
//   });
//   tableData.filterData = filteredData;
// },

axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData.filterData.splice(0,tableData.filterData.length)
  tableData.filterData.push(...res.data.data)
  console.log(tableData.filterData)
})

const addQuantityForm=reactive({
  formInfo:{} as addQuantityForm
})

const addQuantityVisible=ref(false);
const addQuantity=()=>{
  addQuantityVisible.value=true
  myPageInfo.commodityType=''
}
const makeSureAddProductQuantity=()=>{
  request.post("/storage-entity/addStorageQuantity",addQuantityForm.formInfo).then(res=>{
    if (res.code ==200){
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
      addQuantityVisible.value=false
    }
  })
}
const myPageInfo=reactive({
  shopId:1,
  commodityType:"",
})
const CommodityTypeData=reactive({
  options:[] as commodityType[],
})
const brandData = reactive({
  options: [] as brand[],
})
const warehouseData = reactive({
  options:[] as warehouse[],
})
const filterWarehouse=computed(()=>{
  return warehouseData.options.filter(item=>item.warehouseId==makeSureAddWarehouse(addQuantityForm.formInfo.commodityId))
})
const filterGoods=computed(()=>{
  return GoodsData.filter(item=>item.state!="已删除")&&GoodsData.filter(item=>item.typeName==myPageInfo.commodityType)
})

const storageData=reactive({
  storageList:[] as storage[]
})
function makeSureAddWarehouse(commodityId:number){
  for (let i=0;i<storageData.storageList.length;i++){
    if (storageData.storageList[i].commodityId==commodityId){
      return storageData.storageList[i].warehouseId
    }
  }
}

const GoodsData:comGoodsView[]=reactive([]);
onMounted(()=>{
  request.get("/commodity-entity/selectComGoodsViewByShopId/"+myPageInfo.shopId).then((res)=>{
    GoodsData.push(...res.data)
  })
  request.get("/commodity-type-entity/selectAllCommodityType").then((res)=>{
    CommodityTypeData.options.push(...res.data)

  })

  request.get("/brand-entity/GetAllBrand").then((res)=>{
    brandData.options.push(...res.data)

  })
  request.get("/warehouse-info-entity/selectAllWarehouseInfo").then(res=>{
    warehouseData.options.push(...res.data)
  })
  request.get("/storage-entity/selectAllStorage").then(res=>{
    storageData.storageList.push(...res.data)
  })
})

</script>
<style>
.el-dialog__body {
  padding: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

th {
  background-color: #f5f7fa;
  padding: 10px;
}

td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

tr:last-child td {
  border-bottom: none;
}
.green-btn {
  background-color: green;
  color: white;
}

.red-btn {
  background-color: red;
  color: white;
}

</style>
