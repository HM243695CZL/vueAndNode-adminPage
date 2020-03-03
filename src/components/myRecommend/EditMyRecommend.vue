<template>
    <div class="edit-my-recommend-container" v-show="show">
      <div @click="cancelEdit()" class="mask-layer"></div>
      <div class="content">
        <el-form :model="form" label-width="80px">
          <el-form-item label="图标类名">
            <el-input v-model="form.iconName"></el-input>
          </el-form-item>
          <el-form-item label="文字">
            <el-input v-model="form.descName"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <el-button @click="cancelEdit()">取消</el-button>
              <el-button @click="confirm()" type="primary">确定</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "EditMyRecommend",
      data(){
          return {
            form: {}
          }
      },
      props: ["list", "show"],
      methods: {
          cancelEdit(flag){
            this.$emit("cancelEdit", flag);
          },
        confirm(){
          var type = this.form.id ? "1" : "0"; //1：修改 0：新增
          var addParams = {
            type,
            iconName: this.form.iconName,
            descName: this.form.descName
          };
          var editParams = {
            type,
            id: this.form.id,
            iconName: this.form.iconName,
            descName: this.form.descName
          };
          var dataList = this.form.id ? editParams : addParams;
          this.$axios.post("/addMyRecommend", dataList).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: '成功',
                message: type === "1" ? "修改成功" : "新增成功",
                type: 'success'
              });
              this.cancelEdit(true);
            }else{
              this.$notify.error({
                title: "错误",
                message: res.data.errMsg
              })
            }
          })
        }
      },
      watch: {
          "show": function(newVal){
            if(newVal){
              this.form = JSON.parse(JSON.stringify(this.list))
            }
          }
      }
    }
</script>

<style scoped lang="less">
.edit-my-recommend-container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  .mask-layer{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.3);
  }
  .content{
    position: absolute;
    top: 120px;
    left: 50%;
    width: 480px;
    box-sizing: border-box;
    padding: 20px;
    margin-left: -240px;
    height: 220px;
    background-color: #fff;
    border-radius: 4px;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    .btn-group{
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
