<script setup lang="ts">
import {onMounted} from "vue";

const props = defineProps({
  nowShop: {
    type: String,
    required: true
  }
})

onMounted(()=>{
  console.log("nowShop: ", props.nowShop);
})
</script>

<template>
<h3>hello</h3>
</template>

<style scoped>

</style>
