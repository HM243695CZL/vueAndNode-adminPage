<template>
  <div id="app">
    <div class="app-container" v-if="this.$store.state.token">
      <top-nav></top-nav>
      <el-container>
        <el-aside width="100px">
          <side-menu></side-menu>
        </el-aside>
        <el-main>
          <vue-tabs></vue-tabs>
        </el-main>
      </el-container>
    </div>
    <div class="app-container" v-else>
      <login></login>
    </div>
  </div>
</template>

<script>
  import Hello from "./components/HelloWorld"
  import SideMenu from "./components/SideMenu"
  import TopNav from "./components/TopNav"
  import Login from "./components/Login"
export default {
  name: 'App',
  components: {
    Hello, SideMenu, TopNav, Login
  },
  methods: {
    dd(tab){
      console.log(tab);
    }
  }
}
</script>

<style scoped lang="less">
  html, body {
    padding: 0px;
    margin: 0px;
  }
  * {
    box-sizing: border-box;
  }
  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 9.15em;
    overflow-y: hidden;
    height: 100vh;
    .app-container{
      width: 100%;
      height: 100%;
    }
    .el-aside{
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
    }
    .el-main{
      position: fixed;
      left: 100px;
      top: 60px;
      bottom: 0;
      right: 0;
      background: #F2F2F5;
      padding: 0;
      padding-top: 50px;
    }
  }
</style>
