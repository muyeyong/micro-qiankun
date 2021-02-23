import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
// eslint-disable-next-line no-underscore-dangle
const __qiankun__ = window.__POWERED_BY_QIANKUN__
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About, // () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
]
const router = createRouter({
    history: createWebHistory(__qiankun__ ? '/code' : '/'), // todo /code 需要主应用下发
    routes,
})
console.log('router', process.env.BASE_URL)
export default router
