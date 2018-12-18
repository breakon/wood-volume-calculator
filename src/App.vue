<template>
  <div id="app">
    <router-view/>
    <!-- <Home></Home> --> 
    <div class="bott-nav">
      <el-row>
        <el-col :span="6">
          <div class="grid-content vertical-flex nav-lins-color">计算</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content vertical-flex">材积表</div>
        </el-col>
        <el-col :span="6">
          <!-- <router-link to="Test">   -->
          <div class="grid-content vertical-flex">关于产品</div>
          <!-- </router-link> -->
        </el-col>
        <el-col :span="6">
          <div class="grid-content vertical-flex">个人服务</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import Home from "./main/home/home"; //头部
import Test from "./packets/test/test"; //头部
export default {
  name: "App",
  components: {
     Test
  }
};
</script>

<style lang="stylus">
body {
  background: #eff3f5;
  height: 100%;
  width: 100%;

  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .bott-nav {
    width: 100%;
    position: fixed;
    bottom: 0;
    display :none;
    background: #fff;
    z-index: 1001;
  }

  .nav-lins-color {
    border-bottom: 2px solid #409eff;
  }
}

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%
  margin-top: 60px; */
}
</style>
