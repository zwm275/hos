<template>
  <h1>确认挂号信息</h1>
  <div class="patient_list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>请选择就诊人</h1>
          <el-button type="success" @click="addUser()">添加就诊人</el-button>
        </div>
      </template>
      <div class="items">
        <el-card
          shadow="always"
          class="card"
          v-for="(item, index) in userArr"
          :class="{ cur: index == flag }"
          :key="item.id"
          @click="cardHandler(index)"
        >
          <template #header>
            <div class="head">
              <span>{{ item.isInsure == 1 ? "医保" : "自费" }}</span>
              <span>{{ item.name }}</span>
              <el-button
                type="primary"
                :icon="Edit"
                circle
                @click="updateUser(item.id)"
              />
            </div>
          </template>
          <div class="text">
            <p><i>证件类型：</i>{{ item.param.certificatesTypeString }}</p>
            <p><i>证件号码：</i>{{ item.certificatesNo }}</p>
            <p><i>用户性别：</i>{{ item.sex == 1 ? "男" : "女" }}</p>
            <p><i>出生日期：</i>{{ item.birthdate }}</p>
            <p><i>手机号码：</i>{{ item.phone }}</p>
            <p><i>婚姻状态：</i>{{ item.isMarry == 1 ? "已婚" : "未婚" }}</p>
            <p><i>当前住址：</i>{{ item.address }}</p>
            <p><i>详细住址：</i>{{ item.param.fullAddress }}</p>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
  <div class="footer">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号信息</span>
        </div>
      </template>
      <div class="item_list">
        <div class="item">就诊日期：</div>
        <div class="item">{{ doctorInfo.workDate }}</div>
        <div class="item">就诊医院：</div>
        <div class="item">{{ doctorInfo.param?.hosname }}</div>
        <div class="item">就诊科室：</div>
        <div class="item">{{ doctorInfo.param?.depname }}</div>
        <div class="item">医生姓名：</div>
        <div class="item">{{ doctorInfo.docname }}</div>
        <div class="item">医生职称：</div>
        <div class="item">{{ doctorInfo.title }}</div>
        <div class="item">医生专长：</div>
        <div class="item">{{ doctorInfo.skill }}</div>
        <div class="item">医事服务费：</div>
        <div class="item">￥{{ doctorInfo.amount }}</div>
      </div>
    </el-card>
  </div>
  <div class="footer-button">
    <el-button type="primary" :disabled="flag == -1" @click="submit"
      >确认挂号</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";
import { reqGetUser, reqDoctorInfo } from "@/api/hospital/index";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { reqSubmitOrder } from "@/api/loginUser/index";
import { ElMessage } from "element-plus";
const route = useRoute();
const router = useRouter();

// 存储就诊人信息
let userArr = ref<any>([]);
// 存储医生信息
let doctorInfo = ref<any>({});
// 是否允许挂号
let flag = ref<number>(-1);

// 选择就诊人回调
const cardHandler = (index: number) => {
  flag.value = index;
};

onMounted(() => {
  getDoctorInfo();
  getUser();
  // const timer = setTimeout(() => {
  //   getDoctorInfo();
  //   clearTimeout(timer);
  // }, 1000);
});
// 获取就诊人信息
const getUser = async () => {
  let result: any = await reqGetUser();
  if (result.code == 200) {
    // result.data = [
    //   {
    //     id: 194,
    //     createTime: "2023-05-05 10:23:12",
    //     updateTime: "2023-05-05 10:23:12",
    //     isDeleted: 0,
    //     param: {
    //       certificatesTypeString: "身份证",
    //       contactsCertificatesTypeString: "身份证",
    //       fullAddress: "身份证同仁医院",
    //     },
    //     userId: 572,
    //     name: "鲁大海2222",
    //     certificatesType: "10",
    //     certificatesNo: "123456789123456789",
    //     sex: 1,
    //     birthdate: "1998-01-27",
    //     phone: "12245634534",
    //     isMarry: 0,
    //     address: "同人医院",
    //     contactsName: "李涛",
    //     contactsCertificatesType: "10",
    //     contactsCertificatesNo: "123456789123456789",
    //     contactsPhone: "12245634534",
    //     isInsure: 1,
    //     status: "0",
    //   },
    //   {
    //     id: 194,
    //     createTime: "2023-05-05 10:23:12",
    //     updateTime: "2023-05-05 10:23:12",
    //     isDeleted: 0,
    //     param: {
    //       certificatesTypeString: "身份证",
    //       contactsCertificatesTypeString: "身份证",
    //       fullAddress: "身份证同仁医院",
    //     },
    //     userId: 572,
    //     name: "鲁大海2222",
    //     certificatesType: "10",
    //     certificatesNo: "123456789123456789",
    //     sex: 1,
    //     birthdate: "1998-01-27",
    //     phone: "12245634534",
    //     isMarry: 0,
    //     address: "同人医院",
    //     contactsName: "李涛",
    //     contactsCertificatesType: "10",
    //     contactsCertificatesNo: "123456789123456789",
    //     contactsPhone: "12245634534",
    //     isInsure: 1,
    //     status: "0",
    //   },
    //   {
    //     id: 194,
    //     createTime: "2023-05-05 10:23:12",
    //     updateTime: "2023-05-05 10:23:12",
    //     isDeleted: 0,
    //     param: {
    //       certificatesTypeString: "身份证",
    //       contactsCertificatesTypeString: "身份证",
    //       fullAddress: "身份证同仁医院",
    //     },
    //     userId: 572,
    //     name: "鲁大海2222",
    //     certificatesType: "10",
    //     certificatesNo: "123456789123456789",
    //     sex: 1,
    //     birthdate: "1998-01-27",
    //     phone: "12245634534",
    //     isMarry: 0,
    //     address: "同人医院",
    //     contactsName: "李涛",
    //     contactsCertificatesType: "10",
    //     contactsCertificatesNo: "123456789123456789",
    //     contactsPhone: "12245634534",
    //     isInsure: 1,
    //     status: "0",
    //   },
    //   {
    //     id: 753,
    //     createTime: "2023-05-05 10:23:12",
    //     updateTime: "2023-05-05 10:23:12",
    //     isDeleted: 0,
    //     param: {
    //       certificatesTypeString: "身份证",
    //       contactsCertificatesTypeString: "身份证",
    //       fullAddress: "日本富士山",
    //     },
    //     userId: 753,
    //     name: "夏洛特",
    //     certificatesType: "10",
    //     certificatesNo: "993456788877656789",
    //     sex: 0,
    //     birthdate: "2000-01-27",
    //     phone: "12999995394",
    //     isMarry: 1,
    //     address: "日本",
    //     contactsName: "李涛",
    //     contactsCertificatesType: "10",
    //     contactsCertificatesNo: "123456789123456789",
    //     contactsPhone: "12245634534",
    //     isInsure: 0,
    //     status: "0",
    //   },
    // ];

    userArr.value = result.data;
  }
};
// 添加就诊人
const addUser = () => {
  router.push({
    path: "/user/patient",
    query: { highlight: 3, type: "add", id: "" },
  });
};
// 修改就诊人
const updateUser = (id: string) => {
  router.push({
    path: "/user/patient",
    query: { highlight: 3, type: "edit", id },
  });
};
// 获取医生信息
const getDoctorInfo = async () => {
  let result: any = await reqDoctorInfo(route.query.id as string);
  if (result.code == 200) {
    doctorInfo.value = result.data;
  }
};
// 确认挂号
const submit = async () => {
  let res: any = await reqSubmitOrder(
    doctorInfo.value.hoscode,
    doctorInfo.value.id,
    userArr.value[flag.value].id
  );
  if (res.code == 200) {
    router.push({
      path: "/user/order",
      query: {
        highlight: "2",
        id: res.data,
      },
    });
  } else {
    ElMessage({
      type: "error",
      message: "o.O" + res.message,
    });
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
  font-weight: 600;
}
.patient_list {
  margin: 40px 0;
  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .items {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      align-content: start;
      .card {
        position: relative;
        width: 31%;
        margin: 5px 1%;

        &.cur {
          &:after {
            content: "已选择";
            position: absolute;
            top: 35%;
            right: 20%;
            font-size: 30px;
            transform: rotate(-30deg);
            color: red;
            opacity: 0.5;
            border-radius: 50%;
            padding: 60px 30px 60px 30px;
            border: 3px solid red;
          }
        }
        .text {
          p {
            line-height: 30px;
            font-size: 13px;
            color: #777;
            i {
              color: #000;
            }
          }
        }
        .head {
          display: flex;
          align-items: center;
          span:nth-of-type(1) {
            font-size: 12px;
            padding: 4px;
            background-color: #fff;
            margin-right: 5px;
          }
          span:nth-of-type(2) {
            flex: 1;
            color: #999;
          }
        }
        :deep(.el-card__header) {
          background-color: #eee;
        }
      }
      :nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
.footer {
  margin-top: 20px;
  .box-card {
    .card-header {
      font-size: 14px;
      font-weight: 600;
    }
    .item_list {
      display: flex;
      flex-wrap: wrap;
      border-right: 1px solid #e4e7ed;
      border-top: 1px solid #e4e7ed;
      font-size: 14px;

      .item {
        border-left: 1px solid #e4e7ed;
        border-bottom: 1px solid #e4e7ed;
        padding: 8px 0 8px 10px;
        font-weight: 600;
        line-height: 20px;
      }
      :nth-child(2n + 1) {
        width: 20%;
        background-color: #f7f9fd;
      }
      :nth-child(2n) {
        width: 30%;
      }
      :last-child {
        width: 80%;
        color: red;
      }
    }
  }
}
.footer-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}
</style>
