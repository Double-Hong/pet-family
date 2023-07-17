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
</template>

<script setup lang="ts">

import Header from "@/components/RegularUserComponents/Header/Header.vue";
import Main from "@/components/RegularUserComponents/Main/Main.vue"
</script>

<style>
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

</style>