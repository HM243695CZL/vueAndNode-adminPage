//设置请求加载的遮罩层
import axios from "axios"
import store from "./store"

export default function setReqLoad(){
  //请求拦截器
  axios.interceptors.request.use(
    config => {
      if(store.state.loadingCount === 0){
        //0表示显示
        store.commit("openLoading");
      }
      store.commit("increaseLoadingCount"); //每一次请求loadingCount ++
      return config;
    }
  );
//响应拦截器
  axios.interceptors.response.use(
    config => {
      store.commit("decreaseLoadingCount"); //有响应loadingCount --
      if(store.state.loadingCount === 0){
        //关闭加载层
        store.commit("closeLoading");
      }
      return config;
    }
  );
}

