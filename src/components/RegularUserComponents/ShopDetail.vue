<template>

  <el-container style="width: 100%;height: 100%">
    <el-header style="height:10%;position: relative;background-color: #F9F0DA">
      <el-button color="#ff5300" @click="router.push('/regularUserMain')"
                 style="position:absolute;top: 40%;right: 5%">返回首页
      </el-button>
      <el-tooltip
          content="购物车"
          placement="bottom"
          effect="light"
      >
        <el-button color="#ff5300" style="position:absolute;top: 40%;right: 12%" @click="router.push('/shopping-cart')">
          <el-icon size="25">
            <ShoppingCart/>
          </el-icon>
        </el-button>
      </el-tooltip>
      <div @click="router.push('/regularUserMain')" style="position: absolute;width: 20%;">
        <img style="height: 50px;float: left;margin-left: 1%;margin-top: 16px;" src="/src/assets/logo.png" alt="">
        <img style="height: 50px;float: left;margin-top: 10px" src="/src/assets/logoText.png" alt="" >
      </div>
      <div class="header-main">
        <div class="bar">
          <form>
            <input v-model="search" type="text" placeholder="搜索该店铺...">
          </form>
        </div>
      </div>
    </el-header>
    <el-main style="display: flex;flex-flow: wrap row;">
      <div style="width: 100%;position: relative;height: 100px;border-radius: 10px;
      ;text-align: center;background-color: lightgoldenrodyellow" id="top">
        <div style="position: absolute;left: 5%">
          <el-popover :width="400">
            <template #reference>
              <el-avatar style="margin-top: 15px" :src="pageInfo.shopInfo.avatar" :size="75"></el-avatar>
            </template>
            <template #default>
              <el-card>
                <div style="text-align: center;">
                  <div>
                    <el-avatar :src="pageInfo.shopInfo.avatar" :size="125"></el-avatar>
                  </div>

                  <span
                      style="font-weight: bold"
                  >
                  店铺名称
                </span>
                  <p
                      style="margin: 0; font-size: 16px; color: grey"
                  >
                    <span>{{ pageInfo.shopInfo.name }}</span>
                  </p>
                  <br>
                  <span
                      style="font-weight: bold"
                  >
                  店铺简介
                </span>
                  <p
                      style="margin: 0; font-size: 16px; color: #a1a1ec"
                  >
                    <span>{{ pageInfo.shopInfo.introduce }}</span>
                  </p>
                  <br>
                  <span
                      style="font-weight: bold"
                  >
                  店铺地址
                </span>
                  <p
                      style="margin: 0; font-size: 16px; color: #b488ee"
                  >
                    <span>{{ pageInfo.shopInfo.address }}</span>
                  </p>
                  <br>

                </div>
              </el-card>
            </template>
          </el-popover>
        </div>
        <el-tag style="position: absolute;left: 20px;top: 10px">店铺</el-tag>
        <el-tag style="position: absolute;left: 1120px;top: 10px">品牌</el-tag>
        <div style="position: absolute;right: 5%">
          <el-popover
              :width="400"
          >
            <template #reference>

              <el-avatar style="margin-top: 15px" :src="pageInfo.merchantViewInfo.avatar" :size="75"/>
            </template>
            <template #default>
              <el-card style="width: 100%;height: 80%;right: 1%;top: 1%;background-color: honeydew" shadow="hover">
                          <template v-slot:header>
                            <span style="font-size: 25px;font-family: 楷体,serif">商家信息</span>
                          </template>
                          <el-descriptions column="1" border>
                            <el-descriptions-item label="商家名">
                              {{ pageInfo.merchantViewInfo.merchantName }}
                            </el-descriptions-item>
                            <el-descriptions-item label="致电商家">
                              {{ pageInfo.merchantViewInfo.phone }}
                            </el-descriptions-item>
                            <el-descriptions-item label="邮箱">
                              {{ pageInfo.merchantViewInfo.email }}
                            </el-descriptions-item>
                            <el-descriptions-item label="商家地址">
                              {{ pageInfo.merchantViewInfo.merchantAddress }}
                            </el-descriptions-item>
                          </el-descriptions>

                        </el-card>
            </template>
          </el-popover>
        </div>

        <span style="font-size: 50px;font-family: 隶书,serif;">{{ pageInfo.shopInfo.name }}</span>
        <div v-if="pageInfo.shopInfo.shopStatus=='营业中'" style="position: absolute;left: 12%;top: 40%">
          <el-button icon="Select" type="success" size="small"></el-button>&nbsp;
          <el-tag>{{ pageInfo.shopInfo.shopStatus }}</el-tag>
        </div>
        <div v-else style="position: absolute;left: 12%;top: 40%">
          <el-button icon="Close" type="danger" size="small"></el-button>&nbsp;
          <el-tag>{{ pageInfo.shopInfo.shopStatus }}</el-tag>
        </div>
      </div>
      <!--      <div style="width: 100%;height: 65%;position: relative;overflow: auto" >-->
      <!--        <el-card style="position: absolute;width: 60%;height: 80%;background-color: #ff5300" shadow="hover">-->
      <!--          <el-image :src="pageInfo.shopInfo.avatar"-->
      <!--                    style="width: 120px;height: 120px;position: absolute;left: 1%;top: 1%;"/>-->
      <!--          <span style="font-size: 50px;font-family: 隶书,serif">{{ pageInfo.shopInfo.name }}</span>-->
      <!--          <br>-->
      <!--          <div v-if="pageInfo.shopInfo.shopStatus=='营业中'">-->
      <!--            <el-button icon="Select" type="success" size="small"></el-button>&nbsp;-->
      <!--            <el-tag>{{ pageInfo.shopInfo.shopStatus }}</el-tag>-->
      <!--          </div>-->
      <!--          <div v-else>-->
      <!--            <el-button icon="Close" type="danger" size="small"></el-button>&nbsp;-->
      <!--            <el-tag type="danger">{{ pageInfo.shopInfo.shopStatus }}</el-tag>-->
      <!--          </div>-->
      <!--          <br><br><br>-->
      <!--          <el-descriptions border column="1">-->
      <!--            <el-descriptions-item label="店铺地址">{{ pageInfo.shopInfo.address }}</el-descriptions-item>-->
      <!--            <el-descriptions-item label="店铺简介">{{ pageInfo.shopInfo.introduce }}</el-descriptions-item>-->
      <!--          </el-descriptions>-->
      <!--        </el-card>-->
      <!--        <el-card style="position: absolute;width: 35%;height: 80%;right: 1%;top: 1%;background-color: #f1773b"-->
      <!--                 shadow="hover">-->
      <!--          <template v-slot:header>-->
      <!--            <span style="font-size: 25px;font-family: 楷体,serif">商家信息</span>-->
      <!--          </template>-->
      <!--          <el-descriptions column="1" border>-->
      <!--            <el-descriptions-item label="商家名">-->
      <!--              {{ pageInfo.merchantViewInfo.merchantName }}-->
      <!--            </el-descriptions-item>-->
      <!--            <el-descriptions-item label="致电商家">-->
      <!--              {{ pageInfo.merchantViewInfo.phone }}-->
      <!--            </el-descriptions-item>-->
      <!--            <el-descriptions-item label="邮箱">-->
      <!--              {{ pageInfo.merchantViewInfo.email }}-->
      <!--            </el-descriptions-item>-->
      <!--            <el-descriptions-item label="商家地址">-->
      <!--              {{ pageInfo.merchantViewInfo.merchantAddress }}-->
      <!--            </el-descriptions-item>-->
      <!--          </el-descriptions>-->

      <!--        </el-card>-->
      <!--      </div>-->
      <el-divider><span style="font-family: 仿宋,serif;font-size: 20px;font-weight: bold">本店全部宝贝</span>
      </el-divider>


      <div style="width: 33.3%;height: 50%;position: relative;" v-for="commodity in filter">
        <el-card style="width: 90%;height: 90%;position: absolute;top:5%;left: 5%">
          <el-image :src="commodity.photo" style="width: 180px;height: 200px;position: absolute;left: 1%;top: 6%"/>
          <div style="position: absolute;width: 53%;height: 90%;right: 0;top:6%">
            <span style="font-size: 20px"><span style="font-weight: bold">{{ commodity.commodityName }}</span></span>
            <p>{{ commodity.introduce }}</p>
            <div style="position: absolute;width: 100%;height: 20%;top:50%;">
              类型:
              <el-tag size="large">{{ commodity.typeName }}</el-tag>&nbsp;
              品牌:
              <el-tag size="large" type="info">{{ commodity.brandName }}</el-tag>
              <br><br>
              <span>销量：{{ commodity.saleVolume }}</span>
            </div>
            <div style="width: 100%;position: absolute;bottom: 0;right: 0;">
              <el-button style="font-size: 8px;width: 80px" color="#ff5300">加入购物车</el-button>
              <el-button style="font-size: 8px;background-color:#ff5300;width: 80px;color: white" @click="goToCommodityDetail(commodity.id)">
                <el-icon size="16">
                  <Goods/>
                </el-icon>
                查看详情
              </el-button>
            </div>
          </div>

          <span
              style="position: absolute;bottom: 0;left: 5%;font-size: 32px;color: red;font-family: Helvetica Neue,serif;font-weight: bold">
            ¥{{ commodity.price }}
          </span>
        </el-card>
      </div>

    </el-main>
  </el-container>
  <a href="#top" style="position: fixed;bottom: 2%;right: 2%">
    <el-button type="primary" size="large" circle icon="Top"></el-button>
  </a>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {ShoppingCart,Goods} from "@element-plus/icons-vue";
import type {comGoodsView} from "@/pojo/interface";
import request from "@/utils/request";
import type {shopInfo} from "@/pojo/data-entity";
import router from "@/router";
import type {MerchantUserView} from "@/utils/adminInterface";
import {useRegularStore} from "@/stores/RegularUser";

/**
 * 先假定一个店铺id，后面会改
 */
const shopId = useRegularStore().shopId

const commodityList: comGoodsView[] = reactive([])
const pageInfo = reactive({
  shopInfo: {} as shopInfo,
  merchantViewInfo: {} as MerchantUserView
})

onMounted(() => {
  request.get("/shop-entity/getShopById/" + shopId).then(res => {
    pageInfo.shopInfo = res.data
    request.get("/merchant-user-view-entity/getMerchantUserView/" + pageInfo.shopInfo.merchantId).then(resp => {
      pageInfo.merchantViewInfo = resp.data
    })
  })

  request.get("/commodity-entity/selectComGoodsViewByShopId/" + shopId).then(res => {
    commodityList.splice(0, commodityList.length)
    commodityList.push(...res.data)
  })
})

//过滤器
const search = ref('')

const filter = computed(() => {
  return commodityList.filter(item => {
    return item.commodityName.includes(search.value) || item.introduce.includes(search.value) || item.typeName.includes(search.value) || item.brandName.includes(search.value)
  })
})

//点击查看商品详情
const goToCommodityDetail = (commodityId: number) => {
  useRegularStore().commodityId = commodityId
  router.push("/commodityDetail")
}

</script>

<style scoped>
.bar input {
  border: 2.5px solid #c5464a;
  border-radius: 20px;
  background-color: #fff;
  top: 0;
  width: 600px;
  height: 35px;
  margin-top: 2%;
  right: 0;
}

.bar button {
  background: #ff5300;
  border-radius: 20px;
  width: 60px;
  border: 0;
  height: 30px;
  top: 0;
  margin-left: -8%;
  right: 0;
}

.bar button:before {
  content: "搜索";
  font-size: 13px;
  color: #F9F0DA;
}
</style>