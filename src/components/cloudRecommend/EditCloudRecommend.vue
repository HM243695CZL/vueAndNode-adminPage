<template>
  <div class="edit-cloud-recommend-container" v-show="show">
    <div @click="cancelEdit()" class="mask-layer"></div>
    <div class="content">
      <el-form :model="form" label-width="100px">
        <el-form-item label="选择歌曲">
          <el-select
            v-model="form.songId"
            filterable
            remote
            :remote-method="getSongLib"
            :loading="loading"
            value=""
            placeholder="请选择歌曲"
          >
            <el-option v-for="item in songList" :key="item.id" :label="item.preSongName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评论">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入评论"
            v-model="form.recommendContent"
          >
          </el-input>
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
    name: "EditCloudRecommend",
    data() {
      return {
        form: {},
        songList: [],
        loading: false,
        page: 1,
        limit: 100
      }
    },
    mounted() {
      this.getSongLib("");
    },
    props: ["list", "show"],
    methods: {
      getSongLib(val) {
        this.loading = true;
        this.$axios.get("/getSongLib?page=" + this.page + "&limit=" + this.limit + "&songName=" + val).then( res => {
          this.loading = false;
          this.songList = res.data.data.result;
        })
      },
      cancelEdit(flag) {
        this.$emit("cancelEdit", flag);
      },
      confirm() {
        this.form.recommendUser = this.$store.state.userId;
        this.$axios.post("/addCloudRecommend", this.form).then( res => {
          if(res.data.status === 200){
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success"
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
          this.getSongLib("");
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .edit-cloud-recommend-container {
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

      .el-select {
        width: 100%;
      }

      .btn-group {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
