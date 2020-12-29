import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { sessionData } from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import(/* webpackChunkName: "article" */ '../views/Articles.vue')
  },
  {
    path: '/articles/:id',
    name: 'article-content',
    component: () => import(/* webpackChunkName: "story" */ '../views/Story.vue')
  },
  {
    path: '/works',
    name: 'works',
    component: () => import(/* webpackChunkName: "article" */ '../views/Works.vue')
  },
  {
    path: '/works/:id',
    name: 'works-content',
    component: () => import(/* webpackChunkName: "story" */ '../views/Work.vue')
  },
  {
    path: '/create-article',
    name: 'create-article',
    component: () => import(/* webpackChunkName: "create" */ '../views/CreateArticle.vue')
  },
  {
    path: '/create-works',
    name: 'create-works',
    component: () => import(/* webpackChunkName: "create" */ '../views/CreateWorks.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/admin/Login.vue')
  },
  {
    path: '/y',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Base.vue'),
    children: [
      {
        path: '',
        redirect: 'articles'
      },
      {
        path: 'articles',
        name: 'admin-article',
        component: () => import(/* webpackChunkName: "admin-article" */ '../views/admin/Articles.vue' )
      },
      {
        path: 'drafts',
        name: 'admin-draft',
        component: () => import(/* webpackChunkName: "admin-article" */ '../views/admin/Drafts.vue' )
      },
      {
        path: 'works',
        name: 'admin-work',
        component: () => import(/* webpackChunkName: "admin-article" */ '../views/admin/Works.vue' )
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/Error.vue')
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {
      return savedPosition
    } else if(to.hash) {
      window.location.href = to.hash;
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  if(to.path.includes('/y')) {
    // prevent unauthenticated users from routing to admin panel
    if(sessionData.auth === true || window.sessionStorage.getItem('owen_auth') === 'true') {
      next();
    } else {
      next({
        path: '/login',
        params: { callback: from.path }
      });
    }
  } else if(to.path === '/login' && from.path !== '/login') {
    // prevent authenticated users from revisit login page
    if (sessionData.auth === true || window.sessionStorage.getItem('owen_auth') === 'true') {
      next('/')
    } else {
      next()
    }
  } else if(to.path.includes('/create')) {
    // prevent unauthenticated users from entering posts/new and projects/new page
    if(sessionData.auth === true) {
      next()
    } else {
      next({
        path: '/login',
        params: { callback: from.path }
      })
    }
  } else {
    // other situations remain normal
    next()
  }
});

export default router
