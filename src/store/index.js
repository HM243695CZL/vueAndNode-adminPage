import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import state from "./state"
import mutations from "./mutations"
import createLogger from "vuex/dist/logger" //在控制台打印日志
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
