<template>
  <h1>医院</h1>
  <div class="content">
    <div class="title">等级:</div>
    <div>
      <ul class="list">
        <li :class="{ active: activeFlag == '' }" @click="changeLevel('')">
          全部
        </li>
        <li
          v-for="item in levelArr"
          :key="item.id"
          @click="changeLevel(item.value)"
          :class="{ active: activeFlag == item.value }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="content">
    <div class="title">地区:</div>
    <div>
      <ul class="list">
        <li
          :class="{ active: regionActiveFlag == '' }"
          @click="changeRegionLevel('')"
        >
          全部
        </li>
        <li
          v-for="item in regionArr"
          :key="item.value"
          :class="{ active: regionActiveFlag == item.value }"
          @click="changeRegionLevel(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  HospitalLevelAndRegionResponseData,
  HospitalLevelAndRegionArr,
} from "@/api/home/type";
import { reqHospitalLevelAndRegion } from "@/api/home/index";
import { onMounted, ref } from "vue";

let levelArr = ref<HospitalLevelAndRegionArr>();
let regionArr = ref<HospitalLevelAndRegionArr>();

onMounted(() => {
  getHospitalLevelAndRegion();
});
// 获取等级和地区数据
const getHospitalLevelAndRegion = async () => {
  const LevelResult: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion("HosType");
  const regionResult: HospitalLevelAndRegionResponseData =
    await reqHospitalLevelAndRegion("Beijin");
  if (LevelResult.code == 200 && regionResult.code == 200) {
    levelArr.value = LevelResult.data;
    regionArr.value = regionResult.data;
  }
};
// 把等级和地区传给父组件
let emits = defineEmits(["levelAndRegion"]);
// 控制医院等级高亮
let activeFlag = ref<string>("");
const changeLevel = (level: string) => {
  activeFlag.value = level;
  // 把等级和地区传给父组件
  levelAndRegion();
};
// 控制地区高亮
let regionActiveFlag = ref<string>("");
const changeRegionLevel = (value: string) => {
  regionActiveFlag.value = value;
  // 把等级和地区传给父组件
  levelAndRegion();
};
// 把等级和地区传给父组件
const levelAndRegion = () => {
  emits("levelAndRegion", activeFlag.value, regionActiveFlag.value);
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 5px;
  color: #666;
  font-weight: 600;
}
.content {
  display: flex;
  color: #666;
  .title {
    margin-right: 10px;
    margin-bottom: 5px;
    width: 40px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 5px;
      &.active {
        color: #55a6fe;
      }
    }
    li:hover {
      color: #55a6fe;
    }
  }
}
</style>
