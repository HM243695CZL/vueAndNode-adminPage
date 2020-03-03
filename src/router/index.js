import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import Login from "@/components/Login";
import UserList from "@/components/userList/UserList"
import MyRecommend from "@/components/myRecommend/myRecommend"
import CreatedSongList from "@/components/createdSongList/CreatedSongList"
import SlidePic from "@/components/slidePic/SlidePic"
import SlidePicType from "@/components/slidePicType/slidePicType"
import RecommendSong from "@/components/recommendSong/recommendSong"
import NewSong from "@/components/newSong/NewSong"
import CloudSelect from "@/components/cloudSelect/CloudSelect"
import CloudRecommend from "@/components/cloudRecommend/CloudRecommend"
import ListenListen from "@/components/listenListen/ListenListen"
import ListenListenType from "@/components/listenListenType/ListenListenType"
import Square from "@/components/square/Square"
import Attention from "@/components/attention/Attention"
import SongLib from "@/components/songLib/SongLib"
import VideoLib from "@/components/videoLib/VideoLib"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: "user_list",
          name: "user_list",
          component: UserList
        },
        {
          path: "my_recommend",
          name: "my_recommend",
          component: MyRecommend
        },
        {
          path: "created_song_list",
          name: "created_song_list",
          component: CreatedSongList
        },
        {
          path: "slide_pic",
          name: "slide_pic",
          component: SlidePic
        },
        {
          path: "slide_pic_type",
          name: "slide_pic_type",
          component: SlidePicType
        },
        {
          path: "recommend_song",
          name: "recommend_song",
          component: RecommendSong
        },
        {
          path: "new_song",
          name: "new_song",
          component: NewSong
        },
        {
          path: "cloud_select",
          name: "cloud_select",
          component: CloudSelect
        },
        {
          path: "cloud_recommend",
          name: "cloud_recommend",
          component: CloudRecommend
        },
        {
          path: "listen_listen",
          name: "listen_listen",
          component: ListenListen
        },
        {
          path: "listen_listen_type",
          name: "listen_listen_type",
          component: ListenListenType
        },
        {
          path: "square",
          name: "square",
          component: Square
        },
        {
          path: "attention",
          name: "attention",
          component: Attention
        },
        {
          path: "song_lib",
          name: "song_lib",
          component: SongLib
        },
        {
          path: "video_lib",
          name: "video_lib",
          component: VideoLib
        }
      ]
    }
  ]
})
