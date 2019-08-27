<template>
  <div>
    <div class="content">
      <el-form ref="form" :model="form2" label-position="left" class="form">
        <div class="left">
          <el-form-item label="站名:" label-width="1rem">
            <span>{{form2.station_name}}</span>
          </el-form-item>
          <el-form-item label="识别水位:" label-width="1.5rem">
            <span>{{form2.photo_dushu}}</span>
          </el-form-item>
          <el-form-item label="水位编号:" label-width="1.5rem">
            <span></span>
          </el-form-item>
          <el-form-item label="零点高程:" label-width="1.5rem">
            <span></span>
          </el-form-item>
          <el-form-item label="水位状态:" label-width="1.5rem">
            <span></span>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="采集日期:" label-width="1.5rem">
            <!-- <span>{{form2.photo_day}}</span> -->
            <span>{{day}}</span>
          </el-form-item>
          <el-form-item label="采集时间:" label-width="1.5rem">
            <span>{{form2.photo_time}}</span>
          </el-form-item>
        </div>
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
        name: "单站水位信息"
      },
      activeName: "first",
      form2: {},
      day: '',
      today: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    };
  },
  created() {
    axios
      .post("/api/near", {
        stationId: this.$store.state.downID
      })
      .then(result => {
        // console.log(result);
        result.data.data.forEach((val, index) => {
          if (val.photo_day > this.today) {
            this.form2 = val;
            this.day = moment(val.photo_day).format("YYYY-MM-DD")
            // console.log(this.day)
          }
        });
      });
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  color: #303133;
  margin: 0 0;
}

.form {
  margin: 0 0.2rem;
  display: flex;
}

.form .left {
  margin-right: 1rem;
}

.el-form-item__label {
  font-size: 0.25rem;
}
</style>