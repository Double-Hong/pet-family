<template>
  <div style="height: 100%;background-color: #ff5300;">
    <div style="background-color: #ff5300;height: 100px;"></div>

    <el-card style="width: 80%;height:60%;margin-top: 0;margin-left: 10%;background-color: blanchedalmond;">

      <template #header>
        <div class="card-header">
          <el-page-header @back="goBack" content="管理员信息资料卡"></el-page-header>
        </div>
      </template>
      <div style="text-align: center">
        <el-dropdown>
            <span class="el-dropdown-link">
              <el-image style="border-radius: 100%;height: 100px;width: 100px;" :preview-src-list="adminInfo.avatar"
                        size="large" :src="adminInfo.avatar"/>
            </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button style="color: gray;" type="text" @click="showAvatar">查看头像</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-upload
                    class="upload-demo"
                    action="http://localhost:9090/oss/upload"
                    :show-file-list="false"
                    :on-success="uploadAvatar">
                  <el-button style="color: gray;" type="text">更换头像</el-button>
                </el-upload>
              </el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-divider>
          <el-icon>
            <Avatar/>
          </el-icon>
        </el-divider>

        <el-descriptions
            class="margin-top"
            :column="3"
            :size="size"
            border
            style="width: 100%"
            title="基本信息">
          <template #extra>
            <el-button icon="Edit" @click="edit"></el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Flag/>
                </el-icon>
                账号
              </div>
            </template>
            {{ adminInfo.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Management/>
                </el-icon>
                邮箱
              </div>
            </template>
            {{ adminInfo.email }}
          </el-descriptions-item>

          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <male v-if="adminInfo.gender==='男'" theme="filled" size="15" fill="#000000" :strokeWidth="2"/>
                <female v-else-if="adminInfo.gender==='女'" theme="filled" size="15" fill="#000000"
                        :strokeWidth="2"/>
                <other v-else theme="filled" size="15" fill="#000000" :strokeWidth="2"/>
                性别
              </div>
            </template>
            {{ adminInfo.gender }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Key/>
                </el-icon>
                密码管理
                <el-button type="text" style="color: gray;" @click="dialogVisible = true">修改</el-button>
              </div>
            </template>
            ********
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <PhoneFilled/>
                </el-icon>
                联系电话
                <el-button type="text" style="color: gray;" @click="dialogVisible1 = true">修改</el-button>
              </div>
            </template>
            {{ adminInfo.phone }}
          </el-descriptions-item>

        </el-descriptions>
      </div>
    </el-card>


    <img src="/src/assets/cat.png" alt="">

    <!-- 修改密码 -->
    <el-dialog
        title="修改密码"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
    >
      <div style="margin-left: -30px;">
        <p style="font-size: 5px;margin-left: -35%;">
          请输入旧密码
        </p>
        <el-input
            placeholder="请输入旧密码"
            v-model="oldpassword"
            style="width: 70%; margin-left: 15%"
            show-password
        ></el-input>
        <div>
          <p style="font-size: 5px;margin-left: -38%;margin-top: 20px;">
            设置新密码
          </p>
          <el-input
              placeholder="请输入新密码"
              v-model="newpassword1"
              style="width: 70%; margin-left: 15%"
              show-password
              @input="checkPassword"
          ></el-input>
          <p style="font-size: 1px;color: red;margin-left: 20px;">{{ passwordError }}</p>
          <el-input
              placeholder="再次输入新密码"
              v-model="newpassword2"
              style="width: 70%; margin-left: 15%; margin-top: 10px;"
              show-password
          ></el-input>
          <div style="margin-left: 15%; font-size: 5px; margin-top: 10px">
            <p>密码由8以上位数字、字母组成</p>
            <p>含2种字符</p>
          </div>

          <el-button
              @click="sure"
              type="primary"
              style="margin-left: 15%; width: 60%; margin-top: 20px"
          >确定
          </el-button
          >
          <p style="font-size: 5px; margin-left: 15%; margin-top: 10px">
            安全提示：新密码请勿与旧密码过于相似！
          </p>
        </div>
      </div>
    </el-dialog>

    <!-- 编辑基本信息-->
    <el-dialog
        title="编辑基本信息"
        v-model="dialogVisible3"
        width="30%"
    >
      <el-form label-width="75">
        <el-form-item label="姓名">
          <el-input v-model="editAdmin.username" disabled/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editAdmin.gender">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="editAdmin.phone" clearable/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editAdmin.email" clearable/>
        </el-form-item>
        <el-button icon="Select" type="success" @click="sureEdit"></el-button>
        <el-button icon="Close" type="danger" @click="dialogVisible3=false"></el-button>
      </el-form>
    </el-dialog>


    <!-- 修改手机号 -->
    <el-dialog
        title="修改手机号"
        v-model="dialogVisible1"
        width="30%"
        :before-close="handleClose"
    >
      <el-form ref="form" :model="loginForm1" :rules="rules">
        <el-form-item
            style="margin-left: 15%; margin-top: -30px"
        >
          <div>
            <p style="font-size: 10px">
              请点击发送验证码到手机号<span style="color: burlywood">{{
                adminInfo.phone[0] +
                adminInfo.phone[1] +
                adminInfo.phone[2] +
                "******" +
                adminInfo.phone[9] +
                adminInfo.phone[10]
              }}</span
            >以验证身份
            </p>
          </div>
        </el-form-item>
        <div style="display: flex; margin-bottom: 20px">
          <el-input
              size="medium"
              style="flex: 2; margin-left: 15%"
              v-model="oldKey"
              prefix-icon="el-icon-key"
              placeholder="请输入验证码"
              prop="key">
          </el-input>
          <el-button
              v-bind:class="{ grey: isGrey, blue: !isGrey }"
              v-bind:disabled="dis"
              type="primary"
              @click="sendSMS"
              style="width: 25%; margin-left: 5px; padding: 0">
            <span v-if="show">发送验证码</span>
            <span v-else>重新发送({{ count }}s)</span>
          </el-button>
        </div>
        <div style="width: 70%; margin-left: 15%">
          <el-button
              :disabled="isDisabled"
              @click="next"
              type="primary"
              style="width: 80%; margin-top: 15px"
          >确定
          </el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 输入新的手机号 -->
    <el-dialog
        title="修改手机号"
        v-model="dialogVisible2"
        width="30%"
        :before-close="handleClose">
      <p
          style="
          margin-top: -5px;
          margin-left: -35%;
          font-size: 5px;
          margin-top: -10px;
        ">
        请输入新的手机号码
      </p>
      <el-input
          placeholder="请输入新的手机号码"
          v-model="newPhone"
          size="medium"
          style="width: 80%; margin-left: 15%"
      ></el-input>
      <div style="display: flex; margin-bottom: 20px;margin-top:20px">
        <el-input
            size="medium"
            style="flex: 2; margin-left: 17%;"
            v-model="newKey"
            prefix-icon="el-icon-key"
            placeholder="请输入验证码"
            prop="key"
        >
        </el-input>
        <el-button
            v-bind:class="{ grey: isGrey1, blue: !isGrey1 }"
            v-bind:disabled="dis1"
            type="primary"
            @click="sendSMS1"
            style="width: 25%; margin-left: 5px; padding: 0"
        >
          <span v-if="show1">发送验证码</span>
          <span v-else>重新发送({{ count1 }}s)</span>
        </el-button>
      </div>
      <div style="width: 70%; margin-left: 15%">
        <el-button
            :disabled="isDisabled"
            @click="ok"
            type="primary"
            style="width: 286px; margin-top: 15px"
        >确定
        </el-button
        >
      </div>

    </el-dialog>
    <el-dialog
        center
        width="30%"
        v-model="AvatardialogVisible"
    >
      <el-image :src="adminInfo.avatar"></el-image>
    </el-dialog>
  </div>

</template>

<script>
import request from "@/utils/request"
import {
  Male, Female, Other, Dog,
} from "@icon-park/vue-next";


export default {
  components: {Male, Female, Other, Dog},
  data() {
    return {
      AvatardialogVisible: false,
      adminInfo: {
        administratorId: 0, //管理员id
        userRights: "",  //用户权限
        loginId: 0, //登录id
        username: "", //用户名
        password: "", //密码
        gender: "", //性别
        avatar: "", //头像
        phone: "", //电话
        email: "", //邮箱
      },
      editAdmin: {
        administratorId: 0, //管理员id
        userRights: "",  //用户权限
        loginId: 0, //登录id
        username: "", //用户名
        password: "", //密码
        gender: "", //性别
        avatar: "", //头像
        phone: "", //电话
        email: "", //邮箱
      },
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      oldpassword: null,
      newpassword1: null,
      newpassword2: null,
      passwordError: "",
      Sms1: {
        phone_number: '',
        code: '',//旧电话的验证码
      },
      Sms2: {
        phone_number: '',
        code: ''//新电话的验证码
      },
      oldKey: '',
      newKey: '',
      newPhone: '',

      dis: false,
      show: true,
      isGrey: false, //按钮样式
      timer: null, //设置计时器,
      count: "",
      isDisabled: true,

      dis1: false,
      show1: true,
      isGrey1: false, //按钮样式
      timer1: null, //设置计时器,
      count1: "",
    }
  },

  created() {
    request.post("/administrator-entity/getUserInfo/" + localStorage.getItem("token")).then(res => {
      this.adminInfo = res.data
      console.log(res.data);
    })
  },
  methods: {
    showAvatar() {
      this.AvatardialogVisible = true
    },
    goBack() {
      this.$router.push("/admin")
    },
    uploadAvatar(file) {
      this.adminInfo.avatar = file.data
      request.post("/login-entity/UpdateAvatar", this.adminInfo).then(res => {
        this.$notify({
          title: '成功',
          message: '更换头像成功！',
          position: 'top-left'
        });
        location.reload()
      })
    },
    checkPassword() {
      const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!regex.test(this.newpassword1)) {
        this.passwordError = '密码必须包含字母和数字，且长度不少于8位';
      } else {
        this.passwordError = '';
      }
    },
    sure() {
      if (this.oldpassword == null) {
        this.$message({message: '请填写旧密码！', type: 'warning'});
      } else {
        if (this.oldpassword == this.adminInfo.password) {
          if (this.newpassword1 == null || this.newpassword2 == null) {
            this.$message({message: '请填写新密码和确认密码！', type: 'warning'});
          } else {
            if (this.newpassword1 == this.newpassword2) {
              if (this.newpassword1 == this.adminInfo.password) {
                this.$message({message: '新密码与旧密码一致，请重新输入！', type: 'warning'});
              } else {
                request.post("/login-entity/UpdatePassword/" + this.adminInfo.phone + "/" + this.newpassword1).then(res => {
                  this.$message({message: '修改成功！', type: 'success'});
                  location.reload()
                })
              }

            } else {
              this.$message({message: '两次密码不一致！', type: 'warning'});
            }
          }
        } else {
          this.$message({message: '旧密码错误！', type: 'warning'});
        }


      }
    },
    next() {
      this.dialogVisible2 = true
      this.dialogVisible1 = false
    },
    sendSMS() {
      this.isDisabled = false
      this.Sms1.phone_number = this.adminInfo.phone
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
        }, 1000)
      }
      request.post("/sms/getKey").then((res) => {
        this.Sms1.code = res.data;
        request.post("/sms/sendCode", this.Sms1).then((res) => {
        });
      });
    },

    sendSMS1() {
      this.isDisabled = false;
      this.Sms2.phone_number = this.newPhone
      let TIME_COUNT = 60;
      if (!this.timer1) {
        this.count1 = TIME_COUNT;
        this.isGrey1 = true;
        this.show1 = false;
        this.dis1 = true;
        this.timer1 = setInterval(() => {
          if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
            this.count1--;
          } else {
            this.dis1 = false;
            this.isGrey1 = false;
            this.show1 = true;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
      request.post("/sms/getKey").then((res) => {
        this.Sms2.code = res.data;
        request.post("/sms/sendCode", this.Sms2).then((res) => {
        });
      });
    },
    ok() {
      if (this.newKey == this.Sms2.code) {
        request.post("/login-entity/UpdatePhone/" + this.adminInfo.username + "/" + this.newPhone).then(res => {
          this.$message({message: '修改成功！', type: 'success'});
          location.reload()
        })
      } else {
        this.$message({message: '验证码错误！', type: 'success'});
      }
    },
    edit() {
      this.editAdmin.regularUserId = this.adminInfo.regularUserId
      this.editAdmin.birthday = this.adminInfo.birthday
      this.editAdmin.loginId = this.adminInfo.loginId
      this.editAdmin.regularName = this.adminInfo.regularName
      this.editAdmin.nickname = this.adminInfo.nickname
      this.editAdmin.username = this.adminInfo.username
      this.editAdmin.password = this.adminInfo.password
      this.editAdmin.gender = this.adminInfo.gender
      this.editAdmin.avatar = this.adminInfo.avatar
      this.editAdmin.phone = this.adminInfo.phone
      this.editAdmin.email = this.adminInfo.email
      this.editAdmin.grade = this.adminInfo.grade
      this.dialogVisible3 = true
    },
    sureEdit() {
      request.post("/administrator-entity/updateAdminInfo", this.editAdmin).then(res => {
        this.$message({message: '修改成功！', type: 'success'});
        this.adminInfo = res.data
        this.dialogVisible3 = false
      })
    }

  },

}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
