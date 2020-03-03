<template>
  <div class="videoLib-container">
    <div class="btn-box">
      <el-button @click="addVideo()" size="small" type="primary">新增</el-button>
    </div>
    <el-table
      :data="videoList"
      border
      height="440"
      style="width: 98%;"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="ID"
        prop="id"
      >
      </el-table-column>
      <el-table-column
        prop="preVideoName"
        :show-overflow-tooltip="true"
        label="视频名"
      >
      </el-table-column>
      <el-table-column
        prop="videoImg"
        width="100"
        label="缩略图"
      >
        <template slot-scope="scope">
          <img :src="scope.row.videoImg" alt="" class="table-img">
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        width="120"
        label="备注"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="size"
        width="100"
        label="文件大小"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="180"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button @click="editVideo(scope.row)" size="small" type="text">编辑</el-button>
          <el-button @click="downloadVideo(scope.row)" size="small"  type="text">下载</el-button>
          <el-button @click=delVideo(scope.row) size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="changeSize"
      @current-change="changeCurrent"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalRow">
    </el-pagination>
    <edit_video_lib :show="showEditVideo" :list="list" @cancelEdit="cancelEdit"></edit_video_lib>
  </div>
</template>

<script>
  import EditVideoLib from "./EditVideoLib"
  export default {
    name: "VideoLib",
    data() {
      return {
        videoList: [],
        showEditVideo: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getVideo(this.page, this.limit);
    },
    methods: {
      getVideo(page, limit){
        this.$axios.get("/getVideoLib?page=" + page + "&limit=" + limit).then( res => {
          this.videoList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addVideo() {
        this.showEditVideo = true;
        this.list = {};
      },
      editVideo(row) {
        this.showEditVideo = true;
        this.list = row;
      },
      downloadVideo(row){
        this.$axios.get("/downloadVideoLib?id=" + row.id).then( res => {
          if(res.status === 200){
            window.location.href = res.config.url;
          }else{
            this.$notify.error({
              title: "错误",
              message: "服务器错误，暂时不能下载！"
            })
          }
        })
      },
      delVideo(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delVideoLib?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getVideo(this.page, this.limit);
            }else{
              this.$notify.error({
                title: "错误",
                message: res.data.errMsg
              })
            }
          })
        }).catch( () => {

        })
      },
      cancelEdit(flag){
        this.showEditVideo = false;
        if(flag){
          this.getVideo(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getVideo(this.page, val);
      },
      changeCurrent(val) {
        this.getVideo(val, this.limit);
      }
    },
    components: {
      edit_video_lib: EditVideoLib
    }
  }
</script>

<style scoped lang="less">
.videoLib-container{
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }

  .table-img {
    width: 50px;
    display: block;
    height: auto;
  }

  .el-pagination {
    margin-top: 20px;
  }
}
</style>
