<template>
  <div id="app">
    <common-header :selectMenu="selectMenu"></common-header>
    <div class="nav">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="超历史" name="first">
          <second-history></second-history>
        </el-tab-pane>
        <el-tab-pane label="超保证" name="second">
          <second-promise></second-promise>
        </el-tab-pane>
        <el-tab-pane label="超警戒" name="third">
          <second-alert></second-alert>
        </el-tab-pane>
        <el-tab-pane label="快涨落" name="fourth">
          <common-footer :menu="menu4" :selectMenu="selectMenu" @change="fn"></common-footer>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter.vue";
import SecondHistory from "../Second/SecondHistory";
import SecondPromise from "../Second/SecondPromise";
import SecondAlert from "../Second/SecondAlert";
import axios from "axios";
import moment from "moment";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    CommonHeader,
    CommonFooter,
    SecondHistory,
    SecondPromise,
    SecondAlert
  },
  data() {
    return {
      menu: [
        {
          name: "历史数据",
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
      menu2: [
        {
          name: "保证数据",
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
      menu4: [
        {
          name: "涨落数据",
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
      content: []
    };
  },
  methods: {
    fn(index) {
      // console.log(index);
      this.selectMenu = this.menu[index];
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
.nav {
  margin-top: 1rem;
}

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

#myChart1 {
  margin: 0 1rem;
}
</style>