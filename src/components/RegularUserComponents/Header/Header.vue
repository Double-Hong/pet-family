<template>
    <div style="margin-top:5px">
       <div class="Userheader-left" >
         <span>中国大陆</span>
         <span style="margin-left: 20px;">账号</span>
         <span style="margin-left: 20px;">逛宠物之家</span>
         <span style="margin-left: 20px;">网页无障碍</span>
       </div>
       <div class="Userheader-right">

        <span><el-link @click="router.push('/shopping-cart')" target="_blank">购物车</el-link></span>
        <span style="margin-left: 20px;">
          <el-link @click="router.push('/myOrder')" target="_blank">订单</el-link>
        </span>
       </div>
    </div>
</template>

<style>
.Userheader-left{
    margin-left: 100px;
    float: left;
}
.Userheader-right{
    float: right;
    margin-right:100px;
}
</style>
<script setup>
import router from "@/router";
</script>