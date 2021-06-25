import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import './assets/icon/iconfont.css'
import './assets/_menu.css'
import Axios from './http/axios'
import router from './router/index.js'
import filter from './filter/index.js'

createApp(App).use(Axios).use(router).use(filter).mount('#app')

