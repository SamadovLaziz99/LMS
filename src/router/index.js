import Vue from 'vue';
import VueRouter from 'vue-router';
import { routes } from "@/router/routers";
import whiteList from "@/router/whiteList";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const token = localStorage.getItem('token');

router.beforeEach((to, from, next) => {
  if(whiteList.includes(to.name)) {
    if(token) {
      next('/');
    } else next();
  } else {
    if(token) {
      next();
    } else {
      next('/login');
    }
  }
});

export default router;