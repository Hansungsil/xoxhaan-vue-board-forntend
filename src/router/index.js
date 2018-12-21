import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import IndexForm from '@/components/indexForm'
import Login from '@/components/Login/login'
import Join from '@/components/Join/join'
import BoardForm from '@/components/Board/boardForm'
import BoardList from '@/components/Board/board'
import BoardWrite from '@/components/Board/write'
import BoardPost from '@/components/Board/post'
import BoardUpdate from '@/components/Board/update'

Vue.use(Router)

const requireAuth = (to, from, next) => {
  let cookieUid = Vue.cookie.get('uid')
  if (cookieUid) return next()
  next({
    path: '/login',
    query: {redirect: to.fullPath}
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/indexForm',
      component: IndexForm,
      children: [
        {
          path: '/login',
          component: Login
        },
        {
          path: '/logout',
          beforeEnter (to, from, next) {
            next('/')
          }
        },
        {
          path: '/join',
          component: Join
        },
        {
          path: '/board',
          component: BoardForm,
          children: [
            {
              path: 'list',
              component: BoardList
            },
            {
              path: 'write',
              component: BoardWrite,
              beforeEnter: requireAuth
            },
            {
              path: ':id',
              name: 'boardPost',
              component: BoardPost
            },
            {
              path: ':id/update',
              name: 'boardUpdate',
              component: BoardUpdate
            }
          ]
        }
      ]
    }
  ]
})
