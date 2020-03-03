<template>
  <div class="slide-pic-container">
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addSlidePic()">新增</el-button>
    </div>
    <el-table
      :data="slidePicList"
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
        prop="slideImg"
        label="图片"
      >
        <template slot-scope="scope">
          <img class="table-img" :src="scope.row.slideImg" alt="">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editSlidePic(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click=delSlidePic(scope.row)>删除</el-button>
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
    <edit_slide_pic :show="showEditSlidePic" @cancelEdit="cancelEdit" :list="list"></edit_slide_pic>
  </div>
</template>

<script>
  import EditSlidePic from "./EditSlidePic"
  export default {
    name: "SlidePic",
    data() {
      return {
        slidePicList: [],
        showEditSlidePic: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0
      }
    },
    mounted(){
      this.getSlidePic(this.page, this.limit);
    },
    methods: {
      getSlidePic(page, limit){
        this.$axios.get("/getSlidePic?page=" + page + "&limit=" + limit).then( res => {
          this.slidePicList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addSlidePic(){
        this.showEditSlidePic = true;
        this.list = {};
      },
      editSlidePic(row) {
        this.showEditSlidePic = true;
        this.list = row;
        this.list.imgType = row.typeValue;
      },
      delSlidePic(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( ()=> {
          this.$axios.get("/delSlidePic?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getSlidePic(this.page, this.limit);
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
        this.showEditSlidePic = false;
        if(flag){
          this.getSlidePic(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getSlidePic(this.page, val);
      },
      changeCurrent(val) {
        this.getSlidePic(val, this.limit);
      }
    },
    components: {
      edit_slide_pic: EditSlidePic
    }
  }
</script>

<style scoped lang="less">
  .slide-pic-container {
    .btn-box {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;
    }
    .table-img{
      width: 50px;
      display: block;
      height: auto;
    }
    .el-pagination{
      margin-top: 20px;
    }
  }
</style>
