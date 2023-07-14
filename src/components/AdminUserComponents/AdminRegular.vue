<template>

  <div class="user">
    <!--表格-->
    <div style="margin: 10px 0">
      <el-input v-model="_search" placeholder="请输入关键字" style="width: 30%;padding-left: 1%" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
      <el-button type="primary" @click="addRegularUser">新增</el-button>
    </div>

    <!--    新增表单-->
    <el-dialog
        v-model="dialogVisible"

        title="Tips"
        width="30%"
        :before-close="handleClose"
    >

      <el-form :model="form" label-width="120px">
        <!--                      和数据库的名字一一对应-->
        <el-form-item label="用户编号">
          <el-input v-model="form.addForm.regularUserId" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.addForm.username" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.addForm.gender" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.addForm.phone" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.addForm.email" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="form.addForm.birthday" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.addForm.avatar" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-input v-model="form.addForm.grade" style="width: 70%"/>
        </el-form-item>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="sureAdd">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!--修改表单-->
    <el-dialog
        v-model="dialogVisibleEdit"
        title="Tips"
        width="30%"
        :before-close="handleClose"
    >

      <el-form :model="form" label-width="120px">
        <!--                      和数据库的名字一一对应-->
        <el-form-item label="用户编号">
          <el-input v-model="form.editForm.regularUserId" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.editForm.username" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.editForm.gender" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.editForm.phone" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.editForm.email" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="生日">
          <el-input v-model="form.editForm.birthday" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="头像">
          <el-input v-model="form.editForm.avatar" style="width: 70%"/>
        </el-form-item>
        <el-form-item label="用户等级">
          <el-input v-model="form.editForm.grade" style="width: 70%"/>
        </el-form-item>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
      </template>
    </el-dialog>


    <!--表格主体-->
    <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          type="index"
          width="30%">
      </el-table-column>

      <el-table-column
          prop="regular_user_id"
          label="用户编号"
          align="center"
          width="100px"
      >
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名称"
          align="center"
          width="100px"
      >
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          align="center"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="birthday"
          label="用户生日"
          align="center"
          width="100"
      >
      </el-table-column>

      <el-table-column
          prop="grade"
          label="用户等级"
          align="center"
          width="100px"
      >
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
          align="center"
          width="100px"
      >
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          align="center"
          width="100px"
      >
      </el-table-column>
      <el-table-column
          prop="avatar"
          label="用户头像"
          align="center"
          width="100"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="420px">
        <template #default="scope">
          <el-popconfirm title="确认删除吗" @confirm="">
            <template #reference>
              <el-button size="small" icon="delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm title="确认查封吗" @confirm="handleBanned(scope.row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="CircleClose">查封</el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script setup lang="ts">
import {request} from "@/utils/request";
import {reactive, ref} from "vue";
import {ElMessageBox} from "element-plus";

interface Regular {
  regularUserId: string,
  username: string,
  gender: string,
  avatar: string,
  phone: string,
  email: string,
  grade: string,
  birthday: string,
}

const tableRowClassName = (row: Regular, rowIndex: number) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData: Regular[] = [
  {
    regularUserId: '11',
    username: '1',
    gender: '1',
    avatar: '1',
    phone: '1',
    email: '1',
    grade: '1',
    birthday: '1',
  },

]
const created = () => {//不要写在methods里面
  this.load()
}

const _search = ''//搜索
const dialogVisible = ref(false)//打开新增弹窗
const dialogVisibleEdit = ref(false)//打开编辑弹窗
const form = reactive({
      editForm: {} as Regular,
      addForm: {} as Regular,
    }
)

const load = () => {//加载数据
  request.get("/regular-user-entity/getAllRegularUser").then(res => {
    console.log(res)
    if (res.data.code === '0') {
      tableData.splice(0, tableData.length)//清空表格
      tableData.push(...res.data.data)//重新加载数据
    }
  })
}

//查封用户
const handleBanned=(id)=>{
  console.log("查封")
}

const handleClose = (done: () => void) => {//确认关闭新增表单
  ElMessageBox.confirm('确认关闭弹窗吗?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}

//新增用户
const addRegularUser = () => {
  form.addForm.regularUserId = ''
  form.addForm.username = ''
  form.addForm.gender = ''
  form.addForm.avatar = ''
  form.addForm.phone = ''
  form.addForm.email = ''
  form.addForm.grade = ''
  form.addForm.birthday = ''
  dialogVisible.value = true;//打开弹窗
}
const sureAdd = () => {//确认新增
  request.post("/regular-user-entity/addRegularUser", this.form.addForm).then(res => {// /user对应controller里的requestMapping,用户属性都绑定在form这个json格式里面
    console.log(res)
    if (res.data.code === '0') {//如果后台运行成功会返回0，表示更新成功
      this.$message({
        type: "success",
        message: "新增成功！！"
      })
    } else {
      this.$message({
        type: "error",
        message: res.data.message
      })
    }
    this.load()//刷新页面表格数据
    this.dialogVisible = false//自动关闭编辑弹窗
  })
}


//修改
const handleEdit = (row:Regular) => {
  form.editForm = JSON.parse(JSON.stringify(row))//这里是深拷贝
  dialogVisibleEdit.value = true
}

//确认修改
const sureHandleEdit= () => {
  request.put("/regular-user-entity/updateRegularUser", this.form.editForm).then(res => {// /user对应controller里的requestMapping,用户属性都绑定在form这个json格式里面
    console.log(res)
    if (res.data.code === '0') {//如果后台运行成功会返回0，表示更新成功
      this.$message({
        type: "success",
        message: "更新成功！！"
      })
    } else {
      this.$message({
        type: "error",
        message: res.data.message
      })
    }
    this.load()//刷新页面表格数据
    dialogVisibleEdit.value = false//自动关闭编辑弹窗
  })
}

const deleteEntity=reactive({}) as Regular//删除用户
const deleteRegularVisible=ref(false)//打开删除弹窗


const sureHandleDelete = (id) => {
  console.log(id)
  request.delete("/regular/delete" + id).then(res => {//通过映射让后台获取到id
    if (res.data.code === '0') {
      this.$message({
        type: "success",
        message: "删除成功！！"
      })
    } else {
      this.$message({
        type: "error",
        message: res.data.message
      })
    }
    this.load()//刷新页面表格数据
  })
}


</script>
z

<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>