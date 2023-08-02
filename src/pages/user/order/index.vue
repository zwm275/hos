<template>
  <div v-if="!route.query.id"><AllOrder></AllOrder></div>
  <div v-else><Detail></Detail></div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import AllOrder from "./allOrder.vue";
import Detail from "./detail.vue";

const route = useRoute();
</script>

<style lang="scss" scoped></style>
