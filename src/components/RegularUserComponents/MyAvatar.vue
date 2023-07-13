<template>
  <el-avatar :size="150" :src="props.url" />
</template>

<script setup lang="ts">
import {ref} from "vue";

const url =ref('')

const props = defineProps(['url'])

</script>

<style scoped>

</style>