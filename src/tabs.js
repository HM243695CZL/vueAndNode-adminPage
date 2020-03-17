import IndexPage from "./components/IndexPage"

import UserList from "./components/userList/UserList"
import MyRecommend from "./components/myRecommend/myRecommend"
import CreateSongList from "./components/createdSongList/CreatedSongList"

import SlidePic from "./components/slidePic/SlidePic"
import SlidePicType from "./components/slidePicType/slidePicType"
import RecommendSong from "./components/recommendSong/recommendSong"
import NewSong from "./components/newSong/NewSong"
import CloudSelect from "./components/cloudSelect/cloudSelect"
import CloudRecommend from "./components/cloudRecommend/CloudRecommend"
import ListenListen from "./components/listenListen/ListenListen"
import ListenListenType from "./components/listenListenType/ListenListenType"

import Square from "./components/square/Square"
import Attention from "./components/attention/Attention"

import VideoLib from "./components/videoLib/VideoLib"

import SongLib from "./components/songLib/SongLib"

import ConfigPath from "./components/configPath/ConfigPath"

import * as constants from "./constants/constants.js"
export default [
  {
   name: "indexPage",
   title: "首页",
   componentName: constants.INDEX_COMP_NAME,
   component: IndexPage
  },
  {
    name: "userList",
    title: "用户列表",
    componentName: "UserList",
    component: UserList
  },
  {
    name: "myRecommend",
    title: "我的推荐",
    componentName: "MyRecommend",
    component: MyRecommend
  },
  {
    name: "createSongList",
    title: "创建歌单",
    componentName: "CreateSongList",
    component: CreateSongList
  },
  {
    name: "slidePic",
    title: "轮播图",
    componentName: "SlidePic",
    component: SlidePic
  },
  {
    name: "slidePicType",
    title: "轮播图类型",
    componentName: "SlidePicType",
    component: SlidePicType
  },
  {
    name: "recommendSong",
    title: "推荐歌单",
    componentName: "RecommendSong",
    component: RecommendSong
  },
  {
    name: "newSong",
    title: "新歌",
    componentName: "NewSong",
    component: NewSong
  },
  {
    name: "cloudSelect",
    title: "云村精选",
    componentName: "CloudSelect",
    component: CloudSelect
  },
  {
    name: "cloudRecommend",
    title: "云村推荐",
    componentName: "CloudRecommend",
    component: CloudRecommend
  },
  {
    name: "listenListen",
    title: "听听",
    componentName: "ListenListen",
    component: ListenListen
  },
  {
    name: "listenListenType",
    title: "听听类型",
    componentName: "ListenListenType",
    component: ListenListenType
  },
  {
    name: "square",
    title: "广场",
    componentName: "Square",
    component: Square
  },
  {
    name: "attention",
    title: "关注",
    componentName: "Attention",
    component: Attention
  },
  {
    name: "songLib",
    title: "曲库",
    componentName: "SongLib",
    component: SongLib
  },
  {
    name: "videoLib",
    title: "视频库",
    componentName: "VideoLib",
    component: VideoLib
  },
  {
    name: "configPath",
    title: "配置路径",
    componentName: "ConfigPath",
    component: ConfigPath
  }
]
