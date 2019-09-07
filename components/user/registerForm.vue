<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <!-- 内部实现了调用 this.$emit("click") 触发传递的方法-->
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input v-model="form.checkPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 下面这个是确认密码验证方法------
    // rule当前的规则，目前是空的
    // value输入框的值
    // callback是回调函数，必须要调用
    const checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        // 代表验证通过
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPassword: "" //确认密码
      },
      //   表单规定
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        // validator 不能改，表示指向验证函数//查看组件模块中的相关认证方法
        checkPassword: [{ validator: checkPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送手机验证码
    handleSendCaptcha() {
      //要在下面的代码前先判断手机号码是否为空,不请求数据
      if (!this.form.username) {
        this.$message.error("请输入手机号码");
        //如上面的代码为空 则不执行下面的代码
        return;
      }

      //调用接口获取数据发送验证码
      this.$axios({
        url: "captchas",
        method: "POST",
        data: {
          tel: this.form.username // 已做了数据绑定了 在表单总的用户手机直接获取这个手机号码
        }
      }).then(res => {
        console.log(res);
        //解构出验证码code属性(即验证码)
        const { code } = res.data;
        //给一个弹窗
        // $alert方法也可以
        this.$alert(`验证码发送成功,模拟验证码是:${code}`, "提示");
        // message方法也是可以
        // this.$message({
        //   type:"success",
        //   message:`验证码发送成功,模拟验证码是:${code}`
        // })
      });
    },
    //注册
    handleRegSubmit() {
      console.log(this.form);
      //提交注册,先获取表单元素,使用这个方法validate()
      this.$refs.form.validate(valid => {
        //先判断是否为true
        if (valid) {
          //把确认密码抽离出来不需要,...就是剩下的属性随意给一个ret带回剩余4个属性
          // ...+变量名会指向剩余的属性
          const { checkPassword, ...ret } = this.form;
          // 调用注册接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: ret //调用剩余抽离部分
            // 这个方法也可以,比较传统,使用上面的抽离
            // data:{
            //   username:form.username ,
            //   nickname:form.nickname,
            //   captcha:form.captcha,
            //   password:form.password
            // }
          }).then(res => {
            //注册成功后自动登录
            console.log(res);
            //与登录成功后的代码一样一样的步骤流程loginForm.vue登录成一样
            this.$store.commit("user/setUserInfo", res.data);
            //弹框提示
            this.$message({
              type:"success",
              message:`注册成功`
            })
            //直接添加跳转到主页
              this.$router.push("/")
          });
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