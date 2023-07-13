<script setup lang="ts">
import type {FormInstance, FormRules, UploadProps} from "element-plus";
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";

const imageUrl = ref('')

import { Calendar, Search } from '@element-plus/icons-vue'
const userName = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')
const birthday = ref('')
const sex = ref('')
const avatar = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {       //上传头像
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入你的昵称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在3-5个字符', trigger: 'blur' },
  ],

  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择你的生日',
      trigger: 'change',
    },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))


</script>

<template>
  <el-card class="box-card" style="width: 50%;height:50%;margin-top: 5px;margin-left: 25%" >
    <template #header>
      <div class="card-header">
        <h3 style="text-align: center" >欢迎注册</h3>
      </div>
    </template>
    <div style="text-align: center" >

      <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"  alt="failed"/>
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <span style="font-size: 10px">上传用户头像</span>
      <el-divider/>

      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
      >
        <el-form-item label="你的昵称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="输入你的昵称"/>
        </el-form-item>
        <el-form-item label="性别" prop="region">
          <el-select v-model="ruleForm.region" placeholder="选择你的性别">
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>

        <el-form-item label="请选择生日" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                  v-model="ruleForm.date1"
                  type="date"
                  label="选择生日"
                  placeholder="选择你的生日"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>

        </el-form-item>
        <el-form-item label="你希望关注" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="宠物粮" name="type" />
            <el-checkbox label="宠物罐头" name="type" />
            <el-checkbox label="宠物玩具" name="type" />
            <el-checkbox label="宠物零食" name="type" />
            <el-checkbox label="宠物衣服" name="type" />
            <el-checkbox label="宠物用品" name="type" />
            <el-checkbox label="宠物清洁用品" name="type" />
          </el-checkbox-group>
        </el-form-item>


        <el-form-item align="center">
          <el-button type="primary" plain @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button type="primary" plain @click="resetForm(ruleFormRef)">取消注册</el-button>
        </el-form-item>

      </el-form>

    </div>
  </el-card>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>





