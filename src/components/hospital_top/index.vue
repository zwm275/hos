<template>
  <div class="top">
    <div class="countent">
      <span @click="gotoHome"
        ><img src="@/assets/images/logo.png" alt=""
      /></span>
      <span>医疗连接 预约挂号统一平台</span>
      <a>帮助中心</a>
      <a @click="showLogin" v-if="JSON.stringify(userStore.userInfo) == '{}'"
        >登录/注册</a
      >
      <el-dropdown v-else>
        <span class="el-dropdown-link">
          {{ userStore.userInfo.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goUser('certification', '1')"
              >实名认证</el-dropdown-item
            >
            <el-dropdown-item @click="goUser('order', '2')"
              >挂号订单</el-dropdown-item
            >
            <el-dropdown-item @click="goUser('patient', '3')"
              >就诊人管理</el-dropdown-item
            >
            <el-dropdown-item divided @click="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import useUserStore from "@/store/user";
import { ArrowDown } from "@element-plus/icons-vue";

const router = useRouter();

const userStore = useUserStore();

const gotoHome = () => {
  router.push("/home");
};
// 弹出登录界面
const showLogin = () => {
  userStore.dialogTableVisible = true;
};
// 跳转用户界面
const goUser = (path: string, index: string) => {
  router.push({ path: "/user/" + path, query: { highlight: index } });
};
// 退出登录
const exit = () => {
  localStorage.removeItem("userInfo");
  userStore.userInfo = {};
  router.push({
    path: "/home",
  });
};
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  box-shadow: 0px 1px 5px #aaa;
  a {
    font-size: 14px;
    color: #666;
  }
  .countent {
    width: 1200px;
    height: 70px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .countent span:nth-child(1) img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .countent span:nth-child(2) {
    flex: 1;
    font-size: 22px;
    color: #55a6fe;
  }
  .countent a:nth-of-type(1) {
    margin-right: 10px;
    cursor: pointer;
  }
  .countent a:nth-of-type(2) {
    cursor: pointer;
  }
}
</style>
