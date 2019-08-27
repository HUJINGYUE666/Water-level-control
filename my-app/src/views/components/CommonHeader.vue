<template>
  <div>
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="header-btn">
         <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="header-title">{{selectMenu.name}}</span>
    </el-page-header>
  </div>
</template>

<script>
export default {
  props: ["selectMenu"],
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  border-bottom: 1px solid #dcdfe6;
  position: fixed;
  top: 0px;
  z-index: 1;
}
.el-icon-back::before{
  display: none;
}
.el-page-header__left::after{
  display: none;
}
.header-btn {
  font-size: 0.3rem; 
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.2rem; 
}
.header-title {
  font-size: 0.3rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>