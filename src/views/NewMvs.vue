<template>
  <!-- 最新MV -->
  <div class="new-mvs">
    <div class="filter-wrap">
      <div class="section-wrap">
        <span class="section-name">地区：</span>
        <ul class="section-tabs">
          <li>
            <span :class="{ active: area == '全部' }" @click="area = '全部'"
              >全部</span
            >
          </li>
          <li>
            <span :class="{ active: area == '内地' }" @click="area = '内地'"
              >内地</span
            >
          </li>
          <li>
            <span :class="{ active: area == '港台' }" @click="area = '港台'"
              >港台</span
            >
          </li>
          <li>
            <span :class="{ active: area == '欧美' }" @click="area = '欧美'"
              >欧美</span
            >
          </li>
          <li>
            <span :class="{ active: area == '日本' }" @click="area = '日本'"
              >日本</span
            >
          </li>
          <li>
            <span :class="{ active: area == '韩国' }" @click="area = '韩国'"
              >韩国</span
            >
          </li>
        </ul>
      </div>

      <div class="section-wrap">
        <span class="section-name">类型：</span>
        <ul class="section-tabs">
          <li>
            <span :class="{ active: type == '全部' }" @click="type = '全部'"
              >全部</span
            >
          </li>
          <li>
            <span :class="{ active: type == '官方版' }" @click="type = '官方版'"
              >官方版</span
            >
          </li>
          <li>
            <span :class="{ active: type == '原声' }" @click="type = '原声'"
              >原声</span
            >
          </li>
          <li>
            <span :class="{ active: type == '现场版' }" @click="type = '现场版'"
              >现场版</span
            >
          </li>
          <li>
            <span
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
              >网易出品</span
            >
          </li>
        </ul>
      </div>
      <div class="section-wrap">
        <span class="section-name">排序：</span>
        <ul class="section-tabs">
          <li>
            <span
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
              >上升最快</span
            >
          </li>
          <li>
            <span :class="{ active: order == '最热' }" @click="order = '最热'"
              >最热</span
            >
          </li>
          <li>
            <span :class="{ active: order == '最新' }" @click="order = '最新'"
              >最新</span
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="mv-wrap">
      <ul class="mv-list">
        <li
          v-for="(item, index) in mvLists"
          :key="index"
          @click="toMvdetail(item.id)"
        >
          <div class="mv-img-wrap">
            <img :src="item.cover" alt="newMvs" />
            <p class="iconfont icon-play play"></p>
            <p class="play-count iconfont icon-play">{{ item.playCount }}</p>
          </div>
          <div class="mv-info">
            <p class="title">{{ item.name }}</p>
            <p class="author">{{ item.artistName }}</p>
          </div>
        </li>
      </ul>

      <el-pagination
        class="page-list"
        @current-change="handleCurrentChange"
        :page-size="12"
        :current-page="page"
        layout="prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NewMvs",
  data() {
    return {
      area: "全部",
      type: "全部",
      order: "上升最快",
      mvLists: [],
      page: 1,
      // 总条数
      total: 0,
    };
  },
  created() {
    this.mvlistData();
  },
  methods: {
    mvlistData() {
      axios({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          limit: 12,
          type: this.type,
          order: this.order,
          area: this.area,
          offset: (this.page - 1) * 12,
        },
      }).then((res) => {
        this.mvLists = res.data.data;
        // 接口问题
        if (res.data.count) {
          this.total = res.data.count;
        }
        // 处理次数
        for (let i = 0; i < this.mvLists.length; i++) {
          if (this.mvLists[i].playCount > 100000) {
            this.mvLists[i].playCount =
              parseInt(this.mvLists[i].playCount / 10000) + "w";
          }
        }
      });
    },
    // 页码发生了改变
    handleCurrentChange(val) {
      console.log(`当前页:${val}`);
      this.page = val;
      // 重新获取数据
      this.mvlistData();
    },
    toMvdetail(id) {
      this.$router.push(`/mvdetail?q=${id}`);
    },
  },
  // 侦听器
  watch: {
    area() {
      // 获取数据
      this.mvlistData();
      this.page = 1;
    },
    type() {
      this.mvlistData();
      this.page = 1;
    },
    order() {
      this.mvlistData();
      this.page = 1;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
}
.new-mvs {
  z-index: 12;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px;
}
.section-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.section-tabs {
  display: flex;
  color: grey;
}

.section-tabs li:not(:last-of-type) {
  border-right: 1px solid #f2f2f1;
}

.section-tabs li span {
  margin: 20px;
  padding: 5px 20px;
  cursor: pointer;
  box-sizing: border-box;
}

.section-tabs .active {
  color: #f199a4;
  background-color: #fcf5fa;
  border-radius: 20px;
}
.mv-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mv-list li {
  /* width: 250px;
      margin-right: 25px;
      margin-bottom: 30px; */
  width: 23%;
  margin-bottom: 20px;
  margin-right: 20px;
}
.mv-wrap {
  margin-bottom: 200px;
  overflow: auto;
}

.mv-img-wrap {
  position: relative;
  cursor: pointer;
}

.mv-img-wrap img {
  width: 100%;
  height: 100%;
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
  text-shadow: 0 0 2px rgb(0, 0, 0);
}

.play-count::before {
  margin-right: 5px;
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