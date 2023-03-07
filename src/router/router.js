// 导入
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用
Vue.use(VueRouter)

// 解决重复点击导航时，控制台出现报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// 导入需要通过路由管理的组件
import findmusic from '../views/FindMusic.vue'
import playlists from '../views/PlayLists.vue'
import newsongs from '../views/NewSongs.vue'
import newmvs from '../views/NewMvs.vue'
import searchresult from '../views/SearchResult.vue'
import playlistdetail from '../views/PlaylistDetail.vue'
import mvdetail from '../views/MvDetail.vue'
// 配置地址和组件对应关系
const routes = [
  {
    // 地址
    path: "/",
    // 组件
    redirect: '/findmusic'
  }, {
    path: "/findmusic",
    component: findmusic,
    meta: {
      keepAlive: true
    }
  }, {
    path: "/playlists",
    component: playlists,
    meta: {
      keepAlive: true
    }
  }, {
    path: "/newsongs",
    component: newsongs,
    meta: {
      keepAlive: true
    }
  }, {
    path: "/newmvs",
    component: newmvs,
    meta: {
      keepAlive: true
    }
  }, {
    path: "/searchresult",
    component: searchresult,
    meta: {
      keepAlive: true
    }
  }, {
    path: "/playlistdetail",
    component: playlistdetail,
    meta: {
      keepAlive: true
    }
  }, {
    path: "/mvdetail",
    component: mvdetail,
    meta: {
      keepAlive: true
    }
  }

]
// 创建路由
const router = new VueRouter({
  routes,
})
export default router