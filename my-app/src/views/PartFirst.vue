<template>
  <div>
    <div @click="toStatistics()">
      <el-row id="topbar" >
        <!-- 第一个小轮播-->
        <!-- <router-link to="/statisticsmode"> -->
          <!-- 点击进入统计模式 -->
          <div
            class="topbar-word move"
          >超历史最高测站{{historyMax}}个，超保证水位测站{{overensure}}个，超警戒水位测站{{danger}}个</div>
        <!-- </router-link> -->
      </el-row>
    </div>

    <el-row id="second-swiper" type="flex">
      <!-- 第二个小轮播-->
      <router-link to="/second">
        <div id="second-box" class="move">
          <div>
            <span style="background:rgba(153, 0, 0, 1);color:white">超历史:</span>
            <template v-for="item in lishiArr">站名:{{item.name}}-水位:{{item.dushu}}</template>
          </div>
          <div>
            <span style="background:red;color:white">超保证:</span>
            <template v-for="item in baozhengArr">站名:{{item.name}}-水位:{{item.dushu}}</template>
          </div>
          <div>
            <span style="background:yellow;color:black">超警戒:</span>
            <template v-for="item in jingjieArr">站名:{{item.name}}-水位:{{item.dushu}}</template>
          </div>
        </div>
      </router-link>
    </el-row>
    <el-row id="fault-station">
      <!--第三个固定数据-->
      <router-link to="/third">故障站：共{{breakStation}}个</router-link>
    </el-row>
    <el-row id="history-three">
      <!--最近查看过的三个 -->
      <template v-for="item in threeData">
        <div class="box" @click="unitInformation(item.station_id)" :key="item.station_id">
          <el-row class="station-name">站名：{{item.station_name}}</el-row>
          <el-row class="station-num">{{item.photo_dushu}}</el-row>
          <el-row class="station-status">
            <i :class="item.activeClass"></i>
            {{item.status}}
          </el-row>
        </div>
      </template>
      <div class="box" @click="toMore">
        <el-row class="more">
          <span>更多</span>
        </el-row>
      </div>
    </el-row>
    <el-row>
      <el-button type="text" class="function-set" @click="functionSet">功能设置区</el-button>
    </el-row>
  </div>
</template>
<script>
var timer = null;
import axios from "axios";
export default {
  name: "part-first",
  data() {
    return {
      threeData: [],
      historyMax: 0,
      overensure: 0,
      danger: 0,
      lishiArr: [],
      baozhengArr: [],
      jingjieArr: [],
      breakStation: 0
    };
  },
  computed: {
    swiperFirst() {
      return;
    }
  },
  methods: {
    // autoGo() {
    //   var stringToArr = this.$refs.getWidth.innerText.split("");
    //   var lastWord = stringToArr.shift();
    //   stringToArr.push(lastWord);
    //   stringToArr = stringToArr.join("");
    //   this.$refs.getWidth.innerText = stringToArr;
    // },
    unitInformation(id) {
      this.$router.push("/unitinformation/" + id);
    },
    functionSet() {
      this.$router.push("/functionset");
    },
    toMore() {
      this.$router.push("/statisticsmode/areatotal");
    },
    toStatistics() {
      this.$router.push("/statisticsmode");
    }
  },
  created() {
    axios.get("/api/first").then(response => {
      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        var baozheng =
          response.data[i].photo_dushu -
          response.data[i].station_baozheng_value;
        var lishi =
          response.data[i].photo_dushu -
          response.data[i].station_history_high_value;
        var jingjie =
          response.data[i].photo_dushu - response.data[i].station_jingjie_value;
        if (baozheng > 0) {
          this.overensure += 1;
          var tempObj1 = {};
          tempObj1.name = response.data[i].station_name;
          tempObj1.dushu = response.data[i].photo_dushu;
          this.baozhengArr.push(tempObj1);
        }
        if (lishi > 0) {
          this.historyMax += 1;
          var tempObj2 = {};
          tempObj2.name = response.data[i].station_name;
          tempObj2.dushu = response.data[i].photo_dushu;
          this.lishiArr.push(tempObj2);
        }
        if (jingjie > 0) {
          this.danger += 1;
          var tempObj3 = {};
          tempObj3.name = response.data[i].station_name;
          tempObj3.dushu = response.data[i].photo_dushu;
          this.jingjieArr.push(tempObj3);
        }
      }
    });
    axios.get("/api/lastthree").then(response => {
      response.data.forEach(item => {
        var overLishi = item.photo_dushu - item.station_history_high_value;
        var overBaozheng = item.photo_dushu - item.station_baozheng_value;
        var overJingjie = item.photo_dushu - item.station_jingjie_value;
        if (overJingjie > 0) {
          item.activeClass = "el-icon-caret-top";
          item.status = `警戒：${overJingjie}`;
        } else if (overBaozheng > 0) {
          item.activeClass = "el-icon-caret-top";
          item.status = `保证：${overBaozheng}`;
        } else if (overLishi > 0) {
          item.activeClass = "el-icon-caret-top";
          item.status = `历史：${overLishi}`;
        } else if (overJingjie <= 0) {
          item.activeClass = "el-icon-caret-bottom";
          item.status = `警戒：${overJingjie}`;
        } else if (overBaozheng <= 0) {
          item.activeClass = "el-icon-caret-bottom";
          item.status = `保证：${overBaozheng}`;
        } else if (overLishi <= 0) {
          item.activeClass = "el-icon-caret-bottom";
          item.status = `历史：${overLishi}`;
        }
      });
      this.threeData = response.data;
    });
    axios.get("/api/getbreak").then(response => {
      console.log(response.data);
      this.breakStation = response.data[0].num;
    });
  }
  // mounted() {
  //   timer = setInterval(this.autoGo, 500);
  // },
  // beforeDestroy() {
  //   clearInterval(timer);
  //   timer = null;
  // }
};
</script>

<style lang="scss" scoped>
a {
  color: #333;
}
.el-row {
  padding: 0 0.2rem;
  margin-bottom: 0.2rem;
}
#topbar {
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px #ccc solid;
  font-size: 0.32rem;
  overflow: hidden;
  .topbar-word {
    position: absolute;
    white-space: nowrap;
  }
}
#second-swiper {
  font-size: 0.32rem;
  overflow: hidden;
  #second-box {
    display: flex;
    div {
      white-space: nowrap;
    }
  }
}
#fault-station {
  font-size: 0.32rem;
  border-top: 1px #ccc solid;
  border-bottom: 1px #ccc solid;
}
#history-three.el-row {
  display: flex;
  flex-wrap: wrap;
  div.box {
    position: relative;
    border: 1px #ccc solid;
    padding: 24%;
    flex-grow: 1;
    font-size: 0.4rem;
    font-weight: bolder;
    .station-name {
      position: absolute;
      left: 0.02rem;
      top: 0.1rem;
    }
    .station-num {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .station-status {
      position: absolute;
      left: 0.02rem;
      bottom: -0.19rem;
    }
    .more {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.function-set {
  width: 100%;
  font-size: 0.4rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-indent: 10px;
  text-align: left;
}
.move {
  animation: autogo 10s -4s linear infinite normal forwards;
}
@keyframes autogo {
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>