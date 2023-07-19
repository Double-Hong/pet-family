<template>
  <h1 style="text-align: center">审核信息</h1>
  <br>
  <div style="position: absolute;top: 10.97%;left: 0;width: 100%;text-align: left">
    <el-tag size="large">申请状态</el-tag>&nbsp;
    <el-select v-model="selectStateValue" style="width: 15%">
      <el-option label="全部" value=""/>
      <el-option label="待审核" value="待审核"/>
      <el-option label="审核通过" value="审核通过"/>
      <el-option label="审核未通过" value="审核未通过"/>
    </el-select>
    &nbsp;&nbsp;
    <el-tag size="large" type="warning">申请类型</el-tag>&nbsp;
    <el-select v-model="selectTypeValue" style="width: 15%">
      <el-option label="全部" value=""/>
      <el-option label="商品" value="商品"/>
      <el-option label="店铺" value="店铺"/>
    </el-select>
    <el-input placeholder="搜索关键词" v-model="search" style="width: 20%;position: absolute;right: 20%" clearable/>
  </div>

  <el-table :data="filter"
            height="500px"
            :header-cell-style="{background: '#ff5300', color: '#fff' }"
  >
    <el-table-column label="审核内容" prop="content"/>
    <el-table-column label="申请者" prop="applicant"/>
    <el-table-column label="申请者联系方式" prop="applicationPhone"/>
    <el-table-column label="审核类型" prop="auditType"/>
    <el-table-column label="审核状态" prop="auditState">
      <template #default="scope">
        <el-tag v-if="scope.row.auditState==='审核通过'" size="large" type="success">{{ scope.row.auditState }}</el-tag>
        <el-tag v-else-if="scope.row.auditState==='审核未通过'" size="large" type="danger">{{ scope.row.auditState }}
        </el-tag>
        <el-tag v-else type="warning" size="large">{{ scope.row.auditState }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="300px">
      <template #default="scope">
        <el-button type="danger" @click="openDetailDialog(scope.row,scope.row.auditType)">查看详情</el-button>
        <el-tooltip
            class="box-item"
            effect="light"
            content="审核通过"
            placement="top"
        >
          <el-button type="success" icon="Select" @click="openPassDialog(scope.row)"
                     :disabled="scope.row.auditState=='审核通过'||scope.row.auditState=='审核未通过'"></el-button>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="light"
            content="审核不通过"
            placement="top"
        >
          <el-button type="danger" icon="Close" @click="openNoPassDialog(scope.row)"
                     :disabled="scope.row.auditState=='审核通过'||scope.row.auditState=='审核未通过'"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

  <!--  审核通过确认框-->
  <el-dialog
      width="30%"
      title="确认通过"
      v-model="passDialogVisible"
      style="text-align: center"
  >
    <h1>{{ auditData.passData.content }}</h1>

    <br><br><br>
    <el-button type="success" @click="makeSurePass" icon="Select"></el-button>
    <el-button @click="passDialogVisible = false" type="danger" icon="Close"></el-button>
  </el-dialog>

  <!--  审核不通过确认框-->
  <el-dialog
      width="30%"
      title="确认不通过"
      v-model="noPassDialogVisible"
      style="text-align: center"
  >
    <h1>{{ auditData.noPassData.content }}</h1>

    <br><br><br>
    <el-button type="success" @click="makeSureNoPass" icon="Select"></el-button>
    <el-button @click="noPassDialogVisible = false" type="danger" icon="Close"></el-button>
  </el-dialog>

  <!--  查看详情-->
  <el-dialog
      width="60%"
      title="详情"
      v-model="showDetailVisible"
      style="text-align: center"
  >
    <n-card v-if="currentDetailType=='商品'">
      <el-descriptions border column="2">
        <el-descriptions-item label="商品名称" width="100">
          <span>{{detail.detailData.commodityName}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="商品描述" width="100">
          <span>{{detail.detailData.introduce}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="类型">
          <span>{{detail.detailData.typeName}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="店铺名">
          <span>{{detail.detailData.shopName}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="品牌方">
          <span>{{detail.detailData.brandName}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="商品图片">
          <el-image :src="detail.detailData.photo" style="width: 150px;"/>
        </el-descriptions-item>
      </el-descriptions>
    </n-card>

    <n-card v-if="currentDetailType=='店铺'">
      <el-descriptions border column="2">
        <el-descriptions-item label="店铺名称" width="100">
          <span>{{detail.shopDetailData.name}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="店铺介绍" width="100">
          <span>{{detail.shopDetailData.introduce}}</span>
        </el-descriptions-item>

        <el-descriptions-item label="店铺地址">
          <span>{{detail.shopDetailData.address}}</span>
        </el-descriptions-item>
        <el-descriptions-item label="店铺图片">
          <el-image :src="detail.shopDetailData.avatar" style="width: 150px;"/>
        </el-descriptions-item>
      </el-descriptions>
    </n-card>

  </el-dialog>

</template>

<script setup lang="ts">


import type {audit, comGoodsView, commodity} from "@/utils/interface";
import {computed, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import {useAdminStore} from "@/stores/adminState";
import {ElMessage} from "element-plus";
import type {shopInfo} from "@/pojo/data-entity";

const store = useAdminStore()

const auditList: audit[] = reactive([])

onMounted(() => {
  request.get("/audit-entity/getAuditList").then(res => {
    console.log(res)
    auditList.splice(0, auditList.length)
    auditList.push(...res.data)
  })
})

//审核
const auditData = reactive({
  passData: {} as audit,
  noPassData: {} as audit,
})
//审核通过
const passDialogVisible = ref(false)
const openPassDialog = (row: audit) => {
  auditData.passData = row
  passDialogVisible.value = true
}
const makeSurePass = () => {
  request.post("/audit-entity/passAudit/" + store.currentAdminName, auditData.passData).then(res => {
    if (res.data) {
      auditList.splice(0, auditList.length)
      auditList.push(...res.data)
      passDialogVisible.value = false
      ElMessage.success("操作成功")
    }
  })
}

/**
 * 审核不通过
 */
const noPassDialogVisible = ref(false)
const openNoPassDialog = (row: audit) => {
  auditData.noPassData = row
  noPassDialogVisible.value = true
}
const makeSureNoPass = () => {
  request.post("/audit-entity/notPassAudit/" + store.currentAdminName, auditData.noPassData).then(res => {
    if (res.data) {
      auditList.splice(0, auditList.length)
      auditList.push(...res.data)
      noPassDialogVisible.value = false
      ElMessage.success("操作成功")
    }

  })
}

/**
 * 查看详情
 */
const showDetailVisible = ref(false)
const currentDetailId = ref('')
const currentDetailType = ref('')
const detail = reactive({
  detailData: {} as comGoodsView,
  shopDetailData: {} as shopInfo,
})
const openDetailDialog = (row: audit, auditType: string) => {
  currentDetailType.value = auditType
  currentDetailId.value = row.keyWord
  if (currentDetailType.value == "商品") {
    request.get("/audit-entity/getComGoodsById/" + currentDetailId.value).then(res => {
      detail.detailData = res.data
      console.log(res.data)
      showDetailVisible.value = true
    })
  } else {
    request.get("/shop-entity/getSHopInfo/" + currentDetailId.value).then(res => {

      if (res.data == null){
        ElMessage.error("该店铺已被商家注销")
        return
      }else {
        detail.shopDetailData = res.data
        showDetailVisible.value = true
      }


    })
  }

}


/**
 * 筛选
 */
const selectStateValue = ref("待审核")
const selectTypeValue = ref("")
const search = ref("")
const filter = computed(() => {
  return auditList.filter(item => {
    return item.auditState.includes(selectStateValue.value) && item.auditType.includes(selectTypeValue.value) && (item.content.includes(search.value) || item.applicant.includes(search.value) || item.applicationPhone.includes(search.value))
  })
})
</script>


<style scoped>

</style>
