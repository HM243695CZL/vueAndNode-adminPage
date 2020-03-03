<template>
  <div class="edit-song-sheet-container" v-show="show">
    <div @click="cancelEdit()" class="mask-layer"></div>
    <div class="content">
      <el-form :model="form" label-width="100px">
        <el-form-item label="歌单名称">
          <el-input v-model="form.songSheetName"></el-input>
        </el-form-item>
        <el-form-item label="歌单封面">
          <div class="upload-box">
            <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <input type="file" @change="changeUpload()" ref="uploadFile" class="op-input">
          </div>
          <div class="img-box">
            <img :src="form.songSheetImg" alt="">
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
    name: "EditSongSheet",
    data() {
      return {
        form: {},
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        imgSrc: "",
        uploadFileName: ""
      }
    },
    props: ["list", "show"],
    methods: {
      cancelEdit(flag) {
        this.$emit("cancelEdit", flag);
      },
      confirm() {
        var type = this.form.id ? "1" : "0"; //1：修改 0：新增
        var file = this.$refs.uploadFile.files[0];
        //新增参数
        var addParam = new FormData();
        var editParam = new FormData();
        if(type === "0"){
          addParam.append("songSheetName", this.form.songSheetName);
          addParam.append("type", type);
          addParam.append("songSheetImg", file, file.name);
        }else{
          editParam.append("songSheetName", this.form.songSheetName);
          editParam.append("id", this.form.id);
          editParam.append("type", type);
          file === undefined ? editParam.append("songSheetImg", "") : editParam.append("songSheetImg", file, file.name);
        }
        var dataList = this.form.id ? editParam : addParam;
        this.$axios.post("/addSongSheet",dataList).then( res => {
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
        });
      },
      changeUpload(){
        this.form.songSheetImg = window.URL.createObjectURL(this.$refs.uploadFile.files[0]);
        this.uploadFileName = this.$refs.uploadFile.files[0].name;
      }
    },
    watch: {
      "show": function (newVal) {
        if (newVal) {
          this.form = JSON.parse(JSON.stringify(this.list));
          this.imgSrc = "";
          this.uploadFileName = "";
          this.$refs.uploadFile.value = "";
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .edit-song-sheet-container {
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

    .content {
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
