<template >
  <div style="padding: 10px" >
    <div class="demo-date-picker">
      <div class="container">
        <div class="block">
          <!--              <el-input style="width: 300px" placeholder="请输入状态" v-model="value2" clearable></el-input>-->
          <!--              <el-button type="primary" @click="searchtime" style="margin-left: 5px">查询数据</el-button>-->
          <el-date-picker
              v-model="value2"
              format="YYYY-MM"
              value-format="YYYY-MM"
              type="month"
              placeholder="Pick a month"
          />
          <el-button type="primary" @click="searchtime(value2)" style="margin-left: 5px">查询数据</el-button>
          <el-button type="primary" @click="searchall" style="margin-left: 5px">全部</el-button>
          <el-button type="primary" @click="search1" style="margin-left: 5px">待付款</el-button>
          <el-button type="primary" @click="search2" style="margin-left: 5px">待发货</el-button>
          <el-button type="primary" @click="search3" style="margin-left: 5px">待收货</el-button>
          <!--          <el-button type="primary" @click="search4" style="margin-left: 5px">待评价</el-button>-->
        </div>
      </div>
    </div>

<!--    <div class="card-container" style="overflow: scroll">-->
      <div v-for="(data, index) in tableData.filterData" :key="index" >
        <div class="card">
          <div class="card-header">
            <!--            <el-button @click="showOrder(data.list,data.orderFormEntity.id)" class="details-btn">订单详情</el-button>-->
            <el-button @click="showList(data.orderFormEntity, data.orderFormEntity.id)" class="details-btn">收货信息</el-button>
          </div>
          <div class="card-body">
            <template v-for="(data1, index1) in data.list" :key="index1">
              <!--              <template v-if="index1 < 2">-->
              <!-- 限制只显示两个data1的信息 -->
              <div class="card-header"><el-icon><Shop /></el-icon>{{ data1.shopName }}</div>
              <div class="product-container">
                <img :src="data1.photo" alt="product photo" width="100">
                <div class="product-info">
                  <div class="item">
                    <label>商品名：</label>
                    <div>{{ data1.name }}</div>
                  </div>
                  <div class="item">
                    <label>数量：</label>
                    <div>{{ data1.orderGoodsEntity.num }}</div>
                  </div>
                  <div class="item">
                    <label>总价格：</label>
                    <div>{{ data1.orderGoodsEntity.totalPrice }}</div>
                  </div>
                  <label>状态：</label>
                  <div v-if="data.orderFormEntity.state === '待付款'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '已付款'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '已发货'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '已退款'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '申请退款'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '已完成'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '已收货' & data1.orderGoodsEntity.state === null">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data.orderFormEntity.state === '已收货'&& data1.orderGoodsEntity.state === '已评价'">{{ data.orderFormEntity.state }}</div>
                  <div v-else-if="data1.orderGoodsEntity.state === '待评价'">{{ data1.orderGoodsEntity.state }}
                    <el-button @click="appraise(data.orderFormEntity, data1)" class="confirm-btn red-btn">去评价</el-button>
                  </div>
                </div>
              </div>
              <!--              </template>-->
            </template>
            <div class="car d-footer">
              <template v-if="data.orderFormEntity.state === '待付款'">
                <el-button @click="payment(data.orderFormEntity)" class="confirm-btn green-btn">去付款</el-button>
              </template>
              <template v-if="data.orderFormEntity.state === '已付款'">
                <el-button @click="requestRefund(data.orderFormEntity)" class="confirm-btn red-btn">申请退款</el-button>
              </template>
              <template v-else-if="data.orderFormEntity.state === '已发货'">
                <el-button @click="confirmReceipt(data.orderFormEntity)" class="confirm-btn green-btn">确认收货</el-button>
              </template>
            </div>
          </div>
        </div>
      </div>
<!--    </div>-->

    <!--收货信息窗口-->
    <el-dialog v-model="showDialog" title="收货详情" width="70%">
      <table style="width: 100%">
        <thead>
        <tr>
          <th style="width: 8%">订单编号</th>
          <th style="width: 8%">用户名</th>
          <th style="width: 17%">时间</th>
          <th style="width: 18%">地址</th>
          <th style="width: 10%">电话</th>
        </tr>
        </thead>
        <tbody>
        <td style="width: 8%">{{ form.id }}</td>
        <td style="width: 8%">{{ form.name }}</td>
        <td style="width: 17%">{{ form.time }}</td>
        <td style="width: 18%">{{ form.address }}</td>
        <td style="width: 10%">{{ form.phone }}</td>
        </tbody>
      </table>
    </el-dialog>
    <!--评价窗口-->
    <el-dialog v-model="dialogFormVisible" title="评价" width="40%">
      <el-form :model="form.form1" label-width="100px" style="padding-right: 30px">
        <div class="review-window">
          <div>
            <label style="color: #333;">星级打分:</label>
            <el-rate v-model="rating" :max="5" :allow-half="false" show-score
                     :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </div>
          <div>
            <el-icon><Message /></el-icon>
            <label for="comment" style="color: #333;">评论:</label>
            <textarea v-model="comment" style="width: 400px;"></textarea>
          </div>
          <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :http-request="oss"
              :limit="1"
          >
            <label style="color: #333;">上传图片(点这里)</label>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500KB.
              </div>
            </template>
          </el-upload>
        </div>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="save(form)">确认</el-button>
    </span>
      </template>
    </el-dialog>


  </div>
</template>

<script lang="ts" setup>
import axios, {request} from "axios";
import { reactive, ref} from "vue";
import type {UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";
import {useUserStore} from "@/stores/UserStore";


const value2 = ref('')
const dialogFormVisible = ref(false)
let form1 =reactive({});
const formid= ref(0)
let form = reactive({form1,formid})
const showDialog = ref(false)
const showOrderDialog = ref(false)

const regularId = useUserStore().getRegularUserInfo().regularUserId

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
let data2 = reactive({
  commentsId:0,
  commentsContent:'',
  commentsPhoto:'',
  orderId:0,
  commodityId:0,
  reply:'',
  grade:0
})

// 待付款 跳转到付款页面
const payment = (data) =>{
  // 跳转到付款页面
  // axios.get('http://localhost:9090/order-form-entity/pass/'+data.id, form.form1)
  //     .then(response => {
  //       // 处理响应
  //       console.log('去付款');
  //     })
  //展示的数据
  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0,tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
  })
}

// 确认收货
const confirmReceipt = (data) =>{
  axios.get('http://localhost:9090/order-form-entity/pass/'+data.id, form.form1)
      .then(response => {
        // 处理响应
        console.log('收货成功');
      })
  //展示的数据
  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0,tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
  })
}

// 去评价 data.id是订单id data1.commodityId是商品id
const appraise = (data,date1) =>{
  form.formid = date1.orderGoodsEntity.id;
  console.log('form.formid:',form.formid);
  previewImage = ref(null);
  comment = ref('');
  data2.orderId=data.id;
  data2.commodityId=date1.orderGoodsEntity.commodityId;
  const newObj = Object.assign({}, data2)
  form.form1 = reactive(newObj)
  dialogFormVisible.value = true
}
// 去评价 data.id是订单id data1.commodityId是商品id
const requestRefund = (data) =>{
  console.log(data.id);
  axios.get('http://localhost:9090/order-form-entity/requestRefund/'+data.id)
      .then(response => {
        // 处理响应
        console.log('保存成功');
        dialogFormVisible.value = false; // 关闭弹窗
      })

  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0,tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
    // console.log(tableData.filterData)
  })
}

// 去评价的保存按钮
const save = (data) => {
  data.form1.commentsPhoto = data2.commentsPhoto;
  data.form1.commentsContent = comment.value;
  data.form1.grade = rating.value;
  console.log(data.form1)
  // console.log(data.formid)
  axios.post('http://localhost:9090/comments-entity/addComments',data.form1)
      .then(response => {
        // 处理响应
        console.log('保存成功');
        dialogFormVisible.value = false; // 关闭弹窗
      })

  axios.get('http://localhost:9090/order-goods-entity/pass/'+data.formid)
      .then(response => {
        // 处理响应
        console.log('保存成功');
        dialogFormVisible.value = false; // 关闭弹窗
      })

  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0,tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
    // console.log(tableData.filterData)
  })
}

// 展示收货人信息
const showList = (data,id) => {
  const newObj = Object.assign({}, data)
  form = reactive(newObj)
  console.log(form)
  // 显示弹窗
  showDialog.value = true
  console.log(form)
}

// const showOrder = (data,id) => {
//   const newObj = Object.assign({}, data)
//   form = reactive(newObj)
//   console.log(form)
//   // 显示弹窗
//   showOrderDialog.value = true
//   console.log(data)
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

// 查询全部
const searchall = () => {
  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData.filterData.splice(0,tableData.filterData.length)
    tableData.filterData.push(...res.data.data)
  })
  //保存的数据
  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData1.filterData.splice(0,tableData1.filterData.length)
    tableData1.filterData.push(...res.data.data)
  })

// 搜索后保存的数据
  axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
    tableData2.filterData.splice(0,tableData2.filterData.length)
    tableData2.filterData.push(...res.data.data)
  })
};

// 根据时间查询
const searchtime = (val:string) => {
  let filteredData = tableData1.filterData;
  if (value2.value != null) {
    filteredData = filteredData.filter((data) => {
      return data.orderFormEntity.time.includes(value2.value);
    });
  }
  console.log('filterdata:' ,filteredData);
  // tableData.filterData = tableData1.filterData;
  tableData.filterData = filteredData;
  tableData2.filterData = filteredData;
};

let tableData1 = reactive({
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

let tableData2 = reactive({
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

// 查询未付款订单
const search1 = () => {
  // console.log('已完成',tableData2.filterData);
  let filteredData = tableData2.filterData;
  filteredData = filteredData.filter((data: OrderData) => {
    return data.orderFormEntity.state.includes('待付款')
  })
  tableData.filterData = filteredData
};

// 查询已付款未发货订单
const search2 = () => {
  let filteredData = tableData2.filterData;
  filteredData = filteredData.filter((data: OrderData) => {
    return data.orderFormEntity.state.includes('已付款')
  })
  tableData.filterData = filteredData
};

// 查询已发货未收货订单
const search3 = () => {
  console.log('已发货',tableData2.filterData)
  let filteredData = tableData2.filterData;
  filteredData = filteredData.filter((data: OrderData) => {
    return data.orderFormEntity.state.includes('已发货')
  })
  tableData.filterData = filteredData
};


//查询已收货待评价订单
// const search4 = () => {
//   let filteredData = tableData2.filterData;
//   filteredData = filteredData.filter((data: OrderData) => {
//     return data.orderFormEntity.state.includes('待评价')
//   })
//   tableData.filterData = filteredData
// };

//展示的数据
axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData.filterData.splice(0,tableData.filterData.length)
  tableData.filterData.push(...res.data.data)
  console.log(tableData)
})

// 删除半小时未支付的订单
axios.get("http://localhost:9090/order-form-entity/deleteHalfUnpaidOrder/"+regularId).then(res => {
})


//保存的数据
axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData1.filterData.splice(0,tableData1.filterData.length)
  tableData1.filterData.push(...res.data.data)
})

// 搜索后保存的数据
axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData2.filterData.splice(0,tableData2.filterData.length)
  tableData2.filterData.push(...res.data.data)
})

// 搜索后保存的数据
axios.get("http://localhost:9090/order-form-entity/viewOrder/"+regularId).then(res => { //此处的1为店铺id，后面需要改,端口名也需改为9090
  tableData2.filterData.splice(0,tableData2.filterData.length)
  tableData2.filterData.push(...res.data.data)
})

// 星级
let rating = ref(5);
// 评论
let comment = ref('');
// 预览图片
let previewImage = ref(null);

// 上传图片后触发
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file.name)
  data2.commentsPhoto='D:\\86132\\Pictures\\'+file.name;
  console.log(data2.commentsPhoto);
  // 生成预览图片的URL
  previewImage.value = URL.createObjectURL(file);
  console.log(previewImage.value)
};

const fileList = ref<UploadUserFile[]>([])

const  oss = (file:any) => {
  const aliName = data2.orderId+'-'+data2.commodityId+'.jpg'
  client.put('/'+aliName,file.file).then((res:any)=>{
    data2.commentsPhoto=res.url;
    console.log(data2.commentsPhoto);
  })
}

</script>

<style>

.card {
  width: 1480px; /* 固定卡片宽度 */
//height: 420px; /* 固定卡片高度 */
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  float: left; /* 设置为左浮动 */
}


/* 按钮样式和颜色定义 */
.details-btn {
  background-color: #009688;
  color: #fff;
}

.confirm-btn.green-btn {
  background-color: #4caf50;
  color: #fff;
}

.confirm-btn.red-btn {
  background-color: #ff5722;
  color: #fff;
}
table.custom-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

table.custom-table th {
  background-color: #f5f7fa;
  padding: 10px;
}

table.custom-table td {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

table.custom-table tr:last-child td {
  border-bottom: none;
}

div.btn-group {
  display: flex;
  justify-content: space-between;
}

.custom-table .details-btn {
  background-color: #409EFF;
  color: #fff;
}

.custom-table .confirm-btn {
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
}

.custom-table .green-btn {
  background-color: #67C23A;
}

.custom-table .red-btn {
  background-color: #F56C6C;
}

.green-btn {
  background-color: green;
  color: white;
}

.red-btn {
  background-color: red;
  color: white;
}
.product-container {
  display: flex;
  align-items: center;
}

.product-info {
  display: flex;
  align-items: center;
  margin-left: 10px; /* 可根据需要调整左边距 */
}

.item {
  display: flex;
  align-items: center;
  margin-right: 100px; /* 可根据需要调整右边距 */
}

.item label {
  margin-right: 10px; /* 可根据需要调整标签与文本的间距 */
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

</style>