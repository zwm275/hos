<template>
  <div class="header">
    <h1>{{ hospitalInfo.hospital?.hosname }}</h1>
    <svg
      t="1689905100032"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2339"
      width="16"
      height="16"
    >
      <path
        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
        p-id="2340"
      ></path>
    </svg>
    <span>{{ hospitalInfo.hospital?.param.hostypeString }}</span>
  </div>
  <div class="content">
    <img
      class="left"
      :src="'data:image/jpeg;base64,' + hospitalInfo.hospital?.logoData"
      alt=""
    />
    <div class="right">
      <span>挂号规则</span>
      <p>
        预约周期：{{ hospitalInfo.bookingRule?.cycle }}天 放号时间：{{
          hospitalInfo.bookingRule?.releaseTime
        }}
        停挂时间：{{ hospitalInfo.bookingRule?.quitTime }}
      </p>
      <p>具体地址：{{ hospitalInfo.hospital?.param.fullAddress }}</p>
      <p>
        规划路线：{{ hospitalInfo.hospital?.address
        }}{{ hospitalInfo.hospital?.route }}
      </p>
      <p>退号时间：{{ hospitalInfo.bookingRule?.stopTime }}</p>
      <span>医院预约规则</span>
      <ol type="1">
        <li
          v-for="(item, index) in hospitalInfo.bookingRule?.rule"
          :key="index"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
  <div class="dapartment">
    <div class="leftNav">
      <ul>
        <li
          v-for="(item, index) in departmentArr"
          :key="item.depcode"
          :class="{ active: index == indexCurrent }"
          @click="changeActive(index)"
        >
          {{ item.depname }}
        </li>
      </ul>
    </div>
    <div class="right">
      <div
        class="department"
        v-for="items in departmentArr"
        :key="items.depcode"
      >
        <h1 class="cur">{{ items.depname }}</h1>
        <ul>
          <li
            v-for="item in items.children"
            :key="item.depcode"
            @click="showLogin(item.depcode)"
          >
            {{ item.depname }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useDetailStore from "@/store/hospitaiDetail";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import useUserStore from "@/store/user";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const detailStore: any = useDetailStore();
// 解构
const { hospitalInfo, departmentArr } = storeToRefs(detailStore);

// 控制高亮
let indexCurrent = ref(0);
const changeActive = (index: number) => {
  indexCurrent.value = index;
  // 滚动到对应科室位置
  let allH1 = document.querySelectorAll(".cur");
  allH1[indexCurrent.value].scrollIntoView({
    behavior: "smooth", //过渡动画
  });
};
// 点击一个科室的回调
// 弹出登录界面
const showLogin = (depcode: any) => {
  if (JSON.stringify(userStore.userInfo) == "{}") {
    userStore.dialogTableVisible = true;
  } else {
    router.push({
      path: "register_step1",
      query: {
        hoscode: route.query.hoscode,
        depcode,
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: start;
  align-items: center;
  h1 {
    font-size: 20px;
  }
  svg {
    margin: 0 5px;
  }
  span {
    font-size: 14px;
    line-height: 16px;
    color: #555;
  }
}
.content {
  display: flex;
  justify-content: start;
  margin-top: 20px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .right {
    margin-left: 30px;
    p,
    li {
      font-size: 14px;
      line-height: 20px;
      color: #555;
    }
    span {
      font-size: 16px;
      line-height: 30px;
    }
    ol {
      list-style: decimal;
      margin-left: 18px;
    }
  }
}
.dapartment {
  display: flex;
  margin: 30px 0;
  height: 420px;

  .leftNav {
    flex: 1;
    font-size: 14px;
    ul {
      li {
        background-color: #ddd;
        color: #333;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
      }
    }
    .active {
      background-color: #fff;
      border-left: red 2px solid;
      color: red;
    }
  }
  .right {
    flex: 6;
    flex-wrap: wrap;
    overflow: auto;
    // 隐藏滚动条
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    .department {
      h1 {
        background-color: #ddd;
        font-size: 14px;
        font-weight: 600;
        line-height: 35px;
        padding-left: 20px;
        color: #444;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;

        li {
          width: 30%;
          line-height: 20px;
          margin: 5px 0 5px 3%;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
