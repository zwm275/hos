<template>
  <div class="content">
    <!-- 卡片 -->
    <el-card
      class="card"
      v-for="item in hasHospitaiArr"
      :key="item.id"
      shadow="hover"
      @click="gotoDetail(item.hoscode)"
    >
      <div class="center">
        <div class="left">
          <div class="title">{{ item.hosname }}</div>
          <div class="detail">
            <div class="level">
              <svg
                t="1689667420471"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2326"
                width="16"
                height="16"
              >
                <path
                  d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                  p-id="2327"
                ></path></svg
              ><span>{{ item.param.hostypeString }}</span>
            </div>
            <div class="time">
              <svg
                t="1689667474521"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3522"
                width="16"
                height="16"
              >
                <path
                  d="M511.913993 63.989249c-247.012263 0-447.924744 200.912481-447.924744 447.924744s200.912481 447.924744 447.924744 447.924744 447.924744-200.912481 447.924744-447.924744S758.926256 63.989249 511.913993 63.989249zM511.913993 895.677474c-211.577356 0-383.763481-172.186125-383.763481-383.763481 0-211.577356 172.014111-383.763481 383.763481-383.763481s383.763481 172.014111 383.763481 383.763481S723.491349 895.677474 511.913993 895.677474z"
                  fill="#575B66"
                  p-id="3523"
                ></path>
                <path
                  d="M672.05913 511.913993l-159.973123 0L512.086007 288.123635c0-17.717453-14.277171-32.166639-31.994625-32.166639-17.717453 0-31.994625 14.449185-31.994625 32.166639l0 255.956996c0 17.717453 14.277171 31.994625 31.994625 31.994625l191.967747 0c17.717453 0 32.166639-14.277171 32.166639-31.994625C704.053754 526.191164 689.604569 511.913993 672.05913 511.913993z"
                  fill="#575B66"
                  p-id="3524"
                ></path></svg
              ><span>每天{{ item.bookingRule.releaseTime }}放号</span>
            </div>
          </div>
        </div>
        <div class="right">
          <img :src="'data:image/jpeg;base64,' + item.logoData" alt="" />
        </div>
      </div>
    </el-card>
    <el-empty v-show="!hasHospitaiArr?.length" description="暂无数据" />
  </div>
  <!-- 分页器 -->
  <div class="pagination">
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pagesize"
      :page-sizes="[5, 10, 15, 20]"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { reqHospital } from "@/api/home/index";
import { Content, HospitalResponseData } from "@/api/home/type";
import router from "@/router";

let pageNo = ref<number>(1);
let pagesize = ref<number>(5);
//已有医院
let hasHospitaiArr = ref<Content>();
//存储医院总个数
let total = ref(0);
//接收等级和地区
let props = defineProps(["level", "region"]);

watch(props, async (newVal) => {
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pagesize.value,
    newVal.level,
    newVal.region
  );
  if (result.code == 200) {
    hasHospitaiArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
});

onMounted(() => {
  getHospitalInfo();
});
// 获取已有的医院的数据
const getHospitalInfo = async () => {
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pagesize.value,
    "",
    ""
  );
  if (result.code == 200) {
    hasHospitaiArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
};
//分页器页码变化
const currentChange = () => {
  //pageNo.value = val;
  getHospitalInfo();
};
// 分页器一页展示个数变化
const sizeChange = () => {
  //pagesize.value = val;
  getHospitalInfo();
};
// 点击卡片跳转到详情页
const gotoDetail = (hascode: string) => {
  router.push({ path: "/hospital/register", query: { hoscode: hascode } });
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  .card {
    width: 490px;
    height: 100px;
    margin-bottom: 10px;
    .center {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        width: 60%;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-weight: 600;
        }
        .detail {
          display: flex;
          justify-content: space-between;
          color: #666;
          font-size: 14px;
          .level,
          .time {
            display: flex;
            align-items: center;
            svg {
              margin-right: 5px;
            }
          }
        }
      }
      .right {
        width: 60px;
        height: 60px;
        img {
          width: 60px;
        }
      }
    }
  }
  :deep(.el-empty) {
    width: 100%;
  }
}
.pagination {
  margin-bottom: 10px;
}
</style>
