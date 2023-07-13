import {defineStore} from "pinia";
import {ref} from "vue";


export const useRegularStore = defineStore('RegularUser', () => {
    const contentVisible = ref(1)

    return {contentVisible}
})