<template>
    <div class="login-container">
      <div class="form-login">
        <el-form :model="loginForm" ref="loginForm" label-width="100px">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" ref="ipt" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetVal()">重置</el-button>
            <el-button @click="login(loginForm)" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return {
            loginForm: {

            }
          }
      },
      methods: {
          resetVal(){
            this.loginForm = {};
          },
          login(loginForm){
            const h = this.$createElement;
            this.$axios.post("/login", {
              username: loginForm.username,
              password: loginForm.password
            }).then( res => {
              if(res.data.status === 500){
                this.$msgbox({
                  title: "提示消息",
                  message: h("div", null, res.data.errMsg)
                })
              }else{
                this.$store.commit("setToken", res.data.data.token);
                this.$store.commit("setUsername", res.data.data.username);
                this.$store.commit("setUserId", res.data.data.userId);
                this.$store.commit("setUserImg", res.data.data.userImg);
                localStorage.setItem("username", res.data.data.username);
                localStorage.setItem("userImg", res.data.data.userImg);
                localStorage.setItem("userId", res.data.data.userId);
                localStorage.setItem("token", res.data.data.token);
                this.$router.replace({
                  path: "/user_list"
                })
              }
            })
          }
      }
    }
</script>

<style scoped lang="less">
  .login-container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../assets/img/login-bg.jpg");
    background-size: cover;
    .form-login{
      width: 400px;
      padding: 60px 50px;
      box-sizing: content-box;
      background-color: rgb(244, 240, 252);
      border-radius: 4px;
      box-shadow: 0 0 5px #ccc;
    }
  }
</style>
