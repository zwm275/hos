<template>
  <div class="wrap">
    <div class="header">
      {{ data.baseMap.hosname }} | {{ data.baseMap.bigname }} ·
      {{ data.baseMap.depname }}
    </div>
    <div class="center">
      <h1>{{ data.baseMap.workDateString }}</h1>
      <div class="content">
        <div
          class="card"
          :class="{
            active:
              item.status == 1 ||
              (item.status == 0 && item.availableNumber > -1),
            current: item.workDate == data.workData,
          }"
          v-for="(item, index) in data.bookingScheduleList"
          :key="index"
          @click="getHospitaiDoctor(item.workDate, item.status)"
        >
          <span>{{ item.workDate }} {{ item.dayOfWeek }}</span>
          <p class="datail">
            <span v-if="item.status == -1">停止挂号</span
            ><span v-if="item.status == 0">{{
              item.availableNumber == -1
                ? "约满了"
                : `有号（${item.availableNumber}）`
            }}</span
            ><span v-if="item.status == 1">即将放号</span>
          </p>
        </div>
      </div>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :size="pageSize"
        v-model:current-page="currentPage"
      />
    </div>
    <div class="will" v-if="data.willDoctor">
      {{ data.workData }} 08:30:00 放号
    </div>
    <div class="footer" v-else>
      <h1>上午号源</h1>
      <div class="detail" v-for="item in data.morningDoctorArr" :key="item.id">
        <div class="left">
          <span>{{ item.title }} | {{ item.docname }}</span>
          <p>{{ item.skill }}</p>
        </div>
        <div class="price">￥{{ item.amount }}</div>
        <el-button type="primary" @click="gotoStep2(item.id)"
          >剩余{{ item.availableNumber }}</el-button
        >
      </div>
      <h1>下午号源</h1>
      <div
        class="detail"
        v-for="item in data.afternoonDoctorArr"
        :key="item.id"
      >
        <div class="left">
          <span>{{ item.title }} | {{ item.docname }}</span>
          <p>{{ item.skill }}</p>
        </div>
        <div class="price">￥{{ item.amount }}</div>
        <el-button type="primary" @click="gotoStep2(item.id)"
          >剩余{{ item.availableNumber }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { reqHospitalWork, reqHospitalDoctor } from "@/api/hospital/index";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

// 当前页数
let currentPage = ref(1);
// 总条数
let total = ref(11);
// 一个展示条数
let pageSize = ref(6);
let data = reactive({
  baseMap: <any>{},
  bookingScheduleList: <any>[],
  // 医生数据
  willDoctor: <boolean>false,
  workData: <string>"",
  morningDoctorArr: <any>[],
  afternoonDoctorArr: <any>[],
});

watch(currentPage, () => {
  getHospitalWork();
});

onMounted(() => {
  getHospitalWork();
  const timer = setTimeout(() => {
    getHospitaiDoctor(
      data.bookingScheduleList[0].workDate,
      data.bookingScheduleList[0].status
    );
    clearTimeout(timer);
  }, 500);
});
// 获取数据存储
const getHospitalWork = async () => {
  let result = await reqHospitalWork(
    currentPage.value,
    pageSize.value,
    route.query.hoscode as string,
    route.query.depcode as string
  );
  total.value = result.data.total;
  data.baseMap = result.data.baseMap;
  data.bookingScheduleList = result.data.bookingScheduleList;
};
// 获取医生
const getHospitaiDoctor = async (workDate: string, status: number) => {
  data.workData = workDate;
  if (status == 1) {
    data.willDoctor = true;
    data.morningDoctorArr = [];
    data.afternoonDoctorArr = [];
  } else {
    data.willDoctor = false;
    data.morningDoctorArr = [];
    data.afternoonDoctorArr = [];
    let result = await reqHospitalDoctor(
      route.query.hoscode as string,
      route.query.depcode as string,
      workDate
    );
    result.data.forEach((item) => {
      if (item.workTime) {
        data.afternoonDoctorArr.push(item);
      } else {
        data.morningDoctorArr.push(item);
      }
    });
  }
};
// 跳转到第二步
const gotoStep2 = (id: string) => {
  router.push({
    path: "register_step2",
    query: { id },
  });
};
</script>

<style lang="scss" scoped>
.wrap {
  font-size: 14px;
  color: #b3b3b3;
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    color: #777;
    h1 {
      margin-bottom: 20px;
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: start;
      margin-bottom: 30px;

      .card {
        width: 120px;
        height: 60px;
        margin-right: 18px;
        margin-left: 18px;
        background-color: #cdcdcd;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border: #cdcdcd 2px solid;
        transition: all 0.5s;
        &.active {
          background-color: skyblue;
          border: skyblue 2px solid;
        }
        &.current {
          transform: scale(1.2);
        }

        span {
          font-size: 12px;
          font-weight: 600;
          text-align: center;
          padding-top: 5px;
        }
        p {
          text-align: center;
          padding: 10px;
          background-color: #fff;
        }
      }
    }
  }
  .will {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    font-size: 30px;
    color: #409eff;
  }
  .footer {
    h1 {
      margin: 30px 0;
    }
    .detail {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: start;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
      .left {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        span {
          color: #409eff;
          font-size: 16px;
        }
      }
      .price {
        margin-right: 30px;
      }
    }
  }
}
</style>
