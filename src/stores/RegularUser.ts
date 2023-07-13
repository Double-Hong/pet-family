import {defineStore} from "pinia";
import {ref} from "vue";


export const useRegularStore = defineStore('RegularUser', () => {
    const contentVisible = ref(1)
    const commodityId = ref(1)
    const userId = ref(1)
    const storage = ref(0)
    return {contentVisible,commodityId,userId,storage}
})