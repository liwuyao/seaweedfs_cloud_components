import {createRouter,createWebHistory} from 'vue-router'
import DiskUsage from '../components/DiskUsage.vue'
import Error from '../components/error.vue'
const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:'/',
      redirect:`/${localStorage.clusterId?'cluster/'+localStorage.clusterId:'error'}`,
    },
    {
      path:`/cluster/${localStorage.clusterId}`,
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