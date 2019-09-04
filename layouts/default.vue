<template>
  <div>
    <!-- 渲染头部组件 -->
    <Header/>
    <!-- 页面占位符,类似于router-view -->
    <nuxt />
    <Footer/>
  </div>
</template>
<script>
//引入header头部组件
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  
  // 注册组件
  components:{
    Header,
    Footer
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*{
  margin: 0;
  padding: 0;
}
ul,li,ol{
  list-style: none;
}
/* 设置字体样式整体 */
i,em{
  font-style: normal;
}
/* 设置默认父级元素颜色及下划线 */
a{
  color: inherit;
  text-decoration: none;
}
/* a标签hover的时候的颜色样式 */
a:hover{
  color: inherit
}

</style>
