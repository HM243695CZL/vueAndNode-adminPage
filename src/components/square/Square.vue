<template>
  <div class="square-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addSquare()">新增</el-button>
    </div>
    <el-table
      :data="squareList"
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
        prop="squareImg"
        label="图片"
      >
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.squareImg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="text"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
      >
        <template slot-scope="scope">
          <div class="author-info">
            <img class="table-head-pic" :src="scope.row.imgSrc" alt="" :title="scope.row.username">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="agreeCount"
        label="点赞数"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSquare(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delSquare(scope.row)>删除</el-button>
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
    <edit_square :show="showEditSquare" :list="list" @cancelEdit="cancelEdit"></edit_square>
  </div>
</template>

<script>
  import EditSquare from "./EditSquare"
  export default {
    name: "Square",
    data() {
      return {
        squareList: [],
        showEditSquare: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getSquare(this.page, this.limit);
    },
    methods: {
      getSquare(page, limit){
        this.$axios.get("/getSquare?page=" + page + "&limit=" + limit).then( res => {
          this.squareList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addSquare() {
        this.list = {};
        this.showEditSquare = true;
      },
      editSquare(row) {
        this.list = row;
        this.showEditSquare = true;
      },
      delSquare(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delSquare?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getSquare(this.page, this.limit);
            }else{
              this.$notify.error({
                title: "错误",
                message: res.data.errMsg
              })
            }
          })
        })
      },
      cancelEdit(flag){
        this.showEditSquare = false;
        if(flag){
          this.getSquare(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getSquare(this.page, val);
      },
      changeCurrent(val) {
        this.getSquare(val, this.limit);
      }
    },
    components: {
      edit_square: EditSquare
    }
  }
</script>

<style scoped lang="less">
  .square-container {
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
    .author-info{
      .table-head-pic{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
</style>
