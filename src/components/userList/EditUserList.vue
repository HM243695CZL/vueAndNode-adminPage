<template>
    <div class="edit-userList-container" v-show="show">
      <div class="mask-layer" @click="cancelEdit()"></div>
      <div class="content">
        <el-form :model="list" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="list.username" autoComplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="list.password" autoComplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <div class="upload-box">
              <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeUpload()" ref="uploadFile" class="op-input" accept="image/jpeg, image/png, image/tif, image/bmp">
            </div>
            <div class="img-box">
              <img :src="list.imgSrc" alt="">
            </div>
            <div class="file-name" :title="uploadFileName">{{uploadFileName}}</div>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <el-button @click="cancelEdit()">取消</el-button>
              <el-button type="primary" @click="confirm()">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "EditUserList",
      data(){
          return {
            uploadFileName: "",
          }
      },
      props: ["list", "show"],
      methods: {
        cancelEdit(flag){
          this.$emit("cancelEdit", flag);
        },
        confirm(){
          var file = this.$refs.uploadFile.files[0];
          var addParam = new FormData();
          addParam.append("username", this.list.username);
          addParam.append("password", this.list.password);
          addParam.append("imgSrc", file, file.name);
          this.$axios.post("/addUser", addParam).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success'
              });
              this.cancelEdit(true);
            }
          })
        },
        changeUpload(){
          this.list.imgSrc = window.URL.createObjectURL(this.$refs.uploadFile.files[0]);
          this.uploadFileName = this.$refs.uploadFile.files[0].name;
        },
      },
      watch: {
          "show": function(newVal){
            if(newVal){
              this.$refs.uploadFile.value = "";
              this.uploadFileName = "";
            }
          }
      }
    }
</script>

<style scoped lang="less">
.edit-userList-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  .mask-layer{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
  }
  .content{
    position: absolute;
    top: 120px;
    left: 50%;
    width: 480px;
    box-sizing: border-box;
    padding: 20px;
    margin-left: -240px;
    height: 280px;
    background-color: #fff;
    border-radius: 4px;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .upload-box{
      float: left;
      position: relative;
      .op-input{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
    .img-box{
      float: left;
      width: 50px;
      height: 50px;
      margin-left: 20px;
      img{
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .file-name{
      float: left;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-left: 10px;
      font-size: 12px;
      color: #00f;
    }
    .btn-group{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
