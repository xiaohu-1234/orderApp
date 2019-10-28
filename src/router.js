import Vue from 'vue'
import Router from 'vue-router';
import Goods from './views/Goods';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component: Goods
    },
    {
      path: '/evaluate',
      name: 'evaluate',
      component: () => import('./views/Evaluate')
    }
    ,
    {
      path: '/business',
      name: 'business',
      component: () => import('./views/Business')
    }
  ]
})
