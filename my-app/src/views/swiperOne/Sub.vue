<template>
  <div id="sub-table">
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">统计表模式</span>
    </el-page-header>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="时/天" header-align="center"></el-table-column>
      <el-table-column prop="today" label="2小时" header-align="center"></el-table-column>
      <el-table-column prop="yesThree" label="6小时" header-align="center"></el-table-column>
      <el-table-column prop="yesSeven" label="12小时" header-align="center"></el-table-column>
    </el-table>
    <el-row type="flex" justify="space-between" class="total">
      <el-col class="date" :span="18">统计截止至：{{year}}年{{month}}月{{day}}</el-col>
      <el-col class="time" :span="6">{{hours}}：{{minutes}}</el-col>
    </el-row>
  </div>
</template>

<script>
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
          today: 1,
          yesThree: 2,
          yesSeven: 3
        },
        {
          date: "超保证",
          today: 1,
          yesThree: 2,
          yesSeven: 3
        },
        {
          date: "超警戒",
          today: 1,
          yesThree: 2,
          yesSeven: 3
        },
        {
          date: "快 涨",
          today: 1,
          yesThree: 2,
          yesSeven: 3
        }
      ]
    };
  },
  methods: {
    goBack() {
      this.$router.push("/statisticsmode");
    }
  },
  created() {
    var date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
  }
};
</script>

<style lang="scss" scoped>
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
  font-size: 0.36rem;
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
</style>