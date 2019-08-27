<template>
  <div>
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">区域统计</span>
    </el-page-header>
    <el-divider></el-divider>

    <el-table :data="tableData" stripe @row-click="show">
      <el-table-column prop="city" label="全部" header-align="center"></el-table-column>
      <el-table-column prop="groupname" label="全部" header-align="center"></el-table-column>
      <el-table-column prop="stationname" label="全部" header-align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    show(row) {
      this.$router.push("/unitinformation/" + row.station_id);
    }
  },
  created() {
    axios.get("/api/areatotal").then(response => {
      this.tableData = response.data;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>