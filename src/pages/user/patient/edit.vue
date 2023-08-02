<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>添加就诊人</span>
      </div>
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <!-- 第一栏 -->
      <el-divider content-position="left">就诊人信息</el-divider>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="证件类型" prop="certificatesType">
        <el-select
          style="width: 100%"
          v-model="ruleForm.certificatesType"
          placeholder="请选择证件类型"
        >
          <el-option
            v-for="item in arrType"
            :key="item.id"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="certificatesNo">
        <el-input v-model="ruleForm.certificatesNo" />
      </el-form-item>
      <el-form-item label="用户性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="birthdate">
        <el-col :span="11">
          <el-date-picker
            v-model="ruleForm.birthdate"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="选择一个日期"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.number="ruleForm.phone" />
      </el-form-item>
      <!-- 第二栏 -->
      <el-divider content-position="left">建档信息</el-divider>
      <el-form-item label="婚姻状况" prop="isMarry">
        <el-radio-group v-model="ruleForm.isMarry">
          <el-radio :label="1">已婚</el-radio>
          <el-radio :label="0">未婚</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="医保/自费" prop="isInsure">
        <el-radio-group v-model="ruleForm.isInsure">
          <el-radio :label="1">自费</el-radio>
          <el-radio :label="0">医保</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="当前住址" prop="addressSelected">
        <el-cascader
          :props="props"
          v-model="ruleForm.addressSelected"
        /> </el-form-item
      ><el-form-item label="详细地址" prop="address">
        <el-input v-model="ruleForm.address" autocomplete="off" />
      </el-form-item>
      <!-- 第三栏 -->
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form-item label="用户姓名" prop="contactsName">
        <el-input v-model="ruleForm.contactsName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="证件类型" prop="contactsCertificatesType">
        <el-select
          style="width: 100%"
          v-model="ruleForm.contactsCertificatesType"
          placeholder="请选择证件类型"
        >
          <el-option
            v-for="item in arrType"
            :key="item.id"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" prop="contactsCertificatesNo">
        <el-input
          v-model="ruleForm.contactsCertificatesNo"
          autocomplete="off"
        /> </el-form-item
      ><el-form-item label="手机号码" prop="contactsPhone">
        <el-input v-model="ruleForm.contactsPhone" autocomplete="off" />
      </el-form-item>
      <!-- 提交重写按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >提交</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重写</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import type { CascaderProps } from "element-plus";
import {
  reqUser,
  reqCertificatesType,
  reqCity,
  reqAddUser,
  reqUpdateUser,
} from "@/api/loginUser";
import router from "@/router";

// 通知父容器重新获取参数
const emits = defineEmits(["getAllUser"]);
const route: any = useRoute();
// 修改或添加
let isAdd = ref(true);
onMounted(() => {
  getUser();
  getCertificatesType();
});
// 表单数据
const ruleForm = reactive({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 1,
  birthdate: "",
  phone: "",
  isMarry: 1,
  isInsure: 1,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
});
// 表单校验
const ruleFormRef = ref<FormInstance>();
// const checkAge = (_rule: any, value: any, callback: any) => {
//   if (!value) {
//     return callback(new Error("Please input the age"));
//   } else {
//     callback();
//   }
// };
// const validatePass = (_rule: any, value: any, callback: any) => {
//   if (value === "") {
//     callback(new Error("Please input the password"));
//   } else {
//     callback();
//   }
// };
// const validatePass2 = (_rule: any, value: any, callback: any) => {
//   if (value === "") {
//     callback(new Error("Please input the password again"));
//   } else {
//     callback();
//   }
// };
const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ required: true, trigger: "blur" }],
  certificatesType: [{ required: true, trigger: "blur" }],
  certificatesNo: [{ required: true, trigger: "blur" }],
  sex: [{ required: true, trigger: "blur" }],
  birthdate: [{ required: true, trigger: "blur" }],
  phone: [{ required: true, trigger: "blur" }],
  isMarry: [{ required: true, trigger: "blur" }],
  isInsure: [{ required: true, trigger: "blur" }],
  addressSelected: [{ required: true, trigger: "blur" }],
  address: [{ required: true, trigger: "blur" }],
  contactsName: [{ trigger: "blur" }],
  contactsCertificatesType: [{ trigger: "blur" }],
  contactsCertificatesNo: [{ trigger: "blur" }],
  contactsPhone: [{ trigger: "blur" }],
});
// 提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        reqAddUser(ruleForm)
          .then((result: any) => {
            if (result.code == 200) {
              ElMessage({
                type: "success",
                message: "添加成功",
              });
              // 通知父容器重新获取参数
              emits("getAllUser");
              // router.push({ path: "/user/patient", query: { highlight: 3 } });
              router.back();
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
      } else {
        Object.assign(ruleForm, { id: Number(route.query.id) });
        reqUpdateUser(ruleForm)
          .then((result: any) => {
            if (result.code == 200) {
              ElMessage({
                type: "success",
                message: "修改成功",
              });
              // 通知父容器重新获取参数
              emits("getAllUser");
              // router.push({ path: "/user/patient", query: { highlight: 3 } });
              router.back();
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
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
// 重写
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
// 获取用户
const getUser = async () => {
  if (route.query.id) {
    let res: any = await reqUser(route.query.id);
    if (res.code == 200) {
      isAdd.value = false;
      Object.keys(ruleForm).forEach((key) => {
        //@ts-ignore
        ruleForm[key] = res.data[key];
      });
    }
  }
};
// 身份信息
let arrType: any = ref([]);
// 获取身份证信息
const getCertificatesType = async () => {
  let res = await reqCertificatesType();
  arrType.value = res.data;
};

// 获取城市信息
const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node: any, resolve) {
    let res = await reqCity((node.value as string) || "86");
    // 整理数据
    let showData: any = res.data.map((item: any) => {
      return {
        label: item.name,
        value: item.value,
        leaf: !item.hasChildren,
      };
    });
    // 注入数据
    resolve(showData);
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  .card-header {
    font-size: 20px;
  }
  .demo-ruleForm {
    :deep(.el-form-item) {
      width: 60%;
      margin-left: 5vw;
    }
    :deep(.el-divider) {
      font-size: 20px;
      background-color: red;
    }
  }
}
</style>
