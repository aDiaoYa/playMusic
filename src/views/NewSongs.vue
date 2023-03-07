<template>
  <!-- 最新音乐 -->
  <div class="new-songs" :style="backgroundDiv">
    <div class="tab-bar">
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }"
        >全部</span
      >
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }"
        >华语</span
      >
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }"
        >欧美</span
      >
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }"
        >日本</span
      >
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }"
        >韩文</span
      >
    </div>
    <div class="songs-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>

        <el-table-column width="180">
          <template slot-scope="scope">
            <div class="img-wrap" @click="playMusic(scope.row)">
              <img :src="scope.row.album.picUrl" alt="" />
              <p class="iconfont icon-play"></p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="音乐标题" width="250">
        </el-table-column>
        <el-table-column prop="artists[0].name" label="歌手" width="250">
        </el-table-column>
        <el-table-column prop="album.name" label="专辑" width="250">
        </el-table-column>
        <el-table-column prop="duration" label="时长" width="250">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
// 导入axios
import axios from "axios";
export default {
  name: "NewSongs",
  data() {
    return {
      tableData: [],
      tag: "0",
      backgroundDiv: {},
    };
  },
  created() {
    this.getNewSongs();
  },
  computed: {
    musicQueue() {
      return this.$store.state.musicQueue;
    },
  },
  methods: {
    getNewSongs() {
      // 获取最新音乐数据接口：https://autumnfish.cn/top/song
      axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
          limit: 10,
          // 起始的值：(页码-1)*每页多少条数据
          offset: (this.page - 1) * 10,
        },
      }).then((res) => {
        // console.log(res.data);
        let songsList = [];
        this.total = 50;
        let resultList = res.data.data.slice(0, 50);
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
          item.duration = duration;
          songsList.push(item);
        }
        this.tableData = songsList;
      });
    },
    playMusic(row) {
      // 播放音乐：https://autumnfish.cn/song/url
      let id = row.id;
      axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        this.$parent.$data.musicinfo = row;
        this.$parent.$data.musicurl = res.data.data[0].url;
      });
      let musicitem = {
        id: row.id,
        name: row.name,
        musicArtist: row.artists[0].name,
        duration: row.duration,
        picUrl: row.album.picUrl,
      };
      this.$store.commit("changeMusicInfo", musicitem);
      this.$store.commit("changeMusicQueue", musicitem);
      let ids = [];
      for (const item of this.musicQueue) {
        ids.push(item.id);
      }
      this.$store.commit("changeNowIndex", ids.indexOf(row.id));
    },
  },
  watch: {
    tag() {
      this.getNewSongs();
    },
  },
};
</script>
<style scoped>
@import "../assets/common/tab.css";
ul {
  list-style: none;
}
.new-songs {
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}

.new-songs >>> .el-loading-spinner {
  top: 50%;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}

.el-table::before {
  opacity: 0;
}

.songs-table {
  width: 100%;
}

.img-wrap {
  width: 60px;
  height: 60px;
  position: relative;
}

.img-wrap img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.img-wrap .iconfont::before {
  content: "\ea42";
  position: absolute;
  bottom: 12px;
  right: 12px;
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
.img-wrap:hover .iconfont::before {
  opacity: 1;
}
.page-list {
  margin: 10px;
  margin-bottom: 150px;
}
.songs-table {
  margin-bottom: 200px;
}
.tab-bar span {
  height: 25px;
  margin-left: 20px;
  cursor: pointer;
  font-size: 15px;
  color: grey;
}

.tab-bar .item.active {
  color: palevioletred;
  font-weight: bold;
}
</style>