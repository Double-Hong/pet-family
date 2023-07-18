<script setup lang="ts">
import type {shopInfo} from "@/pojo/data-entity";
import {computed, CSSProperties, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import router from "@/router";
import {useUserStore} from "@/stores/UserStore";
import {Delete, Edit, Share} from "@icon-park/vue-next";
import {ElMessage} from "element-plus";
import EluiChinaAreaDht from "elui-china-area-dht";
import {client} from "@/utils/myoss";

const body_style = computed((): CSSProperties => {
  return {
    padding: "0px",
  }
})

const store = useUserStore()

const allShopsInfo: shopInfo[] = reactive([])
const search = ref("")
const filterShopsInfo = computed(() => {
  return allShopsInfo.filter((item) => {
    return item.name.includes(search.value.toLowerCase())
  })
})

const jumpToShop = (shopId: number) => {
  router.push({
    path: "/merch-grid-view/shop-detail/" + shopId,
  })
}
const nowShopIndex = ref(0)
const updateStatus = (status: number, index: number) => {
  if (status == 1) {
    request.get("/shop-entity/updateShopStatus/" + allShopsInfo[index].id + "/歇业中").then((res) => {
          if (res.code == 200) {
            ElMessage.success('修改成功')
            allShopsInfo[index].shopStatus = '歇业中'
          } else {
            ElMessage.error('修改失败')
          }
        }
    )
  } else if (status == 2) {
    request.get("/shop-entity/updateShopStatus/" + allShopsInfo[index].id + "/营业中").then((res) => {
          if (res.code == 200) {
            ElMessage.success('修改成功')
            allShopsInfo[index].shopStatus = '营业中'
          } else {
            ElMessage.error('修改失败')
          }
        }
    )
  } else if (status == 3) {
    ElMessage.success('请等待申请结果')
  } else if (status == 4) {
    addFormInfo.id = allShopsInfo[index].id;addFormInfo.name = allShopsInfo[index].name;
    addFormInfo.address = allShopsInfo[index].address;addFormInfo.moreAddress = allShopsInfo[index].moreAddress;
    addFormInfo.introduce = allShopsInfo[index].introduce;addFormInfo.avatar = allShopsInfo[index].avatar;
    addFormInfo.shopStatus = allShopsInfo[index].shopStatus;addFormInfo.merchantId = allShopsInfo[index].merchantId;
    nowShopIndex.value = index
    addFormVisible.value = true
  }
}
const addFormVisible = ref(false)
const addFormInfo: shopInfo = reactive({
  id: 0,
  name: "",
  address: "",
  moreAddress: "",
  introduce: "",
  avatar: "",
  shopStatus: "申请中",
  merchantId: store.getMerchantUserInfo().merchantUserId
})
const addShop = ()=>{
  addFormVisible.value = true
  addFormInfo.id = 0
  addFormInfo.avatar=""
  addFormInfo.name=""
  addFormInfo.address=""
  addFormInfo.moreAddress = ""
  addFormInfo.introduce=""
}
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
const onChange = (val) => {
  addFormInfo.address = chinaData[val[0]].label + '' + chinaData[val[1]].label + '' + chinaData[val[2]].label
}
const uploadAvatar = (file) => {
  client.put("/shop-pictures/"+addFormInfo.name, file.file).then(res => {
    addFormInfo.avatar = res.url
    ElMessage({
      message: 'Upload successfully',
      type: 'success'
    })
  }).catch(err => {
    console.log(err)
  })
}
const onSubmitAdd = (index:number) =>{
  addFormInfo.address = addFormInfo.address + ' ' + addFormInfo.moreAddress
  addFormInfo.merchantId = store.getMerchantUserInfo().merchantUserId
  addFormInfo.shopStatus = "申请中"
  request.post("/shop-entity/addShop",addFormInfo).then(res=>{
    if(res.code == 200){
      ElMessage.success('提交成功')
      addFormVisible.value = false
      if(addFormInfo.id == 0){
        addFormInfo.id= res.data
        allShopsInfo.push(addFormInfo)
      } else{
        allShopsInfo[nowShopIndex.value].shopStatus = "申请中"
      }
    }else{
      ElMessage.error('提交失败')
    }
  })
}
onMounted(() => {
  console.log(store.getMerchantUserInfo())
  request.get("/shop-entity/selectShopByMerchantId/" + store.getMerchantUserInfo().merchantUserId).then((res) => {
    allShopsInfo.push(...res)
  })
})
</script>

<template>
  <el-dialog v-model="addFormVisible" center width="30%">
    <el-form v-model="addFormInfo">
      <el-form-item label="店铺名称">
        <el-input v-model="addFormInfo.name"/>
      </el-form-item>
      <el-form-item label="店铺地址">
        <elui-china-area-dht isall :leave="3" @change="onChange"></elui-china-area-dht>
      </el-form-item>
      <el-form-item label="店铺详细地址">
        <el-input v-model="addFormInfo.moreAddress"/>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
            class="upload-demo"
            action="http://localhost:9090/oss/upload"
            :show-file-list="false"
            :auto-upload="true"
            :http-request="uploadAvatar">
          <el-button size="small" text icon="UploadFilled">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺介绍">
        <el-input v-model="addFormInfo.introduce" type="text"/>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 150px" type="primary" @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmitAdd(addFormInfo.id)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <div style="position: absolute;margin-top: 100px ;z-index: 999">
    <el-button type="success" size="small" circle/>
    <span>营业中</span>
    <br>
    <br>
    <el-button type="primary" size="small" circle/>
    <span>歇业中</span>
    <br>
    <br>
    <el-button type="info" size="small" circle/>
    <span>申请中</span>
    <br>
    <br>
    <el-button color="black" size="small" circle/>
    <span>未通过</span>
  </div>
  <div class="show-shops-info">
    <el-row>
      <el-col :span="24">
        <el-space wrap :size="40">
          <el-col v-for="(item,index) in allShopsInfo">
            <el-card style="width: 250px;height: 270px;margin-top: 10px;border-radius: 10px 10px 10px 10px" :body-style="body_style">
              <el-image
                  :src="item.avatar"
                  class="image"
              />
              <div style="margin-top: 10px">
                <el-tooltip effect="dark" :content="item.introduce" placement="top">
                  <span>shop name: <br
                  >{{ item.name }}</span>
                </el-tooltip>
              </div>
              <div class="bottom">
                <el-tooltip
                    effect="light"
                    :content="item.address"
                    placement="top"
                >
                <el-text class="w-80px" truncated>{{ item.address }}</el-text>
                </el-tooltip>
                <el-button color="#ff5300" size="small" icon="More" @click="jumpToShop(item.id)">More</el-button>
                <el-tooltip
                    effect="dark"
                    content="click"
                    placement="top"
                >
                  <el-button v-if="item.shopStatus==='营业中'" circle type="success" size="small"
                             @click="updateStatus(1,index)"></el-button>
                  <el-button v-if="item.shopStatus==='歇业中'" circle type="primary" size="small"
                             @click="updateStatus(2,index)"></el-button>
                  <el-button v-if="item.shopStatus==='申请中'" circle type="info" size="small"
                             @click="updateStatus(3,index)"></el-button>
                  <el-button v-if="item.shopStatus==='未通过'" circle color="black" size="small"
                             @click="updateStatus(4,index)"></el-button>
                </el-tooltip>
              </div>
            </el-card>
          </el-col>
          <el-col>
            <el-tooltip
                effect="dark"
                content="点击添加新店铺"
                placement="bottom"
            >
              <el-card class="add-card-wyx" :body-style="body_style" @click="addShop">
                <el-icon class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
              </el-card>
            </el-tooltip>
          </el-col>
        </el-space>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

.show-shops-info{
  margin-left: 200px;
}

.image {
  width: 100%;
  height: 150px;
}

.bottom {

  margin: 10px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-card-wyx {
  width: 250px;
  height: 270px;
  margin-top: 10px;
  border-radius: 10px 10px 10px 10px
}

.add-card-wyx:hover {
  cursor: pointer;
  border-radius: 10px 10px 10px 10px;
  box-shadow: #e7c128 0 0 5px 5px;
}

.avatar-uploader-icon {
  font-size: 30px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
