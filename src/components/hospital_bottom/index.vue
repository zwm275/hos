<template>
  <div class="top">
    <div class="countent">
      <span>京ICP备 13018369号 电话挂号010-56253825</span>
      <a>联系我们</a>
      <a>合作伙伴</a>
      <a>用户协议</a>
      <a>隐私协议</a>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 50px;
  background-color: #f0f2f6;
  display: flex;
  justify-content: center;
  a {
    font-size: 14px;
    color: #666;
  }
  .countent {
    width: 1200px;
    height: 100%;
    background-color: #f0f2f6;
    display: flex;
    align-items: center;
  }
  .countent span:nth-child(1) {
    flex: 1;
    font-size: 14px;
  }
  .countent a:nth-of-type(1) {
    margin-right: 10px;
    cursor: pointer;
  }
  .countent a:nth-of-type(2) {
    margin-right: 10px;
    cursor: pointer;
  }
  .countent a:nth-of-type(3) {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
