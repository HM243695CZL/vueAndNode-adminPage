<template>
    <div class="edit-listen-listen-container" v-show="show">
      <div @click="cancelEdit()" class="mask-layer"></div>
      <div class="content">
        <el-form :model="form" label-width="100px">
          <el-form-item label="类型">
            <el-select v-model="form.listenType" value="" placeholder="请选择类型">
              <el-option v-for="item in listenTypeList" :key="item.id" :label="item.typeName" :value="item.typeValue"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.text" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="upload-box">
              <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
              <input type="file" @change="changeUpload()" ref="uploadFile" class="op-input" accept="image/bmp, image/tif, image/png, image/gif, image/jpeg">
            </div>
            <div class="img-box">
              <img :src="form.listenListenImg" alt="">
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
        name: "EditListenListen",
      data(){
          return {
            form: {},
            uploadFileName: "",
            listenTypeList: []
          }
      },
      mounted(){

      },
      props: ["list", "show"],
      methods: {
        cancelEdit(flag) {
          this.$emit("cancelEdit", flag);
        },
        changeUpload(){
          this.form.listenListenImg = window.URL.createObjectURL(this.$refs.uploadFile.files[0]);
          this.uploadFileName = this.$refs.uploadFile.files[0].name;
        },
        getListenListenType(){
          this.$axios.get("/getListenListenType?page=1&limit=20").then( res => {
            this.listenTypeList = res.data.data.result;
          })
        },
        confirm(){
          var type = this.form.id ? "1" : "0"; //1：修改 0：新增
          var file = this.$refs.uploadFile.files[0];
          //新增参数
          var addParam = new FormData();
          var editParam = new FormData();
          if(type === "0"){
            addParam.append("type", type);
            addParam.append("typeValue", this.form.listenType);
            addParam.append("text", this.form.text);
            addParam.append("listenListenImg", file, file.name);
          }else{
            editParam.append("id", this.form.id);
            editParam.append("typeValue", this.form.listenType);
            editParam.append("type", type);
            editParam.append("text", this.form.text);
            file === undefined ? editParam.append("listenListenImg", "") : editParam.append("listenListenImg", file, file.name);
          }
          var dataList = this.form.id ? editParam : addParam;
          this.$axios.post("/addListenListen", dataList).then( res => {
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
        }
      },
      watch: {
          "show": function(newVal){
            if(newVal){
              this.form = JSON.parse(JSON.stringify(this.list));
              this.uploadFileName = "";
              this.$refs.uploadFile.value = "";
              this.getListenListenType();
            }
          }
      }
    }
</script>

<style scoped lang="less">
  .edit-listen-listen-container{
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
      background-color: #fff;
      border-radius: 4px;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      .el-select{
        width: 100%;
      }
      .upload-box {
        float: left;
        position: relative;

        .op-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }

      .img-box {
        float: left;
        width: 50px;
        height: 50px;
        margin-left: 20px;

        img {
          display: block;
          width: 100%;
          height: auto;
        }
      }

      .file-name {
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
