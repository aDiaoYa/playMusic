<template>
  <div class="searchresult">
    <div class="result-top-info">
      <h2>{{ reqmusic }}</h2>
      <span>共找到{{ total }}个结果</span>
    </div>
    <!-- tab切换 -->
    <div class="tab-wrap">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="歌曲" name="first">
          <div class="songs-table">
            <el-table
              :data="songList"
              style="width: 100%"
              @row-dblclick="playMusic"
            >
              <el-table-column type="index" width="150"></el-table-column>
              <el-table-column prop="name" label="音乐标题" width="250">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                  <span
                    class="iconfont icon-bofangMV mvIcon"
                    v-if="scope.row.mvid != 0"
                  >
                    <svg
                      t="1677456069282"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3851"
                      width="20"
                      height="20"
                    >
                      <path
                        d="M268.17 323.66m-103.47 0a103.47 103.47 0 1 0 206.94 0 103.47 103.47 0 1 0-206.94 0Z"
                        fill="#E782A8"
                        p-id="3852"
                      ></path>
                      <path
                        d="M268.17 442.42c-65.48 0-118.75-53.28-118.75-118.76S202.69 204.9 268.17 204.9s118.76 53.28 118.76 118.76-53.28 118.76-118.76 118.76z m0-206.94c-48.62 0-88.17 39.56-88.17 88.18s39.56 88.18 88.17 88.18c48.63 0 88.18-39.56 88.18-88.18s-39.56-88.18-88.18-88.18z"
                        fill="#2D2A26"
                        p-id="3853"
                      ></path>
                      <path
                        d="M533.67 439.81c-91.82 0-166.52-74.7-166.52-166.52s74.7-166.52 166.52-166.52c91.82 0 166.52 74.7 166.52 166.52s-74.71 166.52-166.52 166.52z m0-302.46c-74.96 0-135.95 60.98-135.95 135.94s60.99 135.94 135.95 135.94 135.94-60.98 135.94-135.94-60.98-135.94-135.94-135.94z"
                        fill="#2D2A26"
                        p-id="3854"
                      ></path>
                      <path
                        d="M675.4 542.78c-12.66-12.66-33.37-12.66-46.03 0l-13.88 13.88-13.88-13.88c-12.66-12.66-33.37-12.66-46.03 0-12.66 12.66-12.66 33.37 0 46.03l59.12 59.12 0.79-0.79 0.79 0.79 59.12-59.12c12.66-12.66 12.66-33.37 0-46.03z"
                        fill="#E782A8"
                        p-id="3855"
                      ></path>
                      <path
                        d="M616.28 663.22c-1.83-0.43-3.05-0.23-4.48-0.67-2.97-0.5-5.82-1.71-7.92-3.81l-59.11-59.12c-9.01-9.01-13.97-21.02-13.97-33.82 0-12.81 4.96-24.82 13.97-33.83 18-18 49.63-18.01 67.65 0.01l3.08 3.07 3.07-3.07c18.65-18.66 48.99-18.65 67.65-0.01v0.01c9.01 9 13.97 21.01 13.97 33.82 0 12.8-4.96 24.81-13.97 33.82l-59.12 59.12a15.373 15.373 0 0 1-10.82 4.48z m-37.69-114.65c-4.64 0-8.97 1.78-12.2 5.02-3.24 3.24-5.02 7.57-5.02 12.2s1.78 8.97 5.02 12.2l49.1 49.1 49.1-49.1c3.23-3.24 5.02-7.57 5.02-12.2s-1.78-8.97-5.02-12.2v-0.01c-6.73-6.73-17.68-6.74-24.42 0l-13.88 13.88c-5.97 5.97-15.65 5.96-21.62 0.01L590.8 553.6c-3.24-3.24-7.57-5.03-12.21-5.03z"
                        fill="#2D2A26"
                        p-id="3856"
                      ></path>
                      <path
                        d="M943.44 498.25a30.534 30.534 0 0 0-14.68-3.75c-5.74 0-11.47 1.61-16.48 4.82l-127.42 81.53v-56.96c0-54.19-44.09-98.29-98.28-98.29H169.03c-54.19 0-98.29 44.09-98.29 98.29v31.37c0 8.44 6.85 15.29 15.29 15.29s15.29-6.85 15.29-15.29v-31.37c0-37.34 30.37-67.71 67.71-67.71h517.55c37.33 0 67.71 30.37 67.71 67.71v92.55c-0.01 0.26-0.1 0.5-0.1 0.77v107.3c0 0.24 0.09 0.46 0.1 0.7v95.16c0 37.33-30.37 67.71-67.71 67.71H169.03c-37.34 0-67.71-30.37-67.71-67.71V642.15c0-8.44-6.85-15.29-15.29-15.29s-15.29 6.85-15.29 15.29v178.22c0 54.19 44.09 98.28 98.29 98.28h517.55c54.19 0 98.28-44.09 98.28-98.28v-61.29l129.71 67.99c4.45 2.33 9.33 3.49 14.19 3.49 5.49 0 10.97-1.48 15.83-4.41a30.567 30.567 0 0 0 14.75-26.16V525.07c-0.01-11.17-6.1-21.46-15.9-26.82z m-14.68 301.73l-143.9-75.42V617.14l143.9-92.07v274.91z"
                        fill="#E782A8"
                        p-id="3857"
                      ></path>
                      <path
                        d="M272.72 832.74h-63.51c-0.55 0-1-0.45-1-1v-63.51c0-0.55 0.45-1 1-1h63.51c0.55 0 1 0.45 1 1v63.51c0 0.55-0.45 1-1 1z"
                        fill="#2D2A26"
                        p-id="3858"
                      ></path>
                    </svg>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="artists[0].name" label="歌手" width="250">
              </el-table-column>
              <el-table-column prop="album.name" label="专辑" width="250">
              </el-table-column>
              <el-table-column prop="duration" label="时长" width="300">
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">
          <div class="songs-wrap">
            <div class="list">
              <ul>
                <li
                  class="iconfont icon-play"
                  v-for="(item, index) in playList"
                  :key="index"
                  @click="playListDetail(item.id)"
                >
                  <p class="first-p">播放量：{{ item.playCount }}</p>
                  <img :src="item.coverImgUrl" alt="recommend" />
                  <p class="last-p" :title="item.name">{{ item.name }}</p>
                </li>
              </ul>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="third">
          <ul class="mv-list1">
            <li
              v-for="(item, index) in mvList"
              :key="index"
              @click="toMvdetail(item.id)"
            >
              <div class="mv-img-wrap">
                <img :src="item.cover" alt="newMvs" />
                <p class="iconfont icon-play play"></p>
                <p class="play-count iconfont icon-play">
                  {{ item.playCount }}
                </p>
                <p class="mv-duration">{{ item.duration }}</p>
              </div>
              <div class="mv-info">
                <p class="title" :title="item.name">{{ item.name }}</p>
                <p class="author">{{ item.artistName }}</p>
              </div>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        class="page-list"
        @current-change="handleCurrentChange"
        :current-page="page"
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
// import pubsub from "pubsub-js";
import axios from "axios";
export default {
  name: "SearchResult",
  data() {
    return {
      activeName: "first",
      page: 1,
      // 歌曲列表
      songList: [],
      // 歌单列表
      playList: [],
      // MV列表
      mvList: [],
      total: 0,
      tag: 1,
      reqmusic: "",
    };
  },
  methods: {
    handleClick(name) {
      if (name == "first") {
        this.tag = 1;
        console.log(this.tag);
      } else if (name == "second") {
        this.tag = 1000;
        console.log(this.tag);
      } else if (name == "third") {
        this.tag = 1004;
        console.log(this.tag);
      }
    },
    playMusic(row) {
      let id = row.id;
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        console.log(row);
        this.$parent.$data.musicinfo = row;
        this.$parent.$data.musicurl = res.data.data[0].url;
      });
    },
    musicLists() {
      // 搜索接口地址：https://autumnfish.cn/search
      axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.reqmusic,
          type: this.tag,
          limit: 20,
          offset: (this.page - 1) * 20,
        },
      }).then((res) => {
        // console.log(res.data.result.songs);
        if (this.tag == 1) {
          let songsList = [];
          let resultList = res.data.result.songs;
          if (res.data.result.songCount) {
            this.total = res.data.result.songCount;
          }
          for (const item of resultList) {
            /**毫秒————350750
             * 秒 ————350750/1000
             * 分 ————350750/1000/60
             * 秒 ————350750/1000%60
             */
            let duration = item.duration;
            // console.log(duration);
            let min = parseInt(duration / 60000)
              .toString()
              .padStart(2, "0");
            let second = parseInt((duration - min * 60000) / 1000)
              .toString()
              .padStart(2, "0");
            duration = `${min}:${second}`;
            // console.log(duration);
            item.duration = duration;
            songsList.push(item);
          }
          this.songList = songsList;
        } else if (this.tag == 1000) {
          this.playList = res.data.result.playlists;
          if (res.data.result.playlistCount) {
            this.total = res.data.result.playlistCount;
          }
          for (let i = 0; i < this.playList.length; i++) {
            if (this.playList[i].playCount > 10000) {
              this.playList[i].playCount =
                parseInt(this.playList[i].playCount / 10000) + "w";
            }
          }
        } else if (this.tag == 1004) {
          this.mvList = res.data.result.mvs;
          if (res.data.result.mvCount) {
            this.total = res.data.result.mvCount;
          }
          for (let i = 0; i < this.mvList.length; i++) {
            if (this.mvList[i].playCount > 10000) {
              this.mvList[i].playCount =
                parseInt(this.mvList[i].playCount / 10000) + "w";
            }
            let duration = this.mvList[i].duration;
            // console.log(duration);
            let min = parseInt(duration / 60000)
              .toString()
              .padStart(2, "0");
            let second = parseInt((duration - min * 60000) / 1000)
              .toString()
              .padStart(2, "0");
            duration = `${min}:${second}`;
            this.mvList[i].duration = duration;
          }
        }
      });
    },
    // 页码发生了改变
    handleCurrentChange(val) {
      console.log(`当前页:${val}`);
      this.page = val;
      // 重新获取数据
      this.musicLists();
    },
    playListDetail(id) {
      this.$router.push(`/playlistdetail?q=${id}`);
    },
    toMvdetail(id) {
      this.$router.push(`/mvdetail?q=${id}`);
    },
  },
  // 生命周期钩子  crested
  // 回调函数，添加之后自动执行
  // 内部可以通过this访问到vue实例
  created() {
    this.reqmusic = this.$route.query.q;
    // pubsub.subscribe("sendMsg", (e, msg) => {
    //   console.log(e, msg); //sendMsg 这是A组件发布的消息！
    //   this.reqmusic = msg;
    // });
    this.musicLists();
  },
  watch: {
    tag() {
      console.log(222);
      this.musicLists();
    },
    $route(newVal) {
      this.reqmusic = newVal.query.q;
      this.total = 0;
      this.page = 1;
      this.musicLists();
    },
  },
};
</script>
<style scoped>
@import "../assets/common/tab.css";
ul {
  list-style: none;
}
.searchresult {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}
.result-top-info {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
}

.result-top-info span {
  margin-left: 10px;
  font-size: 12px;
  color: grey;
}
.el-tabs {
  margin: 20px;
}
.tab-wrap {
  margin-bottom: 200px;
}
.mvIcon {
  margin-left: 5px;
  cursor: pointer;
}
/* 歌单Tab */
.songs-wrap .list ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.songs-wrap .list li {
  width: 18%;
  margin: 10px 0;
  position: relative;
  overflow-y: hidden;
}

.list li .first-p {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  padding: 5px;
  box-sizing: border-box;
  /* border-top-left-radius: 10px;
      border-top-right-radius: 10px; */
  transform: translateY(-100%);
  transition: 0.5s;
}

.list li::before {
  content: "\ea42";
  position: absolute;
  bottom: 45px;
  right: 10px;
  width: 25px;
  height: 25px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: palevioletred;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}

.list li:hover .first-p {
  transform: translateY(0);
}

.list li:hover::before {
  opacity: 1;
}

.songs-wrap ul img {
  width: 100%;
  border-radius: 5px;
  /* opacity: 1; */
}

.songs-wrap ul .last-p {
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 10px auto;
}
/* MVTabs */
.mv-list1 {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mv-list1 li {
  width: 23%;
  margin-bottom: 20px;
  margin-right: 20px;
}

.mv-img-wrap {
  position: relative;
  cursor: pointer;
}

.mv-img-wrap img {
  width: 100%;
  height: 165px;
  border-radius: 5px;
}

.mv-img-wrap:hover .play::before {
  opacity: 1;
}

.mv-img-wrap .play::before {
  content: "\ea42";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  font-size: 35px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: palevioletred;
  opacity: 0;
  transition: 0.3s;
  cursor: pointer;
}

.play-count {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #fff;
  font-size: 12px;
  -webkit-text-stroke: 1px pink;
}

.play-count::before {
  margin-right: 5px;
}

.mv-duration {
  position: absolute;
  bottom: 10px;
  right: 5px;
  color: #fff;
  font-size: 12px;
  -webkit-text-stroke: 1px pink;
}

.mv-info p {
  margin: 5px 0;
}

.mv-info p.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mv-info .author {
  color: #a5a1a1;
  font-size: 12px;
}
.page-list {
  text-align: center;
}
</style>