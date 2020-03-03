<template>
  <div class="cloud-recommend-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addCloudRecommend()">新增</el-button>
    </div>
    <el-table
      :data="cloudRecommendList"
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
        prop="preSongName"
        label="歌曲"
      >
      </el-table-column>
      <el-table-column
        prop="recommendContent"
        :show-overflow-tooltip="true"
        label="评论内容"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click=delCloudRecommend(scope.row)>删除</el-button>
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
    <edit_cloud_recommend :show="showEditCloudRecommend" :list="list" @cancelEdit="cancelEdit"></edit_cloud_recommend>
  </div>
</template>

<script>
  import EditCloudRecommend from "./EditCloudRecommend"
  export default {
    name: "CloudRecommend",
    data() {
      return {
        cloudRecommendList: [],
        showEditCloudRecommend: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0,
      }
    },
    mounted(){
      this.getCloudRecommend(this.page, this.limit);
    },
    methods: {
      getCloudRecommend(page, limit) {
        this.$axios.get("/getCloudRecommend?page=" + page + "&limit=" + limit).then( res => {
          this.cloudRecommendList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addCloudRecommend() {
        this.showEditCloudRecommend = true;
        this.list = {};
      },
      delCloudRecommend(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delCloudRecommend?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getCloudRecommend(this.page, this.limit);
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
        this.showEditCloudRecommend = false;
        if(flag){
          this.getCloudRecommend(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getCloudRecommend(this.page, val);
      },
      changeCurrent(val) {
        this.getCloudRecommend(val, this.limit);
      }
    },
    components: {
      edit_cloud_recommend: EditCloudRecommend
    }
  }
</script>

<style scoped lang="less">
  .cloud-recommend-container{
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
