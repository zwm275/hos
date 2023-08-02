<template>
  <!-- 轮播 -->
  <Carousel></Carousel>
  <!-- 搜索 -->
  <Search></Search>
  <el-row :gutter="20">
    <el-col :span="20">
      <!-- 选项卡列表 -->
      <Level @levelAndRegion="getLevelAndRegion"></Level>
      <!-- 医院卡片列表 -->
      <Card :level="activeFlag" :region="regionActiveFlag"></Card>
    </el-col>
    <el-col :span="4"><Tip></Tip></el-col>
  </el-row>
</template>

<script lang="ts" setup>
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Level from "./level/index.vue";
import Card from "./card/index.vue";
import Tip from "./tip/index.vue";

import { ref } from "vue";

let activeFlag = ref<string>("");
let regionActiveFlag = ref<string>("");
const getLevelAndRegion = (level: any, region: any) => {
  activeFlag.value = level;
  regionActiveFlag.value = region;
};
</script>

<style lang="scss" scoped></style>
