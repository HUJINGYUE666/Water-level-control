<template>
  <div>
    <common-header :selectMenu="selectMenu"></common-header>

    <div class="content">
      <el-table :data="tableData">
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="photo_day" label="日期" align="center"></el-table-column>
        <el-table-column prop="photo_time" label="时间" align="center"></el-table-column>
        <el-table-column prop="photo_dushu" label="水位" align="center"></el-table-column>
      </el-table>
      <div class="date">
        <div>事件范围：</div>
        <div>
          <div>起始时间:{{startDate}}</div>
          <div>结束时间:{{endDate}}</div>
          <!-- <div>{{$store.state.count}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader";
import axios from "axios";
import moment from "moment";

export default {
  components: {
    CommonHeader
  },
  data() {
    return {
      selectMenu: {
        name: ""
      },
      tableData: [],
      startDate: moment()
        .subtract(7, "days")
        .format("YYYY-MM-DD"),
      endDate: moment()
        .subtract(0, "days")
        .format("YYYY-MM-DD")
    };
  },
  created() {
    axios
      .post("/api/history", {
        now: this.startDate,
        stationId: this.$store.state.count
      })
      .then(result => {
        // console.log(result.data.data);
        result.data.data.forEach((val, index) => {
          if (val.photo_dushu > val.station_history_high_value) {
            this.tableData.push(val);
            // console.log(this.tableData)
            this.selectMenu.name = this.tableData[0].station_name;
          }
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.content {
  color: #303133;
  margin: 1.5rem 0.2rem;
}

.table {
  display: flex;
}

.date {
  display: flex;
}
</style>