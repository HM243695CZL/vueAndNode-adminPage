<template>
  <div class="created-song-list-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addSongSheet()">新增</el-button>
    </div>
    <el-table
      :data="songSheetList"
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
        prop="id"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="songSheetName"
        label="歌单名称"
      >
      </el-table-column>
      <el-table-column
        prop="songsNumber"
        label="总歌曲数"
      >
      </el-table-column>
      <el-table-column
        prop="downloadedCount"
        label="已下载数"
      >
      </el-table-column>
      <el-table-column
        prop="songSheetImg"
        label="歌单封面"
      >
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.songSheetImg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSongSheet(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delSongSheet(scope.row)>删除</el-button>
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
    <edit_song_sheet :show="showEditSongSheet" :list="list" @cancelEdit="cancelEdit"></edit_song_sheet>
  </div>
</template>

<script>
  import EditSongSheet from "./EditSongSheet"
  export default {
    name: "CreatedSongList",
    data(){
      return {
        songSheetList: [],
        showEditSongSheet: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    props: [],
    mounted(){
      this.getSongSheet(this.page, this.limit);
      this.getParam();
    },
    methods: {
      getParam(){
        if(this._taber._vm.active.params){
          console.log(this._taber._vm.active.params);
        }else{
          console.log("没有传递参数");
        }
      },
      getSongSheet(page, limit){
        this.$axios.get("/getSongSheet?page=" + page + "&limit=" + limit).then( res => {
          this.songSheetList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addSongSheet(){
        this.showEditSongSheet = true;
        this.list = {};
      },
      editSongSheet(row){
        this.showEditSongSheet = true;
        this.list = row;
      },
      delSongSheet(row){
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delSongSheet?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getSongSheet(this.page, this.limit);
            }else{
              this.$notify.error({
                title: "错误",
                message: res.data.errMsg
              })
            }
          })
        }).catch(() => {

        })
      },
      cancelEdit(flag) {
        this.showEditSongSheet = false;
        if(flag){
          this.getSongSheet(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getSongSheet(this.page, val);
      },
      changeCurrent(val) {
        this.getSongSheet(val, this.limit);
      }
    },
    components: {
      edit_song_sheet: EditSongSheet
    }
  }
</script>

<style scoped lang="less">
  .created-song-list-container {
    .btn-box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
    }
    .table-img{
      width: 50px;
      display: block;
      height: auto;
    }
    .el-pagination{
      margin-top: 20px;
    }
  }
</style>
