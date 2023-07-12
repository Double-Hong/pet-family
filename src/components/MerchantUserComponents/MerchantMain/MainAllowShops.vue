<script setup lang="ts">
import type {shopInfo} from "@/pojo/data-entity";
import {computed, CSSProperties, onMounted, reactive, ref} from "vue";
import {request} from "@/utils/request";
import router from "@/router";

const body_style = computed((): CSSProperties => {
  return {
    padding: "0px",
  }
})

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
  request.get("/shop-entity/selectShopByMerchantId/" + 63201).then((res) => {
    allShopsInfo.push(...res.data)
    console.log(allShopsInfo)
  })
})
</script>

<template>
  <div class="show-shops-info">
    <el-row>
      <el-col :span="24">
        <el-space wrap :size="20">
          <el-col v-for="(item,index) in allShopsInfo">
            <el-card style="width: 250px;height: 250px" :body-style="body_style">
              <el-image
                  :src="item.avatar"
                  class="image"
              />
              <div style="margin-top: 10px">
                <el-tooltip effect="dark" :content="item.introduce" placement="top">
                  <span style="font-family: Arial,serif">shop name: <br
                      style="font-family: -apple-system,serif">{{ item.name }}</span>
                </el-tooltip>
              </div>
              <div class="bottom">
                <el-text style="font-family: Arial,serif">{{ item.address }}</el-text>
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
  margin-top: 3px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
