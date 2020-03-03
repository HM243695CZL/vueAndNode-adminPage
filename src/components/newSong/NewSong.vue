<template>
    <div class="new-song-container">
      <div class="btn-box">
        <el-button type="primary" size="small" @click="addNewSong()">新增</el-button>
      </div>
      <el-table
        :data="newSongList"
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
          prop="text"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="imgSrc"
          label="歌单封面"
        >
          <template slot-scope="scope">
            <img class="table-img" :src="scope.row.imgSrc" alt="">
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editNewSong(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click=delNewSong(scope.row)>删除</el-button>
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
      <edit_new_song :show="showEditNewSong" :list="list" @cancelEdit="cancelEdit"></edit_new_song>
    </div>
</template>

<script>
  import EditNewSong from "./EditNewSong"
    export default {
        name: "NewSong",
      data() {
        return {
          newSongList: [],
          list: {},
          showEditNewSong: false,
          currentPage: 1,
          page: 1,
          limit: 10,
          totalRow: 0
        }
      },
      mounted(){
        this.getNewSong(this.page, this.limit);
      },
      methods: {
        getNewSong(page, limit) {
          this.$axios.get("/getNewSong?page=" + page + "&limit=" + limit).then( res => {
            this.newSongList = res.data.data.result;
            this.totalRow = res.data.totalRow;
          })
        },
        addNewSong() {
          this.showEditNewSong = true;
          this.list = {};
        },
        editNewSong(row) {
          this.showEditNewSong = true;
          this.list = row;
        },
        delNewSong(row) {
          this.$confirm("是否删除当前数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then( ()=> {
            this.$axios.get("/delNewSong?id=" + row.id).then( res => {
              if(res.data.status === 200){
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success"
                });
                this.getNewSong(this.page, this.limit);
              }else{
                this.$notify.error({
                  title: "错误",
                  message: res.data.errMsg
                })
              }
            })
          })
        },
        cancelEdit(flag) {
          this.showEditNewSong = false;
          if(flag){
            this.getNewSong(this.page, this.limit);
          }
        },
        changeSize(val) {

        },
        changeCurrent(val) {

        }
      },
      components: {
          edit_new_song: EditNewSong
      }
    }
</script>

<style scoped lang="less">
.new-song-container{
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
