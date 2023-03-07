<template>
  <div class="musicqueue">
    <div class="queue-top">
      <span>播放列表/{{ musicQueue.length }}</span>
      <span class="clearQueue" @click="clearMusicQueue">
        <svg
          t="1676877021495"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3038"
          width="25"
          height="25"
        >
          <path
            d="M358.925672 596.814688v30.450522c0 17.248849 13.985526 31.233352 31.233352 31.233352 17.248849 0 31.233352-13.985526 31.233352-31.233352v-30.450522c0-17.248849-13.985526-31.233352-31.233352-31.233352-17.248849 0-31.233352 13.985526-31.233352 31.233352zM602.506317 596.814688v30.450522c0 17.248849 13.985526 31.233352 31.233352 31.233352s31.233352-13.985526 31.233351-31.233352v-30.450522c0-17.248849-13.984503-31.233352-31.233351-31.233352s-31.233352 13.985526-31.233352 31.233352zM437.047937 699.686636c-14.650675 9.104355-19.155269 28.360931-10.04989 43.01263 11.015891 17.73185 41.238216 47.740304 84.651982 47.740304 43.195801 0 73.79368-29.780257 85.059258-47.379077 9.216919-14.391778 5.03262-33.338293-9.237385-42.742477-14.270005-9.393951-33.576723-5.409197-43.159985 8.739035-0.12689 0.188288-13.049201 18.915815-32.661888 18.915815-19.028379 0-30.93864-17.274432-31.772634-18.530028-9.175987-14.412244-28.259624-18.788925-42.829458-9.756202zM907.576407 160.082952H699.352015v-26.882254c0-40.145325-32.692586-72.807213-72.878844-72.807213h-229.046626c-40.186258 0-72.878844 32.661887-72.878844 72.807213v26.882254H116.323309c-17.248849 0-31.233352 13.984503-31.233352 31.233352s13.984503 31.233352 31.233352 31.233351h791.253098c17.248849 0 31.233352-13.984503 31.233352-31.233351s-13.985526-31.233352-31.233352-31.233352z m-270.692119 0H387.014404v-26.882254c0-5.607718 4.768607-10.340509 10.411117-10.340509h229.046627c5.64251 0 10.411117 4.732791 10.411117 10.340509v26.882254z"
            fill="#91898b"
            p-id="3039"
          ></path>
          <path
            d="M824.286446 259.279185c-17.248849 0-31.233352 13.984503-31.233352 31.233352v530.07261c0 40.089044-32.692586 72.705905-72.878844 72.705906H303.725466c-40.186258 0-72.878844-32.616862-72.878844-72.705906v-530.07261c0-17.248849-13.984503-31.233352-31.233352-31.233352s-31.233352 13.984503-31.233352 31.233352v530.07261c0 74.535577 60.71378 135.172609 135.345548 135.172609h416.448784c74.632791 0 135.345548-60.637032 135.345548-135.172609v-530.07261c0-17.248849-13.984503-31.233352-31.233352-31.233352z"
            fill="#91898b"
            p-id="3040"
          ></path>
          <path
            d="M355.781052 259.279185c-17.248849 0-31.233352 13.984503-31.233351 31.233352v167.494758c0 17.248849 13.985526 31.233352 31.233351 31.233352 17.248849 0 31.233352-13.985526 31.233352-31.233352v-167.494758c0-17.248849-13.984503-31.233352-31.233352-31.233352zM699.352015 458.007295v-167.494758c0-17.248849-13.984503-31.233352-31.233351-31.233352s-31.233352 13.984503-31.233352 31.233352v167.494758c0 17.248849 13.985526 31.233352 31.233352 31.233352s31.233352-13.984503 31.233351-31.233352zM511.949858 489.240647c17.248849 0 31.233352-13.985526 31.233352-31.233352v-167.494758c0-17.248849-13.985526-31.233352-31.233352-31.233352s-31.233352 13.984503-31.233352 31.233352v167.494758c-0.001023 17.248849 13.984503 31.233352 31.233352 31.233352z"
            fill="#91898b"
            p-id="3041"
          ></path>
        </svg>
      </span>
    </div>
    <el-scrollbar style="height: 85%" class="queue-cont">
      <ul>
        <li
          v-for="(item, index) in musicQueue"
          :key="index"
          :class="{ 'active-song': item.id == globalMusicInfo.id }"
          @dblclick="playMusic(item)"
        >
          <div class="playingIcon" v-show="item.id == globalMusicInfo.id">
            <div class="playingIcon1"></div>
            <div class="playingIcon2"></div>
            <div class="playingIcon3"></div>
          </div>
          <div class="musiclist-item">
            <span class="musiclist-songname-txt">{{ item.name }}</span>
            <span class="musiclist-artist">{{ item.musicArtist }}</span>
            <span class="musiclist-time">{{ item.duration }}</span>
            <span class="musiclist-delete" @click="deleteQueue(item.id)">
              <svg
                t="1676880112192"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4301"
                width="20"
                height="20"
              >
                <path
                  d="M782.246469 240.527099c36.608779 36.608779 64.905242 79.291904 84.184331 126.794801 18.651802 45.9004 28.084639 94.451162 28.010961 144.263661 0.069585 49.808406-9.359158 98.363262-28.015054 144.260591-19.279089 47.50392-47.569412 90.189092-84.175121 126.793778-36.606733 36.606733-79.294974 64.900126-126.797871 84.179214-45.896306 18.654872-94.451162 28.084639-144.259568 28.015054-49.808406 0.069585-98.365308-9.358135-144.259568-28.015054-47.50392-19.277042-90.192162-47.569412-126.800941-84.179214-36.604686-36.603663-64.895009-79.289857-84.173075-126.793778-18.656919-45.895283-28.084639-94.452185-28.015054-144.260591-0.072655-49.812499 9.359158-98.363262 28.010961-144.263661 19.280112-47.501874 47.575552-90.186022 84.183308-126.793778 36.604686-36.604686 79.286788-64.899102 126.789685-84.178191 45.9004-18.651802 94.451162-28.084639 144.263661-28.011984 49.813522-0.072655 98.363262 9.360182 144.264685 28.011984C702.959681 175.626973 745.642806 203.922413 782.246469 240.527099M827.505255 195.268312C652.829957 20.593014 369.558335 20.593014 194.883037 195.269335 20.202623 369.94975 20.201599 653.220349 194.876897 827.895647c174.681438 174.681438 457.952037 174.679391 632.632451 0C1002.18567 653.220349 1002.18567 369.94975 827.505255 195.268312L827.505255 195.268312 827.505255 195.268312zM557.129338 513.486864 716.737476 353.87975l-45.222971-45.223994L511.906367 468.263893 352.762811 309.12136l-45.344744 45.344744 159.142533 159.143557L309.697993 670.472268l45.201481 45.201481 156.86363-156.86363 157.358911 157.356864 45.333488-45.333488L557.129338 513.486864zM714.465736 670.824285"
                  fill="#91898b"
                  p-id="4302"
                ></path>
              </svg>
            </span>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>
<script>
import axios from "axios";
import pubsub from "pubsub-js";
export default {
  name: "MusicQueue",
  data() {
    return {};
  },
  methods: {
    clearMusicQueue() {
      if (this.musicQueue.length == 0) {
        this.$message({
          message: "列表已经清空啦~",
          type: "warning",
          showClose: true,
        });
      } else {
        this.$confirm("确定清空人家嘛~", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$store.commit("changeNowIndex", 0);
            this.$store.commit("changeMusicInfo", {});
            setTimeout(() => {
              this.$store.commit("clearMusicQueue");
            }, 100);
            this.$router.go(0);
            this.$message({
              type: "success",
              message: "已清空!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消清空",
            });
          });
      }
    },
    deleteQueue(id) {
      this.$confirm("确定删除该歌曲吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = [];
          for (const item of this.musicQueue) {
            ids.push(item.id);
          }
          let idindex = ids.indexOf(id);
          setTimeout(() => {
            this.$store.commit("deleteMusic", id);
            if (idindex < this.nowIndex) {
              this.$store.commit("changeNowIndex", this.nowIndex - 1);
            } else if (idindex == this.nowIndex) {
              if (this.nowIndex < this.musicQueue.length)
                this.playMusic(this.musicQueue[this.nowIndex]);
              if (this.musicQueue.length == 0) {
                this.$store.commit("changeNowIndex", 0);
                this.$store.commit("changeMusicInfo", {});
                setTimeout(() => {
                  this.$store.commit("clearMusicQueue");
                }, 100);
                this.$router.go(0);
              }
              if (this.nowIndex == this.musicQueue.length) {
                this.$store.commit("changeNowIndex", 0);
              }
            }
          }, 300);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    playMusic(row) {
      // 播放音乐：https://autumnfish.cn/song/url
      console.log("play");
      let id = row.id;
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        console.log(row);
        pubsub.publish("musicinfodemo", row);
        pubsub.publish("musicurldemo", res.data.data[0].url);
      });
      this.$store.commit("changeMusicInfo", row);
      let ids = [];
      for (const item of this.musicQueue) {
        ids.push(item.id);
      }
      this.$store.commit("changeNowIndex", ids.indexOf(row.id));
    },
  },
  computed: {
    musicQueue() {
      return this.$store.state.musicQueue;
    },
    nowIndex() {
      console.log("11111" + this.$store.state.nowIndex);
      return this.$store.state.nowIndex;
    },
    globalMusicInfo() {
      return this.$store.state.globalMusicInfo;
    },
  },
  watch: {
    nowIndex() {
      console.log(this.nowIndex);
      this.playMusic(this.musicQueue[this.nowIndex]);
    },
  },
};
</script>
<style scoped>
.musicqueue {
  display: none;
  /* display: block; */
  position: absolute;
  bottom: 60px;
  overflow: hidden;
  line-height: 40px;
  right: -115px;
  width: 480px;
  height: 410px;
  background-color: rgba(255, 192, 203, 0.8);
  border-radius: 10px;
  box-shadow: 0px 0px 4px #b99ca6;
}
.queue-top {
  position: relative;
  height: 50px;
  margin: 0 auto;
  font-size: 18px;
  padding: 0px 20px;
  color: #91898b;
  line-height: 50px;
  background-color: rgb(255, 192, 203);
  border-bottom: 1px solid #fff;
}
.queue-top svg {
  position: absolute;
  right: 30px;
  top: 25%;
}
.queue-top svg:hover path {
  fill: palevioletred;
}

.queue-cont li:hover {
  background-color: rgb(255, 192, 203);
}
.active-song {
  background-color: rgb(255, 192, 203);
}
.queue-cont .musiclist-number {
  float: left;
  width: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: #7c898e;
}
.queue-cont .musiclist-songname-txt {
  float: left;
  width: 120px;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ffffff;
  margin-left: 50px;
}
.queue-cont .musiclist-artist {
  float: left;
  font-size: 14px;
  width: 75px;
  height: 40px;
  margin-left: 80px;
  margin-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #7c898e;
}
.queue-cont .musiclist-time {
  font-size: 14px;
  float: left;
  margin-left: 30px;
  width: 60px;
  color: #7c898e;
}
.queue-cont svg {
  display: none;
  float: right;
  margin-top: 10px;
  margin-right: 20px;
}
.queue-cont li:hover svg {
  display: block;
}
.queue-cont li svg:hover path {
  fill: palevioletred;
}
.playingIcon {
  width: 14px;
  height: 14px;
  overflow: hidden;
  display: flex;
  position: absolute;
  left: 20px;
  margin-top: 10px;
  font-weight: bold;
}

.playingIcon div {
  background-color: palevioletred;
  width: 4px;
  margin: 0 1px;
  height: 100%;
}

.playingIcon1 {
  /* transform: translate3d(0,0,0); */
  animation: playingIcon;
  animation-duration: 0.5s;
  animation-delay: 0;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate-reverse;
}

.playingIcon2 {
  /* transform: translate3d(0,4px,0); */
  animation: playingIcon;
  animation-duration: 0.5s;
  animation-delay: 0.2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate-reverse;
}

.playingIcon3 {
  /* transform: translate3d(0,8px,0); */
  animation: playingIcon;
  animation-duration: 0.5s;
  animation-delay: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-direction: alternate-reverse;
}

@keyframes playingIcon {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(0, 80%, 0);
  }
}
</style>