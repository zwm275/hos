import { createApp } from "vue";
import App from "@/App.vue";
import "@/style/reset.scss";
// element - plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 图标
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 路由
import router from "@/router";
// 路由守卫
import "./permisstion";
// 全局组件
import HospitalTop from "@/components/hospital_top/index.vue";
import HospitalBottom from "@/components/hospital_bottom/index.vue";
import Login from "@/components/login/index.vue";

//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// pinia
import { createPinia } from "pinia";
const app = createApp(App);
app
  .component("HospitalTop", HospitalTop)
  .component("HospitalBottom", HospitalBottom)
  .component("Login", Login)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(createPinia())
  .mount("#app");
