import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    menu: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    menu: true
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: () => import(/* webpackChunkName: "recipe" */ '../views/RecipeView.vue'),
    menu: false
  }
]

const router = new VueRouter({
  routes
})

export default router
