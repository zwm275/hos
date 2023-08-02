<template>
  <!-- 详情 -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号详情</span>
      </div>
    </template>
    <!-- 内容 -->
    <div class="header">
      <span
        ><el-icon><Check /></el-icon
        >{{ orderInfo.param?.orderStatusString }}</span
      >
      <div class="wx">
        <img src="../../../assets/images/code_app.png" alt="" />
        <div>
          <p>微信关注 XXXXX</p>
          <p>"快速预约挂号"</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="detail">
        <div class="table">
          <div class="item">
            <div>就诊人姓名</div>
            <div>{{ orderInfo.patientName }}</div>
          </div>
          <div class="item">
            <div>就诊日期</div>
            <div>
              {{ orderInfo.reserveDate }}
              {{ orderInfo.reserveTime == 0 ? "上午" : "下午" }}
            </div>
          </div>
          <div class="item">
            <div>就诊医院</div>
            <div>{{ orderInfo.hosname }}</div>
          </div>
          <div class="item">
            <div>就诊科室</div>
            <div>{{ orderInfo.depname }}</div>
          </div>
          <div class="item">
            <div>医生职称</div>
            <div>{{ orderInfo.title }}</div>
          </div>
          <div class="item">
            <div>医事服务费</div>
            <div>
              <i>￥{{ orderInfo.amount }}</i>
            </div>
          </div>
          <div class="item">
            <div>挂号单号</div>
            <div>{{ orderInfo.id }}</div>
          </div>
          <div class="item">
            <div>挂号时间</div>
            <div>{{ orderInfo.createTime }}</div>
          </div>
        </div>
        <div class="button" v-if="orderInfo.orderStatus !== -1">
          <el-popconfirm title="确定取消预约？" @confirm="getCancelOrder()">
            <template #reference>
              <el-button>取消预约</el-button>
            </template>
          </el-popconfirm>
          <el-button
            @click="openDialog()"
            type="primary"
            v-if="orderInfo.orderStatus !== 1"
            >支付</el-button
          >
        </div>
      </div>
      <el-card class="card" shadow="never">
        <template #header>
          <div class="head">
            <span>注意事项</span>
          </div>
        </template>
        <!-- 内容 -->
        <p>取号时间：请在{{ orderInfo.fetchTime }}取号</p>
        <p>退号时间：请在{{ orderInfo.quitTime }}前退号</p>
        <p v-for="i in 6" :key="i">注意注意！！！！！！</p>
      </el-card>
    </div>
  </el-card>
  <!-- 支付结构 -->
  <el-dialog
    width="30%"
    v-model="dialogTableVisible"
    title="微信支付"
    :close="closeDialogHandler()"
  >
    <!-- 内容 -->
    <div class="wxContent">
      <img :src="QRCodeInfo" alt="" />
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div>
    <!-- 底部 -->
    <template #footer>
      <el-button @click="closeDialog()">关闭窗口</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  reqOrder,
  reqCancelOrder,
  reqQRCode,
  reqQueryPayStatus,
} from "@/api/loginUser";
import { Check } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// 生成二维码插件
//@ts-ignore
import QRCode from "qrcode";
const route = useRoute();
// 支付界面显示隐藏
let dialogTableVisible = ref(false);
// 订单信息
let orderInfo = ref<any>({});
// 支付二维码信息
let QRCodeInfo = ref<string>();
// 定时器
let timer: any = null;

onMounted(() => {
  getOrder();
});
// 打开支付界面
const openDialog = () => {
  getQRCode();
  dialogTableVisible.value = true;
};
// 关闭支付窗口
const closeDialog = () => {
  clearInterval(timer);

  dialogTableVisible.value = false;
};
const closeDialogHandler = () => {
  clearInterval(timer);
};
// 获取订单
const getOrder = async () => {
  let res: any = await reqOrder(route.query.id as unknown as number);
  if (res.code == 200) {
    orderInfo.value = res.data;
  } else {
    ElMessage({
      type: "error",
      message: "o.O" + res.message,
    });
  }
};
// 取消订单
const getCancelOrder = async () => {
  let res: any = await reqCancelOrder(orderInfo.value.id as number);
  if (res.code == 200) {
    getOrder();
  } else {
    ElMessage({
      type: "error",
      message: "o.O" + res.message,
    });
  }
};
// 支付二维码
const getQRCode = async () => {
  let res: any = await reqQRCode(orderInfo.value.id as number);
  if (res.code == 200) {
    //@ts-ignore
    QRCode.toDataURL(res.data.codeUrl)
      .then((url: any) => {
        QRCodeInfo.value = url;
        timer = setInterval(async () => {
          console.log("timer", timer);
          reqQueryPayStatus(orderInfo.value.id as number)
            .then((result) => {
              if (result.data) {
                ElMessage({
                  type: "success",
                  message: "支付成功",
                });
                clearInterval(timer);
                getOrder();
                dialogTableVisible.value = false;
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }, 1000);
      })
      .catch((err: any) => {
        console.error(err);
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
.box-card {
  .card-header {
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }
  .header {
    border-bottom: 1px solid #e4e7ed;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: #fff;
      background-color: #62b136;
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 8px;
      i {
        margin-right: 3px;
      }
    }
    .wx {
      display: flex;
      align-items: center;
      font-size: 12px;
      img {
        width: 40px;
        margin-right: 5px;
      }
      p {
        line-height: 18px;
      }
    }
  }
  .content {
    display: flex;
    margin-top: 30px;
    font-size: 14px;
    color: #333;
    .detail {
      flex: 4;

      margin-right: 20px;

      .table {
        display: flex;
        justify-content: center;
        align-items: start;
        flex-wrap: wrap;
        border-left: 1px solid #e4e7ed;
        border-top: 1px solid #e4e7ed;
        .item {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: start;

          div {
            border-bottom: 1px solid #e4e7ed;
            border-right: 1px solid #e4e7ed;
          }
          div:nth-child(1) {
            flex: 3;
            display: flex;
            justify-content: end;
            background-color: #f7f9fd;
            padding-right: 8px;
            line-height: 30px;
            font-weight: 600;
          }
          div:nth-child(2) {
            flex: 7;
            line-height: 30px;
            padding-left: 8px;
            i {
              color: red;
            }
          }
        }
      }
      .button {
        margin-top: 10px;
      }
    }

    .card {
      flex: 6;
      p {
        line-height: 20px;
      }
    }
  }
}
.wxContent {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  img {
    width: 60%;
  }
  p:first-of-type {
    margin-top: 10px;
  }
  p {
    line-height: 20px;
    font-size: 13px;
  }
}
</style>
