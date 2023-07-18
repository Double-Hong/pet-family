import {defineStore} from "pinia";
import {ref} from "vue";
import type {orderGoodsInfo, orderInfo} from "@/pojo/data-entity";

export const useCartStore = defineStore('cart', ()=> {

    const cartList = ref([{
        orderFormEntity: {} as orderInfo,
        list: [] as orderGoodsInfo[],
    }])

    const setCartList = (cartList) => {
        cartList.value = cartList;
    }

    const getCartList = () => {
        return cartList.value;
    }

    const orderVisible = ref(false)

    return{
        cartList,setCartList,getCartList,orderVisible
    }
})
