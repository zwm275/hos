// 引入
import { defineStore } from "pinia";
import type { DetailState } from "./interface/type";
import type { HosPitalDetail } from "@/api/hospital/type";

// 1. 定义容器
const useDetailStore = defineStore("Detail", {
  state: (): DetailState => {
    return {
      hospitalInfo: <HosPitalDetail>{},
      departmentArr: [],
    };
  },
  getters: {},
  actions: {},
});
export default useDetailStore;
