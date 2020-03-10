<template>
  <el-header>
    <div class="des">
      <div class="left-logo">
        <div class="logo">
          <img src="../assets/img/logo.png" alt="">
        </div>
        <div class="title">
          云音乐后台管理
        </div>
      </div>
      <div class="right-icon">
        <div class="username" :title="$store.state.username">
          <el-avatar :size="30" :src="$store.state.userImg"></el-avatar>
        </div>
        <i class="el-icon-switch-button exit" @click="exit()"></i>
      </div>
    </div>
  </el-header>
</template>

<script>
    export default {
        name: "TopNav",
      data(){
        return {

        }
      },
      methods: {
          exit(){
            console.log("退出登录");
          }
      }
    }
</script>

<style scoped lang="less">
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
    box-shadow: 0 1px 1px #ccc;
    .des {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left-logo{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .logo {
          width: 50px;
          height: 50px;
          margin-right: 20px;

          img {
            display: block;
            width: 100%;
            height: auto;
          }
        }
      }
      .right-icon{
        display: flex;
        align-items: center;
        .username{
          margin-right: 10px;
        }
        .exit{
          cursor: pointer;
        }
      }
    }
  }
</style>
