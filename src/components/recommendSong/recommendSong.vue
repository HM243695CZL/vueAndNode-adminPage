<template>
  <div class="recommendSong-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addRecommendSong()">新增</el-button>
    </div>
    <el-table
      :data="recommendSongList"
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
        prop="playCount"
        label="播放量"
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
          <el-button type="text" size="small" @click="editRecommendSong(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delRecommendSong(scope.row)>删除</el-button>
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
    <edit_recommend_song :show="showEditRecommendSong" :list="list" @cancelEdit="cancelEdit"></edit_recommend_song>
  </div>
</template>

<script>
  import EditRecommendSong from "./EditRecommendSong"

  export default {
    name: "recommendSong",
    data() {
      return {
        recommendSongList: [],
        showEditRecommendSong: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getRecommendSong(this.page, this.limit);
    },
    methods: {
      getRecommendSong(page, limit) {
        this.$axios.get("/getRecommendSong?page=" + page + "&limit=" + limit).then( res => {
          this.recommendSongList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addRecommendSong() {
        this.showEditRecommendSong = true;
        this.list = {};
      },
      editRecommendSong(row) {
        this.showEditRecommendSong = true;
        this.list = row;
      },
      delRecommendSong(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( ()=> {
          this.$axios.get("/delRecommendSong?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getRecommendSong(this.page, this.limit);
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
        this.showEditRecommendSong = false;
        if(flag){
          this.getRecommendSong(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getRecommendSong(this.page, val);
      },
      changeCurrent(val) {
        this.getRecommendSong(val, this.limit);
      }
    },
    components: {
      edit_recommend_song: EditRecommendSong
    }
  }
</script>

<style scoped lang="less">
  .recommendSong-container {
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
