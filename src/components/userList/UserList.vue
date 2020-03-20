<template>
  <div class="userList-container">
    <div class="loading-box">
      <div class="btn-box">
        <el-button type="primary" size="small" @click="openTab()">新增标签</el-button>
        <el-button type="primary" size="small" @click="addUser()">新增</el-button>
      </div>
      <el-table
        :data="userList"
        border
        height="440"
      >
        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
        >
        </el-table-column>
        <el-table-column
          prop="imgSrc"
          label="头像"
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
            <el-button type="text" size="small" @click=delUser(scope.row)>删除</el-button>
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
    </div>
    <edit_user_list :show="showEditUserList" @cancelEdit="cancelEdit" :list="list"></edit_user_list>
  </div>
</template>

<script>
  import EditUserList from "./EditUserList"
  export default {
    name: "UserList",
    data() {
      return {
        userList: [],
        showEditUserList: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted() {
      this.getUserList(this.page, this.limit);
    },
    methods: {
      openTab(){
        this.$taber.open({
          name: "songLib",
          params: {
            title: "新增tab曲库"
          }
        })
      },
      getUserList(page, limit) {
        this.$axios.get("/getUserList?page=" + page + "&limit=" + limit).then(res => {
          this.userList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addUser() {
        this.showEditUserList = true;
        this.list = {}
      },
      delUser(list){
        this.$confirm('是否删除该用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("/delUser?id=" + list.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.getUserList(this.page, this.limit);
            }
          })
        }).catch(() => {

        });
      },
      cancelEdit(flag){
        this.showEditUserList = false;
        if(flag){
          this.getUserList(this.page, this.limit);
        }
      },
      changeSize(val) {

      },
      changeCurrent(val) {

      }
    },
    components: {
      edit_user_list: EditUserList
    }
  }
</script>

<style scoped lang="less">
  .userList-container {
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
