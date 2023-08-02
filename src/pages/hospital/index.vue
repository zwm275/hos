<template>
  <div class="hospital">
    <!-- 导航菜单 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon><span>/ 医院详情</span>
      </div>
      <el-menu :default-active="route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/hospital/register"
          @click="changeActive('register')"
        >
          <el-icon><Location /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="changeActive('detail')">
          <el-icon><icon-menu /></el-icon>
          <span>预约详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/notice" @click="changeActive('notice')">
          <el-icon><document /></el-icon>
          <span>预约通知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/close" @click="changeActive('close')">
          <el-icon><setting /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/search" @click="changeActive('search')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 展示页面 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Search,
  HomeFilled,
} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { reqHospitalDetail, reqHospitalDepartment } from "@/api/hospital/index";
import useDetailStore from "@/store/hospitaiDetail";
const detailStore = useDetailStore();
let route = useRoute();

// 路由跳转
const changeActive = (path: string) => {
  router.push({
    path: `/hospital/${path}`,
    query: { hoscode: route.query.hoscode },
  });
};

onMounted(async () => {
  // 获取医院详情
  let result: any = await reqHospitalDetail(route.query.hoscode);
  detailStore.hospitalInfo = result.data;
  // 获取科室
  result = await reqHospitalDepartment(route.query.hoscode);
  detailStore.departmentArr = result.data;
});
</script>

<style lang="scss" scoped>
.hospital {
  display: flex;
  margin-top: 10px;
  .menu {
    flex: 1;
    .top {
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 14px;
    }
  }
  .content {
    flex: 4;
    margin-left: 30px;
    margin-top: 50px;
  }
}
</style>
