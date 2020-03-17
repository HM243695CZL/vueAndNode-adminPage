<template>
  <div class="song-lib-container">
    <div class="playing">
      正在播放：<span class="playName">{{playSongName}}</span>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="small" @click="addSong()">新增</el-button>
    </div>
    <audio src="" ref="audio"></audio>
    <el-table
      :data="songList"
      border
      highlight-current-row
      stripe
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
        :show-overflow-tooltip="true"
        label="歌曲名"
      >
      </el-table-column>
      <el-table-column
        prop="songImg"
        width="100"
        label="缩略图"
      >
        <template slot-scope="scope">
          <img :src="scope.row.songImg" alt="" class="table-img">
        </template>
      </el-table-column>
      <el-table-column
        label="播放"
        width="100"
      >
        <template slot-scope="scope">
          <i class="play fa fa-play" @click="changeAudioPlay(scope.row, $event)"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        width="120"
        label="备注"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="size"
        width="100"
        label="文件大小"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="180"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click=editSong(scope.row)>编辑</el-button>
          <el-button type="text" size="small" @click=downloadSong(scope.row)>下载</el-button>
          <el-button type="text" size="small" @click="delSong(scope.row)">删除</el-button>
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
    <edit_song_lib :show="showEditSongLib" :list="list" @cancelEdit="cancelEdit"></edit_song_lib>
  </div>
</template>

<script>
  import EditSongLib from "./EditSongLib"
  export default {
    name: "SongLib",
    data() {
      return {
        songList: [],
        showEditSongLib: false,
        list: {},
        currentPage: 1,
        page: 1,
        limit: 10,
        totalRow: 0,
        playSongName: "",
      }
    },
    mounted(){
      this.getSongLib(this.page, this.limit);
    },
    methods: {
      getSongLib(page, limit){
        this.$axios.get("/getSongLib?page=" + page + "&limit=" + limit).then( res => {
          this.songList = res.data.data.result;
          this.totalRow = res.data.totalRow;
        })
      },
      addSong() {
        this.showEditSongLib = true;
        this.list = {};
      },
      editSong(row){
        this.showEditSongLib = true;
        this.list = row;
      },
      downloadSong(row){
        this.$axios.get("/downloadSongLib?id=" + row.id).then( res => {
          if(res.status === 200){
            window.location.href = res.config.url;
          }else{
            this.$notify.error({
              title: "错误",
              message: "服务器错误，暂时不能下载!"
            })
          }
        })
      },
      delSong(row) {
        this.$confirm("是否删除当前数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then( () => {
          this.$axios.get("/delSongLib?id=" + row.id).then( res => {
            if(res.data.status === 200){
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success"
              });
              this.getSongLib(this.page, this.limit);
            }else{
              this.$notify.error({
                title: "错误",
                message: res.data.errMsg
              })
            }
          })
        }).catch( () => {

        })
      },
      changeAudioPlay(row, e){
        if($(e.target).hasClass("fa-pause")){
          $(e.target).removeClass("fa-pause");
          this.$refs.audio.pause();
        }else{
          $(e.target).addClass("fa-pause");
          if(this.playSongName === row.preSongName){

          }else{
            this.$refs.audio.setAttribute("src", row.src);
            this.playSongName = row.preSongName;
          }
          this.$refs.audio.play();
        }
      },
      cancelEdit(flag) {
        this.showEditSongLib = false;
        if(flag){
          this.getSongLib(this.page, this.limit);
        }
      },
      changeSize(val) {
        this.getSongLib(this.page, val);
      },
      changeCurrent(val) {
        this.getSongLib(val, this.limit);
      }
    },
    components: {
      edit_song_lib: EditSongLib
    }
  }
</script>

<style scoped lang="less">
  .song-lib-container {
    .playing{
      .playName{
        color: #126ac6;
        font-size: 12px;
      }
    }
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
    .play{
      cursor: pointer;
    }
    .el-pagination {
      margin-top: 20px;
    }
  }
</style>
