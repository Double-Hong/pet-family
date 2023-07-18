<template>
<div>
    <el-container>
        <el-header>
            <div class="header-left"  >
                <img style="height: 40px;float: left;margin-left: 10%;margin-top: 5px;" src="/src/assets/logo.png" alt="">
                <img style="height: 40px;float: left;" src="/src/assets//logoText.png" alt="">
            </div>
            <el-menu >
            <el-sub-menu index="2" class="header-right">
                <template #title><el-icon><Setting/></el-icon>设置</template>
                <el-menu-item index="2-1" @click="store.contentVisible=4"><el-icon size="28"><User /></el-icon><span>个人信息</span></el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3" @click="Out"><logout theme="outline" size="28" fill="#dd6675"/>&nbsp;&nbsp;<span style="color: #dd6675">登出</span></el-menu-item>
            </el-sub-menu>
            </el-menu>
        </el-header>
        <div>

            <el-main class="main">
               <el-header>
                  <h1 class="main-header-left">购物车(全部{{}})</h1>
                  <h1 class="main-header-right">已选金额:{{}}</h1>
                  <el-button class="main-header-right-button">结算</el-button>
               </el-header>
                <el-main align="left" style="width: 100%">
                 <el-scrollbar >
                     <div style="display: flex">
                         <el-col :span="4">
                             <el-checkbox
                                     style="margin-top: -10%"
                                     size="default"
                                     v-model="checkAll"
                                     :indeterminate="isIndeterminate"
                                     @change="handleCheckAllChange"
                             >全选</el-checkbox>
                         </el-col>
                         <el-col :span="6"><div class="grid-content ep-bg-purple" />
                          商品
                         </el-col>
                         <el-col :span="2"><div class="grid-content ep-bg-purple" />
                         数量
                         </el-col>
                         <el-col :span="2"><div class="grid-content ep-bg-purple" />
                             数量
                         </el-col>
                         <el-col :span="4"><div class="grid-content ep-bg-purple" />
                         操作
                         </el-col>


                     </div>
                     <el-card>
                         <div style="display:flex;">
                         <el-image>商店头像</el-image>
                         <h4 style="margin-left: 5%">商店名字</h4>
                         </div>
                     <el-checkbox-group
                             v-model="checkedCities"
                             @change="handleCheckedCitiesChange"
                     >

                      <el-card>
                                                   <el-checkbox v-for="city in tableData" :key="city" :label="city">
                                                       <el-row>
                                                           <el-col v-for="item in city">{{item}}</el-col>
                                                       </el-row>

                                                   </el-checkbox>
                      </el-card>
                     </el-checkbox-group>
                     </el-card>
                     </el-scrollbar>

                </el-main>
            </el-main>
        </div>

    </el-container>
</div>
</template>



<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {Logout} from "@icon-park/vue-next";
import {Setting, User} from "@element-plus/icons-vue";
import {useRegularStore} from "@/stores/RegularUser";
import router from "@/router";
import {ElMessage} from "element-plus";

const myPageInfo=reactive({
    regularUserId:12121,  //用户id 现在写死 以后从session中获取，写死的id用的闵二洪
})
const store = useRegularStore()
const shopList=ref([])
onMounted(() => {
  axios.get("http://localhost:9090/shopping-cart-entity/getShoppingCartViewByUserIdAndStoreId/"+myPageInfo.regularUserId).then(res=>{
    console.log(res.data.data)
  })
})

const Out = ()=>{
    store.contentVisible=1
    router.push("/")
    localStorage.removeItem("token")
    ElMessage({
        message: '登出',
        type: 'success'
    })
}

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref()
const   cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val: boolean) => {
    checkedCities.value = val ? tableData : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },


]

</script>


<style scoped>
.header-left {
    height: 100%;
    width: 20%;
    margin-top: 5px;
    padding: 0;
    float: left;

}
.main-header-left{
    float: left;
    margin-left: 1%;
    height: 100%;
}
.main-header-right-button{
    float: right;
    margin-right: 1%;
    margin-top: 2%;
    height: 100%;
    border-radius: 10px 10px 10px 10px;
}
.main-header-right{
    float: right;
    margin-right: 1%;
    height: 100%;
}
.header-right{
    height: 70%;
    width: 10%;
    margin-top: 5px;
    padding: 0;
    float: right;
}
.main{
    height: 100%;
    width: 60%;
    margin-top: 5%;
    margin-left: 20%;
    padding: 0;
    background-color: #c9b9b9;
    border-radius: 10px 10px 10px 10px;
}
</style>