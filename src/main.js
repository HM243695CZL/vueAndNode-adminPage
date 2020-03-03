// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "./assets/css/normalize.css"
import "./assets/css/initScrollBar.css"
import "font-awesome/css/font-awesome.css"
import store from "./store"
import axios from "axios"
import {
  Container, Header, Aside, Main, Menu,
  Submenu, MenuItem, Table, TableColumn, Button,
  Message, MessageBox, Input, Form, FormItem,
  Notification, Pagination, Upload, Dialog, Select,
  Option, Avatar
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
// import setAxios from "./setAxios"
// setAxios();
Vue.prototype.$axios = axios;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
axios.defaults.baseURL = "http://localhost:3002";
// Vue.use(HGlobalPopup);
//路由守卫
router.beforeEach((to, from, next) => {
  //无论刷新还是跳转，第一个进入的就是这个路由前置钩子函数
  store.commit("setToken", localStorage.getItem("token"));
  store.commit("setUsername", localStorage.getItem("username"));
  store.commit("setUserId", localStorage.getItem("userId"));
  store.commit("setUserImg", localStorage.getItem("userImg"));
  store.commit("setPath", to.path);
  next();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
