<template>
    <div class="edit-song-lib-container" v-show="show">
      <div @click="cancelEdit()" class="mask-layer"></div>
      <div class="content">
        <el-form :model="form" label-width="100px">
          <el-form-item label="歌曲名" v-show="form.id">
            <span class="song-name">{{form.preSongName}}</span>
          </el-form-item>
          <el-form-item label="歌曲封面" v-show="form.id">
            <img class="img-face" :src="form.songImg" alt="">
          </el-form-item>
          <el-form-item label="上传歌曲" v-show="!form.id">
            <div class="upload-box">
              <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeUpload()" ref="uploadFile" class="op-input" accept="audio/mp3" multiple>
            </div>
            <div class="file-name">
              <div class="name-box">
                <span class="up-file-name" v-for="(item,index) in fileNameList" :key="item.index">{{item}}</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="添加歌曲封面" v-show="!form.id">
            <div class="upload-box fl">
              <el-button>添加<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeImg()" ref="uploadImg" class="op-input" accept="image/bmp, image/tif, image/png, image/gif, image/jpeg">
            </div>
            <div class="img-box">
              <img :src="form.songImg" alt="">
              <div class="img-name" :title="imgName">{{imgName}}</div>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark"></el-input>
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
        name: "EditSongLib",
      data(){
          return {
            form: {},
            uploadFileList: [],
            fileNameList: [],
            imgName: ""
          }
      },
      props: ["list", "show"],
      methods: {
        cancelEdit(flag) {
          this.$emit("cancelEdit", flag);
        },
        confirm(){
          var type = this.form.id ? "1" : "0"; //1：修改 0：新增
          var file = this.$refs.uploadImg.files[0];
          var addParam = new FormData();
          if(type === "0"){
            for (var i = 0; i < this.uploadFileList.length; i++){
              addParam.append("songName", this.uploadFileList[i]);
            }
            addParam.append("type", type);
            addParam.append("remark", this.form.remark || "");
            addParam.append("songImg", file, file.name);
          }else{
            var editParam = {
              id: this.form.id,
              type: type,
              remark: this.form.remark
            };
          }
          var dataList = this.form.id ? editParam : addParam;
          this.$axios.post("/addSongLib", dataList).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: '成功',
                message: type === "1" ? "修改成功" : res.data.data.msg,
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
          var fileList = this.$refs.uploadFile.files;
          for (var i = 0; i < fileList.length; i++){
            this.uploadFileList.push(fileList[i]);
            this.fileNameList.push(fileList[i].name);
          }
        },
        changeImg(){
          this.form.songImg = window.URL.createObjectURL(this.$refs.uploadImg.files[0]);
          this.imgName = this.$refs.uploadImg.files[0].name;
        }
      },
      watch: {
          "show": function(newVal){
            if(newVal){
              this.form = JSON.parse(JSON.stringify(this.list));
              this.$refs.uploadFile.value = "";
              this.$refs.uploadImg.value = "";
              this.uploadFileList = [];
              this.fileNameList = [];
              this.imgName = "";
            }
          }
      }
    }
</script>

<style scoped lang="less">
  .edit-song-lib-container{
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
      width: 480px;
      box-sizing: border-box;
      padding: 20px;
      margin-left: -240px;
      background-color: #fff;
      border-radius: 4px;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      .el-form-item{
        margin-bottom: 10px;
      }
      .upload-box{
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
      .fl{
        float: left;
      }
      .img-box{
        float: left;
        width: 200px;
        height: 50px;
        margin-left: 20px;
        img{
          float: left;
          display: block;
          width: 50px;
          height: auto;
        }
        .img-name{
          float: left;
          width: 135px;
          margin-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
        }
      }
      .file-name{
        font-size: 12px;
        color: #666;
        .name-box{
          .up-file-name{
            cursor: pointer;
            margin-right: 10px;
            &:hover{
              color: #00f;
            }
          }
        }
      }
      .img-face{
        width: 50px;
        height: 50px;
      }
      .btn-group {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
