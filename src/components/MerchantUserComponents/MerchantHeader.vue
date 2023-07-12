<script setup lang="ts">

</script>

<template>
  <div class="header-class">
        <div class="header-left">
          <p>左侧</p>
        </div>
        <div class="header-main">
          <p>main</p>
        </div>
        <div class="header-right">
          <p>右侧</p>
        </div>
  </div>
</template>

<style scoped>
.header-class {
  height: 100%;
  margin: 0;
  padding: 0;
//background-color: #a60b0b;
}

.header-left {
  height: 100%;
  width: 20%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #5b6de3;
}

.header-main {
  height: 100%;
  width: 60%;
  margin: 0;
  padding: 0;
  float: left;
  background-color: #bdbbf8;
}

.header-right {
  height: 100%;
  margin: 0;
  width: 20%;
  padding: 0;
  float: left;
  background-color: rgba(227, 133, 133, 0.98);
}
</style>
