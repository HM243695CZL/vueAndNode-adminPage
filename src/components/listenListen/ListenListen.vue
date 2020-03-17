<template>
  <div class="listen-listen-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addListenListen()">新增</el-button>
    </div>
    <el-table
      :data="listenListenList"
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
        prop="typeName"
        label="类型"
      >
      </el-table-column>
      <el-table-column
        prop="listenListenImg"
        label="图片"
      >
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.listenListenImg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="text"
        label="描述"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editListenListen(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delListenListen(scope.row)>删除</el-button>
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
    <edit_listen_listen :show="showEditListenListen" :list="list" @cancelEdit="cancelEdit"></edit_listen_listen>
  </div>
</template>

<script>
  import EditListenListen from "./EditListenListen"
  export default {
    name: "ListenListen",
    data() {
      return {
        listenListenList: [],
        showEditListenListen: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getListenListen(this.page, this.limit);
    },
    methods: {
      getListenListen(page, limit){
        this.$axios.get("/getListenListen?page=" + page + "&limit=" + limit).then( res => {
          this.listenListenList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addListenListen(){
        this.showEditListenListen = true;
        this.list = {};
      },
      editListenListen(row){
        this.showEditListenListen = true;
        this.list = row;
        this.list.listenType = row.typeValue;
      },
      delListenListen(row){
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delListenListen?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getListenListen(this.page, this.limit);
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
        this.showEditListenListen = false;
        if(flag){
          this.getListenListen(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getListenListen(this.page, val);
      },
      changeCurrent(val) {
        this.getListenListen(val, this.limit);
      }
    },
    components: {
      edit_listen_listen: EditListenListen
    }
  }
</script>

<style scoped lang="less">
  .listen-listen-container {
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
