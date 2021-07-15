import {createRouter,createWebHistory} from 'vue-router'
import DiskUsage from '../components/DiskUsage.vue'
import Error from '../components/error.vue'
const start_path = 'ui/'
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect:`/${localStorage.clusterId?start_path+localStorage.clusterId:'error'}`,
    },
    {
      path:`/${start_path}${localStorage.clusterId}`,
      name:'DiskUsage',
      component:DiskUsage
    },
    {
      path:'/error',
      name:'Error',
      component:Error
    }
  ]
})
export default router