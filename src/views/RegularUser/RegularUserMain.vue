<template>
  <el-scrollbar>
  <div>
    <div>
      <el-affix :offset="0">
      <div class="header-zh">
        <Header />
      </div>
    </el-affix>
      <div class="main-zh">
        <Main />
      </div>
      <div class="footer-zh">Footer</div>
    </div>
  </div>
</el-scrollbar>
  <div ref="el" :style="style" style="position: fixed;z-index: 999" class="moving-icon">
    <el-link :underline="false" class="wyx-shop-cart" @mousedown.prevent="tabIn()" @mouseup.prevent="tabOut()">
      <img style="width: 80px" src="src/assets/shopping.png">
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
  initialValue: { x: 100, y: 400 },
})

const timeOutEvent = ref(0); //记忆触摸时长
const tabIn = ()=>{
  clearTimeout(timeOutEvent.value);//清除定时器
  timeOutEvent.value = setTimeout(()=>{
    timeOutEvent.value = 0;
    //这里写长按要执行的内容（尤如onclick事件）
    // console.log("长按");
  },300);//长按时间超过500ms，则执行传入的方法
}
const tabOut = ()=>{
clearTimeout(timeOutEvent.value);//清除定时器
  if(timeOutEvent.value !==0 ){
    //这里写要执行的内容（尤如onclick事件）
    useRegularStore().wyxDefineActive = "4"
    router.push("/shopping-cart")
  }
}

import Header from "@/components/RegularUserComponents/Header/Header.vue";
import Main from "@/components/RegularUserComponents/Main/Main.vue"
import router from "@/router";
</script>

<style scoped>
  .header-zh{
    background-color: #f6f6f6;
    color: #333;
    height: 30px;

  }
  .footer-zh {
    background-color: #B3C0D1;
    color: #333;
  }
  .main-zh {
    background-color: #eae8eb;
    color: #333;
    height: 1500px;

  }

.wyx-shop-cart:hover{
  border-radius: 10px 10px 0 0;
  box-shadow: #2c3e50;
}

  .moving-icon {
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation: move 10s infinite;
    animation-timing-function: ease-in-out
  }

  @keyframes move {
    0% {
      top: 25%;
      left: 10%;
    }
   50%{
     top: 25%;
     left: 89%;
   }
    100% {
      top: 25%;
      left: 10%;
    }
  }
</style>
