<template>
    <div class="edit-new-song-container" v-show="show">
      <div @click="cancelEdit()" class="mask-layer"></div>
      <div class="content">
        <el-form :model="form" label-width="100px">
          <el-form-item label="描述">
            <el-input v-model="form.text"></el-input>
          </el-form-item>
          <el-form-item label="歌单封面">
            <div class="upload-box">
              <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeUpload()" ref="uploadFile" class="op-input" accept="image/jpeg, image/png, image/tif, image/bmp">
            </div>
            <div class="img-box">
              <img :src="form.imgSrc" alt="">
            </div>
            <div class="file-name" :title="uploadFileName">{{uploadFileName}}</div>
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
        name: "EditNewSong",
      data(){
        return {
          form: {},
          uploadFileName: "",
        }
      },
      props: ["list", "show"],
      methods: {
        cancelEdit(flag) {
          this.$emit("cancelEdit", flag);
        },
        confirm(){
          var type = this.form.id ? "1" : "0"; //1：修改 0：新增
          var file = this.$refs.uploadFile.files[0];
          //新增参数
          var addPram = new FormData();
          var editParam = new FormData();
          if(type === "0"){
            addPram.append("type", type);
            addPram.append("text", this.form.text);
            addPram.append("imgSrc", file, file.name);
          }else{
            editParam.append("type", type);
            editParam.append("id", this.form.id);
            editParam.append("text", this.form.text);
            file === undefined ? editParam.append("imgSrc", "") : editParam.append("imgSrc", file, file.name);
          }
          var dataList = this.form.id ? editParam : addPram;
          this.$axios.post("/addNewSong", dataList).then( res => {
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
          this.form.imgSrc = window.URL.createObjectURL(this.$refs.uploadFile.files[0]);
          this.uploadFileName = this.$refs.uploadFile.files[0].name;
        },
      },
      watch: {
        "show": function(newVal){
          if(newVal){
            this.form = JSON.parse(JSON.stringify(this.list));
            this.uploadFileName = "";
            this.$refs.uploadFile.value = "";
          }
        }
      }
    }
</script>

<style scoped lang="less">
.edit-new-song-container{
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
    height: 220px;
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
