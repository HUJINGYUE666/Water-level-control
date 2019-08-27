<template>
  <div>
    <common-header :selectMenu="selectMenu"></common-header>

    <div class="content">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="离线" name="first">
          <div class="list">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="station_name" label="站名" align="center"></el-table-column>
              <el-table-column prop="photo_day" label="最后上线事件" align="center"></el-table-column>
              <el-table-column prop="photo_dushu" label="水位" align="center"></el-table-column>
              <el-table-column prop="station_river_name" label="归属" align="center"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="识别无效" name="second">
          <div class="list">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="站名" align="center"></el-table-column>
              <el-table-column prop="date" label="上传故障" align="center"></el-table-column>
              <el-table-column prop="time" label="可能水位" align="center"></el-table-column>
              <el-table-column prop="level" label="归属" align="center"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import axios from "axios";
export default {
  components: {
    CommonHeader
  },
  data() {
    return {
      selectMenu: {
        name: "故障测站信息"
      },
      activeName: "first",
      tableData: []
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  created() {
    axios.post("api/third",{

    })
    .then(result => {
      console.log(result)
      this.tableData = result.data.data
    })
  },
};
</script>

<style lang="scss" scoped>
.content {
  color: #303133;
  margin: 1rem 0;
}
.list {
  margin: 0.1rem;
}
.table {
  display: flex;
}
</style>