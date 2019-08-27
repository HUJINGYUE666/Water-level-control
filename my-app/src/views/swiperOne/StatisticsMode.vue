<template>
  <div id="first-table">
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">统计表模式</span>
    </el-page-header>
    <el-divider></el-divider>
    <div id="container" @click="toSub()">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="时/天" header-align="center"></el-table-column>
        <el-table-column prop="today" label="当天" header-align="center"></el-table-column>
        <el-table-column prop="yesThree" label="近3天" header-align="center"></el-table-column>
        <el-table-column prop="yesSeven" label="近7天" header-align="center"></el-table-column>
      </el-table>
    </div>

    <el-row type="flex" justify="space-between" class="total">
      <el-col class="date" :span="18">统计截止至：{{year}}年{{month}}月{{day}}</el-col>
      <el-col class="time" :span="6">{{hours}}：{{minutes}}</el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row type="flex">
      <el-button type="text" class="btn" @click="toMap()">地图模式</el-button>
      <el-button type="text" class="btn" @click="toArea()">区域统计</el-button>
      <el-button type="text" class="btn" @click="toBasin()">流域统计</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      year: 2019,
      month: 7,
      day: 20,
      hours: 1,
      minutes: 46,
      tableData: [
        {
          date: "超历史",
          today: 0,
          yesThree: 0,
          yesSeven: 0
        },
        {
          date: "超保证",
          today: 0,
          yesThree: 0,
          yesSeven: 0
        },
        {
          date: "超警戒",
          today: 0,
          yesThree: 0,
          yesSeven: 0
        },
        {
          date: "快 涨",
          today: 0,
          yesThree: 0,
          yesSeven: 0
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/first");
    },
    toSub() {
      this.$router.push("/statisticsmode/sub");
    },
    toMap() {
      this.$router.push("/statisticsmode/mapmode");
    },
    toArea() {
      this.$router.push("/statisticsmode/areatotal");
    },
    toBasin() {
      this.$router.push("/statisticsmode/basintotal");
    }
  },
  created() {
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    axios.get("/api/statmodenum").then(response => {
      for (var key in response.data) {
        response.data[key].forEach(item => {
          var overlishi = item.photo_dushu - item.station_history_high_value;
          var overbaozheng = item.photo_dushu - item.station_baozheng_value;
          var overjingjie = item.photo_dushu - item.station_jingjie_value;
          if (overlishi > 0 && key == "now") {
            this.tableData[0].today += 1;
          }
          if (overbaozheng > 0 && key == "now") {
            this.tableData[1].today += 1;
          }
          if (overjingjie > 0 && key == "now") {
            this.tableData[2].today += 1;
          }
          if (overbaozheng > 0 && key == "sevenNum") {
            this.tableData[1].yesSeven += 1;
          }
          if (overlishi > 0 && key == "sevenNum") {
            this.tableData[0].yesSeven += 1;
          }
          if (overjingjie > 0 && key == "sevenNum") {
            this.tableData[2].yesSeven += 1;
          }
          if (overbaozheng > 0 && key == "threeNum") {
            this.tableData[1].yesThree += 1;
          }
          if (overlishi > 0 && key == "threeNum") {
            this.tableData[0].yesThree += 1;
          }
          if (overjingjie > 0 && key == "threeNum") {
            this.tableData[2].yesThree += 1;
          }
        });
      }
    });
  }
};
</script>

<style lang="scss" scope>
// #first-table {
.el-table .cell {
  line-height: normal;
}
.header {
  position: relative;
  height: 0.8rem;
  font-size: 0.36rem;
  line-height: normal;
  .el-icon-back {
    display: none;
  }
  .el-page-header__left::after {
    display: none;
  }
  .go-back {
    margin-left: 0.2rem;
    font-size: 0.4rem;
    font-weight: 700;
    line-height: 0.8rem;
  }
  .mode {
    position: absolute;
    font-size: 0.36rem;
    font-weight: 700;
    left: 50%;
    line-height: 0.8rem;
    transform: translateX(-50%);
  }
}
.el-divider--horizontal {
  margin: 0;
}
.el-table__header-wrapper {
  font-size: 0.36rem;
}
.el-table td {
  text-align: center;
}
.total {
  padding: 10px;
}
.date {
  font-size: 0.36rem;
}
.time {
  font-size: 0.36rem;
  text-align: right;
}
.btn {
  color: black !important;
  flex: 1;
  border: 1px #ccc solid !important;
  border-radius: 2px;
  margin-left: 0 !important;
  font-size: 0.3rem !important;
}
// }
</style>