<template>
  <div>
    <common-header :selectMenu="selectMenu"></common-header>

    <div class="content">点击后，发送指令至服务器至采集端，唤醒设备，对现在断面情况进行识别，将识别结果返回服务器，推送至手机端</div>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader";
export default {
  components: {
    CommonHeader
  },
  data() {
    return {
      selectMenu: {
        name: "召测"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  color: #303133;
  margin: 1rem 0.2rem;
}
</style>