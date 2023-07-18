<script setup lang="ts">
import type {shopInfo} from "@/pojo/data-entity";
import {computed, CSSProperties, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import router from "@/router";
import {useUserStore} from "@/stores/UserStore";

const body_style = computed((): CSSProperties => {
  return {
    padding: "0px",
  }
})

const store = useUserStore()

const allShopsInfo: shopInfo[] = reactive([])
const search = ref("")
const filterShopsInfo = computed(() => {
  return allShopsInfo.filter((item) => {
    return item.name.includes(search.value.toLowerCase())
  })
})

const jumpToShop = (shopId: number) => {
  router.push({
    path: "/merch-grid-view/shop-detail/"+shopId,
  })
}
onMounted(() => {
  console.log(store.getMerchantUserInfo())
  request.get("/shop-entity/selectShopByMerchantId/" + store.getMerchantUserInfo().merchantUserId).then((res) => {
    allShopsInfo.push(...res)
    // console.log(allShopsInfo)
  })
})
</script>

<template>
  <div class="show-shops-info">
    <el-row>
      <el-col :span="24">
        <el-space wrap :size="40">
          <el-col v-for="(item,index) in allShopsInfo">
            <el-card style="width: 250px;height: 250px;margin-top: 10px" :body-style="body_style">
              <el-image
                  :src="item.avatar"
                  class="image"
              />
              <div style="margin-top: 10px">
                <el-tooltip effect="dark" :content="item.introduce" placement="top">
                  <span >shop name: <br
                      >{{ item.name }}</span>
                </el-tooltip>
              </div>
              <div class="bottom">
                <el-text>{{ item.address }}</el-text>
                <el-button type="success" size="small" icon="More" @click="jumpToShop(item.id)"/>
              </div>
            </el-card>
          </el-col>
        </el-space>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>

.image {
  width: 100%;
  height: 150px;
}

.bottom {

  margin: 10px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
