<template>
  <div id="app">
    <el-carousel :interval="5000" arrow="always" :autoplay="false" @change="active">
      <el-carousel-item v-for="(val,index) in content" :key="index">
        <div class="data">
          <h3 class="data-title">{{val.station_name}}</h3>
          <!-- <img src="../../assets/img/mantou.jpg" alt="">
          <img src="../../assets/img/panghu.jpg" alt="">-->
          <img :src="val.photo_staff_gauge" alt />
        </div>
      </el-carousel-item>
    </el-carousel>
    <div id="myChart3" :style="{width: '5rem', height: '4rem'}"></div>
    <common-footer :menu="menu3" :selectMenu="selectMenu" @change="fn"></common-footer>
  </div>
</template>
<script>
import CommonFooter from "../components/CommonFooter.vue";
import axios from "axios";
import moment from "moment";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    CommonFooter
  },
  data() {
    return {
      menu3: [
        {
          name: "警戒数据",
          path: "/history"
        },
        {
          name: "邻近测站",
          path: "/near"
        },
        {
          name: "召测",
          path: "/survey"
        },
        {
          name: "更多信息",
          path: "/more"
        }
      ],
      selectMenu: {
        name: "超警测站信息",
        path: "/history"
      },
      activeName: "first",
      content: [],
      chart: [],
      today: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD"),
      num: []
    };
  },
  computed: mapState(["count"],["count2"]),
  // computed: {
  //   mapState(["count"]),

  // },
  methods: {
    fn(index) {
      // console.log(index);
      this.selectMenu = this.menu[index];
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    active(val, pre) {
      // console.log(val);
      this.$store.commit("history", val);
      // console.log(this.content[val].station_id);
      axios
        .post("/api/second", {
          stationId: this.content[val].station_id
        })
        .then(result => {
          this.num = [];
          result.data.num.forEach((val, index) => {
            // console.log(val.photo_dushu)
            this.num.push(val.photo_dushu);
          });
          this.num.reverse();
          this.drawLine2();
          // this.$store.commit("history", this.stationId)
        });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart2.setOption({
        xAxis: {
          type: "category",
          data: ["7天", "6天", "5天", "4天", "3天", "2天", "当天"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.num,
            type: "line"
          }
        ]
      });
    }
  },
  created() {
    axios.post("/api/second").then(result => {
      // console.log(result.data.word);
      result.data.word.forEach((val, index) => {
        this.chart.push(val);
        if (
          val.photo_dushu > val.station_jingjie_value &&
          val.photo_day > this.today
        ) {
          this.content.push(val);
          // console.log(this.content);
        }
      });
    });
  }
};
</script>
<style lang="scss" scoped>
.el-tabs__nav {
  width: 100%;
  display: flex;
}

.el-tabs__item {
  flex: 1;
  text-align: center;
}

.el-carousel__item {
  background-color: #f2f6fc;
}

.data {
  margin-left: 1.2rem;
  &-title {
    font-size: 0.3rem;
  }
  img {
    width: 4rem;
    height: 4rem;
  }
}

#myChart3 {
  margin: 0 1rem;
}
</style>