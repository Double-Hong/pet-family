<template>

  <div style="padding: 10px">
    <!--    <h2>销售额：{{ totalPrice }} 订单总量：{{ totalNum }}</h2>-->
    <!--    <el-input style="width: 300px" placeholder="请输入状态" v-model="state" clearable></el-input>-->
    <!--    <el-button type="primary" @click="search(state)" style="margin-left: 5px">查询数据</el-button>-->
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
          <el-button type="primary" @click="searchnow" style="margin-left: 5px">已付款</el-button>
          <el-button type="primary" @click="searchpre" style="margin-left: 5px">申请退款</el-button>
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
              <el-button link type="primary" size="small" @click="handleEdit(data.orderFormEntity,id)" class="edit-btn">
                编辑
              </el-button>
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

    <el-dialog v-model="showDialog" title="订单详情" width="70%">
      <table style="width: 100%">
        <thead>
        <tr>
          <th style="width: 30%">商品ID</th>
          <th style="width: 30%">商品名字</th>
          <th style="width: 30%">图片</th>
          <th style="width: 30%">数量</th>
          <th>总价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data, id) in form" :key="id">
          <td>{{ data.orderGoodsEntity.id }}</td>
          <td>{{ data.name }}</td>
          <el-image :src="data.photo" alt="product photo" width="100"/>
          <td>{{ data.orderGoodsEntity.num }}</td>
          <td>{{ data.orderGoodsEntity.totalPrice }}</td>
        </tr>
        </tbody>
      </table>
    </el-dialog>

  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {reactive, ref} from "vue";
import {useUserStore} from "@/stores/UserStore";

const value2 = ref('')
const dialogFormVisible = ref(false)
let form = reactive({})
const globalIndex = ref(-1)   // 全局保存的编辑的行号
const showDialog = ref(false)
const merchantId = useUserStore().getMerchantUserInfo().merchantUserId
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
      name: 'ran',
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


const confirmDelivery = (data) => {
  axios.get('http://localhost:9090/order-form-entity/passDeliver/' + data.id, form)
      .then(response => {
        // 处理响应
        console.log('发货成功');
      })
}
const confirmRefund = (data) => {
  axios.get('http://localhost:9090/order-form-entity/passRet/' + data.id, form)
  console.log('退款成功');
}

// 保存数据，把数据插入到 tableData里面，并刷新页面数据，弹窗关闭
const save = (data) => {
  axios.post('http://localhost:9090/order-form-entity/updateOrder/' + data.id, form)
      .then(response => {
        // 处理响应
        console.log('保存成功');
        dialogFormVisible.value = false; // 关闭弹窗
      })
  axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0, tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
    console.log(tableData.filterData)
  })
}

// 编辑数据，先赋值到表单 再打开弹窗
const handleEdit = (data, id) => {
  const newObj = Object.assign({}, data)
  form = reactive(newObj)
  globalIndex.value = id  // 把当前编辑的行号赋值给全局的保存的编辑的行号
  dialogFormVisible.value = true
}

const showList = (data, id) => {
  const newObj = Object.assign({}, data)
  form = reactive(newObj)
  console.log("photo")
  console.log(form)
  // 显示弹窗
  showDialog.value = true
  console.log(data)
}

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

const searchall = () => {
  axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0, tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
  })
};

const searchtime = (val: string) => {
  let filteredData = tableData1.filterData;
  if (value2.value != null) {
    filteredData = filteredData.filter((data) => {
      return data.orderFormEntity.time.includes(value2.value);
    });
  }
  console.log('filterdata:', filteredData);
  // tableData.filterData = tableData1.filterData;
  tableData.filterData = filteredData;
  tableData2.filterData = filteredData;
};

let tableData1 = reactive({
  filterData: [{
    orderFormEntity: {
      id: '0',
      name: 'ran',
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

let tableData2 = reactive({
  filterData: [{
    orderFormEntity: {
      id: '0',
      name: 'ran',
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

const searchnow = () => {

  let filteredData = tableData2.filterData;
  filteredData = filteredData.filter((data: OrderData) => {
    return data.orderFormEntity.state.includes('已付款')
  })
  tableData.filterData = filteredData

};

const searchpre = () => {

  let filteredData = tableData2.filterData;
  filteredData = filteredData.filter((data: OrderData) => {
    return data.orderFormEntity.state.includes('申请退款')
  })
  tableData.filterData = filteredData
};


axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData.filterData.splice(0, tableData.filterData.length)
  tableData.filterData.push(...res.data.data)
  console.log(tableData.filterData)
})

axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData1.filterData.splice(0, tableData1.filterData.length)
  tableData1.filterData.push(...res.data.data)
  console.log(tableData1.filterData)
})

axios.get("http://localhost:9090/order-form-entity/listOrder/"+props.nowShop).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData2.filterData.splice(0, tableData2.filterData.length)
  tableData2.filterData.push(...res.data.data)
  console.log(tableData1.filterData)
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