<template>
  <div class="user">
    <!-- 导航菜单 -->
    <div class="menu">
      <div class="top">
        <el-icon><HomeFilled /></el-icon><span>/ 会员中心</span>
      </div>
      <el-menu
        :default-active="route.query.highlight || highlighting"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1" @click="changeRouter('certification')">
          <el-icon><Location /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changeRouter('order')">
          <el-icon><icon-menu /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="3" @click="changeRouter('patient')">
          <el-icon><document /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="4" @click="changeRouter('profile')">
          <el-icon><setting /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="5" @click="changeRouter('feedback')">
          <el-icon><Search /></el-icon>
          <span>意见反馈</span>
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
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Search,
  HomeFilled,
} from "@element-plus/icons-vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
// 导航栏高亮
let highlighting = ref("1");
// 改变导航栏路由跳转
const changeRouter = (index: string) => {
  //   highlighting.value = index;
  //   console.log(index);
  router.push({ path: "/user/" + index });
};
</script>

<style lang="scss" scoped>
.user {
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
