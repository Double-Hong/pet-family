<template>
  <div>
    <div style="display: flex ;margin: 3%">
      <el-button @click="addProduct">新增商品</el-button>
      <el-input style="margin-left: 5%; width: 40%" placeholder="请输入商品名称搜索" v-model="search"></el-input>
    </div>

    <div>
    <el-table ref="tableRef" :data="filterState" stripe height="400px" style="width: 100%"
              :header-cell-style="{'background-color': '#ff5300', 'color': '#000'}"
    >
      <el-table-column prop="brandName" label="品牌" width="auto"/>
      <el-table-column prop="commodityName" label="商品名" width="auto"/>
      <el-table-column prop="introduce" label="商品介绍" width="auto"/>
      <el-table-column label="商品图片" width="auto">
        <template #default="scope">
          <el-image :src="scope.row.photo"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格/元" width="auto"/>
      <el-table-column prop="typeName" label="商品类型" width="auto"/>
      <el-table-column prop="saleVolume" label="销量" width="auto"/>
      <el-table-column prop="state" label="状态" width="auto"/>
      <el-table-column label="操作" width="auto">
        <template #default="scope">
          <el-dropdown>
            <el-button type="primary">
              操作
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button @click="onListingProduct(scope.row)">申请上架</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button @click="onDeleteProduct(scope.row)">删除商品</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button @click="onChangeProduct(scope.row)">修改信息</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button @click="onUpdateImage(scope.row)">修改图片</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-dialog
        title="商品上架"
        v-model="sureListingDialogVisible"
        center
        width="50%"
    ><span v-if="GoodsInfo.ListingProductInfo.state==comStatus._1" style="margin-left: 40%">不可重复提交！</span>
      <div v-else>
        <span style="margin-left: 20%">确定上架<span
            style="color: brown">{{ GoodsInfo.ListingProductInfo.brandName }}</span>品牌的<span
            style="color: aqua">{{ GoodsInfo.ListingProductInfo.commodityName }}</span> 吗？</span>
        <el-form-item label="联系电话" style="margin-top: 10%">
          <el-input maxlength="11" type="text" placeholder="请输入电话号码" v-model="myPageInfo.telephone"></el-input>
        </el-form-item>
      </div>
      <template #footer>
        <el-button @click="sureListingDialogVisible=false">取消</el-button>
        <el-button v-if="GoodsInfo.ListingProductInfo.state==comStatus._1" @click="sureListingDialogVisible=false">
          确定
        </el-button>
        <el-button v-else @click="makeSureListingProducts">确定</el-button>
      </template>
    </el-dialog>
    <el-dialog
        title="修改商品图片"
        v-model="changeImageDialogVisible"
        center
        width="30%"
    >
      <el-form-item label="点击修改" prop="photo">
        <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            :http-request="uploadHeadPhoto"
            :limit="1"
        >
          <el-image :src="CommodityData.changeInfo.photo" style="width: 50%"></el-image>
        </el-upload>
      </el-form-item>
    </el-dialog>
    <el-dialog
        title="修改商品信息"
        v-model="changeProductDialogVisible"
        center
    >
      <el-form-item label="商品名" prop="name">
        <el-input v-model="CommodityData.changeInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand">
        <el-select v-model="CommodityData.changeInfo.brandId" clearable
                   :placeholder="GoodsInfo.changeProductInfo.brandName">
          <el-option
              v-for="item in brandData.options"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍" prop="introduce">
        <el-input v-model="CommodityData.changeInfo.introduce"></el-input>
      </el-form-item>

      <el-form-item label="价格" prop="price">
        <el-input v-model="CommodityData.changeInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="typeName">
        <el-select v-model="CommodityData.changeInfo.typeId" clearable
                   :placeholder="GoodsInfo.changeProductInfo.typeName">
          <el-option
              v-for="item in CommodityTypeData.options"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="销量" prop="saleVolume">
        <span>{{ GoodsInfo.changeProductInfo.saleVolume }}</span>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <span>{{ CommodityData.changeInfo.state }}</span>
      </el-form-item>

      <template #footer>
        <el-button @click="changeProductDialogVisible=false">取消</el-button>
        <el-button @click="makeSureChangeProduct">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog
        v-model="deleteDialogVisible"
        title="删除商品信息"
        center
    >

      <span
          style="margin-left: 25%">确定要删除{{ GoodsInfo.deleteProductInfo.brandName }}品牌的{{ GoodsInfo.deleteProductInfo.commodityName }}的商品信息吗？</span>
      <template #footer>
        <el-button @click="deleteDialogVisible=false">取消</el-button>
        <el-button @click="makeSureDeleteProduct">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog
        v-model="addDialogVisible"
        title="添加商品"
        width="50%"
        center
    >
      <el-form-item label="商品名" prop="name">
        <el-input v-model="AddCommodityData.addInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand">
        <el-select v-model="AddCommodityData.addInfo.brandId">
          <el-option
              v-for="item in brandData.options"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍" prop="introduce">
        <el-input v-model="AddCommodityData.addInfo.introduce"></el-input>
      </el-form-item>

      <el-form-item label="价格/元" prop="price">
        <el-input v-model="AddCommodityData.addInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="typeName">
        <el-select v-model="AddCommodityData.addInfo.typeId">
          <el-option
              v-for="item in CommodityTypeData.options"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="仓库" prop="warehouseId">
        <el-select v-model="AddCommodityData.addInfo.warehouseId">
          <el-option
              v-for="item in warehouseData.options"
              :label="item.warehouseName"
              :value="item.warehouseId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="库存" prop="quantity">
        <el-input v-model="AddCommodityData.addInfo.quantity"></el-input>
      </el-form-item>

      <template #footer>
        <el-button @click="addDialogVisible=false">取消</el-button>
        <el-button @click="makeSureAddProduct">确定</el-button>
      </template>

    </el-dialog>

  </div>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import type {
  brand,
  comGoodsView,
  commodity,
  commodityType,
  audit,
  warehouse,
  storage,
  addCommodityDTO
} from "@/pojo/interface";
import {ElMessage, UploadUserFile} from "element-plus";
import {client} from "@/utils/myoss";
import router from "@/router";
import {comStatus} from "@/pojo/interface";

const props = defineProps({
  nowShopId: {
    type: Number,
    required: true
  }
})
const nowShopId = props.nowShopId // 当前店铺id

const addDialogVisible = ref(false)
const AddCommodityData = reactive({
  addInfo: {} as addCommodityDTO
})

const storage = reactive({
  addStorageInfo: {} as storage
})
const makeSureAddProduct = () => {

  console.log(AddCommodityData.addInfo)
  request.post("/commodity-entity/addCommodity", {
    commodity: AddCommodityData.addInfo,
    warehouseId: AddCommodityData.addInfo.warehouseId,
    quantity: AddCommodityData.addInfo.quantity
  }).then(res => {
    if (res.code == 200) {

      ElMessage.success("添加成功")
      addDialogVisible.value = false
      GoodsData.splice(0, GoodsData.length)
      request.get("/commodity-entity/selectComGoodsViewByShopId/" + nowShopId).then((res) => {
        GoodsData.push(...res.data)
      })
    } else {
      ElMessage.error("添加失败")
    }
  })
}
const addProduct = () => {
  addDialogVisible.value = true
  AddCommodityData.addInfo.state = comStatus._3
  AddCommodityData.addInfo.shopId = nowShopId as number
  AddCommodityData.addInfo.saleVolume = 0
}
const makeSureDeleteProduct = () => {
  request.post("commodity-entity/updateCommodityById", CommodityData.deleteInfo).then(resp => {
    if (resp.code == 200) {
      ElMessage.success("删除成功")
      GoodsData.splice(0, GoodsData.length)
      request.get("/commodity-entity/selectComGoodsViewByShopId/" + nowShopId).then((res) => {
        GoodsData.push(...res.data)
      })
      deleteDialogVisible.value = false
    } else {
      ElMessage.error("删除失败")
    }
  })
}
const onDeleteProduct = (row) => {
  myPageInfo.deleteProduct = row.id
  GoodsInfo.deleteProductInfo = row
  request.get("/commodity-entity/selectCommodityById/" + row.id).then(res => {
    CommodityData.deleteInfo = res.data
    CommodityData.deleteInfo.state = comStatus._6
    deleteDialogVisible.value = true

  })
}

const brandData = reactive({
  options: [] as brand[],
})

const deleteDialogVisible = ref(false)

const fileList = ref<UploadUserFile[]>([])
const uploadHeadPhoto = (file: any) => {
  let updateHeadInfo = reactive({}) as commodity
  updateHeadInfo = JSON.parse(JSON.stringify(CommodityData.changeInfo))
  const aliName = CommodityData.changeInfo.id + ".jpg"
  client.put("/commodityPhoto/" + aliName, file.file).then((res: any) => {
    console.log(res)
    updateHeadInfo.photo = res.url
    CommodityData.changeInfo.photo = res.url
    request.post("commodity-entity/updateCommodityById", CommodityData.changeInfo).then(resp => {
      if (resp.code == 200) {
        router.go(0)
        changeProductDialogVisible.value = false
      } else {
        ElMessage.error("修改失败")
      }
    })
  })
}
const sureListingDialogVisible = ref(false)

const changeImageDialogVisible = ref(false)
const onUpdateImage = (row) => {
  request.get("/commodity-entity/selectCommodityById/" + row.id).then(res => {
    CommodityData.changeInfo = res.data;
    changeImageDialogVisible.value = true
  })


}

const changeProductDialogVisible = ref(false)

const makeSureChangeProduct = () => {
  request.post("commodity-entity/updateCommodityById", CommodityData.changeInfo).then(resp => {
    if (resp.code == 200) {
      // router.go(0)
      GoodsData.splice(0, GoodsData.length)
      request.get("/commodity-entity/selectComGoodsViewByShopId/" + nowShopId).then((res) => {
        GoodsData.push(...res.data)
      })
      changeProductDialogVisible.value = false
    } else {
      ElMessage.error("修改失败")
    }
  })
}
const warehouseData = reactive({
  options: [] as warehouse[],
})

const onChangeProduct = (row: comGoodsView) => {


  request.get("/commodity-entity/selectCommodityById/" + row.id).then(res => {
    CommodityData.changeInfo = res.data;
    GoodsInfo.changeProductInfo = row;
    changeProductDialogVisible.value = true
  })

}
const makeSureListingProducts = () => {

  request.get("/commodity-entity/selectCommodityById/" + GoodsInfo.ListingProductInfo.id).then(res => {
    CommodityData.changeInfo = res.data;
    CommodityData.changeInfo.state = comStatus._1;
    request.post("/commodity-entity/updateCommodityById", CommodityData.changeInfo).then((res) => {
      console.log(res);
      if (res.code == 200) {
        audit.auditInfo.applicationPhone = myPageInfo.telephone
        request.post("/audit-entity/insertAudit", audit.auditInfo).then(res => {
          if (res.code == 200) {
            ElMessage({
              message: '申请审核成功',
              type: 'success'
            })
            sureListingDialogVisible.value = false;
            GoodsData.splice(GoodsData.indexOf(GoodsInfo.ListingProductInfo), 1);
          } else {
            ElMessage({
              message: '申请审核失败',
              type: 'error'
            })
          }
        })

      } else {
        ElMessage({
          message: '申请审核失败',
          type: 'error'
        })
      }
    })
  })

}

const myPageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  shopId: 1,
  telephone: "",
  deleteProduct: 0,
})
const GoodsData: comGoodsView[] = reactive([]);
const GoodsInfo = reactive({
  ListingProductInfo: {} as comGoodsView,
  changeProductInfo: {} as comGoodsView,
  deleteProductInfo: {} as comGoodsView,
})
const CommodityData = reactive({
  changeInfo: {} as commodity,
  addInfo: {} as commodity,
  deleteInfo: {} as commodity,
})
const filterState = computed(() => {

  return GoodsData.filter((item: comGoodsView) => {
    return ((item.state == comStatus._3) || (item.state == comStatus._2)) && (item.commodityName.includes(search.value))
  })

})
const search = ref('')
const filterSearch = computed(() => {
  return GoodsData.filter((item) => {
    return (item.commodityName.includes(search.value))
  })
})

const audit = reactive({
  auditInfo: {} as audit
})

const CommodityTypeData = reactive({
  options: [] as commodityType[]
})

onMounted(() => {
  request.get("/commodity-entity/selectComGoodsViewByShopId/" + nowShopId).then((res) => {
    GoodsData.push(...res.data)
  })
  request.get("/commodity-type-entity/selectAllCommodityType").then((res) => {
    CommodityTypeData.options.push(...res.data)

  })
  request.get("/brand-entity/GetAllBrand").then((res) => {
    brandData.options.push(...res.data)

  })
  request.get("/warehouse-info-entity/selectAllWarehouseInfo").then(res => {
    warehouseData.options.push(...res.data)
  })

})

const onListingProduct = (row) => {
  GoodsInfo.ListingProductInfo = row;
  sureListingDialogVisible.value = true;
  myPageInfo.telephone = ''
  audit.auditInfo.auditType = "商品";
  audit.auditInfo.auditState = "待审核";
  audit.auditInfo.keyWord = GoodsInfo.ListingProductInfo.id.toString();
  audit.auditInfo.applicant = GoodsInfo.ListingProductInfo.shopName;
  audit.auditInfo.content = "申请上架商品";
  audit.auditInfo.applicationRemark = "无"

}
</script>

<style scoped>

</style>
