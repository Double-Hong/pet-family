import {defineStore} from "pinia";
import {ref,reactive} from "vue";



export const useRegularStore = defineStore('RegularUser', () => {
    const contentVisible = ref(1)
    const commodityId = ref(1)
    const shopId = ref(1)
    const userId = ref(12121)
    const storage = ref(0)
    const orderInfo = reactive({
        id:0,
        time:'',
        address:"",
        totalPrice:0,
        name:"",
        state:"",
        personId:0,
        phone:"",
        num:0,
    })
    const wyxDefineActive = ref('2')
    return {contentVisible,commodityId,userId,storage,orderInfo,shopId,wyxDefineActive}

})