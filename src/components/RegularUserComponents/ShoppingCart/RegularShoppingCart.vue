<script setup lang="ts">

import {computed, onMounted, reactive, ref, watch} from "vue";
import type {cartGoodsView, orderGoodsInfo} from "@/pojo/data-entity";
import request from "@/utils/request";
import {useCartStore} from "@/stores/CartStore";
import {orderInfo} from "@/pojo/data-entity";

import EluiChinaAreaDht from "elui-china-area-dht";
import type {address} from "@/pojo/data-entity";
import {useUserStore} from "@/stores/UserStore";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {useRegularStore} from "@/stores/RegularUser";

const store = useUserStore()
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;

const addressList = ref({
  addressInfo: [] as address[],
})
const form = ref({
  addForm: {} as address,
})
const orderInfo = ref({
      id: null,  //订单id
      time: "",  //订单时间
      address: "", //订单地址
      phone: "",  //订单电话
      totalPrice: 0.0,  //订单总价
      name: "",  //订单收货人姓名
      state: "",  //订单状态
      personId: 0,  //订单收货人id
}
)
const orderGoodsInfo = reactive({
  goodsInfo: [] as orderGoodsInfo[]
})
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您所做的修改将不会被保存，是否继续？', '提示')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

const options = computed(() => {
  let arr = []
  addressList.value.addressInfo.forEach((value, index) => {
    arr.push({
      value: index,
      label: value.address + value.detailAddress
    })
  })
  return arr
})
const value = ref('')

watch(value, (val) => {
  // console.log(val)
  orderInfo.value.name = addressList.value.addressInfo[val as number].linkman
  orderInfo.value.phone = addressList.value.addressInfo[val as number].linkmanPhone
  orderInfo.value.address = addressList.value.addressInfo[val as number].address + addressList.value.addressInfo[val].detailAddress
})

const drawer = ref(false)

const cancelClick = () => {
  drawer.value = false
}
const formVisible = ref(false)
const orderFormInfo = reactive({
  orderFormEntity: [] as orderInfo[]
})
const confirmClick = () => {
  orderInfo.value.personId= store.getRegularUserInfo().regularUserId
  // orderInfo.value.personId= 12121
  orderInfo.value.time = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
  // console.log(orderInfo.value, orderGoodsInfo.goodsInfo)
  request.post("/order-form-entity/saveOrder", {
    orderFormEntity: orderInfo.value,
    list: orderGoodsInfo.goodsInfo
  }).then(res => {
    ElMessage.success("下单成功")
    orderFormInfo.orderFormEntity.push(...res.data)
    let shoppingCartIdList = []
    orderGoodsInfo.goodsInfo.forEach((value, index) => {
      shoppingCartIdList.push(value.shoppingCartId)
    })
    request.post("/shopping-cart-entity/deleteShoppingCartByIdList",shoppingCartIdList).then(res=>{
      console.log(res.data)
    })
    formVisible.value = true
    drawer.value = false
  })
}
const payPassword = ref('')
const submitPay = ()=>{
  // console.log(orderFormInfo.orderFormEntity)
  if(payPassword.value == store.getRegularUserInfo().password){
// <--! ------------------------------------------------------------------------------------------------>
    ElMessage.success("支付成功")
    request.post("/order-form-entity/payOrder",orderFormInfo.orderFormEntity).then(res=>{
      console.log(res.data)
      formVisible.value = false
    })
  } else{
    ElMessage.error("密码错误")
  }
  router.go(0)
}


const dialogVisible = ref(false)
const onChange = (val) => {
  form.value.addForm.address = chinaData[val[0]].label + '/' + chinaData[val[1]].label + '/' + chinaData[val[2]].label
}
const onSubmit = () => {
  // console.log(form.value.addForm)
  form.value.addForm.userId = store.getRegularUserInfo().regularUserId
  request.post("/address-info-entity/addAddressInfo", form.value.addForm).then(res => {
    ElMessage.success("添加成功")
    form.value.addForm.addressId = res.data
    addressList.value.addressInfo.push(form.value.addForm)
  })
  dialogVisible.value = false
}


//获取购物车商品信息，并且初始化购物车商品信息，商店信息
request.get("/shopping-cart-entity/getShoppingCartViewByUserIdAndStoreId/" + store.getRegularUserInfo().regularUserId).then(res => {
  // cartGoodsInfo = res.data
  cartGoodsInfo.value = res.data
  res.data.forEach((value, index) => {
    value.goodsViewList.forEach((value1, index1) => {
      ids.push(value1.id)
    })
  })
  totalShopList.value.splice(0, 1)
  cartGoodsInfo.value.forEach((value, index) => {
    totalShopList.value.push({
      shopAvatar: value.goodsViewList[0].avatar,
      shopId: value.goodsViewList[0].shopId,
    })
  })
})

const cartGoodsInfo = ref([{
  shopName: "",
  goodsViewList: [] as cartGoodsView[]
}])
const totalMoney = computed(() => {
  let total = 0
  checkArr.value.forEach((value, index) => {
    cartGoodsInfo.value.forEach((value1, index1) => {
      value1.goodsViewList.forEach((value2, index2) => {
        if (value2.id == value) {
          total += value2.price * value2.commodityNumber
        }
      })
    })
  })
  return total
})  //总价
const totalComNum = computed(() => {
  let total = 0
  cartGoodsInfo.value.forEach((value, index) => {
    value.goodsViewList.forEach((value1, index1) => {
      total += value1.commodityNumber
    })
  })
  return total
}) //总商品数
const totalShopList = ref([{
  shopAvatar: "",  //商店头像
  shopId: 0, //商店id
}]) //商店列表

const nowShop = (index: number) => {
  return totalShopList.value[index]
}
const goTheShop = (index: number) => {   //跳转到商店
  // console.log(totalShopList.value[index].shopId)
  useRegularStore().shopId = totalShopList.value[index].shopId
  router.push("/shopDetail")
}
const goTheCom = (index: number) => {   //跳转到商品
  console.log(index)
  useRegularStore().commodityId = index
  router.push("/commodityDetail")
}
const toPay = () => {   //去结算
  drawer.value = true
  orderInfo.value.totalPrice = totalMoney.value
}


//全选
const checkAll = ref(false)
const isIndeterminate = ref(true)

let ids: string[] = []  //已选中的所有商品id
const handleCheckAllChange = (val: boolean) => {
  checkArr.value = val ? ids : []
  isIndeterminate.value = false
}

const getNowValue = (val: string | number | boolean, num: number) => {
  // console.log(val)
  // console.log(checkArr.value)
}
const checkArr = ref<string[]>([])
watch(checkArr, (value) => {
  orderGoodsInfo.goodsInfo.splice(0, orderGoodsInfo.goodsInfo.length)
  cartGoodsInfo.value.forEach((value1, index1) => {
    value1.goodsViewList.forEach((value2, index2) => {
      if (value.includes(value2.id as string)) {
        orderGoodsInfo.goodsInfo.push({
          id: 0,
          orderId: 0,
          commodityId: value2.id,
          shoppingCartId: value2.shoppingCartId as number,
          num: value2.commodityNumber,
          totalPrice: value2.price * value2.commodityNumber,
        })
      }
    })
  })
})

onMounted(() => {
  request.get("/address-info-entity/getMyAddressInfo/" + store.getRegularUserInfo().regularUserId).then(res => {
    addressList.value.addressInfo.splice(0, 1)
    addressList.value.addressInfo.push(...res.data)
  })
})
</script>
<template>

  <el-dialog
    v-model="formVisible"
    title="支付"
    width="30%">
    <el-input type="password" v-model="payPassword" placeholder="请输入登录密码验证"/>
    <span slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitPay">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog
      v-model="dialogVisible"
      title="add a new address"
      width="30%"
  >
    <el-form :model="form.addForm">
      <el-form-item label="收货人">
        <el-input v-model="form.addForm.linkman" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.addForm.linkmanPhone" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="选择省市">
        <elui-china-area-dht isall :leave="3" @change="onChange"></elui-china-area-dht>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.addForm.detailAddress" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-drawer
      v-model="drawer"
      :before-close="handleClose"
      class="demo-drawer"
      :size="500"
      direction="ltr">
    <template #header>
      <h4>确认订单</h4>
    </template>
    <template #default>
      <div align="left">
        <span>地址： </span>
        <el-select v-model="value" class="m-2" placeholder="Select">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-tooltip
            effect="dark"
            content="新增地址"
            placement="top">
          <el-button @click="dialogVisible = true" icon="Plus"/>
        </el-tooltip>
        <br><br>
        <div align="left">
          <span>订单总金额：</span>
          <span>￥{{ orderInfo.totalPrice }}</span>
        </div>
        <br>
        <div align="left">
          <span>联系人：</span>
          <span>{{ orderInfo.name }}</span>
        </div>
        <br>
        <div align="left">
          <span>联系电话：</span>
          <span>{{ orderInfo.phone }}</span>
        </div>
        <br>
        <div align="left">
          <span>收货地址：</span>
          <span>{{ orderInfo.address }}</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>

  <el-button style="position: absolute;top:1%;left: 1%;z-index: 999" @click="router.go(-1)">返回</el-button>

  <el-scrollbar align="left">
    <div style="margin-left: 150px;width: 80%">
      <div>
        <el-row>
          <el-col :span="4">
            <div>
              <h3 class="main-header-left-yh">购物车(共 {{ totalComNum }} 件)</h3>
            </div>
          </el-col>
          <el-col :span="13">

          </el-col>
          <el-col :span="4">
            <div>
              <h2 class="main-header-right-yh">总价:{{ totalMoney }}￥</h2>
            </div>
          </el-col>
          <el-col :span="3">
            <el-button class="main-header-right-button" type="success" style="margin-top: 15%" @click="toPay">pay
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="cart-com-wyx">
        <el-col :span="3">
          <div align="left">
            <el-checkbox
                style="margin-top: -10%"
                size="default"
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ep-bg-purple">
            商品
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            数量
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content ep-bg-purple">
            单价(￥)
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content ep-bg-purple"/>
        </el-col>
      </div>
      <el-card v-for="(item,index) in cartGoodsInfo">
        <div style="display: flex">
          <el-avatar title="Enter the shop" class="shop-avatar-wyx" :size="40" @click="goTheShop(index)"
                     :src="nowShop(index).shopAvatar">商店头像
          </el-avatar>
          <h4 style="margin-left: 7px">{{ item.shopName }}</h4>
        </div>
        <el-checkbox-group v-model="checkArr">
          <el-card v-for="com in item.goodsViewList">
            <el-row>
              <el-col :span="3">
                <el-checkbox @change="getNowValue(com.id,com.commodityNumber)" :label="com.id">
                  {{ com.name }}
                </el-checkbox>
              </el-col>
              <el-col :span="6" style="display: flex">
                <el-image title="Detailed information" @click="goTheCom(com.id)" class="com-avatar-wyx"
                          :src="com.photo"/>
                <el-tooltip
                    placement="top"
                    effect="dark"
                    :content="com.introduce"
                >
                  <el-text style="width: 150px;height: 50px;padding-top: 30px" truncated>
                    {{ com.introduce }}
                  </el-text>
                </el-tooltip>
              </el-col>
              <el-col :span="4">
                <div class="one-com-info-wyx">
                  <el-input-number v-model="com.commodityNumber"></el-input-number>
                  >
                </div>
              </el-col>
              <el-col :span="4">
                <div class="one-com-info-wyx">
                  <el-text>{{ com.price }}</el-text>
                </div>
              </el-col>
              <el-col :span="7">
                <div class="one-com-info-wyx">

                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-checkbox-group>
      </el-card>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.main-header-left-yh {
}

.main-header-right-yh {
}

.cart-com-wyx {
  display: flex;
}

.grid-content {
  text-align: center;
}

.shop-avatar-wyx:hover {
  cursor: pointer;
}

.com-avatar-wyx {
  width: 150px;
  height: 100px
}

.com-avatar-wyx:hover {
  cursor: pointer;
}

.one-com-info-wyx {
  margin-top: 20%;
  text-align: center;
}
</style>
