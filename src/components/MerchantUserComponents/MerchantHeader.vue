<template>
  <div class="header-class">
    <div class="header-left">
      <img style="height: 40px;float: left;margin-left: 10%;margin-top: 5px;" src="/src/assets/logo.png" alt="">
      <img style="height: 40px;float: left;" src="/src/assets//logoText.png" alt="">
    </div>
    <div class="header-main">
      <div class="bar">
        <form>
          <input type="text" placeholder="请输入您要搜索的内容...">
          <button type="submit"></button>
        </form>
      </div>
    </div>
    <div class="header-right">
      <el-dropdown>
            <span class="el-dropdown-link" style="margin-left: 100%;">
              <el-avatar size="large" :src="merchantView.avatar"/>
            </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="MerchantInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="outlogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request"

export default {

  created() {
    request.post("/merchant-user-view-entity/getInfo/" + localStorage.getItem("token")).then(res => {
      this.merchantView = res.data
    })
  },
  data() {
    return {
      merchantView: {
        merchantUserId: "",
        LoginId: "",
        gender: "",
        merchantName: "",
        username: "",
        email: "",
        merchantAddress: "",
        password: "",
        phone: "",
        avatar: "",
      },
    }
  },
  methods: {
    MerchantInfo() {
      this.$router.push("/merchantinfo")
    },
    outlogin() {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      this.$router.push("/login")
    },
    uploadAvatar(file) {
      this.avatar0.avatar = file.data
      request.post("/User/uploadAvatar", this.avatar0).then(res => {
        this.$notify({
          title: '成功',
          message: '更换头像成功！',
          position: 'top-left'
        });
        location.reload()
      })
    },

  },

}
</script>

<style scoped>
.header-class {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #F9F0DA;
}

.header-left {
  height: 100%;
  width: 20%;
  margin-top: 5px;
  padding: 0;
  float: left;

}

.header-main {
  height: 100%;
  width: 60%;
  margin: 0;
  padding: 0;
  float: left;

}

.header-right {
  height: 100%;
  margin-top: 10px;
  width: 20%;
  padding: 0;
  float: left;

}

.bar input {
  border: 2.5px solid #c5464a;
  border-radius: 20px;
  background-color: #fff;
  top: 0;
  width: 600px;
  height: 35px;
  margin-top: 5%;
  right: 0;
}

.bar button {
  background: #ff5300;
  border-radius: 20px;
  width: 60px;
  border: 0px;
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
