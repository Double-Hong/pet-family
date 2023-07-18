
<template>
<div>
    <div style="float: left ;margin-left: 5%;margin-block: 2%">
        <el-select v-model="selectValue" :placeholder="selectValue" >
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
    </div>
        <el-table :data="filterData" style="width: 100%"
                  :header-cell-style="{'background-color': '#ff5300', 'color': '#000'}"
        >
           <el-table-column
                    prop="orderId"
                    label="订单id"
                    width="auto"/>
            <el-table-column width="auto" label="商品id" prop="commodityId"/>
            <el-table-column width="auto" label="客户名" prop="nickname"/>
            <el-table-column label="客户附图" width="auto">
                <template #default="scope">

                    <el-image style="width: 50%;" v-if="scope.row.commentsPhoto!=''" :src="scope.row.commentsPhoto"></el-image>
                    <el-text v-else>客户未上传图片</el-text>
                </template>
            </el-table-column>
            <el-table-column width="auto" label="客户留言" prop="commentsContent"/>
            <el-table-column width="auto" label="客户评分" prop="grade"/>
            <el-table-column width="auto" label="客户评价时间" prop="time"/>
            <el-table-column width="auto" label="操作" >
                <template #default="scope">
                    <el-button type="primary" @click="handleReply(scope.row)">回复</el-button>
                </template>
            </el-table-column>
        </el-table>

     <el-dialog
      title="回复"
      v-model="replyDialogVisible"
      center
      width="40%"
     >
      <el-form :model="commentInfo.changeInfo" label-width="80px">
          <el-card style="margin:1%">
          <el-form-item label="订单号">
              <el-text>{{commentInfo.changeInfo.orderId}}</el-text>
          </el-form-item>
          </el-card>
          <el-card style="margin:1%">
          <el-form-item  label="图片" style="width: 40%">
              <el-image v-if="commentInfo.changeInfo.commentsPhoto!=''" :src="commentInfo.changeInfo.commentsPhoto"></el-image>
              <el-text v-else>客户未上传</el-text>
          </el-form-item>
              </el-card>
          <el-card style="margin:1%">
          <el-form-item label="客户评价">
              <el-text>{{commentInfo.changeInfo.commentsContent}}</el-text>
          </el-form-item>
              </el-card>
          <el-card style="margin:1%">
          <el-form-item label="回复">
              <el-text v-if="commentInfo.changeInfo.reply!=''">{{commentInfo.changeInfo.reply}}</el-text>
              <el-input type="textarea" v-else v-model="myPageInfo.reply" ></el-input>
          </el-form-item>
              </el-card>
          </el-form>
         <template #footer>
             <el-button @click="replyDialogVisible=false">取消</el-button>
             <el-button v-if="commentInfo.changeInfo.reply!=''" @click="replyDialogVisible=false">
                 确定
             </el-button>
             <el-button v-else @click="makeSureReply">确定</el-button>
         </template>

     </el-dialog>

</div>
</template>

<script setup lang="ts">

import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";
import type {commentView} from "@/utils/interface";
import {comStatus} from "@/pojo/interface";
import {ElMessage} from "element-plus";

const replyDialogVisible=ref(false)
const makeSureReply=()=>{
    commentInfo.changeInfo.reply=myPageInfo.reply
   axios.post("http://localhost:9090/comments-entity/updateCommentsById",commentInfo.changeInfo).then(res=>{
       if (res.data.code===200) {
           ElMessage.success("回复成功")
           replyDialogVisible.value=false
           commentsData.splice(0,commentsData.length)
           axios.get("http://localhost:9090/comments-order-form-entity/getCommentsByShopId/"+myPageInfo.shopId).then(res=>{
               commentsData.push(...res.data.data)
           })
       }
       else {
           console.log("回复失败")
       }
   })
}
const handleReply=(row)=>{
    replyDialogVisible.value=true
    commentInfo.changeInfo=row
}

const selectValue=ref('未答复')
const options = ref([
    {
        value: '未答复',
        label: '未答复'
    },
    {
        value: '已回复',
        label: '已回复'
    },
    {
        value: '全部',
        label: '全部'
    },

])
  const myPageInfo=reactive({
      shopId:5,  //固定死的商店id 需要传入商店id
      reply:'',
  })
const filterData=computed(()=>{
    return commentsData.filter(item=>{
        if (selectValue.value==='未答复') {
            return item.reply === ''
        }
        else if (selectValue.value==='已回复') {
            return item.reply !== ''
        }
        else {
            return true
        }
    })
})
const commentsData:commentView[]=reactive([])
const commentInfo=reactive({
    changeInfo:{} as commentView,
})
onMounted(()=>{
    axios.get("http://localhost:9090/comments-order-form-entity/getCommentsByShopId/"+myPageInfo.shopId).then(res=>{
        commentsData.push(...res.data.data)
    })
})
</script>


<style scoped>

</style>