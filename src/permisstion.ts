// 路由鉴权 路由能不能被访问
import router from "./router";
// 进度条
//@ts-ignore
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

import { createPinia } from "pinia";
import useUserStore from "@/store/user";
const userStore = useUserStore(createPinia());

Nprogress.configure({ showSpinner: false });
// 全局路由守卫
// 前置
router.beforeEach((to, from, next) => {
  Nprogress.start();
  //   是否登录
  let flag = JSON.parse(localStorage.getItem("userInfo") as string);
  if (flag == null) {
    // 未登录
    const toPathArr = [
      "/hospital/search",
      "/hospital/close",
      "/hospital/notice",
      "/hospital/detail",
      "/hospital/register",
      "/home",
    ];
    if (toPathArr.includes(to.path)) {
      next();
    } else {
      userStore.dialogTableVisible = true;
      next({ path: "/home" });
    }
  } else {
    // 已登陆
    next();
  }
});
// 后置
router.afterEach((to, from) => {
  Nprogress.done();
  document.title = to.meta.title as string;
});
