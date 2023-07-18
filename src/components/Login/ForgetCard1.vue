<template>
    <div>
        <div>
        <el-card class="ForgetCard">

          <el-steps :active=grade align-center style="margin-top:5%;">
            <el-step title="账号验证" ></el-step>
            <el-step title="手机验证" ></el-step>
            <el-step title="修改密码" ></el-step>
          </el-steps>


          <!-- 找回密码    -->
          <div style="width: 30%;margin-top: 5%;margin-left: 35%;" v-show="grade == 1">
            <span style="padding: 10px;">| 找回密码</span>
            <el-divider></el-divider>
            <div>
              <el-input
              prop="id" :rules="rules"
                placeholder="请输入账号"
                v-model="account"
                clearable
                style="width: 70%; margin-left: 15%; margin-top: 1%"
              >
              </el-input>
            </div>
            <div style="width: 70%; margin-left: 15%">
              <el-button
                round
                @click="next1"
                type="primary"
                style="width: 200px; margin-top: 25px;margin-left: 12%;"
                >下一步</el-button
              >
            </div>
          </div>

          <!-- 手机验证 -->
          <div style="width: 30%;margin-top: 5%;margin-left: 35%;" v-show="grade == 2">
            <span style="padding: 10px;">| 手机验证</span>
            <el-divider></el-divider>
            <div>
              <p style="font-size: 10px;margin-left: 15%;">请点击发送验证码到手机号<span style="color: burlywood;">
                {{ phone[0] + phone[1] + phone[2] + "******" + phone[9] + phone[10]}}
              </span>以验证身份</p>
            </div>
            <div style="display: flex; margin-top: 20px">
              <el-input
                size="medium"
                style="flex: 2;margin-left: 15%;"
                v-model="key"
                prefix-icon="el-icon-key"
                placeholder="请输入验证码"
                prop="key"
              >
              </el-input>
              <el-button
                v-bind:class="{ grey: isGrey, blue: !isGrey }"
                v-bind:disabled="dis"
                type="primary"
                @click="sendSMS"
                style="width: 25%;margin-left: 5px;padding: 0;">
                <span v-if="show">发送验证码</span>
                <span v-else>重新发送({{ count }}s)</span>
              </el-button>
            </div>
            <div style="width: 70%; margin-left: 15%">
              <el-button
                round
                @click="next2"
                type="primary"
                style="width: 200px; margin-top: 25px;margin-left: 12%;"
                >下一步</el-button>
            </div>
          </div>

          <!-- 修改密码 -->
          <div style="width: 30%;margin-top: 5%;margin-left: 35%;" v-show="grade == 3">
            <span style="padding: 10px;">| 修改密码</span>
            <el-divider></el-divider>
            <div>
              <el-input
              show-password
                placeholder="请输入新密码"
                v-model="newPassword1"
                style="width: 70%; margin-left: 15%; margin-top: 1%"
                @input="checkPassword"
              >
              </el-input>
              <p style="font-size: 1px;color: red;margin-left: 20px;">{{ passwordError }}</p>
              <el-input
              show-password
                placeholder="请确定新密码"
                v-model="newPassword2"
                style="width: 70%; margin-left: 15%; margin-top: 5%"
              >
              </el-input>
            </div>
            <div style="width: 70%; margin-left: 15%">
              <el-button
                round
                @click="next3"
                type="primary"
                style="width: 200px; margin-top: 25px;margin-left: 12%;"
                >确定</el-button
              >
            </div>
            </div>
        </el-card>
      </div>
    </div>
</template>

<script >
import request from "@/utils/request"
import router from "@/router";
    export default{
      data(){
        return{
            account:'',
            phone:'',
            Sms:{
              phone_number:'',
              code:'',//正确验证码
            },
            grade:1,//进度
            key:'',//输入验证码
            id:'',
            dis: false,
            show: true,
            isGrey: false, //按钮样式
            timer: null, //设置计时器,
            count: "",
            newPassword1:'',
            newPassword2:'',
            passwordError:"",
        }
      },
      created(){
        this.grade = localStorage.getItem("grade")
        this.phone = localStorage.getItem("phone")
      },
      methods:{
        checkPassword() {
              const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          if (!regex.test(this.newPassword1)) {
            this.passwordError = '密码必须包含字母和数字，且长度不少于8位';
          } else {
            this.passwordError = '';
          }
        },
        next1(){
            request.post("/login-entity/SelectUserName/" + this.account).then(res =>{
                if(res.data == "error"){
                    this.$message({
                    message: '未查询到该号码，请重新输入！',
                    type: 'warning'
                    });
                }else{
                    this.phone = res.data
                    localStorage.setItem("grade",'2')
                    localStorage.setItem("phone",this.phone)
                    location.reload()
                }
            })
        },
        next2(){
          if(this.key.length == 0){
                this.$message({
                message: '请输入验证码！',
                type: 'warning'
                });
          }else{
            if(this.key == this.Sms.code){
              localStorage.setItem("grade",3)
              location.reload()
            }else{
              this.$message({
                message: '验证码错误！',
                type: 'warning'
                });
            }
          }
        },
        next3(){
          if(this.newPassword1.length == 0 || this.newPassword2.length == 0){
                this.$message({
                message: '请输入新密码和确认密码！',
                type: 'warning'
                });
          }else{
            if(this.newPassword1 == this.newPassword2){
              request.post("/login-entity/UpdatePassword/" + localStorage.getItem("phone") + "/" + this.newPassword1).then(res =>{
                  this.$message({
                  message: '修改成功！',
                  type: 'success'
                  });
                  localStorage.setItem("grade",1)
                  localStorage.setItem("phone",0)
                  this.$router.push("/login")
              })

            }else{
              this.$message({
                message: '两次密码不一致！',
                type: 'warning'
                });
            }
          }
        },
        sendSMS() {
          this.isDisabled = false
          let TIME_COUNT = 60
          if (!this.timer) {
            this.count = TIME_COUNT
            this.isGrey = true
            this.show = false
            this.dis = true
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
              } else {
                this.dis = false
                this.isGrey = false
                this.show = true
                clearInterval(this.timer)
                this.timer = null
              }
            }, 1000);
          }
          request.post("/sms/getKey").then((res) => {
            this.Sms.phone_number = this.phone
            this.Sms.code = res.data
            request.post("/sms/sendCode",this.Sms).then(res =>{})
          });
        },
      },

    }
  </script>

<style>
.ForgetCard{
    height: 560px;
}
</style>
