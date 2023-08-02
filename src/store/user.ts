// 引入
import { defineStore } from "pinia";

// 1. 定义容器
const useUserStore = defineStore("User", {
  state: () => {
    return {
      // 控制登陆组件显示隐藏
      dialogTableVisible: false,
      // 用户信息
      userInfo: JSON.parse(localStorage.getItem("userInfo") as string) || {},
    };
  },
  getters: {},
  actions: {},
});
export default useUserStore;
