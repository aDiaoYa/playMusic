<template>
  <div class="musicprocess">
    <audio
      class="music"
      id="myAudio"
      :src="musicurl"
      ref="audio"
      controls
      autoplay
      @canplay="getDuration"
      @timeupdate="updateTime"
    ></audio>
    <div class="audio-left">
      <!-- 专辑封面 -->
      <div class="bar-albumImg">
        <a href="#" target="_blank" title="">
          <img :src="musicimg" alt="" />
        </a>
      </div>
      <!-- 模块：上一首，播放，暂停，下一首 -->
      <div class="audio-btns">
        <a href="#" class="iconfont icon-shangyishou" @click="previous()">
          <svg
            t="1676865851940"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8313"
            width="36"
            height="36"
          >
            <path
              d="M79.619558 551.918154l476.489099 341.887251c29.008396 18.785014 67.77055 9.609257 67.77055-46.095534v-147.064983l269.203697 193.124392c29.008396 18.785014 66.903549 10.404008 67.806675-46.890285V175.278628c0.903126-63.507797-36.197277-62.965921-67.806675-46.095533L623.879207 322.307486v-148.835109c0-65.205673-36.197277-61.195795-67.77055-44.289282l-476.489099 341.9595c-22.000141 22.253016-22.000141 58.450293 0 80.775559z m825.13173 273.755451l-336.974247-235.571298v235.571298L118.490087 511.530375l449.250829-314.21548v235.643547l336.974247-235.643547c0.036125 50.177662 0.036125 615.281451 0.036125 628.35871z"
              fill="#f199a4"
              p-id="8314"
            ></path>
          </svg>
        </a>
        <a
          href="#"
          class="iconfont icon-play"
          v-if="!isPaused"
          @click="changeStatus('playing')"
        >
          <svg
            t="1676864906884"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5045"
            width="36"
            height="36"
          >
            <path
              d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM456.704 305.92C432.704 289.152 405.333333 303.082667 405.333333 331.797333v360.533334c0 28.586667 27.541333 42.538667 51.370667 25.856l252.352-176.768c21.76-15.253333 21.632-43.541333 0-58.709334l-252.373333-176.768z m-8.597333 366.72V351.466667l229.269333 160.597333-229.269333 160.597333z"
              fill="#f199a4"
              p-id="5046"
            ></path>
          </svg>
        </a>
        <a
          href="#"
          class="iconfont icon-pause"
          v-if="isPaused"
          @click="changeStatus('pasuing')"
        >
          <svg
            t="1676865900695"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11900"
            width="36"
            height="36"
          >
            <path
              d="M279.272727 384v256c0 53.527273 41.890909 95.418182 95.418182 95.418182s95.418182-41.890909 95.418182-95.418182v-256c0-53.527273-41.890909-95.418182-95.418182-95.418182S279.272727 330.472727 279.272727 384z m144.290909 0v256c0 27.927273-20.945455 48.872727-48.872727 48.872727s-48.872727-20.945455-48.872727-48.872727v-256c0-27.927273 20.945455-48.872727 48.872727-48.872727s48.872727 20.945455 48.872727 48.872727zM553.890909 384v256c0 53.527273 41.890909 95.418182 95.418182 95.418182s95.418182-41.890909 95.418182-95.418182v-256c0-53.527273-41.890909-95.418182-95.418182-95.418182s-95.418182 41.890909-95.418182 95.418182z m144.290909 0v256c0 27.927273-20.945455 48.872727-48.872727 48.872727s-48.872727-20.945455-48.872727-48.872727v-256c0-27.927273 20.945455-48.872727 48.872727-48.872727s48.872727 20.945455 48.872727 48.872727z"
              fill="#f199a4"
              p-id="11901"
            ></path>
            <path
              d="M923.927273 209.454545c-6.981818-9.309091-23.272727-11.636364-32.581818-4.654545-9.309091 6.981818-11.636364 23.272727-4.654546 32.581818C947.2 316.509091 977.454545 411.927273 977.454545 512c0 256-209.454545 465.454545-465.454545 465.454545S46.545455 768 46.545455 512 256 46.545455 512 46.545455c100.072727 0 195.490909 30.254545 274.618182 90.763636 9.309091 6.981818 25.6 4.654545 32.581818-4.654546s4.654545-25.6-4.654545-32.581818C726.109091 34.909091 621.381818 0 512 0 230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512c0-109.381818-34.909091-214.109091-100.072727-302.545455z"
              fill="#f199a4"
              p-id="11902"
            ></path>
          </svg>
        </a>
        <a href="#" class="iconfont icon-xiayishou" @click="next()">
          <svg
            t="1676865806587"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7559"
            width="36"
            height="36"
          >
            <path
              d="M945.247442 554.519156l-476.561349 341.959501c-28.900021 18.676639-67.6983 9.537007-67.770549-46.095534v-147.028858l-269.095322 193.124392c-29.008396 18.676639-66.903549 10.404008-67.806675-46.962535V177.843505C63.110421 114.335709 100.210823 114.877584 131.784097 131.856347l269.095322 193.052141V176.145629C400.987794 110.867706 437.11282 114.877584 468.686093 131.856347l476.561349 341.88725c20.91639 14.413886 19.941015 66.433924 0 80.775559zM120.115713 828.346857l336.974247-235.643548v235.643548l449.250829-314.21548-449.250829-314.215481v235.643548L120.115713 199.915896V828.346857z"
              fill="#f199a4"
              p-id="7560"
            ></path>
          </svg>
        </a>
      </div>
      <!-- 进度条 -->
      <div class="audio-progress">
        <span>{{ currentTime | timeFormat }}</span>
        <div class="block">
          <el-slider v-model="currentTime" :max="duration"></el-slider>
        </div>
        <span>{{ duration | timeFormat }}</span>
      </div>
    </div>
    <div class="audio-right">
      <!-- 音量面板 -->
      <div class="mode-volume-list">
        <!-- 音量图标 -->
        <svg
          v-if="voice"
          @click="voice = 0"
          t="1676860669284"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8799"
          width="23"
          height="23"
        >
          <path
            d="M701.78095 343.629034c-10.378519-21.239297-37.17735-28.335921-56.709772-15.025913-19.534229 13.31362-22.731232 40.847581-6.766086 58.279374 49.241068 76.142853 49.241068 174.092156 0 250.236816-15.965146 17.431793-12.768143 44.96756 6.766086 58.279374 19.532423 13.311814 46.331254 6.211578 56.709772-15.022301M888.624993 858.76011c161.822529-202.863375 161.822529-490.660458 0-693.518414-12.538753-18.529973-38.181606-22.503649-55.743447-8.637326-17.560035 13.86271-19.648021 39.725921-4.535409 56.225706 137.182126 175.856829 137.182126 422.483018 0 598.34346-15.112612 16.499786-13.024626 42.362997 4.535409 56.2239 17.563647 13.86271 43.204693 9.889034 55.743447-8.637326zM239.651485 324.076743c78.274189-62.115778 156.544765-124.23878 234.818953-186.356364 23.488036-18.643764 58.118621-1.912783 58.118621 28.074019v692.41301c0 29.988609-34.630585 46.712365-58.118621 28.072213L239.651485 699.921451H51.201716c-19.794324 0-35.838943-16.046425-35.838943-35.84075V359.919299c0-19.792518 16.044619-35.84075 35.838943-35.84075l188.449769-0.001806z m-147.488396 76.800316v222.245882h174.26194l189.367327 150.284419V250.590834l-189.367327 150.288031H92.163089zM695.538667 689.537513c75.32825-106.375301 75.32825-248.701532 0-355.075026"
            fill="#f199a4"
            p-id="8800"
          ></path>
        </svg>
        <svg
          v-if="!voice"
          @click="voice = cacheVoice == 0 ? 0.7 : cacheVoice"
          t="1677049943087"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5465"
          width="25"
          height="25"
        >
          <path
            d="M128 420.576v200.864h149.12l175.456 140.064V284.288l-169.792 136.288H128z m132.256-64l204.288-163.968a32 32 0 0 1 52.032 24.96v610.432a32 32 0 0 1-51.968 24.992l-209.92-167.552H96a32 32 0 0 1-32-32v-264.864a32 32 0 0 1 32-32h164.256zM752 458.656L870.4 300.8a32 32 0 1 1 51.2 38.4L792 512l129.6 172.8a32 32 0 0 1-51.2 38.4l-118.4-157.856-118.4 157.856a32 32 0 0 1-51.2-38.4l129.6-172.8-129.6-172.8a32 32 0 0 1 51.2-38.4l118.4 157.856z"
            fill="#f199a4"
            p-id="5466"
          ></path>
        </svg>
        <!-- 音量控制面板 -->
        <div class="volume-panel">
          <el-slider
            v-model="voice"
            :max="1"
            :step="0.1"
            :show-tooltip="true"
            vertical
            height="80px"
            @input="changeVolume"
            @change="changeCacheVolume"
            :format-tooltip="formatTooltip"
          >
          </el-slider>
        </div>
      </div>
      <!-- 列表 -->
      <div class="mode-music-list">
        <a href="#" class="icon list">
          <svg
            t="1676866250738"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2315"
            width="30"
            height="30"
          >
            <path
              d="M762.164596 141.112901c-14.305821-9.648754-33.714869-5.897314-43.36874 8.393157-9.658987 14.295588-5.897314 33.709753 8.393157 43.36874 106.3604 71.862701 169.864736 191.282534 169.864736 319.445496 0 212.409714-172.807764 385.217479-385.222595 385.217479-212.409714 0-385.217479-172.807764-385.217479-385.217479 0-128.169101 63.49922-247.587911 169.859619-319.445496 14.295588-9.658987 18.057261-29.073152 8.398274-43.36874-9.648754-14.290471-29.068036-18.041912-43.363623-8.393157C137.924279 224.601384 64.144926 363.375008 64.144926 512.320295c0 246.856247 200.828958 447.685205 447.685205 447.685205s447.690322-200.828958 447.690322-447.685205C959.521476 363.375008 885.73803 224.606501 762.164596 141.112901z"
              fill="#f199a4"
              p-id="2316"
            ></path>
            <path
              d="M400.357294 64.635089c-17.248849 0-31.234375 13.985526-31.234375 31.234375l0 30.476105c0 17.248849 13.985526 31.234375 31.234375 31.234375 17.248849 0 31.234375-13.985526 31.234375-31.234375L431.591669 95.868441C431.590646 78.619592 417.60512 64.635089 400.357294 64.635089z"
              fill="#f199a4"
              p-id="2317"
            ></path>
            <path
              d="M623.310132 64.635089c-17.248849 0-31.234375 13.985526-31.234375 31.234375l0 30.476105c0 17.248849 13.985526 31.234375 31.234375 31.234375 17.248849 0 31.234375-13.985526 31.234375-31.234375L654.544507 95.868441C654.543484 78.619592 640.558981 64.635089 623.310132 64.635089z"
              fill="#f199a4"
              p-id="2318"
            ></path>
            <path
              d="M425.353594 227.656977c11.209296 18.047028 41.97602 48.589648 86.157265 48.589648 43.958164 0 75.100442-30.3134 86.574774-48.223305 9.302877-14.528901 5.068436-33.846876-9.455349-43.149752-14.539134-9.307993-33.851992-5.063319-43.149752 9.455349-0.121773 0.198521-13.379729 19.449981-33.968649 19.449981-20.008706 0-32.443923-18.127869-33.277918-19.374256-9.17087-14.427594-28.28009-18.799158-42.829458-9.760295C420.747693 193.748702 416.249239 213.006302 425.353594 227.656977z"
              fill="#f199a4"
              p-id="2319"
            ></path>
            <path
              d="M730.470757 605.14747 449.365474 605.14747c-17.248849 0-31.233352 13.985526-31.233352 31.234375 0 17.248849 13.985526 31.233352 31.233352 31.233352L730.470757 667.615197c17.248849 0 31.234375-13.985526 31.234375-31.233352C761.704109 619.132996 747.719606 605.14747 730.470757 605.14747z"
              fill="#f199a4"
              p-id="2320"
            ></path>
            <path
              d="M314.018903 605.14747l-20.822235 0c-17.248849 0-31.234375 13.985526-31.234375 31.234375 0 17.248849 13.985526 31.233352 31.234375 31.233352l20.822235 0c17.248849 0 31.233352-13.985526 31.233352-31.233352C345.252255 619.132996 331.267752 605.14747 314.018903 605.14747z"
              fill="#f199a4"
              p-id="2321"
            ></path>
            <path
              d="M730.470757 428.155407 449.365474 428.155407c-17.248849 0-31.233352 13.985526-31.233352 31.234375 0 17.248849 13.985526 31.234375 31.233352 31.234375L730.470757 490.624157c17.248849 0 31.234375-13.985526 31.234375-31.234375C761.704109 442.140932 747.719606 428.155407 730.470757 428.155407z"
              fill="#f199a4"
              p-id="2322"
            ></path>
            <path
              d="M314.018903 428.155407l-20.822235 0c-17.248849 0-31.234375 13.985526-31.234375 31.234375 0 17.248849 13.985526 31.234375 31.234375 31.234375l20.822235 0c17.248849 0 31.233352-13.985526 31.233352-31.234375C345.252255 442.140932 331.267752 428.155407 314.018903 428.155407z"
              fill="#f199a4"
              p-id="2323"
            ></path>
          </svg>
        </a>
        <MusicQueue class="musicqueue"></MusicQueue>
      </div>
    </div>
  </div>
</template>
<script>
import MusicQueue from "./MusicQueue.vue";
export default {
  name: "MusicProcess",
  components: { MusicQueue },
  props: ["musicurl", "musicinfo"],
  data() {
    return {
      // 总时长
      duration: 0,
      // 返回当前播放时长
      currentTime: 0,
      // 是否播放
      isPaused: false,
      // 音量
      voice: 0.7,
      // 缓存音量
      cacheVoice: 0.7,
      musicimg: require("../assets/imgs/123.png"),
    };
  },
  methods: {
    getDuration(event) {
      // 总时长
      this.duration = event.target.duration;
    },
    updateTime(event) {
      // 时间进度
      this.currentTime = event.target.currentTime;
    },
    // 是否播放
    changeStatus(option) {
      if (option == "playing") {
        if (this.musicurl) {
          this.isPaused = !this.isPaused;
          this.$refs.audio.play();
        } else {
          this.$message({
            type: "error",
            message: "还没有播放音乐哦",
            showClose: true,
          });
        }
      } else {
        this.isPaused = !this.isPaused;
        this.$refs.audio.pause();
      }
    },
    // 音量控制
    changeVolume() {
      this.$refs.audio.volume = this.voice;
    },
    changeCacheVolume() {
      // 设置缓存音量,点击静音恢复至该音量，如缓存也为0，恢复默认0.7
      this.cacheVoice = this.voice;
    },
    formatTooltip(val) {
      return val * 100 + "%";
    },
    // 上一曲
    previous() {
      if (this.musicQueue.length == 0) {
        this.$message({
          type: "warning",
          message: "宝er，列表空空如也~",
          showClose: true,
        });
      } else {
        if (this.musicQueue.length == 1) {
          this.currentTime = 0;
          let musicUrl = this.globalMusicUrl;
          this.$store.commit("changeMusicUrl", "");
          setTimeout(() => {
            this.$store.commit("changeMusicUrl", musicUrl);
          }, 0);
        } else {
          let ids = [];
          for (const item of this.musicQueue) {
            ids.push(item.id);
          }
          let nowIndex = ids.indexOf(this.globalMusicInfo.id);
          let prevIndex =
            (nowIndex - 1) % this.musicQueue.length < 0
              ? ((nowIndex - 1) % this.musicQueue.length) +
                this.musicQueue.length
              : (nowIndex - 1) % this.musicQueue.length;
          this.$store.commit("changeNowIndex", prevIndex);
        }
      }
    },
    // 下一曲
    next() {
      if (this.musicQueue.length == 0) {
        this.$message({
          type: "warning",
          message: "宝er，列表空空如也~",
          showClose: true,
        });
      } else {
        if (this.musicQueue.length == 1) {
          this.currentTime = 0;
          let musicUrl = this.globalMusicUrl;
          this.$store.commit("changeMusicUrl", "");
          setTimeout(() => {
            this.$store.commit("changeMusicUrl", musicUrl);
          }, 0);
        } else {
          let ids = [];
          for (const item of this.musicQueue) {
            ids.push(item.id);
          }
          let nowIndex = ids.indexOf(this.globalMusicInfo.id);
          let nextindex = (nowIndex + 1) % this.musicQueue.length;
          this.$store.commit("changeNowIndex", nextindex);
        }
      }
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
  filters: {
    timeFormat(time) {
      let min = parseInt(time / 60)
        .toString()
        .padStart(2, "0");
      let second = parseInt(time - min * 60)
        .toString()
        .padStart(2, "0");
      return min + ":" + second;
    },
  },
  watch: {
    // 监听：当一首歌放完之后，循环播放列表
    currentTime() {
      if (this.currentTime >= this.duration) {
        if (this.musicQueue.length == 1) {
          this.currentTime = 0;
          let musicUrl = this.globalMusicUrl;
          this.$store.commit("changeMusicUrl", "");
          setTimeout(() => {
            this.$store.commit("changeMusicUrl", musicUrl);
          }, 0);
        } else {
          let ids = [];
          for (const item of this.musicQueue) {
            ids.push(item.id);
          }
          let nowIndex = ids.indexOf(this.globalMusicInfo.id);
          let nextindex = (nowIndex + 1) % this.musicQueue.length;
          this.$store.commit("changeNowIndex", nextindex);
        }
      }
    },
    voice() {
      if (!this.voice) {
        this.$refs.audio.muted = true;
      } else this.$refs.audio.muted = false;
    },
    musicurl() {
      console.log(this.musicurl);
      if (this.musicurl) this.isPaused = true;
      else {
        this.isPaused = false;
        this.duration = 0;
        this.$refs.audio.currentTime = 0;
        this.currentTime = 0;
      }
    },
    musicinfo() {
      if (this.musicinfo.picUrl != undefined) {
        this.musicimg = this.musicinfo.picUrl;
      } else if (this.musicinfo.album != undefined) {
        if (this.musicinfo.album.picUrl != undefined) {
          this.musicimg = this.musicinfo.album.picUrl;
        } else {
          this.musicimg = this.musicinfo.album.artist.img1v1Url;
        }
      } else if (this.musicinfo.al != undefined) {
        this.musicimg = this.musicinfo.al.picUrl;
      }
    },
  },
};
</script>
<style scoped>
@import "../assets/common/tab.css";
.musicprocess {
  position: relative;
  padding: 10px;
  min-width: 400px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
}
.musicprocess .music:not([controls]) {
  display: none !important;
}
.musicprocess .music {
  display: none;
  width: 300px;
  height: 54px;
}
.audio-left {
  flex: 1;
}
.bar-albumImg {
  position: absolute;
  width: 60px;
  height: 60px;
  left: 100px;
  bottom: 10px;
}
.bar-albumImg a {
  width: 60px;
  height: 60px;
}
.bar-albumImg img {
  width: 60px;
  height: 60px;
  /* border: 1px solid #f199a4; */
  background-color: #f199a4;
  border-radius: 50%;
}
.audio-btns {
  position: absolute;
  left: 180px;
  top: 26px;
}

.audio-btns .iconfont {
  cursor: pointer;
  width: 36px;
  height: 36px;
  padding: 5px;
  border-radius: 10px;
}

.audio-progress {
  position: absolute;
  display: flex;
  align-items: center;
  width: 50%;
  margin-left: 350px;
  margin-top: -15px;
  width: 700px;
}

.audio-progress span {
  font-size: 12px;
  color: palevioletred;
}
.block {
  flex: 1;
  margin: 0 10px;
  width: 600px;
}
.audio-right {
  position: absolute;
  width: 150px;
  height: 40px;
  margin-left: 1120px;
}
.volume-panel {
  display: none;
  position: absolute;
  margin-top: -170px;
  width: 20px;
  height: 100px;
  background-color: rgba(255, 192, 203, 0.8);
  border-radius: 20px;
  box-shadow: 0px 0px 4px #b99ca6;
}
.mode-volume-list {
  width: 40px;
  height: 100px;
  margin: -10px auto;
  line-height: 80px;
  float: left;
}
.mode-volume-list:hover .volume-panel {
  display: block;
}
.mode-volume-list:hover path {
  fill: palevioletred;
}
.audio-btns a:hover path {
  fill: palevioletred;
}
.mode-music-list {
  width: 40px;
  height: 80px;
  margin: -30px auto;
  line-height: 130px;
  float: right;
}
.mode-music-list:hover path {
  fill: palevioletred;
}
.mode-music-list:hover .musicqueue {
  display: block;
}
</style>