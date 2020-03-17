import axios from "axios"
import store from "./store"
import router from "./router"

//http全局拦截
//token要放在请求的header上面带回去给后端
export default function setAxios(){
  //请求拦截
  axios.interceptors.request.use(
    config => {
      if(store.state.token){
        config.headers = {
          Authorization: store.state.token,
          test: store.state.userId
        }
      }
      return config;
    }
  );
  //每次的请求有数据返回时，都先经过这个拦截器
  axios.interceptors.response.use(
    response => {
      if(response.data.status === -1){
        //登录过期，重新登录，清空vuex的token和localstorage的token
        store.commit("setToken", "");
        localStorage.removeItem("token");
        //跳转到登录
        router.replace({
          path: "/login"
        })
      }
      return response;
    }
  )
}
