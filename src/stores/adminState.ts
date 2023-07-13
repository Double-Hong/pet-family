import {defineStore} from "pinia";
import {state} from "vue-tsc/out/shared";
import {ref} from "vue";

export const useAdminStore = defineStore("admin",()=>{
    const headerVis = ref(false)
    const contentVisible = ref(3)//中间页面的可见性
    const currentAdminName = ref("Hong")//当前管理员的姓名
    const currentMerchantId = ref(0)//当前商家的id
    const currentMerchantName = ref("Hong")//当前商家的名称
    const currentShopId = ref(0)//当前商家的店铺id
    const currentShopName = ref("Hong")//当前商家的店铺名称
    return{
        headerVis,contentVisible,currentAdminName,currentMerchantId,currentMerchantName,currentShopId,currentShopName,
    }
})