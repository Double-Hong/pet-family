<script setup lang="ts">
import RegularUserMain from "@/views/RegularUser/RegularUserMain.vue";
import Test from "@/components/RegularUserComponents/Test.vue";
import AdminUserView from "@/views/AdminUser/AdminUserView.vue";
</script>

<template>
  <div id="app">

<!--    <AdminUserView/>-->

<!--    <RegularUserMain />-->

    <RouterView />

<!--    <Test/>-->

  </div>
</template>

<style scoped>

</style>
