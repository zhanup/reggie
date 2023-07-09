import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'

Vue.use(VueRouter)

//修改原型对象中的push方法，解决vue路由重复导航错误
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/member',
    children: [
      {
        path: 'member',
        component: () => import('@/views/member'),
      },
      {
        path: 'member/op',
        component: () => import('@/views/member/op'),
      },
      {
        path: 'category',
        component: () => import('@/views/category'),
      },
      {
        path: 'food',
        component: () => import('@/views/food'),
      },
      {
        path: 'food/op',
        component: () => import('@/views/food/op'),
      },
      {
        path: 'combo',
        component: () => import('@/views/combo'),
      },
      {
        path: 'combo/op',
        component: () => import('@/views/combo/op'),
      },
      {
        path: 'order',
        component: () => import('@/views/order'),
      },
    ],
  },
  {
    path: '/login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router
