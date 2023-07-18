

<template>
    <el-button style="float: left;margin:1%" @click="onLogin">返回登录</el-button>
    <div style="display: flex">

        <el-card style="border-radius: 20px;padding: 10px 10px 10px 10px;background-color: honeydew;width: 80%;margin-top: 1%;margin-left: 80px;height: 690px" >
            <p style="height: 100px;width: 120%;background-color: #8c939d;margin-top: -30px;margin-left: -30px">
                <span style="font-size: 30px;position: absolute;top: 30px;left: 700px;color: white">注 册</span>
            </p>
            <div style="height: 500px;width: 40%;border-radius: 20px;background-color: black;margin-left: 450px;position: absolute">
                <img style="width: 100%;height: 100%" src="../assets/register.jpg">
            </div>
          <div>
            <div style="float: left;margin: 3%" >
                <el-select  v-model="myPageInfo.userType" placeholder="选择用户类型">
                    <el-option
                            v-for="item in options"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-form :inline="false" v-model="register.registerInfo" style="width: 55%" >
                    <el-form-item label="性别" style="width: 100%" label-width="100px">
                        <el-select v-model="register.registerInfo.gender">
                            <el-option
                                    v-for="item in genderOptions"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item >
                    <el-form-item label="邮箱" style="width: 70%" label-width="100px">
                        <el-input style="" v-model="register.registerInfo.email" placeholder="输入您的邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" style="width: 70%" label-width="100px">
                        <el-input show-password v-model="register.registerInfo.password" placeholder="输入您的密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确定密码" style="width: 70%" label-width="100px">
                        <el-input show-password v-model="myPageInfo.confirmPwd" placeholder="再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item v-if="myPageInfo.userType==1" label="姓名" style="width: 70%" label-width="100px">
                        <el-input v-model="register.registerInfo.regularName" placeholder="输入您的姓名" ></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" v-if="myPageInfo.userType==1" style="width: 70%" label-width="100px">
                        <el-input v-model="register.registerInfo.nickname" placeholder="请输入昵称"></el-input>
                    </el-form-item >
                    <el-form-item label="生日" v-if="myPageInfo.userType==1" style="width: 70%" label-width="100px">
                        <el-date-picker
                                v-model="register.registerInfo.birthday"
                                type="date"
                                value-format="YYYY-MM-DD"
                                placeholder="选择你的生日"
                                size="large"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="商户名称" v-if="myPageInfo.userType==2" style="width: 70%" label-width="100px">
                        <el-input v-model="register.registerInfo.merchantName" placeholder="请输入商家昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="商户地址" v-if="myPageInfo.userType==2" style="width: 70%" label-width="100px">
                        <el-input v-model="register.registerInfo.merchantAddress" placeholder="请输入商家地址"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码"  style="width: 70%;display: flex" label-width="100px">
                        <el-input v-model="phoneForm.phone" ></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="key" label-width="100px">
                        <input
                                style="border-bottom: 1px solid #1a1717;border-top:0;border-left:0;border-right:0;height: 30px;outline:none;background-color:honeydew;"
                                v-model="phoneForm.key">
                        <el-button
                                v-bind:class="{ grey: isGrey, blue: !isGrey }"
                                v-bind:disabled="dis"

                                type="primary"
                                @click="sendSMS"
                                style="width: 10%;float: left; margin-left: 2%; margin-top: 1%;padding: 0;background-color: #ff5300;height: 25px;">
                            <span v-if="show">发送</span>
                            <span v-else>({{ timeStr }}s)</span>
                        </el-button>
                    </el-form-item>

                    <div style="margin-left: 2% ;">

                    </div>
                </el-form>
            </div>
              <div>
                    <el-button @click="onRegister" style="background-color: #F9F0DA;position: absolute;border-radius: 20px;;left: 330px;width: 200px">注册</el-button>
                </div>
            </div>
        </el-card>

    </div>

    <el-dialog
        title="注册成功"
        v-model="registerDialogVisible"
        center
        width="30%"
    >
        <el-text>你的账号是</el-text>
        <el-text>{{myPageInfo.userName}}</el-text>
     <template #footer>
         <el-button @click="onExc">确认</el-button>
     </template>
    </el-dialog>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import type {login, register} from "@/utils/interface";
import request from "@/utils/request";
import router from "@/router";
import {ElMessage} from "element-plus";
import axios from "axios";

const register=reactive({
    registerInfo:{} as register
})
const registerDialogVisible=ref(false)
let isGrey=false
let dis=false
let show= ref(true)

const Sms=reactive({
    phone_number:null,
    code:null,
})
const onExc=()=>{
    registerDialogVisible.value=false
    router.push('/login')
}
const loginInfo=reactive({
    loginEntity:{} as login
})

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const onRegister=()=>{
    register.registerInfo.phone=<string>phoneForm.phone
    register.registerInfo.grade=myPageInfo.userType
    const emailPattern: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if(register.registerInfo.gender==''){
        alert('请选择性别')
        return
    }
    if (register.registerInfo.phone==null){
        alert('请输入手机号')
        return
    }
    if (register.registerInfo.grade== null){
        alert('请选择用户类型')
        return
    }
    if (register.registerInfo.grade==1){
        if (register.registerInfo.regularName==null){
            alert('请输入姓名')
            return
        }
        if (register.registerInfo.nickname==null){
            alert('请输入昵称')
            return
        }
        if (register.registerInfo.birthday==null){
            alert('请输入生日')
            return
        }
    }
    if (register.registerInfo.grade==2){
        if (register.registerInfo.merchantName==null){
            alert('请输入商户名称')
            return
        }
        if (register.registerInfo.merchantAddress==null){
            alert('请输入商户地址')
            return
        }
    }

    if (!emailPattern.test(register.registerInfo.email)) {
        alert('请输入有效的邮箱地址');
        return;
    }

    if (!passwordPattern.test(register.registerInfo.password)) {
        alert('密码必须包含字母和数字，且长度不少于8位');
        return;
    }


    if (register.registerInfo.password !== myPageInfo.confirmPwd) {
        alert('两次输入的密码不一致');
        return;
    }
    console.log({
                loginEntity:register.registerInfo,
                birthday:register.registerInfo.birthday,
                regularName:register.registerInfo.regularName,
                nickname:register.registerInfo.nickname,
                merchantName:register.registerInfo.merchantName,
                merchantAddress:register.registerInfo.merchantAddress,})
    if (Sms.code==phoneForm.key ){
        axios.post("http://localhost:9090/login-entity/Register",{
            loginEntity:register.registerInfo,
            birthday:register.registerInfo.birthday,
            regularName:register.registerInfo.regularName,
            nickname:register.registerInfo.nickname,
            merchantName:register.registerInfo.merchantName,
            merchantAddress:register.registerInfo.merchantAddress,
        }).then(res=>{
            if (res.data.code==200) {
                registerDialogVisible.value=true
                myPageInfo.userName=res.data.data
                ElMessage({
                    message: '注册成功',
                    type: 'success'
                });
            }else {
                ElMessage({
                    message: '注册失败',
                    type: 'warning'
                });
            }
        })
    }else {
        ElMessage({
            message: '验证码错误',
            type: 'warning'
        });
    }
}

const myPageInfo=reactive({
    userType:'',
    confirmPwd:'',
    userName:'',
})
const onLogin=()=>{
    router.push('/login')
}
const phoneForm=reactive({
    key:null,
    phone:null,
})
const options=reactive([{
    value: '1',
    label: '用户'
},
    {
        value: '2',
        label: '商户'
    },
])
const genderOptions=reactive([{
    value: '男',
    label: '男'
},
    {
        value: '女',
        label: '女'
    },
])

let count=0
const timer = ref(59)
const time = ref(59)
const timeStr = computed(() => {
    let h = Math.floor(time.value / 3600)
    let m = Math.floor((time.value - h * 3600) / 60)
    let s = time.value - h * 3600 - m * 60
    return `${s}`
})
const start = () => {
    timer.value = setInterval(() => {
        if (time.value == 0) {
           stop()
            dis = false;
            isGrey = false;
            show.value = true;
            reset()
            return
        }else {
            time.value--
        }
    }, 1000)
}
const stop = () => {
    clearInterval(timer.value)
}
const reset = () => {
    time.value = 60
}
//将计时器时间转化为分钟
const timeToMinute = computed(() => {
    return Math.round(time.value / 60)
})
const   sendSMS=()=> {
    if (phoneForm.phone == null) {
        ElMessage({
            message: '请填写手机号码',
            type: 'warning'
        });
    } else {
        request.post("/login-entity/RegisterSelectPhone/" +phoneForm.phone).then(res => {
            if (res.data == "error") {
                ElMessage({
                    message: '查询该号码已注册！',
                    type: 'warning'
                });
            } else {
                Sms.phone_number = phoneForm.phone
                Sms.code = res.data//拿到手机号和验证码
                request.post("/sms/sendCode", Sms).then(res => {
                    let TIME_COUNT = 60;
                   console.log("qian进入")
                    // if (!timer) {
                        console.log("进入")
                        isGrey = true;
                        show.value = false;
                        dis = true;
                        start();
                        // timer= setInterval(() => {
                        //     if (count > 0 && count <= TIME_COUNT) {
                        //         count--;
                        //     } else {
                        //         dis = false;
                        //         isGrey = false;
                        //         show = true;
                        //         clearInterval(timer);
                        //         timer = null;
                        //     }
                        // }, 1000);
                    // }
                })
            }
        })

    }

}

</script>

<style scoped>

</style>