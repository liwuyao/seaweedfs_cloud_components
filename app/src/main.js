import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import './assets/icon/iconfont.css'
import './assets/_menu.css'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import Axios from './http/axios'
import router from './router/index.js'
import filter from './filter/index.js'

createApp(App).use(Axios).use(router).use(filter).use(ElementPlus).mount('#app')

