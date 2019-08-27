<template>
  <div>
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">功能设置</span>
    </el-page-header>
    <el-divider></el-divider>
    <el-row>注册码：</el-row>
    <el-row>有效期：</el-row>
    <el-row>使用者：</el-row>
    <el-row>版本号：</el-row>
    <el-row>关于：</el-row>
    <el-row>默认区域：</el-row>
    <el-row>默认流域：</el-row>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.push("/first");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 0 0.2rem;
}
</style>