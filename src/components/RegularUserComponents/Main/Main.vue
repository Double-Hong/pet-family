<template>
    <div>
     <el-affix :offset="0">
      <!-- logo -->
        <div class="main-logo-zh" @click="home" >
            <img  style="height: 45px;float: left;margin-left:10%;margin-top: 50px;" src="/src/assets/logo.png" alt="">
            <img  style="height: 45px;float: left;margin-top: 45px" src="/src/assets//logoText.png" alt="">
        </div>
        <!-- 搜索栏 -->
        <div>
            <div class="bar-zh">
                <input v-model="message" type="text" placeholder="请输入您要搜索的内容...">
                <button @click="searchgoods" class="search" style="color: white;">搜索</button>
            </div>
        </div>
        
        <!-- 头像框 -->
        <div class="avatar-zh">
            <el-dropdown>
                <span class="el-dropdown-link">
                <el-avatar size="large" src="https://cg666.oss-cn-beijing.aliyuncs.com/2023/07/14/281328d28c6a41e8ae16a9c883f25c6ctimg.jpg"/>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="MerchantInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item @click="outlogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
     </el-affix>
     <el-divider />
     <el-divider />
        <!-- 主体分类 -->
        <div class="main-card-zh">
            <el-card class="card-style-zh" v-if="show" style="border-radius: 15px;">
              <div style="background-color: #ff5300;width: 120%;height: 5px;margin-top: -20px;margin-left: -20px;"></div>
                <!-- 轮播图 -->
                <div>
                    <el-carousel :interval="4000" type="card" height="300px">
                        <el-carousel-item v-for="item in arrImg" :key="item" style="border-radius: 15px;">
                            <el-image style="width: 100%" :src="item"></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 分类 -->
                <div style="margin-top:20px;background-color:#f7f8fa;border-radius: 10px;">
                    <h2 style="margin-top: 10px;margin-left:-85%;color: gray;">全部分类</h2>
                    <el-tabs stretch="false" v-model="activeName" @tab-click="handleClick" >
                        <el-tab-pane v-for="item in allType" :key="item" :label=item.name :name="item.name">
                            <Sort :type="item.name" />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
            <el-card style="width: 90%;margin-top: 10px;border-radius: 10px;height: 1000px;" v-if="!show">
              <div>
                筛选
              </div>
              <div style="display: inline-block;" v-for="(item,index) in result" :key="index">
                    <el-card style="position: relative;background-color: #eae8eb;width: 220px;height: 230px;margin: 20px;border-radius: 15px;" @click="gotogoods(item)">
                        <div style="width: 100%;height: 120px;border-radius: 15px;">
                          <img style="width: 122.5%;;height: 130%;margin-left: -20px;margin-top: -20px;border-radius: 15px" :src="result[index].photo" alt="">
                        </div>
                        <div style="position: relative;">
                          <p style="background-color: #ff5300;float: left;position: absolute;top:8px;
                          width: 20%;border-radius: 10px;color: #f7f8fa;font-family:'Times New Roman', Times, serif;
                          ">{{ result[index].brandName}}</p>
                          <h3 style="position: absolute;left: 25%;top: 4px;">{{ result[index].commodityName }}</h3>
                          <h3 style="position: absolute;top: 30px;color: red;">￥{{ result[index].price }}</h3>
                          <p style="position: absolute;top: 35px;left: 50px;color: gray;">{{ result[index].saleVolume }}人付款</p>
                          <p style="position: absolute;top: 53px;color: gray;">
                            {{ result[index].shopName }}
                            <el-tag style="margin-left: 5px;height: 15px;color: #ff5300;">包邮</el-tag>
                          </p>
                        </div>
                    </el-card>
              </div> 
            </el-card>
        </div>
    </div>
</template>



<script>
import request from "@/utils/request"
import Sort from "./Sort/Sort.vue"
import {useRegularStore} from "@/stores/RegularUser";
import { computed } from 'vue'
export default {
    components: {
        Sort,
    },
  created() {

    this.getType()
    this.getgoods()

  },
  data() {
    return {
        arrImg: [
        'https://cg666.oss-cn-beijing.aliyuncs.com/R-C.png',
        'https://cg666.oss-cn-beijing.aliyuncs.com/R-C.jpg',
        'https://cg666.oss-cn-beijing.aliyuncs.com/VB%7ENQO7Y%5BQ6VVC3K_%28J0Z61.png',
        'https://img-new.boqiicdn.com/Data/Shop/5/560/56042/shoppicpath11672042942_y.jpg?imageView2/2/w/360/h/360/q/100/interlace/0',
        'https://tse3-mm.cn.bing.net/th/id/OIP-C.YZ7Zf6EWfK6vS3FpLyh-2wHaEr?w=309&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7',
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.O9t1eQabPE2umwsoKROyzwAAAA?w=180&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      ],
      allType:[{}],//商品种类
      allGoods:[{}],//所有商品
      result:[{}],//搜索的商品
      activeName:'狗粮',
      message:'',
      show:true,
      randomNumbers: []
    }
  },
  methods: {
    getType(){//得到商品种类
        request.get("/commodity-type-entity/selectAllCommodityType").then(res =>{
            this.allType = res.data
        })
    },
    
    getgoods(){//得到所有商品
      request.get("/commodity-entity/getCommodityInfo").then(res =>{
        this.allGoods = res.data
    
        //随机数
        const numbers = [];
        const a = this.allGoods.length
        while (numbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * a)  // 生成6个随机数
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
        }
        this.randomNumbers = numbers;
        console.log(this.randomNumbers);
        for(let i = 0;i < 6;i++){
          this.arrImg[i] = this.allGoods[this.randomNumbers[i]].photo
        }
        })
      },
    searchgoods(){
      if(this.message != ""){
        this.show = false
        this.result = this.allGoods.filter(product => product.commodityName && product.commodityName.indexOf(this.message) !== -1);
      }else{
        location.reload()
      }
    },
    gotogoods(item){//得到详细信息
      const store= useRegularStore()
        store.commodityId = item.id
        store.shopId = item.shopId
        this.$router.push("/CommodityDetail")
    },
    home(){
      location.reload()
    },
    remove() {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
    }
  },

}


</script>

<style>
.main-card-zh{
   margin-left: 10%;
}
.card-style-zh{
    width: 90%;
    margin-top: 10px;
    border-radius: 20px;
    height: 1000px;
}
.avatar-zh{
    float: right;
    margin-top: -4%;
    margin-right:8%;
}

/* 搜索栏 */
.bar-zh input {
  border: 2px solid #ff5300;
  border-radius: 20px;
  background-color: #fff;
  top: 0;
  width: 650px;
  height: 35px;
  margin-top: 4%;
  margin-left: -20%;
}

.bar-zh button {
  background: #ff5300;
  border-radius: 20px;
  width: 60px;
  border: 0px;
  height: 33px;
  top: 0;
  margin-left: -4.7%;
  right: 0;
}



/* 轮播图 */
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>