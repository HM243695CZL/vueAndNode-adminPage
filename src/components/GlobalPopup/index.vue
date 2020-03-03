<template>
  <div class="message-box" v-show="isShowMessageBox">
    <div class="mask" @click="cancel"></div>
    <div class="message-content">
      <div class="head">
        <div class="title">
          <span>{{title}}</span>
        </div>
        <button type="button" @click="cancel">
          <span class="el-icon-close"></span>
        </button>
      </div>
      <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" v-if="isShowInput"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password" v-if="isShowInput"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btn-group">
        <el-button @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</el-button>
        <el-button type="primary" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '标题'
      },
      content: {
        type: String,
        default: '这是弹框内容'
      },
      isShowInput: false,
      form: {},
      isShowCancelBtn: {
        type: Boolean,
        default: true
      },
      isShowConfimrBtn: {
        type: Boolean,
        default: true
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data () {
      return {
        isShowMessageBox: false,
        resolve: '',
        reject: '',
        promise: '', // 保存promise对象
      };
    },
    methods: {
      // 确定,将promise断定为resolve状态
      confirm: function () {
        this.isShowMessageBox = false;
        if (this.isShowInput) {
          this.resolve(this.form);
        } else {
          this.resolve('confirm');
        }
        this.remove();
      },
      // 取消,将promise断定为reject状态
      cancel: function () {
        this.isShowMessageBox = false;
        this.reject('cancel');
        this.remove();
      },
      // 弹出messageBox,并创建promise对象
      showMsgBox: function () {
        this.isShowMessageBox = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
        // 返回promise对象
        return this.promise;
      },
      remove: function () {
        setTimeout(() => {
          this.destroy();
        }, 300);
      },
      destroy: function () {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  };
</script>
<style lang="less" scoped>
  .message-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .mask{
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.3);
    }
    .message-content{
      position: absolute;
      top: 120px;
      left: 50%;
      width: 480px;
      margin-left: -240px;
      height: 255px;
      background-color: #fff;
      border-radius: 4px;
      font-size: 18px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      .head{
        position: relative;
        padding: 15px 15px 10px;
        .title{
          font-size: 18px;
          color: #303133;
        }
        button{
          position: absolute;
          top: 15px;
          right: 15px;
          padding: 0;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .content{
        padding: 10px 15px;
        color: #606266;
        font-size: 14px;
      }
      .btn-group{
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
  }
</style>
