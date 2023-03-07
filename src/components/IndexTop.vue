<template>
  <div id="index-top">
    <span class="title">啊叼音乐汇</span>
    <div class="btns">
      <i class="back-btn" @click="go(-1)">
        <svg
          t="1677928987644"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6323"
          width="20"
          height="20"
        >
          <path
            d="M716.879204 813.744345c14.09502 12.824073 15.126512 34.658358 2.303462 48.752354-12.843516 14.09502-34.678824 15.126512-48.752354 2.302439l-364.835266-332.676845c-14.114462-12.844539-15.127536-34.659381-2.302439-48.753377 0.733711-0.815575 1.486864-1.588171 2.302439-2.302439l0.078795-0.080841 0.13917-0.13917 364.616278-332.4773c14.074553-12.824073 35.909861-11.791557 48.752354 2.302439 12.824073 14.09502 11.792581 35.930327-2.303462 48.753377L380.032386 506.593873l336.845795 307.149449L716.879204 813.744345 716.879204 813.744345z"
            fill="#fff"
            p-id="6324"
          ></path>
        </svg>
      </i>
      <i class="forward-btn" @click="go(-1)">
        <svg
          t="1677928924240"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5326"
          width="20"
          height="20"
        >
          <path
            d="M305.587883 813.744345c-14.09502 12.824073-15.126512 34.658358-2.303462 48.752354 12.843516 14.09502 34.678824 15.126512 48.752354 2.302439l364.835266-332.676845c14.114462-12.844539 15.127536-34.659381 2.302439-48.753377-0.733711-0.815575-1.486864-1.588171-2.302439-2.302439l-0.078795-0.080841-0.13917-0.13917L352.037798 148.369166c-14.074553-12.824073-35.909861-11.791557-48.752354 2.302439-12.824073 14.09502-11.792581 35.930327 2.303462 48.753377l336.845795 307.168891L305.588907 813.743322 305.587883 813.744345 305.587883 813.744345z"
            fill="#fff"
            p-id="5327"
          ></path>
        </svg>
      </i>
    </div>
    <input
      type="text"
      placeholder="搜索歌曲"
      class="index-top-search"
      v-model="inputValue"
      @keyup.enter="toSearch()"
      @focus="getSearchHot"
      @blur="showHot = false"
    />
    <div
      class="search-hot"
      v-show="showHot"
      ref="hot"
      @mousedown.stop="prevent"
    >
      <el-scrollbar style="height: 100%">
        <div class="history" v-if="history.length">
          <span
            class="hot-title"
            style="display: inline-block; margin-right: 5px"
            >搜索历史</span
          >
          <span
            class="iconfont icon-lajitong"
            style="cursor: pointer"
            title="清空搜索历史"
            @mousedown="deleteHistory(0, true)"
          ></span>
          <div class="history-wrap">
            <div
              class="history-item"
              v-for="(item, index) in history"
              :key="index"
              @mousedown="toHot(item)"
            >
              {{ item }}
              <span
                class="delete-btn"
                title="删除"
                @mousedown.stop="deleteHistory(index, false)"
                >×</span
              >
            </div>
          </div>
        </div>

        <div class="hot-title">热搜榜</div>
        <ul>
          <li
            class="hot-item"
            v-for="(item, index) in hotData"
            :key="index"
            @mousedown.prevent="toHot(item.searchWord)"
          >
            <div class="hot-index">{{ index + 1 }}</div>
            <div class="hot-info">
              <div class="hot-top">
                <div class="hot-name">{{ item.searchWord }}</div>
                <div class="hot-score">{{ item.score }}</div>
                <img
                  class="hot-icon"
                  v-show="item.iconUrl && item.iconType != 5"
                  :src="item.iconUrl"
                />
              </div>
              <div class="hot-content">{{ item.content }}</div>
            </div>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "IndexTop",
  data() {
    return {
      // 搜索框内容
      inputValue: "",
      // 热搜榜数据
      hotData: [],
      // 历史记录
      history: [],
      // 是否展示热搜榜
      showHot: false,
    };
  },
  methods: {
    toSearch() {
      // 跳转搜索内容的界面
      if (this.inputValue == "") {
        this.inputValue = "请输入内容";
      } else {
        this.$router.push({ path: `/searchresult?q=${this.inputValue}` });
        if (!this.history.includes(this.inputValue)) {
          this.history.push(this.inputValue);
        }
        this.$forceUpdate();
      }
    },
    getSearchHot() {
      // 获取热搜榜数据
      this.showHot = true;
      if (this.hotData.length == 0) {
        axios({
          url: "https://autumnfish.cn/search/hot/detail",
          method: "get",
        }).then((res) => {
          this.hotData = res.data.data;
        });
      }
    },
    toHot(value) {
      this.inputValue = value;
      this.toSearch();
      //阻止blur事件 也可以用@mousedown.prevent; mousedown的优先级高于blur
      // event.preventDefault();
    },
    deleteHistory(index, all) {
      if (all) this.history = [];
      else
        for (let i = 0; i < this.history.length; i++) {
          if (i == index) this.history.splice(i, 1);
        }
      // 防止点击x删除的时候，导致热搜榜消失，也可以通过.prevent修饰符
      event.preventDefault();
    },
    prevent() {
      event.preventDefault();
    },
    go(n) {
      this.$router.go(n);
    },
  },
};
</script>
<style scoped>
@import "../assets/common/tab.css";
#index-top {
  position: relative;
  display: flex;
  width: 100%;
  height: 70px;
  background-color: pink;
  box-shadow: 0px 0px 6px #b99ca6;
}
#index-top .title {
  cursor: pointer;
  font-size: 30px;
  line-height: 70px;
  font-weight: bold;
  margin: 0px 50px;
  letter-spacing: 0.3rem;
  color: #fff;
  text-shadow: 0px 0px 6px #b99ca6;
}
#index-top .index-top-search {
  position: absolute;
  right: 0;
  width: 380px;
  height: 15px;
  margin: 20px 100px 15px;
  padding: 10px;
  border: 1px solid pink;
  border-radius: 2px;
  font-size: 16px;
  color: palevioletred;
  box-shadow: 0px 0px 6px #b99ca6;
}
#index-top .index-top-search::-webkit-input-placeholder {
  font-size: 16px;
  color: rgb(240, 216, 220);
  font-style: italic;
}
.btns {
  margin-right: auto;
}
.btns i {
  color: #fff;
  border-radius: 50%;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 70px;
}
.btns i:hover path {
  fill: palevioletred;
}
.search-hot {
  width: 400px;
  height: 300px;
  /* border: 1px solid #333; */
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 65px;
  right: 100px;
  z-index: 1;
  padding: 10px 10px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.hot-title {
  margin: 10px 0;
  font-weight: bold;
}

.hot-item {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: default;
}

.hot-item:hover {
  background-color: seashell;
}

.hot-index {
  font-size: 20px;
  color: palevioletred;
  margin-right: 15px;
}

.hot-info {
  flex: 1;
  font-size: 12px;
  color: slategray;
}

.hot-top {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.hot-name {
  font-size: 16px;
  margin-right: 15px;
  color: #000;
}

.hot-icon {
  width: 30px;
  /* height: 15px; */
  margin-left: 5px;
}
.icon-lajitong::before {
  content: "";
}
.history-wrap {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.history-item {
  border: 1px solid #ddd;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 13px;
  display: inline-block;
  cursor: pointer;
  margin: 5px;
}

.history-item:hover {
  background-color: #f5f7fa;
}

.history-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn {
  cursor: pointer;
  opacity: 0;
}
</style>