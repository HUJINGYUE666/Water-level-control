<template>
  <div>
    <el-page-header class="header" style="border-bottom:1px #ccc solid">
      <span slot="title" class="go-back">
      </span>
      <span slot="content" class="mode">登 陆</span>
    </el-page-header>
    <div class="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名:" prop="name">
          <el-input type="name" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="pass">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label prop="checked">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CommonHeader from "../components/CommonHeader";
import axios from "axios";
export default {
  components: {
    CommonHeader
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm.checkPass !== "") {
        //   this.$refs.ruleForm.validateField("checkPass");
        // }
        callback();
      }
    };
    return {
      selectMenu: {
        name: "登录"
      },
      ruleForm: {
        username: "",
        password: ""
      },
      checked: "",
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {
    this.getCookie();
  },
  methods: {
    submitForm(formName) {
      axios
        .post("/api/login", {
          name: this.ruleForm.username,
          pwd: this.ruleForm.password
        })
        .then(result => {
          console.log(result);
          if (result.data.code == 1) {
            if (this.checked) {
              this.setCookie(this.ruleForm.username, this.ruleForm.password, 6666666);
            }else{
              this.clearCookie();
            }
            console.log("登陆成功");
            this.$router.push("/first");
          } else {
            console.log("登陆失败");
            this.clearCookie();
            this.ruleForm.username = "";
            this.ruleForm.password = "";
            this.$router.push("/");
          }
        });
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
  }
};
</script>

<style lang="scss">
// .header-btn {
//   display: none;
// }
.content {
  margin: 1rem 0;
}
.el-form {
  margin: 2rem 0;
  margin-right: 1rem;
}
</style>