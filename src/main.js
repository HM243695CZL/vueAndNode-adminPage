// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueTaber from "./VueTaber"
// import router from './router'
import "./assets/css/normalize.css"
import "./assets/css/initScrollBar.css"
import "font-awesome/css/font-awesome.css"
import store from "./store"
import axios from "axios"
import tabs from "./tabs"
import echarts from "echarts"
import {
  Container, Header, Aside, Main, Menu,
  Submenu, MenuItem, Table, TableColumn, Button,
  Message, MessageBox, Input, Form, FormItem,
  Notification, Pagination, Upload, Dialog, Select,
  Option, Avatar, Card, Row, Col,
  Tooltip, Badge, DatePicker, Loading
} from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
// import HGlobalPopup from "./components/GlobalPopup/index"
Vue.config.productionTip = false;
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.component(Message);
Vue.component(MessageBox);
Vue.component(Notification);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Pagination);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Avatar);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tooltip);
Vue.use(Badge);
Vue.use(DatePicker);
Vue.use(Loading);
// import setAxios from "./setAxios"
// setAxios();
// import setReqLoad from "./setReqLoad"
// setReqLoad();
Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading;
axios.defaults.baseURL = "http://localhost:3002";
Vue.prototype.$echarts = echarts;
const vueTaber = new VueTaber({
  tabs,
  persist: false
});
vueTaber.beforeCreateEach((tab, next) => {
  if(tab.name === "setting"){
    next("home");
  }else{
    next();
  }
});
Vue.use(VueTaber);
// Vue.use(HGlobalPopup);
//获取浏览器的缓存，设置token、username、userId、userImg
  store.commit("setToken", localStorage.getItem("token"));
  store.commit("setUsername", localStorage.getItem("username"));
  store.commit("setUserId", localStorage.getItem("userId"));
  store.commit("setUserImg", localStorage.getItem("userImg"));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  taber: vueTaber,
  store,
  components: { App },
  template: '<App/>'
})
