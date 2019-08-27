<template>
  <div>
    <common-header :selectMenu="selectMenu"></common-header>

    <div class="content">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="上游站" name="first">
          <up></up>
        </el-tab-pane>
        <el-tab-pane label="下游站" name="second">
            <down></down>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../../components/CommonHeader";
import Up from "../next/up"
import Down from "../next/down";
import axios from "axios";
import moment from "moment";
export default {
  components: {
    CommonHeader,
    Up,
    Down
  },
  data() {
    return {
      selectMenu: {
        name: "单站水位信息"
      },
      activeName: "first",
      form: {},
      form2: {},
      today: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DD")
    };
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
  margin: 1rem 0;
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