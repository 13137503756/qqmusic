<template>
  <div id="app">
    <!-- 头部导航 -->
    <Nav></Nav>
    <!-- 首页的路由显示 -->
    <router-view/>
    <!-- 底部页脚 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "./components/Nav"
import Footer from "./components/Footer"
  export default {
      components:{
          Nav,
          Footer
      }
  }
</script>

<style>

</style>
