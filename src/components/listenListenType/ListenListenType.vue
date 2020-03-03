<template>
    <div class="listen-listen-type-container">
      <div class="btn-box">
        <el-button type="primary" size="small" @click="addListenListenType()">新增</el-button>
      </div>
      <el-table
        :data="listenListenTypeList"
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
          label="类型名称"
        >
        </el-table-column>
        <el-table-column
          prop="typeValue"
          label="类型值"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editListenListenType(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click=delListenListenType(scope.row)>删除</el-button>
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
      <edit_listen_listen_type :show="showEditListenListenType" :list="list" @cancelEdit="cancelEdit"></edit_listen_listen_type>
    </div>
</template>

<script>
  import EditListenListenType from "./EditListenListenType"
    export default {
        name: "ListenListenType",
      data(){
          return {
            listenListenTypeList: [],
            showEditListenListenType: false,
            list: {},
            currentPage: 1,
            page: 1,
            limit: 10,
            totalRow: 0
          }
      },
      mounted(){
        this.getListenListenType(this.page, this.limit);
      },
      methods: {
        getListenListenType(page, limit){
          this.$axios.get("/getListenListenType?page=" + page + "&limit=" + limit).then( res => {
            this.listenListenTypeList = res.data.data.result;
            this.totalRow = res.data.totalRow;
          })
        },
        addListenListenType(){
          this.showEditListenListenType = true;
          this.list = {};
        },
        editListenListenType(row){
          this.showEditListenListenType = true;
          this.list = row;
        },
        delListenListenType(row){
          this.$confirm("是否删除当前数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then( () => {
            this.$axios.get("/delListenListenType?id=" + row.id).then( res => {
              if(res.data.status === 200){
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success"
                });
                this.getListenListenType(this.page, this.limit);
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
          this.showEditListenListenType = false;
          if(flag){
            this.getListenListenType(this.page, this.limit);
          }
        },
        changeSize(val) {

        },
        changeCurrent(val) {

        }
      },
      components: {
          edit_listen_listen_type: EditListenListenType
      }
    }
</script>

<style scoped lang="less">
  .listen-listen-type-container{
    .btn-box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
    }
  }
</style>
