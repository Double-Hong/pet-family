<template>
  <div>
    <!-- <div class="loginbg">
      <img src="../assets/img/login.jpg" ref="img" />
    </div> -->
    <div style="">
      <div class="header-left">
        <img style="height: 40px;float: left;margin-left: 10%;margin-top: 5px;" src="/src/assets/logo.png" alt="">
        <img style="height: 40px;float: left;" src="/src/assets//logoText.png" alt="">
      </div>
    </div>
    <div>
      <div class="box0">
        <el-card class="loginCard" style="background-color: rgb(232, 229, 229);">
          <div style="float: left;margin-top: 10%;">
            <div style="font-size: 40px;margin-left: 5%;;color: gray;margin-top: -20px;position: absolute;;">Sign In
            </div>
            <div style="margin-left: 25%;color: gray;margin-top: 50px;position: absolute;">
              <p style="float: left;margin-left: -80%;" @click="flag = 'account'">账号登录</p>
              <p style="float: left;margin-left: 0%;" @click="flag = 'phonenumber'">手机登录</p>
            </div>
            <br><br><br>
            <div style="margin-top: 20%;" v-show="flag == 'account'">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                  <input
                      style="border-bottom: 1px solid #1a1717;border-top:0px;border-left:0px;border-right:0px;background:unset;outline:none;background-color:rgb(232, 229, 229)"
                      v-model="ruleForm.username">
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <input
                      style="border-bottom: 1px solid #1a1717;border-top:0px;border-left:0px;border-right:0px;background:unset;outline:none;background-color:rgb(232, 229, 229)"
                      v-model="ruleForm.password"
                      type="password">
                </el-form-item>
              </el-form>
            </div>


            <div style="margin-top: 20%;" v-show="flag == 'phonenumber'">
              <el-form :model="phoneForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="手机号" prop="phone">
                  <input
                      style="border-bottom: 1px solid #1a1717;border-top:0px;border-left:0px;border-right:0px;background:unset;outline:none;background-color:rgb(232, 229, 229)"
                      v-model="phoneForm.phone">
                </el-form-item>
                <el-form-item label="验证码" prop="key">
                  <input
                      style="border-bottom: 1px solid #1a1717;border-top:0px;border-left:0px;border-right:0px;background:unset;outline:none;background-color:rgb(232, 229, 229)"
                      v-model="phoneForm.key">
                </el-form-item>
                <div>
                  <el-button
                      v-bind:class="{ grey: isGrey, blue: !isGrey }"
                      v-bind:disabled="dis"
                      type="primary"

                      @click="sendSMS"
                      style="width: 20%;float: right; margin-left: 5px; margin-top: -15px;padding: 0;background-color: gray;height: 20px;">
                    <span v-if="show">发送</span>
                    <span v-else>({{ count }}s)</span>
                  </el-button>
                </div>
              </el-form>
            </div>
            <div>
              <div style="margin-left: 13%;margin-top: 12%;">
                <el-link href="/forget" target="_blank" style="color: gray; margin: 10px">忘记密码</el-link>
                <el-link href="/register" target="_blank" style="color: gray; margin: 10px">立即注册</el-link>

              </div>
              <el-button
                  round
                  v-show="flag == 'account'"
                  size="medium"
                  style="width: 85%; background-color:rgb(205, 202, 202);margin-left: 15%;margin-top: 2%; "
                  @click="loginUserName"
              >账号登录
              </el-button>

              <el-button
                  round
                  v-show="flag == 'phonenumber'"
                  size="medium"
                  style="width: 85%; background-color:rgb(205, 202, 202);margin-left: 15%;margin-top: 2%; "
                  @click="loginPhoneNumber"
              >手机登录
              </el-button>
            </div>
          </div>

          <div
              style="background-color: aqua;width: 65%;float: right;height: 550px;margin-top: -50px;margin-right: -50px;">
            <img style="width: 100%;height: 100%;"
                 src="src/assets/loginPhoto.jpg" alt="">
          </div>

        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request"
import router from "@/router";
import {useUserStore} from "@/stores/UserStore";

export default {

  data() {
    return {
      ruleForm: {
        username: null,
        password: null,
      },
      phoneForm: {
        phone: null,
        key: null,
      },
      Sms: {
        phone_number: null,
        code: null,
      },
      activeName: 'first',
      flag: 'account',
        show: true,
      isGrey: false, //按钮样式
      timer: null, //设置计时器
      dis: false,
      count: "",
    }
  },
  created() {
    localStorage.setItem("phone","1");
    localStorage.setItem("grade","1");
  },
  methods: {
    loginUserName() {
      request.post("/login-entity/Login/" + this.ruleForm.username + "/" + this.ruleForm.password).then(res => {
        if (res.data === "null" || res.data === "error") {
          this.$message.error('账号密码错误');
        } else {
          this.$notify({
            title: '成功',
            message: '登录成功！',
            type: 'success'
          });
          // 从登录接口获取到了 token
          const token = res.data;
          // 存储 token 到 localStorage
          localStorage.setItem('token', token);
          // 设置过期时间为 24 小时
          const expirationTime = new Date().getTime() + (2 * 60 * 60 * 1000);
          localStorage.setItem('expirationTime', expirationTime);
          // 设置定时器，在过期时间到达后删除 token
          if(res.message === "1"){
            request.post("/regular-user-entity/getUserInfo/"+localStorage.getItem('token')).then(res => {
              useUserStore().setRegularUserInfo(res.data)
              // console.log(res.data)
              // console.log(useUserStore().getMerchantUserInfo())
              this.$router.push("/regularUserMain")
            })
          } else if(res.message === "2"){
            request.post("/merchant-user-view-entity/getInfo/"+localStorage.getItem('token')).then(res => {
              useUserStore().setMerchantUserInfo(res.data)
              // console.log(res.data)
              // console.log(useUserStore().getMerchantUserInfo())
            })
            this.$router.push("/merch-grid-view")
          } else if(res.message === "3"){
            request.post("/administrator-entity/getUserInfo/" + localStorage.getItem("token")).then(res => {
              useUserStore().setAdminUserInfo(res.data)
            })
            this.$router.push("/admin")
          }
        }
      })
    },
    loginPhoneNumber() {
      if (this.phoneForm.phone == null || this.phoneForm.key == null) {
        this.$message({
          message: '请填写手机号或验证码',
          type: 'warning'
        });
      } else {
        if (this.phoneForm.key == this.Sms.code) {
          request.post("/login-entity/LoginByPhone/" + this.phoneForm.phone).then(res => {
            if (res.data == "null") {
              this.$message({
                message: '未查询到该号码，请先注册！',
                type: 'warning'
              });
            } else {
              this.$notify({
                title: '成功',
                message: '登录成功！',
                type: 'success'
              });
              // 从登录接口获取到了 token
              const token = res.data;
              // 存储 token 到 localStorage
              localStorage.setItem('token', token);
              // 设置过期时间为 24 小时
              const expirationTime = new Date().getTime() + (2 * 60 * 60 * 1000);
              localStorage.setItem('expirationTime', expirationTime);
              // 设置定时器，在过期时间到达后删除 token
              if(res.message === "1"){
                request.post("/regular-user-entity/getUserInfo/"+localStorage.getItem('token')).then(res => {
                  useUserStore().setRegularUserInfo(res.data)
                  // console.log(res.data)
                  // console.log(useUserStore().getMerchantUserInfo())
                  this.$router.push("/regularUserMain")
                })
              } else if(res.message === "2"){
                request.post("/merchant-user-view-entity/getInfo/"+localStorage.getItem('token')).then(res => {
                  useUserStore().setMerchantUserInfo(res.data)
                  console.log(useUserStore().getMerchantUserInfo())
                  // console.log(res.data)
                  // console.log(useUserStore().getMerchantUserInfo())
                })
                this.$router.push("/merch-grid-view")
              } else if(res.message === "3"){
                // request.post("/merchant-user-view-entity/getInfo/"+localStorage.getItem('token')).then(res => {
                //   // useUserStore().setAdminUserInfo(res.data)
                //   // console.log(res.data)
                //   // console.log(useUserStore().getMerchantUserInfo())
                // })
                this.$router.push("/admin")
              }

            }
          })
        } else {
          this.$message({
            message: '请填写正确的手机号或验证码',
            type: 'warning'
          });
        }
      }


    },
    sendSMS() {
      if (this.phoneForm.phone == null) {
        this.$message({
          message: '请填写正确的账号',
          type: 'warning'
        });
      } else {
        request.post("/login-entity/SelectPhone/" + this.phoneForm.phone).then(res => {
          if (res.data == "error") {
            this.$message({
              message: '未查询到该号码，请先注册！',
              type: 'warning'
            });
          } else {
            this.Sms.phone_number = this.phoneForm.phone
            this.Sms.code = res.data//拿到手机号和验证码
            request.post("/sms/sendCode", this.Sms).then(res => {
              let TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.isGrey = true;
                this.show = false;
                this.dis = true;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.dis = false;
                    this.isGrey = false;
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
            })
          }
        })

      }


    },
  },

}
</script>

<style>
.box0 {
  position: absolute;
  width: auto;
  height: auto;
  background-color: rgb(103, 93, 112);
  left: 40%;
  top: 35%;
  margin-left: -50px;
  margin-top: -50px;
  align-items: center;
  /* background: rgba(255, 255, 255, 0.1); */
  background-color: white;
  border-radius: 30px;
}

body {
  margin: 0;
}

.loginbg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
}

.loginbg img {
  width: 100%;
}

.loginbox {
  width: 500px;
  height: 300px;
  margin-top: 1px;
  border-radius: 10px;
  position: absolute;
  z-index: 1;
}

.loginCard {
  width: 1000px;
  height: 500px;
  margin-left: -300px;
  margin-top: -100px;
  border-radius: 20px;
  background-color: gray;
}

</style>
