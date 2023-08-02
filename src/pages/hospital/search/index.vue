<template>
  <div class="header">
    <h1>{{ hospitalInfo.hospital?.hosname }} 查询/取消信息</h1>
    <el-empty description="暂无数据" />
  </div>
</template>

<script lang="ts" setup>
import useDetailStore from "@/store/hospitaiDetail";
import { storeToRefs } from "pinia";
const detailStore: any = useDetailStore();
// 解构
const { hospitalInfo } = storeToRefs(detailStore);
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
