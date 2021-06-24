import {createRouter,createWebHashHistory} from 'vue-router'
import frame from '../layout/frame.vue'
import index from '../page/index.vue'
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes:[
    {
      path:'/',
      name:'frame',
      component:frame,
      redirect:'/index',
      children:[
        {
          path:'/index',
          name:'index',
          component:index
        }
      ]
    },
  ]
})
