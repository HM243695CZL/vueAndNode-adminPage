<template>
    <div class="configPath-container">
      <div class="btn-box">
        <el-button type="primary" size="small" @click="addConfigPath()">新增</el-button>
      </div>
      <el-table
        :data="configPathList"
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
          prop="path"
          label="请求路径"
        >
        </el-table-column>
        <el-table-column
          prop="cName"
          label="对应菜单"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delConfigPath(scope.row)">删除</el-button>
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
      <edit_config_path :show="showEditConfigPath" :list="list" @cancelEdit="cancelEdit"></edit_config_path>
    </div>
</template>

<script>
  import EditConfigPath from "./EditConfigPath"
    export default {
        name: "ConfigPath",
      data(){
          return {
            configPathList: [],
            showEditConfigPath: false,
            list: {},
            currentPage: 1,
            page: 1,
            limit: 10,
            totalRow: 0
          }
      },
      mounted(){
        this.getConfigPath(this.page, this.limit);
      },
      methods: {
        getConfigPath(page, limit){
          this.$axios.get("/getConfigPath?page=" + page + "&limit=" + limit).then( res => {
            this.configPathList = res.data.data.result;
            this.totalRow = res.data.totalRow;
          })
        },
        addConfigPath(){
          this.showEditConfigPath = true;
          this.list = {};
        },
        delConfigPath(row){
          this.$confirm("是否删除当前数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then( () => {
            this.$axios.get("/delConfigPath?id=" + row.id).then( res => {
              if(res.data.status === 200){
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success"
                });
                this.getConfigPath(this.page, this.limit);
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
          this.showEditConfigPath = false;
          if(flag){
            this.getConfigPath(this.page, this.limit);
          }
        },
        changeSize(val) {
          this.getConfigPath(this.page, val);
        },
        changeCurrent(val) {
          this.getConfigPath(val, this.limit);
        }
      },
      components: {
          edit_config_path: EditConfigPath
      }
    }
</script>

<style scoped lang="less">
.configPath-container{
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }
}
</style>
