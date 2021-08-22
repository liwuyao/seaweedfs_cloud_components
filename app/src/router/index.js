import {createRouter,createWebHistory} from 'vue-router'
import DiskUsage from '../components/DiskUsage.vue'
import Error from '../components/error.vue'
import quota from '../components/quota/index.vue'
import reload from '../reload.vue'
const start_path = `ui/${localStorage.clusterId}`
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect:`/${localStorage.clusterId?start_path+localStorage.clusterId:'error'}`,
    },
    {
      path:'/reload',
      name:reload,
      component:reload
    },
    {
      path:`/${start_path}`,
      name:'DiskUsage',
      component:DiskUsage
    },
    {
      path:'/error',
      name:'Error',
      component:Error
    },
    {
      path:`/${start_path}/quota`,
      name:'quota',
      component:quota
    },
  ]
})
export default router