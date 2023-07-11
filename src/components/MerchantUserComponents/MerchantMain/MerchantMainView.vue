<script setup lang="ts">

</script>

<template>
  <div class="main-class">
    <el-container class="main-container">
      <el-header>
        <div class="main-header-left">
          <p>左侧</p>
        </div>
        <div class="main-header-main">
          <p>中间导航</p>
        </div>
        <div class="main-header-right">
          <p>右侧</p>
        </div>
      </el-header>
      <el-main>
        <div class="main-left">
          <p>左侧</p>
        </div>
        <div class="main-main">
          <p>main</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.main-class {
  width: 100%;
  height: 92%;
  margin: 0;
  padding: 0;
//background-color: #5b6de3;
}

.main-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
//background-color: #5b6de3;
}

.main-left {
  height: 100%;
  width: 15%;
  float: left;
  background-color: #5b6de3;
}

.main-main {
  height: 100%;
  width: 85%;
  float: left;
  background-color: #2c3e50;
}

.main-header-left {
  height: 100%;
  width: 20%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #5b6de3;
}

.main-header-main {
  height: 100%;
  width: 60%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #bdbbf8;
}

.main-header-right {
  height: 100%;
  margin: 0;
  width: 20%;
  padding: 0;
  float: left;
  background-color: rgba(227, 133, 133, 0.98);
}
</style>

<!--//.el-header{-->
<!--////background-color: #a60b0b;-->
<!--//  padding: 0;-->
<!--//  margin: 0;-->
<!--//}-->
<!--//.el-main{-->
<!--////background-color: #5b6de3;-->
<!--//  padding: 0;-->
<!--//  margin: 0;-->
<!--//  height: 100%;-->
<!--//}-->
