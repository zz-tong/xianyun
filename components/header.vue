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
      <!-- 这里基于登录完成后的用户头像及名称跳转隐藏,未登录时显示用户登录,登录后显示用户名称 -->
      <!-- 使用v-if来配置和拦截库来使用-->
      <div v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
      <!-- 用户名信息 -->
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- 头像 -->
            <img :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`">
            <!-- 昵称 -->
            <span>{{$store.state.user.userInfo.user.nickname}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <!-- @click.native给第三方添加事件需要加上native -->
            <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    //退出,退出后清除token
    handleLogout(){
      //清除登录信息
      this.$store.commit("user/chearuserInfo")  //前面的固定语法,括号里的先找到这个组件模块user再找到这方法chearuserInfo

      //退出提示方法
      this.$message({
        type:"success" , //退出成功
        message:"退出成功"
      })
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px #ddd;
}
.main {
  width: 1000px;
  margin: 0 auto;
}

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
    }
  }
  .nuxt-link-exact-active {
    //自动生成的类名,点击跳转页面定位后添加相关颜色
    background-color: #409eff;
    color: #fff;
    &:hover {
      // 这里是基于上面hover的时候层级关系字体颜色变蓝,设置a和这个父级类名同级别后再hover一下设置字体颜色为白色就不会出现bug
      color: #fff;
    }
  }
}

.logo {
  padding: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}
//头像图片
.el-dropdown-link{
  img{
    width:36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle; //垂直居中
    box-sizing: border-box;  //内减模式
    &:hover{
      border: 2px #409eff solid;
    }
  }
}
</style>