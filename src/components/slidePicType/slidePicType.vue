<template>
  <div class="slide-pic-type-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addSlidePicType()">新增</el-button>
    </div>
    <el-table
      :data="slidePicTypeList"
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
          <el-button type="text" size="small" @click="editSlidePicType(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delSlidePicType(scope.row)">删除</el-button>
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
    <edit_slide_pic_type :show="showEditSlidePicType" :list="list" @cancelEdit="cancelEdit"></edit_slide_pic_type>
  </div>
</template>

<script>
  import EditSlidePicType from "./EditSlidePicType"
  export default {
    name: "slidePicType",
    data() {
      return {
        slidePicTypeList: [],
        showEditSlidePicType: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getSlidePicType(this.page, this.limit);
    },
    methods: {
      getSlidePicType(page, limit){
        this.$axios.get("/getSlidePicType?page=" + page + "&limit=" + limit).then( res => {
          this.slidePicTypeList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addSlidePicType(){
        this.showEditSlidePicType = true;
        this.list = {};
      },
      editSlidePicType(row){
        this.showEditSlidePicType = true;
        this.list = row;
      },
      delSlidePicType(row){
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delSlidePicType?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getSlidePicType(this.page, this.limit);
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
        this.showEditSlidePicType = false;
        if(flag){
          this.getSlidePicType(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getSlidePicType(this.page, val);
      },
      changeCurrent(val) {
        this.getSlidePicType(val, this.limit);
      }
    },
    components: {
      edit_slide_pic_type: EditSlidePicType
    }
  }
</script>

<style scoped lang="less">
  .slide-pic-type-container {
    .btn-box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
    }
  }
</style>
