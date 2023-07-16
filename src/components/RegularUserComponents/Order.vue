<template>
  <el-button type="text" class="back-button" @click="router.go(-1)">
    <i class="el-icon-arrow-left"></i>
    返回
  </el-button>
  <el-form class="order-form"   ref="ruleFormRef" :rules="rules" :model="Order">
    <el-form-item>
      <h3 class="commodity-name">{{ pageData.commodity.name }}</h3>
    </el-form-item>
    <el-form-item label="联系人" prop="name">
     <el-input v-model="order.name" ></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="phone">
      <el-input v-model="order.phone"></el-input>
    </el-form-item>
    <el-form-item>
      <h3>单价：{{pageData.commodity.price}}（元）</h3>
    </el-form-item>
    <el-form-item class="quantity-item">
      <h4 class="quantity-label">数量：</h4>
      <el-input-number v-model="buyNum" :min="0" :max="100" @click="handleAdd()" :disabled="inputNumberState" class="quantity-input"/>
    </el-form-item>
    <el-form-item class="total-price-item" prop="totalPrice">
      <h4 class="total-price-label">总价：{{totalprice}}</h4>
    </el-form-item>
    <el-form-item label="收货地址" class="address-item" prop="address">
      <el-select filterable
                 allow-create
                 v-model="orderAddress" class="address-select" placeholder="请选择你的收货地址" size="large">
        <el-option
            v-for="item in addressList"
            :key="item"
            :label="item"
            :value="item"
        >{{ item }}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" size="large" @click="handleSubmit()" class="submit-button">
        提交订单
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import {useRegularStore} from "@/stores/RegularUser";
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import router from "@/router";
import type { FormInstance, FormRules } from 'element-plus'
import {useUserStore} from "@/stores/UserStore";
// import { RuleObject } from 'ant-design-vue/es/form/interface';
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

}const formSize = ref('default')
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
const orderAddress = ref("")
const addressList: string[] = reactive([]);
const pageData = reactive({
  commodity:{} as productDetail,
  userInfoList:[] as userInfo[],
})
const buyNum = ref(0)
const totalprice = ref(0)
const orderTime = ref()
const inputNumberState = ref(false)
const store = useRegularStore()
const userId = useUserStore().getRegularUserInfo().regularUserId
const commodityId = store.commodityId
const storage = store.storage
//获取商品信息
const getCommotityInfo = () =>{
  // console.log(commodityId)
  axios.get("http://localhost:9090/commodity-entity/getById/"+commodityId).then(res=>{
    pageData.commodity=res.data.data
    console.log(pageData.commodity)
  })
}
const orderGoods = reactive({

})
const getUserInfo = () =>{
  axios.get("http://localhost:9090/userTotalInfoViewEntity/getUserInfoById/"+userId).then(res=>{
    pageData.userInfoList=res.data.data
    console.log(pageData.userInfoList)
    // console.log(pageData.userInfoList[0])
    for (const resKey of pageData.userInfoList) {
      addressList.push(resKey.detailAddress)
       // console.log(addressList)
    }
    // console.log(storage)
  })
}
//下单
const handleSubmit = () =>{
  //生成未付款订单
  order.time=orderTime.value
 // order.name=pageData.userInfoList[0].linkman
  order.id=0
  order.personId=pageData.userInfoList[0].userId
  order.address=orderAddress.value
  order.totalPrice=totalprice.value
  order.state="未付款"
  console.log(order.totalPrice)
  // console.log(order.address+"1231231")
  if(order.totalPrice>0){
    axios.post("http://localhost:9090/order-form-entity/submitOrder",order).then(res=>{
      if (res.data.message === "success") {
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
  else{
    ElMessage({
      message: '错误！',
      type: 'error',
      showClose: true,
    })
  }


}
//处理购买数量及总价
const handleAdd = () =>{
  totalprice.value=buyNum.value * pageData.commodity.price
  if(buyNum.value>=storage){
    ElMessage({
      message: '下单数超过当前库存！',
      type: 'error',
      showClose: true,
    })
    totalprice.value-=pageData.commodity.price
    inputNumberState.value=true
  }
}
const getNowTime = () =>{
  const currentDate = new Date();
  orderTime.value = currentDate
}

const gotopage = () => {
  // console.log(store.contentVisible)
  router.push('/adminIstratornfo');
};
onMounted(()=>{
  console.log(useUserStore().getRegularUserInfo())
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
</style>