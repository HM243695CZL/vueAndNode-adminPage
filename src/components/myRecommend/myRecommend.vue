<template>
  <div class="my-recommend-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addIcon()">新增</el-button>
    </div>
    <el-table
      :data="myRecommendList"
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
        prop="iconName"
        label="图标类名"
      >
      </el-table-column>
      <el-table-column
        prop="descName"
        label="文字"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editIcon(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delIcon(scope.row)>删除</el-button>
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
    <edit_my_recommend :show="showEditMyRecommend" @cancelEdit="cancelEdit" :list="list"></edit_my_recommend>
  </div>
</template>

<script>
  import EditMyRecommend from "./EditMyRecommend"
  export default {
    name: "myRecommend",
    data() {
      return {
        myRecommendList: [],
        showEditMyRecommend: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted() {
      this.getMyRecommend(this.page, this.limit);
    },
    methods: {
      getMyRecommend(page, limit){
        this.$axios.get("/getMyRecommend?page=" + page + "&limit=" + limit).then( res => {
          this.myRecommendList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addIcon() {
        this.showEditMyRecommend = true;
        this.list = {};
      },
      editIcon(row){
        this.showEditMyRecommend = true;
        this.list = row;
      },
      delIcon(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$axios.get("/delMyRecommend?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.getMyRecommend(this.page, this.limit);
            }
          })
        }).catch(() => {

        })
      },
      cancelEdit(flag) {
        this.showEditMyRecommend = false;
        if(flag){
          this.getMyRecommend(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getMyRecommend(this.page, val);
      },
      changeCurrent(val) {
        this.getMyRecommend(val, this.limit);
      }
    },
    components: {
      edit_my_recommend: EditMyRecommend
    }
  }
</script>

<style scoped lang="less">
  .my-recommend-container {
    .btn-box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
    }
    .el-pagination{
      margin-top: 20px;
    }
  }
</style>
