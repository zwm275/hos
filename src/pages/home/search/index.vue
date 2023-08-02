<template>
  <div class="search">
    <el-autocomplete
      placeholder="请输入医院名称："
      v-model="hosName"
      :fetch-suggestions="querySearchAsync"
      @select="gotoDetail"
      :trigger-on-focus="false"
    />
    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import { reqHospitalInfo } from "@/api/home/index";
import { HospitalInfo } from "@/api/home/type";
import router from "@/router";

let hosName = ref("");
// 输入回调
const querySearchAsync = async (keyword: string, cd: any) => {
  let result: HospitalInfo = await reqHospitalInfo(keyword);
  console.log(keyword, result.data);
  // 整理数据 把hosName变成value
  let showData = result.data.map((item) => {
    return {
      value: item.hosname,
      hosCode: item.hoscode,
    };
  });
  cd(showData);
};

// 点击推荐项回调
const gotoDetail = (item: any) => {
  router.push({ path: "/hospital/register", query: { hoscode: item.hosCode } });
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  :deep(.el-autocomplete) {
    width: 600px;
    margin-right: 5px;
  }
}
</style>
