<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <!-- 内容 -->
    <div class="content">
      <span
        >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证</span
      >
      <div class="detail">
        <!-- 已经实名认证的结构 -->
        <div v-if="userInfo.authStatus == 1" class="table">
          <div class="row" v-for="(item, index) in tableData" :key="index">
            <div>{{ item.key }}</div>
            <div>{{ item.value }}</div>
          </div>
        </div>
        <!-- 未实名认证的结构 -->
        <el-form
          v-else
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入用户姓名"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="证件类型" prop="type">
            <el-select
              v-model="ruleForm.type"
              width="100%"
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
          <el-form-item label="证件号码" prop="number">
            <el-input
              v-model.number="ruleForm.number"
              placeholder="请输入证件号码"
            />
          </el-form-item>
          <el-form-item label="上传证件" prop="image">
            <el-upload
              ref="upload"
              list-type="picture-card"
              action="/api/oss/file/fileUpload?fileHost=userAuah"
              :limit="1"
              :on-exceed="imageLimit"
              :on-success="getImageUrl"
              :on-remove="removeImage"
              :on-preview="handlePictureCardPreview"
            >
              <img src="../../../assets/images/auth_example.png" alt="" />
            </el-upload>

            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >提交</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">重写</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reqUserInfo, reqCertificatesType, reqUserAuah } from "@/api/loginUser";

// 用户信息
let userInfo: any = ref<any>({});
// 身份信息
let arrType: any = ref([]);
// 图片上传组件
let upload: any = ref();
onMounted(() => {
  getUserInfo();
});
// 获取用户信息
const getUserInfo = async () => {
  let res: any = await reqUserInfo();
  if (res.code == 200) {
    userInfo.value = res.data;
    if (res.data.authStatus == 1) {
      tableData.value[0].value = res.data.name;
      tableData.value[1].value =
        res.data.certificatesType == 10 ? "身份证" : "户口本";
      tableData.value[2].value = res.data.certificatesNo;
    } else {
      getCertificatesType();
    }
  }
};
// 获取身份证信息
const getCertificatesType = async () => {
  let res = await reqCertificatesType();
  arrType.value = res.data;
};

// 表单验证
const ruleFormRef = ref<FormInstance>();
const validateName = (_rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入用户姓名"));
  } else {
    callback();
  }
};
const validateType = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请选择证件类型"));
  } else {
    callback();
  }
};
const validateNumber = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入证件号码"));
  } else {
    callback();
  }
};
const validateImage = (_rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入上传证件"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ required: true, validator: validateName, trigger: "blur" }],
  type: [{ required: true, validator: validateType, trigger: "blur" }],
  number: [{ required: true, validator: validateNumber, trigger: "blur" }],
  image: [{ required: true, validator: validateImage, trigger: "blur" }],
});
// 表单数据
const ruleForm = reactive({
  name: "",
  type: "",
  number: "",
  image: "",
});

// 图片超出数量
const imageLimit = () => {
  ElMessage({
    type: "error",
    message: "最多只能上传一张图片",
  });
};
// 获取图片路径
const getImageUrl = (response: any) => {
  ruleForm.image = response.data;
};
// 移除图片
const removeImage = () => {
  ruleForm.image = "";
};
// 预览图片
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePictureCardPreview = () => {
  dialogImageUrl.value = ruleForm.image;
  dialogVisible.value = true;
};
// 提交按钮
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      let userAuthVo = {
        name: ruleForm.name,
        certificatesNo: "" + ruleForm.number,
        certificatesType: ruleForm.type,
        certificatesUrl: ruleForm.image,
      };
      reqUserAuah(userAuthVo)
        .then(() => {
          getUserInfo();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
// 重写按钮
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();

  upload.value.clearFiles();
};

// 展示实名数据
let tableData = ref([
  { key: "用户姓名", value: "王xx" },
  { key: "证件类型", value: "王xx" },
  { key: "证件号码", value: "王xx" },
]);
</script>

<style lang="scss" scoped>
.box-card {
  min-height: 600px;
  margin-bottom: 20px;
  .content {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    span {
      font-size: 14px;
      color: #666;
    }
    .detail {
      width: 100%;
      display: flex;
      align-items: center;
      flex-flow: column nowrap;
      .table {
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        margin-top: 30px;
        border-left: 1px solid #e4e7ed;
        border-top: 1px solid #e4e7ed;
        .row {
          display: flex;
          line-height: 30px;
          font-size: 14px;

          :nth-child(1) {
            width: 15%;
            text-align: center;
            background-color: #f7f9fd;
            border-bottom: 1px solid #e4e7ed;
            border-right: 1px solid #e4e7ed;
            font-weight: 600;
          }
          :nth-child(2) {
            width: 85%;
            border-bottom: 1px solid #e4e7ed;
            border-right: 1px solid #e4e7ed;
            padding-left: 10px;
          }
        }
      }
      .demo-ruleForm {
        margin-top: 30px;
        width: 60%;
        :deep(.el-select) {
          width: 100%;
        }
        img {
          width: 100%;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
