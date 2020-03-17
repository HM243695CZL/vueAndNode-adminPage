<template>
  <nav class="side-menu">
    <ul class="asideMenu">
      <li class="level-1" v-for="(item, index) in menus">
        <div :class="['oneMenu', index === activeFlag ? 'activeMenu' : '']" @click="showToggle(item, index)"><i :class="item.iconName"></i><span>{{item.text}}</span></div>
        <ul class="level-2" v-show="item.isSubShow">
          <li class="level-2-title" v-for="sub in item.subItem">
            <div class="oneMenuChild" @click="clickMenuItem(sub)">{{sub.text}}</div>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    data () {
      return {
        indexPage: {
          name: "indexPage",
          text: "首页"
        },
        menus: [
          {
            text: '我的',
            isSubShow: false,
            iconName: "el-icon-user",
            id: 0,
            subItem: [
              {
                text: "用户列表",
                name: "userList"
              },
              {
                text: "我的推荐",
                name: "myRecommend"
              },
              {
                text: "创建歌单",
                name: "createSongList"
              }
            ]
          },
          {
            text: '发现',
            isSubShow: false,
            iconName: "el-icon-search",
            id: 1,
            subItem: [
              {
                text: "轮播图",
                name: "slidePic"
              },
              {
                text: "轮播图类型",
                name: "slidePicType"
              },
              {
                text: "推荐歌单",
                name: "recommendSong"
              },
              {
                text: "新歌",
                name: "newSong"
              },
              {
                text: "云村精选",
                name: "cloudSelect"
              },
              {
                text: "云村推荐",
                name: "cloudRecommend"
              },
              {
                text: "听听",
                name: "listenListen"
              },
              {
                text: "听听类型",
                name: "listenListenType"
              }
            ]
          },
          {
            text: "云村",
            isSubShow: false,
            iconName: "el-icon-cloudy",
            id: 2,
            subItem: [
              {
                text: "广场",
                name: "square"
              },
              {
                text: "关注",
                name: "attention"
              }
            ]
          },
          {
            text: "曲库",
            isSubShow: false,
            iconName: "fa fa-music",
            id: 3,
            subItem: [
              {
                text: "曲库",
                name: "songLib"
              }
            ]
          },
          {
            text: "视频库",
            isSubShow: false,
            iconName: "fa fa-video-camera",
            id: 4,
            subItem: [
              {
                text: "视频库",
                name: "videoLib"
              }
            ]
          },
          {
            text: "配置路径",
            isSubShow: false,
            iconName: "el-icon-user",
            id: 5,
            subItem: [
              {
                text: "配置路径",
                name: "configPath"
              }
            ]
          }
        ],
        activeFlag: 0
      }
    },
    created () {
      this.$taber.$on('vue-tabs-active-change', (tab) => {
        if (tab) {
          this.selected = tab.meta.title
        } else {
          this.selected = null
        }
      });
      this.$taber.$on("vue-tabs-close", (tab) => {

      })
    },
    mounted(){
      //加载首页
      this.clickMenuItem(this.indexPage);
    },
    methods: {
      clickMenuItem (item) {
        this.selected = item.text;
        this.$taber.open({
          name: item.name,
          params: {
            title: item.text
          }
        })
      },
      showToggle(item, index){
        this.menus.forEach(i => {
          if(i.id === index){
            i.isSubShow = !i.isSubShow;
            this.activeFlag = i.id;
          }
        });
      }
    }
  }
</script>
<style lang="less">
  ul{
    margin: 0;
    padding: 0;
    li{
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
  .side-menu {
    padding-top: 20px;
    height: 100%;
    background-color: #1f2e54;
    color: #fff;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .asideMenu{
      background-color: #1f2e54;
      cursor: pointer;
      .level-1{
        .oneMenu{
          list-style: none;
          margin-top: 10px;
          padding-left: 15px;
          color: #96a8d6;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          span{
            padding-left: 5px;
          }
        }
        .activeMenu{
          background-color: #121f3e;
          color: #fff;
        }
        &:hover{
          background-color: #121f3e;
        }
      }
      .level-2{
        background: #121f3e;
        .level-2-title{
          color: #FFF;
          font-size: 14px;
          line-height: 40px;
          .oneMenuChild{
            padding-left: 25px;
            color: #8d9fcc;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            &:hover{
              background-color: #55a8fd;
              color: #fff;
            }
          }
        }
      }

    }
  }
</style>
