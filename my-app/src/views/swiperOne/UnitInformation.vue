<template>
  <div id="boss">
    <el-page-header @back="goBack" class="header">
      <span slot="title" class="go-back">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span slot="content" class="mode">单位站水位信息</span>
    </el-page-header>
    <el-divider></el-divider>
    <div id="container">
      <el-row>站名:{{stationName}}</el-row>
      <el-row>
        <el-col :span="10">识别水位:{{photoDushu}}</el-col>
        <el-col :span="14">采集日期:{{photoDay}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="10">水吃编号:{{staffCode}}</el-col>
        <el-col :span="14">采集时间:{{photoTime}}</el-col>
      </el-row>
      <el-row>零点高程:{{gaoCheng}}</el-row>
      <el-row>水位状态:{{status}}</el-row>
    </div>

    <div class="second-divider">
      <img id="echars1" style="width=100%" :src="photo_staff_gauge" />
      <el-divider></el-divider>
    </div>
    <div id="echars2" style="width=100%;height:280px;margin-top:-30px"></div>
    <el-row type="flex" justify="center" style="padding:0 0.4rem;margin:-40px 0 0 0">
      <el-col :span="8" style="text-align:center">
        <span style="color:green">---</span>:历史最高
      </el-col>
      <el-col :span="8" style="text-align:center">
        <span style="color:red">---</span>:警戒水位
      </el-col>
      <el-col :span="8" style="text-align:center">
        <span style="color:blue">---</span>:保证水位
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import moment from "moment";
export default {
  components: {
    echarts
  },
  data() {
    return {
      stationName: "",
      photoDushu: 0,
      photoDay: "",
      staffCode: 0,
      photoTime: "",
      gaoCheng: "",
      lishi: 0,
      baozheng: 0,
      jingjie: 0,
      sevenData: [],
      photo_staff_gauge: ""
    };
  },
  computed: {
    status() {
      var str = "";
      if (this.photoDushu - this.lishi > 0) {
        str += "超历史;";
      }
      if (this.photoDushu - this.baozheng > 0) {
        str += "超保证;";
      }
      if (this.photoDushu - this.jingjie > 0) {
        str += "超警戒;";
      }
      if (
        this.photoDushu - this.lishi < 0 &&
        this.photoDushu - this.baozheng < 0 &&
        this.photoDushu - this.jingjie < 0
      ) {
        str += "未超限;";
      }
      return str;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // drawechart1() {
    //   var myChart = echarts.init(document.getElementById("echars1"));
    //   var option = {
    //     dataZoom: [
    //       {
    //         type: "inside",
    //         xAxisIndex: [0],
    //         start: 1,
    //         end: 45
    //       }
    //     ],
    //     grid: {
    //       left: "3%",
    //       right: "8%",
    //       bottom: "1%",
    //       containLabel: true
    //     },
    //     xAxis: {
    //       data: [
    //         "2005年",
    //         "2006年",
    //         "2007年",
    //         "2008年",
    //         "2009年",
    //         "2010年",
    //         "2011年",
    //         "2012年",
    //         "2013年",
    //         "2014年",
    //         "2015年",
    //         "2016年",
    //         "2017年"
    //       ],
    //       axisLabel: {
    //         interval: 0, //横轴信息全部显示
    //         rotate: 38, //角度倾斜显示
    //         textStyle: {
    //           color: "black"
    //         }
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           color: "#094060"
    //         }
    //       }
    //     },
    //     yAxis: {},
    //     series: [
    //       {
    //         type: "bar",
    //         data: [
    //           286,
    //           1031,
    //           3218,
    //           6690,
    //           846,
    //           3572,
    //           5736,
    //           3234,
    //           1375,
    //           2253,
    //           780,
    //           4207,
    //           232
    //         ],
    //         label: {
    //           normal: {
    //             show: true,
    //             position: "top",
    //             textStyle: {
    //               color: "black"
    //             }
    //           }
    //         },
    //         itemStyle: { color: "#53bbcb" }
    //       }
    //     ]
    //   };
    //   myChart.setOption(option);
    // },
    drawechart2() {
      var myChart = echarts.init(document.getElementById("echars2"));
      var option = {
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0],
            start: 1,
            end: 80
          }
        ],
        grid: {
          left: "3%",
          right: "8%",
          bottom: "20%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["-7天", "", "", "", "-3天", "", "", "当天"],
          splitLine: {
            show: true,
            interval: 0
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: "black"
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true
          }
        },
        series: [
          {
            data: this.sevenData,
            type: "line",
            smooth: true,
            label: {
              normal: {
                show: true,
                position: "left",
                textStyle: {
                  color: "black"
                }
              }
            },
            itemStyle: { color: "#53bbcb" },
            markLine: {
              symbol: ["none", "none"],
              label: {
                position: "end"
              },
              silent: true,
              data: [
                {
                  yAxis: this.jingjie,

                  lineStyle: {
                    color: "red"
                  }
                },
                {
                  yAxis: this.lishi,
                  lineStyle: {
                    color: "green"
                  }
                },
                {
                  yAxis: this.baozheng,
                  lineStyle: {
                    color: "blue"
                  }
                }
              ]
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  created() {
    var stationId = this.$route.params.stationid;
    axios.get("/api/stationdetail/" + stationId).then(response => {
      console.log(response.data);
      this.stationName = response.data.word[0].station_name;
      this.photoDushu = response.data.word[0].photo_dushu;
      this.photoDay = moment(response.data.word[0].photo_day).format(
        "YYYY-MM-DD"
      );
      this.staffCode = response.data.word[0].staffgauge_code * 1;
      this.photo_staff_gauge = response.data.word[0].photo_staff_gauge;
      this.photoTime = response.data.word[0].photo_time;
      this.gaoCheng = response.data.word[0].photo_gaocheng;
      this.lishi = response.data.word[0].station_history_high_value;
      this.baozheng = response.data.word[0].station_baozheng_value;
      this.jingjie = response.data.word[0].station_jingjie_value;
      var number = response.data.num;
      for (var i = number.length - 1; i >= 0; i--) {
        this.sevenData.push(number[i].photo_dushu);
      }
      this.drawechart2();
    });
  },
  mounted() {
    // this.drawechart1();
  }
};
</script>

<style lang="scss" scoped>
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
.second-divider {
  padding: 0.2rem;
}
#echars1 {
  width: 100%;
}
#container {
  margin: 0 0.2rem;
}
#boss {
  font-size: 0.32rem;
}
</style>