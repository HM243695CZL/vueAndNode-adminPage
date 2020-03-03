<template>
    <div class="edit-cloud-select-container" v-show="show">
      <div @click="cancelEdit()" class="mask-layer"></div>
      <div class="content">
        <el-form :model="form" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="说明">
            <el-input v-model="form.text"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-select v-model="form.authorId" value="" placeholder="请选择作者" @change="selectedUser">
              <el-option v-for="item in usernameList" :key="item.id" :label="item.username" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片">
            <div class="upload-box">
              <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeUpload()" ref="uploadFile" class="op-input" accept="image/bmp, image/tif, image/png, image/gif, image/jpeg">
            </div>
            <div class="img-box">
              <img :src="form.slideImg" alt="">
            </div>
            <div class="file-name" :title="uploadFileName">{{uploadFileName}}</div>
          </el-form-item>
          <el-form-item label="视频">
            <div class="upload-box">
              <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeUploadVideo()" ref="uploadFileVideo" class="op-input" accept="video/mp4">
            </div>
            <div class="file-name" :title="uploadFileNameVideo">{{uploadFileNameVideo}}</div>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <el-button @click="cancelEdit()">取消</el-button>
              <el-button @click="confirm()" type="primary">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "EditCloudSelect",
      data(){
          return {
            form: {},
            uploadFileName: "",
            uploadFileNameVideo: "",
            usernameList: [],
          }
      },
      props: ["list", "show"],
      methods: {
        cancelEdit(flag) {
          this.$emit("cancelEdit", flag);
        },
        getUserList() {
          this.$axios.get("/getUserList?page=1&limit=100").then(res => {
            this.usernameList = res.data.data.result;
          })
        },
        selectedUser(val){

        },
        confirm(){
          var type = this.form.id ? "1" : "0"; //1：修改 0：新增
          var file = this.$refs.uploadFile.files[0];
          var fileVideo = this.$refs.uploadFileVideo.files[0];
          //新增参数
          var addParam = new FormData();
          var editParam = new FormData();
          if(type === "0"){
            addParam.append("type", type);
            addParam.append("title", this.form.title);
            addParam.append("text", this.form.text);
            addParam.append("authorId", this.form.authorId);
            addParam.append("postSrc", file, file.name);
            addParam.append("videoName", fileVideo, fileVideo.name);
          }else{
            editParam.append("type", type);
            editParam.append("id", this.form.id);
            editParam.append("title", this.form.title);
            editParam.append("text", this.form.text);
            editParam.append("authorId", this.form.authorId);
            file === undefined ? editParam.append("postSrc", "") : editParam.append("postSrc", file, file.name);
            fileVideo === undefined ? editParam.append("videoName", "") : editParam.append("videoName", fileVideo, fileVideo.name);
          }
          var dataList = this.form.id ? editParam : addParam;
          this.$axios.post("/addCloudSelect", dataList).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: '成功',
                message: type === "1" ? "修改成功" : "新增成功",
                type: 'success'
              });
              this.cancelEdit(true);
            }else{
              this.$notify.error({
                title: "错误",
                message: res.data.errMsg
              })
            }
          })
        },
        changeUpload(){
          this.form.slideImg = window.URL.createObjectURL(this.$refs.uploadFile.files[0]);
          this.uploadFileName = this.$refs.uploadFile.files[0].name;
        },
        changeUploadVideo(){
          this.uploadFileNameVideo = this.$refs.uploadFileVideo.files[0].name;
        }
      },
      watch: {
          "show": function(newVal){
            if(newVal){
              this.form = JSON.parse(JSON.stringify(this.list));
              this.uploadFileName = "";
              this.uploadFileNameVideo = this.list.preVideoName;
              this.form.slideImg = this.list.postSrc;
              this.$refs.uploadFile.value = "";
              this.$refs.uploadFileVideo.value = "";
              this.getUserList();
            }
          }
      }
    }
</script>

<style scoped lang="less">
.edit-cloud-select-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  .mask-layer {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
  }
  .content{
    position: absolute;
    top: 120px;
    left: 50%;
    width: 520px;
    box-sizing: border-box;
    padding: 20px;
    margin-left: -260px;
    height: 420px;
    background-color: #fff;
    border-radius: 4px;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
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
    .btn-group {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
