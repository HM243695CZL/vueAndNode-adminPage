<template>
  <div class="indexPage-container">
    <div class="message-list">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
            <div slot="header" class="card-title">
              <span>推荐列表</span>
            </div>
            <div class="body-content">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="item">
                    <div class="item-name">我的推荐</div>
                    <div class="item-num">{{recommendList.myRecommendCount}}</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="item">
                    <div class="item-name">我的歌单</div>
                    <div class="item-num">{{recommendList.mySongSheetCount}}</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="item">
                    <div class="item-name">听听</div>
                    <div class="item-num">{{recommendList.listenListenCount}}</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="item">
                    <div class="item-name">新歌</div>
                    <div class="item-num">{{recommendList.newSongCount}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="card-title">
              <span>与我相关</span>
            </div>
            <div class="body-content">
              <el-row :gutter="20" class="song-item" v-for="item in aboutMeList" :key="item.id">
                <el-col :span="12">
                  <div class="songImg">
                    <img
                      :src="item.songImg"
                      alt="">
                    <div class="song-name" :title="item.preSongName">{{item.preSongName}}</div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="commend" v-html="item.recommendContent"></div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="icon-box">
                    <span class="fa fa-bookmark"></span>
                    <div class="text">系统推荐</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="icon-box">
                    <span class="fa fa-crosshairs"></span>
                    <div class="text">云村精选</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="icon-box">
                    <span class="fa fa-cloud"></span>
                    <div class="text">云村推荐</div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="icon-box">
                    <span class="fa fa-hand-lizard-o"></span>
                    <div class="text">查看轮播</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="card-title">
              <span>云村广场</span>
              <el-tooltip effect="dark" content="查看更多" placement="right-start">
                <div class="el-icon-more more-info"></div>
              </el-tooltip>
            </div>
            <div class="body-content">
              <div class="info">
                <ul>
                  <li>心疼R姐刚出场一个照面就被呆毛放倒</li>
                  <li>大脸祝贺张老师乐圣琴行顺利开业，2020生意兴隆！</li>
                  <li>有一群学生，他们继承了沉重的命运，有一帮伙伴，他们是各自的精神支柱</li>
                  <li>新的一年就要到了，说出你们的新年愿望吧</li>
                  <li>何其壮也的一生，何其了然，君临天下的男人</li>
                  <li>忆童年，迎新春。你还能记得你的最早的一次新年愿望吗</li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="visit-info">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-card>
            <div slot="header" class="card-title">
              <div class="title-count">
                <div class="all-count">
                  数据总览<span class="count">{{totalRow}}</span>
                </div>
                <el-tooltip effect="dark" :content="maxPathName" placement="top">
                  <div class="max-count">
                    最大数据<span class="count m-count">{{maxPathValue}}</span>
                  </div>
                </el-tooltip>
                <el-tooltip effect="dark" :content="minPathName" placement="top">
                  <div class="max-count">
                    最小数据<span class="count m-count">{{minPathValue}}</span>
                  </div>
                </el-tooltip>
              </div>
              <span class="hide">{{$store.state.thisActiveComponent}}</span>
            </div>
            <div class="data-content">
              <el-row>
                <el-col :span="12">
                  <div id="dataPie" style="width: 100%; height: 300px;"></div>
                </el-col>
                <el-col :span="12">
                  <div id="dataBar" style="width: 100%; height: 300px;"></div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div slot="header" class="card-title">
              <div class="title-count">
                <div class="today-count">
                  <span>今日流量<span class="count">{{todayTotalTow}}</span></span>
                </div>
                <div class="date-picker">
                  <el-date-picker
                    v-model="dateValue"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="data-content">
              <el-row>
                <el-col :span="24">
                  <div id="dataBarInToDay" style="width: 100%; height: 300px;"></div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import moment from "moment"
  import echarts from "echarts"
  import * as constants from "@/constants/constants"
  export default {
    name: "IndexPage",
    data() {
      return {
        loading: true,
        recommendList: {},
        aboutMeList: [],
        allData: [],
        totalRow: 0,
        todayTotalTow: 0,
        dateValue: moment(new Date()).format("YYYY-MM-DD"),
        timer: null,
        maxPathValue: "",
        maxPathName: "",
        minPathValue: "",
        minPathName: ""
      }
    },
    created(){
      this.showLoadingMask();
    },
    mounted() {
      this.getDataTraffic();
      this.getTodayData();
      this.getRecommendListCount();
      this.getAboutMe();
    },
    updated() {
      //当首页处于激活active状态时，重新请求数据
      //函数防抖：触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
      if(this.timer){
        clearInterval(this.timer);
      }
      //在定时器中使用this，这个this的指向的是window对象，因此需要保存this
      var self = this;
      this.timer = setTimeout(function(){
        if(self.$store.state.thisActiveComponent === constants.INDEX_COMP_NAME){
          self.getDataTraffic();
          self.getTodayData();
        }
      }, 10);
    },
    methods: {
      //显示加载遮罩层
      showLoadingMask(){
        Loading.service({
          lock: true,
          text: "正在加载...",
          spinner: "el-icon"
        })
      },
      //获取推荐列表的数据
      getRecommendListCount(){
        this.$axios.get("/getRecommendListCount").then( res => {
          this.recommendList = res.data.data.result;
        })
      },
      //获取与我相关的数据(云村推荐的接口)
      getAboutMe(){
        this.$axios.get("/getCloudRecommend?page=1&limit=2").then( res => {
          this.aboutMeList = res.data.data.result;
        })
      },
      //获取数据总览
      getDataTraffic() {
        this.$axios.get("/getDataTraffic").then(res => {
          var data = res.data.data.result;
          /**
           * 这里的maxPath和minPath不能使用对象的形式存储数据，不然会一直发送请求(不知道为什么)
           */
          this.maxPathValue = data.maxPath.value;
          this.maxPathName = data.maxPath.name;
          this.minPathValue = data.minPath.value;
          this.minPathName = data.minPath.name;
          this.totalRow = data.totalRow;
          this.renderAllDataByPie(data);
          this.renderAllDataByBar(data);
        });
      },
      //获取今日流量
      getTodayData(){
        var startTime = moment(this.dateValue).format("YYYY-MM-DD 00:00:00");
        var endTime = moment(this.dateValue).format("YYYY-MM-DD 23:59:59");
        this.$axios.post("/TodayData", {
          startTime,
          endTime
        }).then( res => {
          var data = res.data.data.result;
          this.todayTotalTow = data.totalRow;
          this.renderTodayData(data);
        });
      },
      //渲染数据总览-饼图
      renderAllDataByPie(data) {
        let myChart = echarts.init(document.getElementById('dataPie'));
        myChart.setOption({
          title: {
            text: '访问量统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, cb) {
              return `
                ${params.seriesName}：${params.data.path} <br>
                ${params.name}：${params.value}(${params.percent}%)
              `;
            }
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: '访问路径',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data.allArr,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      //渲染数据总览-折线图
      renderAllDataByBar(data) {
        let myChart = echarts.init(document.getElementById('dataBar'));
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'left',
            text: '访问量',
            textStyle: {
              fontSize: 16,
              fontWeight: 400
            }
          },
          xAxis: {
            type: 'category',
            splitLine: {
              show: false
            },
            data: data.pathArr
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            },
            min: 0,
            max: function (value) {
              return value.max;
            }
          },
          series: [
            {
              name: '访问量',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(48, 139, 233)'
              },
              data: data.valueArr
            }
          ]
        })
      },
      //渲染今日流量
      renderTodayData(data) {
        let myChart = echarts.init(document.getElementById('dataBarInToDay'));
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          title: {
            left: 'left',
            text: '访问情况',
            textStyle: {
              fontSize: 16,
              fontWeight: 400
            }
          },
          xAxis: {
            type: 'category',
            splitLine: {
              show: false
            },
            data: data.pathArr
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            },
            min: 0,
            max: function (value) {
              return value.max;
            }
          },
          series: [
            {
              name: '今日流量',
              type: 'line',
              smooth: true,
              symbol: 'none',
              sampling: 'average',
              itemStyle: {
                color: 'rgb(48, 139, 233)'
              },
              data: data.valueArr
            }
          ]
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .indexPage-container {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", Tahoma, Arial, sans-serif;
    background-color: transparent;

    .message-list {
      margin-bottom: 20px;

      .card-title {
        display: flex;
        justify-content: space-between;
        .more-info {
          cursor: pointer;
        }
      }

      .body-content {
        height: 200px;

        .item {
          padding: 10px 15px;
          background-color: #f8f8f8;
          border-radius: 3px;
          margin-bottom: 15px;
          cursor: pointer;

          &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)
          }

          .item-name {
            color: #999;
          }

          .item-num {
            color: #009688;
            font-size: 30px;
            padding-top: 10px;
          }
        }

        .icon-box {
          cursor: pointer;
          text-align: center;
          background: #f8f8f8;
          padding: 8px 0;
          border-radius: 5px;

          &:hover {
            box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5)
          }

          span {
            font-size: 22px;
            color: #333;
          }

          .text {
            padding-top: 10px;
            color: #666;
          }
        }

        .song-item {
          border-bottom: 1px solid #f2f2f2;
          padding-bottom: 5px;
          margin-bottom: 5px;

          .songImg {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            img {
              width: 53px;
              height: 53px;
              border-radius: 50%;
            }

            .song-name {
              padding-left: 5px;
              font-size: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          .commend {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .info {
          ul {
            li {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              padding: 9px 0;

              &:first-child {
                padding-top: 0;
              }

              &:hover {
                color: #1ab394;
              }
            }
          }
        }
      }
    }
    .visit-info{
      .card-title{
        .title-count{
          display: flex;
          justify-content: space-between;
          position: relative;
          .count{
            padding: 0 8px;
            border-radius: 5px;
            background: #f56c6c;
            margin-left: 5px;
            color: #fff;
          }
          .m-count{
            background: #409eff;
          }
          .date-picker{
            position: absolute;
            top: -12px;
            right: 0;
          }
        }
      }
    }
    .hide{
      display: none
    }
  }
</style>
