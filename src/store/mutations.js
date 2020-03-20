const mutations = {
  setToken(state, token){
    state.token = token;
  },
  setPath(state, path){
    state.path = path;
  },
  setUsername(state, username){
    state.username = username;
  },
  setUserId(state, userId){
    state.userId = userId
  },
  setUserImg(state, userImg){
    state.userImg = userImg
  },
  setThisActiveComponent(state, name){
    state.thisActiveComponent = name;
  },
  openLoading(state){
    state.isShowLoading = true;
  },
  closeLoading(state){
    state.isShowLoading = false;
  },
  increaseLoadingCount(state){
    state.loadingCount ++;
  },
  decreaseLoadingCount(state){
    state.loadingCount --;
  },
  resetLoadingCount(state){
    state.loadingCount = 0;
  }
};
export default mutations;
