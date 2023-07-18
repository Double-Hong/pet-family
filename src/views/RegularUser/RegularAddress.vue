<template>
  <el-card class="el-card" style="width: 95%;position: relative;">
    <el-button @click="router.go(-1)" style="position: absolute;left: 1%;top: 1%;">返回</el-button>
    <div class="card-header">
      <h2>收货地址管理</h2>
      <el-divider>
        <el-icon><LocationFilled/></el-icon>
      </el-divider>
      <el-button class="button" text style="color: #dd6675" @click="drawer=true" icon="Plus" size="large">新增收货地址</el-button>
    </div>

    <el-drawer
        ref="drawerRef"
        v-model="drawer"
        :before-close="handleClose"
        class="demo-drawer"
        :size="size"
    >
      <template #header>
        <h3>请新增一个收货地址</h3>
      </template>
      <div class="demo-drawer__content">
        <el-form :model="form.addForm">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.addForm.linkman" autocomplete="off" />
          </el-form-item>
          <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.addForm.linkmanPhone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="选择省市" :label-width="formLabelWidth">
            <elui-china-area-dht isall :leave="3" @change="onChange"></elui-china-area-dht>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input style="margin-left: 12px" v-model="form.addForm.detailAddress" type="textarea" />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <div style="flex: auto">
            <el-button @click="cancelClick" icon="Close"></el-button>
            <el-button type="primary" @click="confirmClick" icon="Select"></el-button>
          </div>
        </div>
      </div>
    </el-drawer>

    <!--    修改地址表单-->
    <el-dialog
        v-model="dialogVisibleEdit"
        title="修改地址"
        width="30%"
        :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <!--                      和数据库的名字一一对应-->
        <el-form-item label="用户编号">
          <el-input disabled v-model="form.editForm.userId" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="form.editForm.linkman" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.editForm.linkmanPhone" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="选择省市" >
          <elui-china-area-dht isall :leave="3" @change="onChange1"></elui-china-area-dht>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.editForm.detailAddress" style="width: 70%"/>
        </el-form-item>
        <el-button @click="dialogVisibleEdit = false" icon="Close" type="danger"></el-button>
        <el-button type="primary" @click="updateForm" icon="Select">

        </el-button>
      </el-form>
    </el-dialog>

    <!--    表格-->
    <el-table
        :data="RegularInfo"
        style="width: 100%;text-align: left"
        :row-class-name="tableRowClassName"
    >
      <!--    <el-table-column-->
      <!--        type="selection"-->
      <!--        width="55">-->
      <!--    </el-table-column>-->
      <el-table-column
          type="index"
          >
      </el-table-column>

      <el-table-column
          prop="userId"
          label="用户编号"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="linkman"
          label="联系人"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="linkmanPhone"
          label="联系电话"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          align="center"
      >
      </el-table-column>
      <el-table-column
          prop="detailAddress"
          label="详细地址"
          align="center"
      >
      </el-table-column>

      <el-table-column fixed="right" label="操作" align="center" width="300px">
        <template #default="scope">
          <el-button type="danger" size="small" icon="Select" @confirm="handleDefault(scope.row.id)">设为默认</el-button>
          <el-button size="small" icon="Edit" type="danger" @click="handleEdit(scope.row)">修改</el-button>
          <el-popconfirm title="确认删除吗" @confirm="handleDelete(scope.row.addressId)">
            <template #reference>
              <el-button size="small" icon="delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script setup lang="ts">

import EluiChinaAreaDht from "elui-china-area-dht";
import {useUserStore} from "@/stores/UserStore";
import {onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import {ElMessageBox} from "element-plus";
import router from "@/router";

const regularInfo = useUserStore().getRegularUserInfo()
console.log(regularInfo)

const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
const onChange = (val)=> {//新增表单的地区下拉框
  form.addForm.address = chinaData[val[0]].label + '' + chinaData[val[1]].label + '' + chinaData[val[2]].label
}
const onChange1 = (val)=> {//修改表单的地区下拉框
  form.editForm.address = chinaData[val[0]].label + '' + chinaData[val[1]].label + '' + chinaData[val[2]].label
}

const formLabelWidth = '80px'//新增地址表单的框宽度

interface Address {
  userId: number,
  linkman: string,
  linkmanPhone: string,
  address: string,
  detailAddress: string,
  addressId: number,
}
let RegularInfo: Address[] = reactive([])
const size= ref('500px')

// const tableData: Address[] = [
//   {
//     userId: regularInfo.userId,
//     linkman: regularInfo.linkman,
//     linkmanPhone: regularInfo.linkmanPhone,
//     address: regularInfo.address,
//     detailAddress: regularInfo.detailAddress,
//   }
// ]
const tableRowClassName = (row: Address, rowIndex: number) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const _search = ''//搜索
const dialogVisibleEdit = ref(false)//打开编辑弹窗
const form = reactive({
  editForm: {} as Address,
  addForm: {} as Address,
})

//查询所有地址
onMounted(()=>{
  request.get("/address-info-entity/getMyAddressInfo/"+regularInfo.regularUserId).then(res => {
    console.log(res.data)
    // RegularInfo.splice(0, RegularInfo.length)//清空表格
    RegularInfo.push(...res.data)//重新加载数据
  })
})

const onSubmit = () => {//提交新增地址
  console.log('submit!')
}

const updateForm = () => {//提交编辑地址
  console.log('submit!')
  request.put("/address-info-entity/updateAddressInfo", form.editForm).then(res => {
    console.log(res.data)
    dialogVisibleEdit.value = false
    request.get("/address-info-entity/getMyAddressInfo/"+regularInfo.regularUserId).then(resp => {
      console.log(res.data)
      RegularInfo.splice(0, RegularInfo.length)//清空表格
      RegularInfo.push(...resp.data)//重新加载数据
    })
  })
}

const handleEdit = (row: Address) => {//打开编辑弹窗
  dialogVisibleEdit.value = true
  form.editForm = row
}

function cancelClick() {
  drawer.value = false
}
function confirmClick() {
  ElMessageBox.confirm(`确认提交吗？`)
      .then(() => {
        drawer.value = false
        form.addForm.userId= regularInfo.regularUserId
        request.post("/address-info-entity/addAddressInfo", form.addForm).then(res => {
          request.get("/address-info-entity/getMyAddressInfo/"+regularInfo.regularUserId).then(resp => {
            RegularInfo.splice(0, RegularInfo.length)//清空表格
            RegularInfo.push(...resp.data)//重新加载数据
          })
        })
      })
      .catch(() => {
        // catch error
      })
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您所做的修改将不会被保存，是否继续？', '提示')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

const handleDelete = (id) => {//删除地址
  console.log("删除")
  request.delete("/address-info-entity/deleteAddressInfo/"+id).then(res => {
    request.get("/address-info-entity/getMyAddressInfo/"+regularInfo.regularUserId).then(resp => {
      RegularInfo.splice(0, RegularInfo.length)//清空表格
      RegularInfo.push(...resp.data)//重新加载数据
    })
  })
}
const handleDefault = (id) => {//设为默认地址
  console.log("设置默认地址成功")
}

const drawer = ref(false)//新增地址弹窗



</script>


<style scoped>
.el-card {
  min-width: 380px;
  margin-right: 20px;
  transition: all .5s;
  margin-top: 20px;
  margin-left: 20px;
}
.el-card:hover{
  margin-top: 5px;
}
</style>