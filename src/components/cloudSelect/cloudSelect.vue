<template>
  <div class="cloud-select-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addCloudSelect()">新增</el-button>
    </div>
    <el-table
      :data="cloudSelectList"
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
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="text"
        label="说明"
      >
      </el-table-column>
      <el-table-column
        prop="preVideoName"
        label="视频"
      >
      </el-table-column>
      <el-table-column
        prop="postSrc"
        label="视频封面图"
      >
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.postSrc" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="author"
        label="作者"
      >
        <template slot-scope="scope">
          <div class="author-info">
            <img class="table-head-pic" :src="scope.row.userHeadPic" alt="" :title="scope.row.selUsername">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="commendCount"
        label="评论数"
      >
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
          <el-button type="text" size="small" @click="editCloudSelect(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delCloudSelect(scope.row)>删除</el-button>
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
    <edit_cloud_select :show="showEditCloudSelect" :list="list" @cancelEdit="cancelEdit"></edit_cloud_select>
  </div>
</template>

<script>
  import EditCloudSelect from "./EditCloudSelect"
  export default {
    name: "cloudSelect",
    data() {
      return {
        cloudSelectList: [],
        showEditCloudSelect: false,
        list:{},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getCloudSelect(this.page, this.limit);
    },
    methods: {
      getCloudSelect(page, limit){
        this.$axios.get("/getCloudSelect?page=" + page + "&limit=" + limit).then( res => {
          this.cloudSelectList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addCloudSelect() {
        this.showEditCloudSelect = true;
        this.list = {};
      },
      editCloudSelect(row) {
        this.showEditCloudSelect = true;
        console.log(row);
        this.list = row;
      },
      delCloudSelect(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delCloudSelect?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getCloudSelect(this.page, this.limit);
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
        this.showEditCloudSelect = false;
        if(flag){
          this.getCloudSelect(this.page, this.limit);
        }
      },
      changeSize(val) {

      },
      changeCurrent(val) {

      }
    },
    components: {
      edit_cloud_select: EditCloudSelect
    }
  }
</script>

<style scoped lang="less">
  .cloud-select-container {
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
