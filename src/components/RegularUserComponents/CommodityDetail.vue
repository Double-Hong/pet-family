<template>
  <el-scrollbar>
  <div style="background-color: #ffdece">
    <el-card style="margin-bottom: 10px;height: 90px;" >
      <el-row class="shopDiv" style="margin-left: 80%;">
        <el-col class="shopDiv" style="position: absolute;left: -1000px;" @click="home">
            <img  style="height: 45px;float: left;margin-left:10%;margin-top: 0px;" src="/src/assets/logo.png" alt="">
            <img  style="height: 45px;float: left;margin-top: 0px" src="/src/assets//logoText.png" alt="">
        </el-col>
        <el-col class="shopDiv" :span="12" >
          <el-button round size="large" style="margin-left: -70%;margin-top: 10%;color: #ff5300;">进入店铺</el-button>
        </el-col>
        <el-col :span="12" >
          <div  class="shopDiv" style="margin-left: -120px;">
            <el-image :src="pageData.shopDetail.avatar" class="profilePicture"/>
            <div>
              <h2 style="font-size: 20px;color: black;font-family: 黑体,serif;margin-top: 15px;margin-left: 5px;">{{pageData.shopDetail.name}}</h2>
            </div>
          </div>
        </el-col>
      </el-row>
      <div>

      </div>
    </el-card>
    <el-card>
      <div class="parent">

        <div class="child1">
          <el-image :src="pageData.commodity.photo" class="image"></el-image>
        </div>
        <div class="child2">
          <h5 class="title">{{ pageData.commodity.name }}</h5>
          <el-text style="margin-top: 2%;margin-left: -85%;">已销售{{pageData.commodity.saleVolume}}+</el-text>
          <p style="color: #ff2a23;margin-left: -78%;margin-top: -10px;">超值优惠：￥<span style="font-size: 40px;">{{pageData.commodity.price}}</span></p>
          <el-form>
            <el-form-item class="quantity-item">
              <h4 class="quantity-label">数量：</h4>
              <el-input-number style="width: 12%;" v-model="buyNum" :min="0" :max="100" @click="handleAdd()" :disabled="inputNumberState" class="quantity-input"/>
           
            </el-form-item>
            <el-form-item class="total-price-item" prop="totalPrice" style="margin-top: -10px;">
              <h3 style="color: #ff2a23;">总价：￥{{totalprice}}</h3>
            </el-form-item>
            <el-form-item label="收货地址" class="address-item" prop="address">
              <el-select filterable
                         allow-create
                         v-model="orderInfo.address" class="address-select" placeholder="请选择你的收货地址" size="large">
                <el-option
                    v-for="item in addressList"
                    :key="item"
                    :label="item"
                    :value="item"
                >{{ item }}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item><el-button type="danger" round @click="buy">立即购买</el-button><el-button type="danger" round>加入购物车</el-button></el-form-item>
            <el-form-item>商品详情：{{pageData.commodity.introduce}}</el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <h2 style="margin-left: 3%">宝贝评价</h2>
        <el-divider style="color: #ffd0ba" />
      </div>
      <div v-for="item in pageData.shopComments" v-if="pageData.shopComments.length>0" class="commentsStyle">
        <h3>{{item.nickname}}</h3>
        <el-row>
          <el-col :span="4" class="timeStyle" ><el-text>{{item.time}}</el-text></el-col>
          <el-col :span="6"> <el-rate v-model="item.grade"  size="small"/></el-col>
        </el-row>
        <h4>{{item.commentsContent}}</h4>
        <el-image :src="item.commentsPhoto" class="commentsPhoto"></el-image>
        <el-divider style="color: #ffd0ba" />
      </div>
      <div v-else style="margin-left: 3%">
        <h3 style="color: #ffdece">该商品暂无评价！</h3>
      </div>
    </el-card>
  </div>
</el-scrollbar>
</template>

<script setup lang="ts">
import {useRegularStore} from "@/stores/RegularUser";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {ElMessage, FormRules} from "element-plus";

//数据
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
interface shop{
  id:number,
  name:string,
  introduce:string,
  merchantId:number,
  address:string,
  avatar:string,
  shopStatus:string,
}
interface comments{
  commentsId:number,
  commentsContent:string,
  commentsPhoto:string,
  orderId:number,
  commodityId:number,
  reply:string,
  name:string,
  time:string,
  regularName:string,
  nickname:string,
  grade:number,
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
interface userInfo{
  userId:number,
  addressId:number,
  linkman:string,
  linkmanPhone:number,
  detailAddress:string,
}
const pageData = reactive({
  commodity:{} as productDetail,
  shopDetail:{} as shop,
  shopComments:{} as comments[],
  userInfoList:[] as userInfo[],
})
const commotidyStorage = ref(0)
//商品id传参
const store = useRegularStore()
const commodityId = store.commodityId//当前商品的id
const userId = store.userId//用户id
const orderInfo = store.orderInfo//订单信息
const addressList: string[] = reactive([]);//当前用户的所有地址信息
//商品详情
const getCommotityInfo = () =>{
  // console.log(commodityId)
  axios.get("http://localhost:9090/commodity-entity/getById/"+commodityId).then(res=>{
    pageData.commodity=res.data.data
  })
}
const home =()=>{
  router.push("/regularusermain")
}
const getStorage = ()=>{
  console.log("商品id"+commodityId)
  axios.get("http://localhost:9090/storage-entity/getStorageById/"+commodityId).then(res=>{
    console.log("商品库存"+res.data.data)
    storage.value=res.data.data
    store.storage=res.data.data
  })
}
const buyNum = ref(0)
const totalprice= ref(0)
const storage = ref(0)

const inputNumberState = ref(false)//数字输入框状态
const handleAdd = () =>{
  totalprice.value=buyNum.value * pageData.commodity.price
  if(buyNum.value>=storage.value){
    
    ElMessage({
      message: '下单数超过当前库存！',
      type: 'error',
      showClose: true,
    })
    totalprice.value-=pageData.commodity.price
    inputNumberState.value=true
  }
}
const getUserInfo = () =>{
  axios.get("http://localhost:9090/userTotalInfoViewEntity/getUserInfoById/"+userId).then(res=>{
    pageData.userInfoList=res.data.data
    addressList.splice(0,addressList.length)
    for (const resKey of pageData.userInfoList) {
      addressList.push(resKey.detailAddress)
    }
  })
}
const getShop = () =>{
  axios.get("http://localhost:9090/shop-entity/getSHopInfo/"+store.shopId).then(res=>{
    if(res.data.code==200){
      pageData.shopDetail=res.data.data
      console.log(res.data.data)
    }
    else{
      console.log("获取失败！")
    }

  })
}

const getShopComments = () =>{
  getUserInfo()
  axios.get("http://localhost:9090/comments-order-form-entity/getCommentsOrder/"+commodityId).then(res=>{
    if(res.data.code==200){
      pageData.shopComments=res.data.data
      console.log(pageData.shopComments)
    }
  })
}


//钩子函数
onMounted(()=>{
  getCommotityInfo()
  getStorage()
  getShop()
  getShopComments()
  getUserInfo()
})

//购买商品
const buy = () =>{
  if(storage.value<=0)
  {
    ElMessage({
      message: '当前商品没有库存，请与商家联系！',
      type: 'error',
      showClose: true,
    })
  }
  else if(totalprice.value==0){
    // console.log(orderInfo.totalPrice+"ceShi")
    ElMessage({
      message: '请选择购买数量',
      type: 'error',
      showClose: true,
    })
  }
  else if(orderInfo.address==null){
    ElMessage({
      message: '请填入地址信息！',
      type: 'error',
      showClose: true,
    })
  }
  else{
    orderInfo.num=buyNum.value
    orderInfo.name=pageData.userInfoList[0].linkman
    orderInfo.phone=pageData.userInfoList[0].linkmanPhone
    orderInfo.totalPrice=totalprice.value
    router.push('/Order');
  }
}
</script>


<style scoped>
/*---------------------------顶部商家信息------------------------------*/
.profilePicture{
  width: 60px;
  height: 65px;
  border-radius: 50%;
}
.shopDiv{
  display: flex;
}
.shopLink{
  font-size: 20px;
  color: black;
  font-family: 黑体,serif;
  margin-left: 30px;
  margin-top: 15%;
}
/*----------------------商品信息css------------------------*/
.buttonContainer {
  display: inline-flex;
}

.buttonContainer > div {
  margin-right: 50px;
}

.buttonContainer > div:last-child {
  margin-right: 0;
}

.parent {
  display: flex;
  padding: 20px;
  background-color: #f5f5f5;
}

.child1 {
  width: 30%;
  padding-right: 20px;
}

.image {
  width: 100%;
  height: 80%;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.child2 {
  width: 70%;
}

.title {
  font-size: 24px;

  font-weight: bold;
  margin-left: -80%;
  margin-top: 3%;
  /*------设置上下内边距-------*/
  margin-block-start: 0.1em;
  margin-block-end: 0.2em;
}


/*------------------------返回按钮样式------------------------------*/
.back-button {
  display: flex;
  align-items: center;
}

.back-button i {
  margin-right: 5px;
}
/*--------------------------评价css--------------------------*/
.commentsPhoto{
  width: 10%;
  height: 10%; border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.commentsStyle{
  margin-left: 3%;
}
</style>