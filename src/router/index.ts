import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    meta: {
      title: "首页",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/pages/home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/hospital",
    name: "hospital",
    component: () => import("@/pages/hospital/index.vue"),
    children: [
      {
        path: "register",
        component: () => import("@/pages/hospital/register/index.vue"),
        meta: {
          title: "预约挂号",
        },
      },
      {
        path: "detail",
        component: () => import("@/pages/hospital/detail/index.vue"),
        meta: {
          title: "预约详情",
        },
      },
      {
        path: "notice",
        component: () => import("@/pages/hospital/notice/index.vue"),
        meta: {
          title: "预约通知",
        },
      },
      {
        path: "close",
        component: () => import("@/pages/hospital/close/index.vue"),
        meta: {
          title: "停诊信息",
        },
      },
      {
        path: "search",
        component: () => import("@/pages/hospital/search/index.vue"),
        meta: {
          title: "查询/取消",
        },
      },
      {
        path: "register_step1",
        component: () => import("@/pages/hospital/register/register_step1.vue"),
        meta: {
          title: "预约第一步",
        },
      },
      {
        path: "register_step2",
        component: () => import("@/pages/hospital/register/register_step2.vue"),
        meta: {
          title: "预约第二步",
        },
      },
    ],
  },
  {
    path: "/wxlogin",
    name: "wxlogin",
    component: () => import("@/pages/wxlogin/index.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/pages/user/index.vue"),
    children: [
      {
        path: "certification",
        component: () => import("@/pages/user/certification/index.vue"),
        meta: {
          title: "实名认证",
        },
      },
      {
        path: "order",
        component: () => import("@/pages/user/order/index.vue"),
        meta: {
          title: "挂号订单",
        },
      },
      {
        path: "patient",
        component: () => import("@/pages/user/patient/index.vue"),
        meta: {
          title: "就诊人管理",
        },
      },
      {
        path: "profile",
        component: () => import("@/pages/user/profile/index.vue"),
        meta: {
          title: "停诊信息",
        },
      },
      {
        path: "feedback",
        component: () => import("@/pages/user/feedback/index.vue"),
        meta: {
          title: "意见反馈",
        },
      },
    ],
  },
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

// 3导出路由   然后去 main.ts 注册 router.ts
export default router;
