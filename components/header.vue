<template>
  <div class="container">
    <!-- justify="space-between"这个是m-ui中的方法 -->
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/logo.jpg" alt />
      </div>
      <!-- 导航 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- 登录/注册跳转 -->
      <div>
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px #ddd;
};
.main {
  width: 1000px;
  margin: 0 auto;
};

.navs {
  flex: 1;
  a {
    display: block;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    &:hover {
      color: #409eff;
      border-bottom: 5px #409eff solid;
    };
  };
  .nuxt-link-exact-active {
    //自动生成的类名,点击跳转页面定位后添加相关颜色
    background-color: #409eff;
    color: #fff;
    &:hover {
      // 这里是基于上面hover的时候层级关系字体颜色变蓝,设置a和这个父级类名同级别后再hover一下设置字体颜色为白色就不会出现bug
      color: #fff;
    };
  };
};

.logo {
  padding: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  };
};
</style>