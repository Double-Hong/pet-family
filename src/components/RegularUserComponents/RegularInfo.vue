<template>
  <!--  <h1>个人信息</h1>-->


  <MyAvatar
      :url="regularData.loginData.avatar"
  />

  <div >
    <el-descriptions :border="true" :column="2" size="large" title="个人主页" style="font-size: 1.5em">
      <template v-slot:title>


        <div style="text-align: center;width: 100%;position: absolute;">
          个人信息
          <el-button @click="editInfo" style="position: absolute;right: 5%">
            <setting theme="outline" size="24" fill="#333" :strokeWidth="2"/>
          </el-button>
        </div>
        <br>
      </template>
      <el-descriptions-item label="姓名" width="100px">
        <template v-slot:label>
          <!--          <me style="position: absolute;" id="icon1" theme="outline" size="30" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>-->
          <!--          <label style="position:absolute;left: 20%">姓名</label>-->
          <!--          <br>-->
          <div style="text-align: center">
            <worker theme="outline" style="position: absolute;" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">登录名</label>
          </div>

        </template>
        <span style="font-size: 1.5em">{{ regularData.loginData.username }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="登录名" width="100px">
        <template v-slot:label>
          <div style="text-align: center">
            <me style="position: absolute;" theme="outline" size="28" fill="#333" strokeLinecap="butt"
                :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">姓名</label>
          </div>

        </template>
        <span style="font-size: 1.5em">{{ regularData.regular.regularName }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="登录名" width="100px">
        <template v-slot:label>
          <div style="text-align: center;">
            <avatar style="position:absolute;" theme="outline" size="28" fill="#000000" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">昵称</label>
          </div>

        </template>
        <span style="font-size: 1.5em">{{ regularData.regular.nickname }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <template v-slot:label>
          <div style="text-align: center">
            <male v-if="regularData.loginData.gender==='男'" style="position: absolute;" theme="outline" size="28"
                  :strokeWidth="2"
                  fill="#333"/>
            <female v-else-if="regularData.loginData.gender==='女'" theme="outline" style="position: absolute;"
                    size="28"
                    :strokeWidth="2"
                    fill="#333"/>
            <help v-else theme="outline" style="position: absolute;" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">性别</label>
          </div>
        </template>
        <el-tag style="font-size: 1.5em">{{ regularData.loginData.gender }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="电话">
        <template v-slot:label>
          <div style="text-align: center">
            <phone-telephone style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">电话</label>
          </div>

        </template>
        <span style="font-size: 1.5em">{{ regularData.loginData.phone }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        <template v-slot:label>
          <div style="text-align: center">
            <mail style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">邮箱</label>
          </div>

        </template>
        <span style="font-size: 1.5em">{{ regularData.loginData.email }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="生日">
        <template v-slot:label>
          <div style="text-align: center">
            <mail style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label style="font-size: 1.5em">生日</label>
          </div>

        </template>
        <span style="font-size: 1.5em">{{ regularData.regular.birthday }}</span>
      </el-descriptions-item>

    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";
import {reactive} from "vue";
import {request} from "@/utils/request";
import {
  Me,
  Worker,
  Male,
  Female,
  PhoneTelephone,
  Mail,
  Avatar,
  Classroom,
  AllApplication,
  AlignTextCenterOne,
  Help,
  Setting,
  Edit,
  School,
} from "@icon-park/vue-next";
import {ElMessage} from "element-plus";
import MyAvatar from "@/components/RegularUserComponents/MyAvatar.vue"
import {useUserStore} from "@/stores/UserStore";
import type {regularInfo} from "@/pojo/data-entity";

const loginId = ref(1)

interface Login {
  loginId: string,
  username: string,
  password: string,
  gender: string,
  avatar: string,
  phone: string,
  email: string,
  grade: string,
}

interface RegularUser {
  regularUserId: string,
  birthday: string,
  loginId: string,
  nickname: string,
  regularName: string,
}

interface userInfo {
  coachId: string,
  coachName: string,
  email: string,
  gender: string,
  introduction: string,
  password: string,
  phone: string,
  schoolName: string,
  teachingAge: string,
  type: string,
  username: string,

}


// const regularData = reactive({
//   loginData: {} as Login,
//   regular: {} as RegularUser
// })
const regularData = reactive({
  regular: {} as regularInfo,
})

onMounted(() => {
  // request.get("/login-entity/getLoginInfoById/" + loginId.value).then(res => {
  //   regularData.loginData = res.data
  //   request.get("/regular-user-entity/getRegularUserById/" + loginId.value).then(resp => {
  //     regularData.regular = resp.data
  //   })
  // })
  regularData.regular = useUserStore().getRegularUserInfo()
})

const userData = reactive({
  personInfo: {} as userInfo,
  editInfo: {} as userInfo
})

const editVisible = ref(false)
const editInfo = () => {
  editVisible.value = true
  userData.editInfo = JSON.parse(JSON.stringify(userData.personInfo))
}

const sureEdit = () => {
  request.post("/coach-entity/updateCoach", userData.editInfo).then(res => {
    if (res.data != null) {
      ElMessage({
        message: '修改成功',
        type: 'success',
        showClose: true,
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
        showClose: true,
      })
    }
    userData.personInfo = res.data
    editVisible.value = false
  })
}

const editIntroductionVisible = ref(false)
const editIntroduction = () => {
  userData.editInfo = JSON.parse(JSON.stringify(userData.personInfo))
  editIntroductionVisible.value = true
}

const sureEditIntroduction = () => {
  request.post("/coach-entity/updateCoach", userData.editInfo).then(res => {
    if (res.data != null) {
      ElMessage({
        message: '修改成功',
        type: 'success',
        showClose: true,
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error',
        showClose: true,
      })
    }
    userData.personInfo = res.data
    editIntroductionVisible.value = false
  })
}

</script>

<style scoped>


</style>
