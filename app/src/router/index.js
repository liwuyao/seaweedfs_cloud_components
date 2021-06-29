import {createRouter,createWebHashHistory} from 'vue-router'
import DiskUsage from '../components/DiskUsage.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes:[
    {
      path:'/',
      name:'DiskUsage',
      component:DiskUsage
    }
  ]
})
export default router