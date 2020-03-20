const state = {
  token: "",
  path: "",
  username: "",
  userId: "",
  userImg: "",
  url: "http://localhost:3002",
  thisActiveComponent: "IndexPage", //当前激活的组件，默认首页
  isShowLoading: true, //设置loading是否显示
  loadingCount: 0 //根据是否为0来判断是否关闭loading
};
export default state;
