<template>
  <!-- 编辑/添加页面 -->
  <div v-if="route.query.type">
    <EditView @getAllUser="getAllUser()"></EditView>
  </div>
  <!-- 展示页面 -->
  <div v-else class="patient_list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>就诊人管理</h1>
          <el-button @click="addUser()" type="success">添加就诊人</el-button>
        </div>
      </template>
      <div class="items">
        <el-card
          shadow="always"
          class="card"
          v-for="item in allUser"
          :key="item.id"
        >
          <template #header>
            <div class="head">
              <span>{{ item.isInsure == 1 ? "医保" : "自费" }}</span>
              <span>{{ item.name }}</span>
              <!-- 修改按钮 -->
              <el-button
                type="primary"
                @click="editUser(item.id)"
                :icon="Edit"
                circle
              />
              <!-- 删除按钮 -->
              <el-popconfirm
                :title="`你确定要删除 ${item.name} 吗？`"
                @confirm="deleteUser(item.id)"
                :icon="InfoFilled"
                icon-color="red"
              >
                <template #reference>
                  <el-button type="danger" :icon="Delete" circle />
                </template>
              </el-popconfirm>
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
</template>

<script lang="ts" setup>
import { Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reqAllUser, reqDeleteUser } from "@/api/loginUser";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import EditView from "./edit.vue";

const route = useRoute();

onMounted(() => {
  getAllUser();
});
// 所有就诊人数据
let allUser = ref<any>([]);
// 获取所有用户
const getAllUser = async () => {
  let res: any = await reqAllUser();
  if (res.code == 200) {
    allUser.value = res.data;
  }
};
// 添加用户
const addUser = () => {
  changeRoute("add", "");
};
// 修改用户
const editUser = (id: number) => {
  changeRoute("edit", "" + id);
};
// 删除用户
const deleteUser = (id: number) => {
  reqDeleteUser(id)
    .then((result: any) => {
      if (result.code == 200) {
        // 更新用户
        getAllUser();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } else {
        ElMessage({
          type: "error",
          message: "出错了",
        });
        console.error("出错了");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// 跳转
const router = useRouter();
const changeRoute = (type: string, id: string) => {
  router.push({
    path: "/user/patient",
    query: { highlight: 3, type, id },
  });
};
</script>

<style lang="scss" scoped>
.patient_list {
  .box-card {
    .card-header {
      font-size: 20px;
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
            color: #666;
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
</style>
