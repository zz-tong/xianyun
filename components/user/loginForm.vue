<template>
  <!-- model:绑定数据对象 -->
  <!-- ref：获取dom元素，this.$refs.form   -->
  <!-- rules：表单验证规则 -->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <!-- 用户名输入框 -->
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <!-- 密码输入框 -->
    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <!-- 登录按钮 -->
    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则,只负责提示，但是表单还是可以提交
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      this.$refs.form.validate(valid => {
        // 当valid的值等于true说明表单验证通过
        if (valid) {
          //请求登录接口
          this.$axios({
            url: "accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            console.log(res);
            // 调用mutations下的setUserInfo的方法,使用commit
            //commit 接收两个参数,第一时mutations参数方法名,第二是参数数据
            this.$store.commit("user/setUserInfo", res.data);
            //直接添加跳转到主页
            this.$router.push("/");
          });
        } else {
          console.log("验证失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>