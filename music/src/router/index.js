import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Homecontent from '../views/Homecontent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    children:[
      {                                              // 首页
        path:'',
        name:'Homecontent',
        component:Homecontent
      },
      {                                                //  歌手
        path: '/singer',
        name: 'Singer',
        component: () => import('../views/Singer.vue')    // 按需加载
      },
      {                                                // 分类歌单
        path: '/songlist',
        name: 'Songlist',
        component: () => import('../views/Songlist.vue')
      },
      {                                               // 该功能未完善
        path: '/errs',
        name: 'Errs',
        component: () => import('../views/Errs.vue')    
      },
      {                                              // 排行榜
        path:'/tops',
        name:'Tops',
        component:() => import('../views/Tops.vue')
      },
      {                                              // 新碟
        path:'/album',
        name:'Album',
        component:() => import('../views/Album.vue')
      },
      {                                              // MV
        path:'/mv',
        name:'Mv',
        component:() => import('../views/Mv.vue')
      },
      {                                              // 歌单详情
        path:'/songlistdetail',
        name:'Songlistdetail',
        component:() => import('../views/Songlistdetail.vue')
      },
      {
        path:'/singerdetail',                         // 歌手详情
        name:'Singerdetail',
        component:() => import('../views/Singerdetail.vue')
      },
      {
        path:'/albumdetail',                         // 专辑详情(新碟详情)
        name:'Albumdetail',
        component:() => import('../views/Albumdetail.vue')
      },
      {
        path:'/songdetail',                         // 歌曲详情
        name:'Songdetail',
        component:() => import('../views/Songdetail.vue')
      },
      {
        path:'/mvdetail',
        name:'Mvdetail',
        component:() => import('../views/Mvdetail.vue')
      },
      {
        path:'/plays',
        name:'Plays',
        component:() => import('../views/Plays.vue')
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
