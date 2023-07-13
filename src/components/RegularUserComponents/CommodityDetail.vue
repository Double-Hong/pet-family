<template>
  <el-button type="text" class="back-button" @click="router.go(-1)">
    <i class="el-icon-arrow-left"></i>
    返回
  </el-button>
  <div class="parent">
    <div class="child1">
      <el-image :src="pageData.commodity.photo" class="image"></el-image>
    </div>
    <div class="child2">
      <h5 class="title">{{ pageData.commodity.name }}</h5>
      <div class="details">
        <div class="info">
          <span>单价：</span>
          <span class="price">{{ pageData.commodity.price }}（元）</span>
        </div>
        <div class="info">
          <span>销量：</span>
          <span class="sale">{{ pageData.commodity.saleVolume }}（个）</span>
        </div>
        <div class="info">
          <span>库存：</span>
          <span class="sale"> {{store.storage}}（个）</span>
        </div>
        <div class="info">
          <span>商品详情：</span>
          <p class="introduce">{{ pageData.commodity.introduce }}</p>
        </div>
        <div class="buttonContainer">
          <div class="button1">
            <el-button type="danger" @click="buy">立即购买</el-button>
          </div>
          <div class="button2">
            <el-button type="danger" @click="addShoppingCar">加入购物车</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRegularStore} from "@/stores/RegularUser";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import router from "@/router";
import {ElMessage} from "element-plus";

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
const pageData = reactive({
  commodity:{} as productDetail,
})
const commotidyStorage = ref(0)
//商品id传参
const store = useRegularStore()
const commodityId = store.commodityId

//商品详情
const getCommotityInfo = () =>{
  // console.log(commodityId)
  axios.get("http://localhost:9090/commodity-entity/getById/"+commodityId).then(res=>{
    pageData.commodity=res.data.data
  })
}
const getStorage = ()=>{
  axios.get("http://localhost:9090/storage-entity/getStorageById/"+commodityId).then(res=>{
    // console.log(res.data.data)
    commotidyStorage.value=res.data.data
    store.storage=res.data.data
  })
}
//钩子函数
onMounted(()=>{
  getCommotityInfo()
  getStorage()
})

//购买商品
const buy = () =>{
  if(commotidyStorage.value<=0)
  {
    ElMessage({
      message: '当前商品没有库存，请与商家联系',
      type: 'warning'
    });
  }
  else{
    router.push('/order');
  }
}
//加入购物车
const addShoppingCar = () =>{
  router.push('/CommodityDetail');
}
</script>


<style scoped>
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
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
}

.child1 {
  width: 30%;
  padding-right: 20px;
}

.image {
  width: 100%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.child2 {
  width: 70%;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
}

.details {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.info {
  margin-bottom: 10px;
  margin-top: 10px;
}

.price {
  color: #ff5555;
  font-size: 16px;
  margin-top: 10px;
}

.sale {
  color: #55aa55;
  font-size: 16px;
  margin-top: 10px;
}

.introduce {
  font-style: italic;
  line-height: 1.5;
  margin-top: 10px;
}

/*------------------------返回按钮样式------------------------------*/
.back-button {
  display: flex;
  align-items: center;
}

.back-button i {
  margin-right: 5px;
}
</style>