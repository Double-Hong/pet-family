<template>
    <div>
       <div style="display: inline-block;width: 350px;" v-for="(item,index) in goods" :key="index">
            <el-card  class="sort-card-zh" style="position: relative;border-radius: 15px;" @click="gotogoods(item)" >
                <div style="float: left;width: 50%;height:130px;margin-top:-10px;">
                    <img style="width: 100%;height:100%;border-radius: 20px;" :src="goods[index].photo" alt="">
                </div>
                <div style="float: right;width: 50%;">
                    <div style="color: gray;margin-top: -10px;">
                      <p> 【{{goods[index].commodityName}}】 {{ goods[index].introduce }}</p>
                    </div>
                    <div>
                        <h4 style="color:#ff5300;position:absolute;top: 60%;font-family: 楷体,serif;font-size: large;left: 52%;"><span style="font-size: small;">￥</span>{{ goods[index].price }}</h4>
                    </div>
                </div>
            </el-card>
       </div> 
       
    </div>
</template>

<script>
import request from "@/utils/request"
import {useRegularStore} from "@/stores/RegularUser";

export default {
    props: {
    type: String
  },
  created() {
    this.getTypeShop()
  },
  data() {
    return {
        goods:[{
            id:'',
            brandName:'',
            typeName:'',
            commodityName:'',
            price:'',
            state:'',
            photo:'',
            introduce:'',
            saleVolume:'',
            shopName:'',
            shopId:'',
        }],
    }
  },
  methods: {
    getTypeShop(){
        request.get("/commodity-entity/getCommodityType/" + this.type).then(res =>{
            this.goods = res.data
        })
    },
    gotogoods(item){
        const store= useRegularStore()
        store.commodityId = item.id
        store.shopId = item.shopId
        this.$router.push("/CommodityDetail")
   
    }

 

  },

}

</script>

<style>
.sort-card-zh{
    height: 150px;
    margin: 10px;
  
}

</style>