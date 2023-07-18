<template>
  <el-card style="margin-bottom: 2%">
    <el-button type="text" class="back-button" @click="router.go(-1)">
      <el-icon><Back /></el-icon>
      返回
    </el-button>
    <el-steps :active="stepState" align-center>
      <el-step title="Step 1" description="核对订单详情" />
      <el-step title="Step 2" description="支付" />
      <el-step title="Step 3" description="支付完成" />
    </el-steps>
  </el-card>
  <el-card v-if="show1">
    <el-form class="order-form"   ref="ruleFormRef" :rules="rules" :model="oldOrder">
      <!--    <el-form-item>-->
      <!--      <h3 class="commodity-name">{{ pageData.commodity.name }}</h3>-->
      <!--    </el-form-item>-->
      <el-form-item label="联系人" prop="name">
        <el-input v-model="oldOrder.name" ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="oldOrder.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <h3>单价：{{pageData.commodity.price}}（元）</h3>
      </el-form-item>
      <el-form-item class="quantity-item">
        <h4 class="quantity-label">数量：</h4>
        <el-input-number v-model="oldOrder.num" :min="0" :max="100" @click="handleAdd()" :disabled="inputNumberState" class="quantity-input"/>
      </el-form-item>
      <el-form-item class="total-price-item" prop="totalPrice">
        <h3 class="total-price-label">总价：{{oldOrder.totalPrice}}（元）</h3>
      </el-form-item>
      <el-form-item label="收货地址" class="address-item" prop="address">
        <el-select filterable
                   allow-create
                   v-model="oldOrder.address" class="address-select" placeholder="请选择你的收货地址" size="large">
          <el-option
              v-for="item in addressList"
              :key="item"
              :label="item"
              :value="item"
          >{{ item }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="showPayVue">
        <div class="text-button-container">
          <div class="text-container">
            <el-text class="order-pay-text1">订单将在后</el-text>
            <span class="countdown-text"><el-countdown @finish="onCountdownFinish"  :value="countDown" ref="countdownRef" class="custom-countdown"/></span>
            <el-text class="order-pay-text2">自动取消！</el-text>
          </div>
          <div class="button-container">
            <el-button type="danger" @click="gotoPay" size="large">去支付</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-else>
        <el-button type="danger" size="large" @click="handleSubmit()" class="submit-button">
          提交订单
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>

<!--  支付功能界面-->
  <el-card v-if="show2">
    <el-row>
      <el-col :span="2"></el-col>
       <el-col :span="4"><h4>商品</h4></el-col>
       <el-col :span="4"><h4>单价（元）</h4></el-col>
       <el-col :span="4"><h4>数量</h4></el-col>
       <el-col :span="5"><h4>小计（元）</h4></el-col>
       <el-col :span="5"><h4>操作</h4></el-col>
       <el-divider />
    </el-row>
      <div style="display: flex; align-items: center; justify-content: center;">
<!--        <el-divider direction="vertical" />-->
        <el-col :span="2"></el-col>
        <el-col :span="4"><div>
          <el-image :src="pageData.commodity.photo" class="payPicture"></el-image>
          <h4 class="fontStyle">{{pageData.commodity.name}}</h4>
        </div></el-col>
        <el-col :span="4"> <el-text class="mx-1" type="danger" size="large">{{pageData.commodity.price}}</el-text></el-col>
        <el-col :span="4"> {{oldOrder.num}}</el-col>
        <el-col :span="5"> <el-text size="large" class="mx-1" type="danger">{{oldOrder.totalPrice}}</el-text></el-col>
        <el-col :span="5"><div @click="dialogVisible = true">
          <el-button size="large" type="danger" @click="open">结算</el-button>
        </div></el-col>
      </div>

  </el-card>

<!--  支付完成界面-->
  <el-card v-if="show3">
    <el-result
        icon="success"
        title="支付成功！"
        sub-title="再逛逛其他宝贝吧！"
    >
      <template #extra>
        <el-button type="success" @click="returnShowYe" >Back</el-button>
      </template>
    </el-result>
<!--    <el-text class="linksStyle" type="success">您已购买成功，再逛逛其他宝贝吧！</el-text>-->
<!--    <div>-->
<!--      <el-link class="linksStyle2" type="success">回到首页</el-link>-->
<!--    </div>-->
  </el-card>
</template>
<script setup lang="ts">
import {useRegularStore} from "@/stores/RegularUser";
import axios from "axios";
import {computed, onMounted, reactive, ref, watch, watchEffect} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import type { FormInstance, FormRules } from 'element-plus'
interface userInfo{
  userId:number,
  addressId:number,
  linkman:string,
  linkmanPhone:number,
  detailAddress:string,
}
interface productDetail{
  id:number,
  name:string,
  photo:string,
  introduce:string,
  price:number,
  brandId:number,
  saleVolume:number,
  typeId:number,
}
interface Order{
  id:number,
  time:string,
  totalPrice:number,
  address:string,
  name:string,
  phone:string,
  personId:number,
  state:string,

}
const ruleFormRef = ref<FormInstance>()

const order = reactive<Order>({
  id:0,
  time:'',
  address:"",
  totalPrice:0,
  name:"",
  state:"",
  personId:0,
  phone:"",
})

//表单验证
const rules = reactive<FormRules<Order>>({
  name: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 15', trigger: 'blur' },
  ],
  phone:[
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' },
  ],
  address:[
    { required: true, message: '请输入地址信息', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 15', trigger: 'blur' },
  ]
})
const addressList: string[] = reactive([]);//当前用户的所有地址信息
const pageData = reactive({
  commodity:{} as productDetail,
  userInfoList:[] as userInfo[],
  showPayTable:{} as ShowPayTable,
})
const buyNum = ref(0)//购买数量
const orderTime = ref('')//下单时间
const inputNumberState = ref(false)//数字输入框状态
const store = useRegularStore()
const userId = 12121
const commodityId = store.commodityId//商品id
const storage = store.storage//商品库存
const orderId = ref()//订单id
const showPayVue = ref(false)
const countDown = ref(Date.now() + 1000 * 60 * 30)//倒计时
const oldOrder = store.orderInfo
const stepState = ref(1)
//获取商品信息
const getCommotityInfo = () =>{
  // console.log(commodityId)
  axios.get("http://localhost:9090/commodity-entity/getById/"+commodityId).then(res=>{
    pageData.commodity=res.data.data
    console.log(pageData.commodity)
  })
}
const orderGoods = reactive({
  id:0,
  orderId:0,
  commodityId:0,
  num:0,
  totalPrice:0,
})
interface ShowPayTable{
  photo:string,
  name:string,
  price:number,
  num:number,
  totalPrice:number,
}

const getUserInfo = () =>{
  axios.get("http://localhost:9090/userTotalInfoViewEntity/getUserInfoById/"+userId).then(res=>{
    pageData.userInfoList=res.data.data
    // console.log(pageData.userInfoList[0])
    for (const resKey of pageData.userInfoList) {
      addressList.push(resKey.detailAddress)
       // console.log(addressList)
    }
    console.log(storage)
  })
}
//下单
const handleSubmit = () => {
  //生成未付款订单
  order.time = orderTime.value
  order.id = 0
  order.personId = pageData.userInfoList[0].userId
  order.totalPrice = oldOrder.totalPrice
  order.state = "待付款"
  order.name=oldOrder.name
  order.address=oldOrder.address
  order.phone= oldOrder.phone
  if (order.totalPrice > 0) {
    axios.post("http://localhost:9090/order-form-entity/submitOrder", order).then(res => {
      if (res.data.message === "success") {
        orderId.value = res.data.data

        //处理后续修改库存及添加orderGoods
        orderGoods.orderId = orderId.value
        orderGoods.totalPrice =oldOrder.totalPrice
        orderGoods.num = oldOrder.num
        orderGoods.commodityId = commodityId
        axios.post("http://localhost:9090/order-goods-entity/addOrderGoods", orderGoods).then(res => {
          if (res.data.code === 200) {
            axios.post("http://localhost:9090/storage-entity/cutStorage", orderGoods).then(res => {
              if (res.data.code == 200) {
                oldOrder.id=orderId.value
                showPayVue.value = true//展示支付功能
                ElMessage({
                  message: '下单成功！',
                  type: 'success',
                  showClose: true,
                })
              } else {
                ElMessage({
                  message: '下单失败！',
                  type: 'error',
                  showClose: true,
                })
              }
            })
          }
        })

      }
    })
  } else {
    ElMessage({
      message: '错误！',
      type: 'error',
      showClose: true,
    })
  }
}
const onCountdownFinish = () =>{
  cancelOrder()
}
const cancelOrder = ()=>{
    axios.get("http://localhost:9090/order-goods-entity/deleteOrderGoods/"+orderId.value).then(res=>{
      if(res.data.code==200){
        axios.get("http://localhost:9090/order-form-entity/deleteOrder/"+orderId.value).then(res=>{
          if(res.data.code==200){
            orderGoods.orderId=orderId.value
            orderGoods.totalPrice=oldOrder.totalPrice
            orderGoods.num=oldOrder.num
            orderGoods.commodityId=commodityId
            axios.post("http://localhost:9090/storage-entity/addStorageHdl",orderGoods).then(res=>{
              if(res.data.code==200){
                ElMessage({
                      message: '订单已取消！',
                      type: 'success',
                      showClose: true,
                    }
                )
              }else{
                ElMessage({
                      message: '订单未取消，增加库存失败！',
                      type: 'error',
                      showClose: true,
                    }
                )
              }
            })
          }
          else{
            ElMessage({
                  message: '订单未取消，删除orderGoods失败！',
                  type: 'error',
                  showClose: true,
                }
            )
          }
        })
      }
      else{
        ElMessage({
              message: '订单未取消，删除订单失败！',
              type: 'error',
              showClose: true,
            }
        )
      }
    })
}

//处理购买数量及总价
const handleAdd = () =>{
  oldOrder.totalPrice=oldOrder.num * pageData.commodity.price
  if(oldOrder.num>=storage){
    ElMessage({
      message: '下单数超过当前库存！',
      type: 'error',
      showClose: true,
    })
    oldOrder.totalPrice-=pageData.commodity.price
    inputNumberState.value=true
  }
}
const getNowTime = () =>{
  const currentDate = new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  console.log(currentDate+"现在时间")
  orderTime.value = currentDate;
}
const gotoPay = ()=>{
  pageData.showPayTable.price=pageData.commodity.price
  pageData.showPayTable.photo=pageData.commodity.photo
  pageData.showPayTable.name=pageData.commodity.name
  pageData.showPayTable.num=oldOrder.num
  pageData.showPayTable.totalPrice=oldOrder.totalPrice
  console.log()
  stepState.value=2
  show2.value=true
  show1.value=false
}

const show1 = ref(true)
const show2 = ref(false)
const show3 = ref(false)
const dialogVisible = ref(false)

const changeState = () =>{
  dialogVisible.value = false
  axios.get("http://localhost:9090/order-form-entity/payment/"+store.orderInfo.id).then(res=>{
    if(res.data.code==200){
      stepState.value=3
      ElMessage({
        type: 'success',
        message: '支付成功！',
      })
      show2.value=false
      show3.value=true
    }
    else{
      ElMessage({
        type: 'error',
        message: '支付失败！',
      })
    }
  })
}
const open = () => {
  ElMessageBox.confirm(
      '是否确认支付?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  )
      .then(() => {
        changeState()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
}
const returnShowYe = () =>{
  router.push('/regularUserMain')
}
onMounted(()=>{
  getCommotityInfo()
  getUserInfo()
  getNowTime()
})


</script>


<style scoped>
/* ----------------------表单样式   --------------------*/
.order-form {
  max-width: 400px;
  margin: 0 auto;
}

.commodity-name {
  font-size: 20px;
  margin-bottom: 10px;
}

.quantity-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-label {
  margin-right: 10px;
  font-size: 16px;
}

.quantity-input {
  width: 100px;
}

.total-price-item {
  margin-bottom: 10px;
}

.total-price-label {
  font-size: 16px;
}

.address-item {
  margin-bottom: 10px;
}

/* ----------------------------------提交按钮样式  --------------------------------*/
.submit-button {
  width: 100%;
}

/* -----------------------------------返回按钮样式--------------------------- */
.back-button {
  display: flex;
  align-items: center;
}

.back-button i {
  margin-right: 5px;
}
/*--------------------------------跳转支付div样式--------------------------*/
.text-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
}
.order-pay-text1{
  margin-right: 10px;
}
.order-pay-text2{
  margin-left: 10px;
}
.countdown-text {
  color: red;
}
/*------------------------------支付完成界面-----------------------*/

.payButton{
  margin-left: 78%;
}
.payPicture{
  width: 30%;
  height: 100%;
}
.fontStyle{
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
}
</style>