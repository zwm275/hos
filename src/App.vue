<template>
  <div class="container">
    <!-- 顶部 -->
    <HospitalTop></HospitalTop>
    <!-- 组件区域 -->
    <div class="content"><RouterView></RouterView></div>
    <!-- 底部 -->
    <HospitalBottom></HospitalBottom>
    <!-- 登录 -->
    <Login></Login>
  </div>
</template>

<script lang="ts" setup>
// import { onMounted } from "vue";
// import request from "./utils/request";

// onMounted(async () => {
//   let r = await request.get("/hosp/hospital/1/10");
//   console.log(r);
// });
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.content {
  margin-top: 71px;
  // background-color: red;
  width: 1200px;
  min-height: 700px;
}
</style>
