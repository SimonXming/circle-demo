import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ScmList from '@/components/ScmList'
import ScmRepoRemote from '@/components/ScmRepoRemote'
import ScmRepoDetail from '@/components/ScmRepoDetail'
import BuildDetail from '@/components/BuildDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/scm',
      name: 'ScmList',
      component: ScmList
    },
    {
      path: '/scm/:id/remote',
      name: 'ScmRepoRemote',
      component: ScmRepoRemote
    },
    {
      path: '/scm/:id/repo/:repoID',
      name: 'ScmRepoDetail',
      component: ScmRepoDetail
    },
    {
      path: '/scm/:id/repo/:repoID/build/:num',
      name: 'BuildDetail',
      component: BuildDetail
    }
  ]
})
