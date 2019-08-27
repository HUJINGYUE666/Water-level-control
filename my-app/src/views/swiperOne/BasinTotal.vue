<template>
  <div>
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">流域统计</span>
    </el-page-header>
    <el-divider></el-divider>
    <el-row type="flex" class="search" justify="center">
      <div class="container" style="margin-top:15px">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearchAsync"
          placeholder="查找测站"
          @select="handleSelect"
        ></el-autocomplete>
        <el-button type="primary">搜索</el-button>
      </div>
    </el-row>
    <el-row class="to-right">地图模式：</el-row>
    <el-row class="to-right">站点：</el-row>

    <div id="echars1" style="width=100%;height:300px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
export default {
  data() {
    return {
      stage: [],
      state: "",
      timeout: null,
      echartsData: []
    };
  },
  methods: {
    goBack() {
      this.$router.push("/statisticsmode");
    },
    loadAll() {
      //发异步请求数据
      return [
        { value: "黑龙江省" },
        { value: "黑龙江省" },
        { value: "黑龙江省" },
        { value: "黑龙江省" }
      ];
    },
    querySearchAsync(queryString, cb) {
      var stage = this.stage;
      var results = queryString
        ? stage.filter(this.createStateFilter(queryString))
        : stage;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    drawechart1(datas) {
      var myChart = echarts.init(document.getElementById("echars1"));
      var option = {
        grid: {
          left: "3%",
          right: "8%",
          bottom: "1%",
          containLabel: true
        },
        xAxis: {
          data: ["不超限", "超警戒", "超保证", "超历史", "快涨", "快落"],
          axisLabel: {
            interval: 0, //横轴信息全部显示
            textStyle: {
              color: "black"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#094060"
            }
          }
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: datas,
            label: {
              normal: {
                show: true,
                position: "inside",
                textStyle: {
                  color: "black"
                }
              }
            },
            itemStyle: {
              color: function(params) {
                var colorList = [
                  "#008000",
                  "#feff00",
                  "#ff0000",
                  "#980100",
                  "#0333ff",
                  "#00ccff"
                ];
                return colorList[params.dataIndex];
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  created() {
    axios.get("/api/basintotal").then(response => {
      console.log(response.data);
      var noOver = 0;
      var overjingjie = 0;
      var overbaozheng = 0;
      var overlishi = 0;
      var kuaizhang = 0;
      var kuailuo = 0;
      response.data.forEach(item => {
        var Dv_j = item.photo_dushu - item.station_jingjie_value;
        var Dv_b = item.photo_dushu - item.station_baozheng_value;
        var Dv_l = item.photo_dushu - item.station_history_high_value;
        if (Dv_j > 0) {
          overjingjie += 1;
        }
        if (Dv_b > 0) {
          overbaozheng += 1;
        } else {
          noOver += 1;
        }
        if (Dv_l > 0) {
          overlishi += 1;
        }
      });

      this.echartsData.push(noOver, overjingjie, overbaozheng, overlishi, 0, 0);
      this.drawechart1(this.echartsData);
    });
  },
  mounted() {
    this.stage = this.loadAll();
  }
};
</script>

<style lang="scss" scoped>
.to-right {
  margin-top: 5px;
  margin-left: 11%;
}
</style>