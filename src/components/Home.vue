<template>
  <div class="home-container">
    <el-container>
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
      <el-container>
        <el-aside width="200px">
          <el-menu
            :router="isRouter"
            :default-active="$store.state.path"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>我的
              </template>
              <el-menu-item index="/user_list">用户列表</el-menu-item>
              <el-menu-item index="/my_recommend">我的推荐</el-menu-item>
              <el-menu-item index="/created_song_list">创建歌单</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>发现
              </template>
              <el-menu-item index="/slide_pic">轮播图</el-menu-item>
              <el-menu-item index="/slide_pic_type">轮播图类型</el-menu-item>
              <el-menu-item index="/recommend_song">推荐歌单</el-menu-item>
              <el-menu-item index="/new_song">新歌</el-menu-item>
              <el-menu-item index="/cloud_select">云村精选</el-menu-item>
              <el-menu-item index="/cloud_recommend">云村推荐</el-menu-item>
              <el-menu-item index="/listen_listen">听听</el-menu-item>
              <el-menu-item index="/listen_listen_type">听听类型</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="fa fa-cloud icon"></i>云村
              </template>
              <el-menu-item index="/square">广场</el-menu-item>
              <el-menu-item index="/attention">关注</el-menu-item>
            </el-submenu>
            <el-menu-item index="/song_lib">
              <i class="fa fa-music icon"></i>
              <span slot="title">曲库</span>
            </el-menu-item>
            <el-menu-item index="/video_lib">
              <i class="fa fa-video-camera icon"></i>
              <span slot="title">视频库</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        isRouter: true,
      }
    },
    methods: {
      exit(){
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("userImg");
        this.$router.replace({
          path: "/login"
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .home-container{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .el-container {
      width: 100%;
      height: 100%;

      .el-header {
        background-color: rgb(172, 6, 6);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;

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
    }
    .icon{
      width: 24px;
      text-align: center;
      margin-right: 5px;
    }
  }
</style>
