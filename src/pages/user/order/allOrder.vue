<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <!-- 头部下拉框 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="就诊人">
        <el-select
          v-model="formInline.patientId"
          placeholder="所有就诊人"
          clearable
        >
          <el-option label="所有就诊人" value="" />
          <el-option
            v-for="item in allUser"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          v-model="formInline.orderStatus"
          placeholder="全部状态"
          clearable
        >
          <el-option label="全部状态" value="" />
          <el-option
            v-for="item in allStatus"
            :key="item.status"
            :label="item.comment"
            :value="item.status"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 表格展示 -->
    <el-table :data="tableData.records" style="width: 100%">
      <el-table-column fixed prop="reserveDate" label="就诊时间" width="130" />
      <el-table-column prop="hosname" label="医院" width="110" />
      <el-table-column prop="depname" label="科室" width="110" />
      <el-table-column prop="title" label="医生" width="100" />
      <el-table-column prop="amount" label="医事服务费" width="100" />
      <el-table-column prop="patientName" label="就诊人" width="100" />
      <el-table-column
        prop="param.orderStatusString"
        label="订单状态"
        width="100"
      />
      <el-table-column fixed="right" label="操作" width="60">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClick(scope)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout=" prev, pager, next, sizes,total"
        :total="total"
        :background="true"
      />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { reqUserOrder, reqAllUser, reqAllStatus } from "@/api/loginUser";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// 表单数据
let formInline = reactive({
  patientId: "",
  orderStatus: "",
});
// 所有就诊人数据
let allUser = ref<any>([]);
// 所有订单状态数据
let allStatus = ref<any>([]);
// 分页器数据
// 每页显示条目个数
let pageSize = ref(10);
// 当前页数
let currentPage = ref(1);
// 总条目数
let total = ref(100);
// 点击详情回调
const handleClick = (scope: any) => {
  router.push({
    path: "/user/order",
    query: { highlight: 2, id: scope.row.id },
  });
};
// 表格数据
const tableData = ref<any>([]);
onMounted(() => {
  getUserOrder();
  getAllUser();
  getAllStatus();
});
// 获取用户订单
const getUserOrder = async () => {
  let res: any = await reqUserOrder(
    currentPage.value,
    pageSize.value,
    formInline.patientId,
    formInline.orderStatus
  );
  if (res.code == 200) {
    tableData.value = res.data;
    total.value = res.data.total;
    tableData.value.records.forEach((item: any) => {
      if (item.reserveTime == 0) {
        item.reserveDate += " 上午";
      } else {
        item.reserveDate += " 下午";
      }
    });
  }
};
// 获取订单数据变化回调
watchEffect(() => {
  getUserOrder();
});
// 获取所有用户
const getAllUser = async () => {
  let res: any = await reqAllUser();
  if (res.code == 200) {
    allUser.value = res.data;
  }
};
// 获取所有订单状态
const getAllStatus = async () => {
  let res: any = await reqAllStatus();
  if (res.code == 200) {
    allStatus.value = res.data;
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 20px;
  .card-header {
    font-size: 20px;
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>
