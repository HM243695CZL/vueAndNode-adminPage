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
  }
};
export default mutations;
