import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: () => import('../views/main.vue')
  // },

  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main.vue')
  },
  {
    path: '/position',
    name: 'position',
    component: () => import('../views/position.vue')
  },
  {
    path: '/section_1',
    name: 'section_1',
    component: () => import('../views/section_1.vue')
  },
  {
    path: '/comp',
    name: 'comp',
    component: () => import('../views/comp.vue')
  },
  {
    path: '/auto',
    name: 'auto',
    component: () => import('../views/autoLayout.vue')
  },
  {
    path: '/grapheme',
    name: 'grapheme',
    component: () => import('../views/grapheme.vue')
  },
  {
    path: '/tooltip',
    name: 'tooltip',
    component: () => import('../views/toolTip/tooltip.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
