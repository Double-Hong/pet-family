<template>
  <!--  顶部导航-->
  <div style="position: absolute;top: 0;left: 0;width: 100%;height: 11%">
    <RegularHeader/>
  </div>

  <div style="display:flex;">
    <div style="position: absolute;top: 11%;left: 0;width: 12%;height: 89%">
      <RegularAside/>
    </div>

    <div style="position: absolute;top:11%;left: 12%;width: 88%;height: 89%;overflow: scroll">
      <Supermarket v-if="store.contentVisible==1"/>
<!--      <RegularHome v-if="store.contentVisible==1"/>-->
      <RegularShoppingCart v-if="store.contentVisible==2"/>
      <RegularOrderInfo v-if="store.contentVisible==3"/>
      <RegularInfo v-if="store.contentVisible==4"/>
    </div>
  </div>
  <div ref="el" :style="style" style="position: fixed;" >
    <el-link :underline="false" class="wyx-shop-cart" @mousedown.prevent="tabIn()" @mouseup.prevent="tabOut()">
      <shopping-cart theme="outline" size="40" fill="#b3b3b3"/>
    </el-link>
  </div>
</template>

<script setup lang="ts">
import RegularHeader from "@/components/RegularUserComponents/RegularHeader.vue";
import Supermarket from "@/components/RegularUserComponents/Supermarket.vue";
import RegularAside from "@/components/RegularUserComponents/RegularAside.vue";
import {useRegularStore} from "@/stores/RegularUser"
import RegularShoppingCart from "@/components/RegularUserComponents/ShoppingCart/RegularShoppingCart.vue";
import RegularOrderInfo from "@/components/RegularUserComponents/RegularOrderInfo.vue";
import RegularInfo from "@/components/RegularUserComponents/RegularInfo.vue";
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'
import {ShoppingCart} from "@icon-park/vue-next";

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 200, y: 100 },
})

const timeOutEvent = ref(0); //记忆触摸时长
const tabIn = ()=>{
  clearTimeout(timeOutEvent.value);//清除定时器
  timeOutEvent.value = setTimeout(()=>{
    timeOutEvent.value = 0;
    //这里写长按要执行的内容（尤如onclick事件）
    // console.log("长按");
  },500);//长按时间超过500ms，则执行传入的方法
}
const tabOut = ()=>{
clearTimeout(timeOutEvent.value);//清除定时器
  if(timeOutEvent.value !==0 ){
    //这里写要执行的内容（尤如onclick事件）
    useRegularStore().wyxDefineActive = "4"
    console.log("你这是点击，不是长按");
  }
}

const store = useRegularStore()

</script>

<style scoped>
.wyx-shop-cart:hover{
  border-radius: 10px 10px 0 0;
  box-shadow: #2c3e50;
}
</style>
