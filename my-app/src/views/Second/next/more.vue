<template>
  <div>
    <common-header :selectMenu="selectMenu"></common-header>

    <div class="content">
      <el-form ref="form" :model="form" label-position="left">
        <el-form-item label="站名:" label-width="1rem">
          <span>{{form.station_name}}</span>
        </el-form-item>
        <el-form-item label="站码:" label-width="1rem">
          <span>{{form.station_code}}</span>
        </el-form-item>
        <el-form-item label="所在流域:" label-width="1.5rem">
          <span>{{form.station_river_name}}</span>
        </el-form-item>
        <el-form-item label="所在区域:" label-width="1.5rem">
          <span>{{form.region_name}}</span>
        </el-form-item>
        <el-form-item label="所属战队:" label-width="1.5rem">
          <span>{{form.group_name}}</span>
        </el-form-item>
        <el-form-item label="所属分局:" label-width="1.5rem">
          <span>{{form.region_id}}</span>
        </el-form-item>
        <el-form-item label="经度:" label-width="1rem">
          <span>{{form.station_longitude}}</span>
        </el-form-item>
        <el-form-item label="纬度:" label-width="1rem">
          <span>{{form.station_latitude}}</span>
        </el-form-item>
        <el-form-item label="海拔基面:" label-width="1.5rem">
          <span>{{form.staffgauge_jimian}}</span>
        </el-form-item>
        <el-form-item label="警戒水位:" label-width="1.5rem">
          <span>{{form.station_jingjie_value}}</span>
        </el-form-item>
        <el-form-item label="保证水位:" label-width="1.5rem">
          <span>{{form.station_baozheng_value}}</span>
        </el-form-item>
        <el-form-item label="历史最高水位:" label-width="2rem">
          <span>{{form.station_history_high_value}}</span>
        </el-form-item>
        <el-form-item label="水位状态:" label-width="1.5rem">
          <span>{{form.station_status}}</span>
        </el-form-item>
        <el-form-item label="相对位置:" label-width="1.5rem">
          <span></span>
        </el-form-item>
        <el-form-item label="上游测站:" label-width="1.5rem">
          <span>{{form.station_up_id}}</span>
        </el-form-item>
        <el-form-item label="下游测站:" label-width="1.5rem">
          <span>{{form.station_down_id}}</span>
        </el-form-item>
      </el-form>
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
        name: "详细信息"
      },
      form: {},
      today: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
    };
  },
  created() {
    axios
      .post("/api/more", {
        stationId: this.$store.state.count
      })
      .then(result => {
        result.data.data.forEach((val, index) => {
          // console.log(val.photo_day)
          if (val.photo_day > this.today) {
            this.form = val
          }
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.content {
  color: #303133;
  margin: -1rem 0.2rem;
}

.el-form-item {
  margin-bottom: 0;
}
</style>