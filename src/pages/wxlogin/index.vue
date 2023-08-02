<template>
  <h1>wxlogin</h1>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.query);
// 本地存储
</script>

<style lang="scss" scoped></style>
