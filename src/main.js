import { createApp } from 'vue'
import App from './App.vue'
import {router} from  './router/index.js'
import myPlugin from './plugin/my-plugin'
import ElementPlus from 'element-plus';
import './assets/scss/_menu.scss'
import './assets/icon/iconfont.css'
import './assets/scss/main.scss'
import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(router).use(myPlugin).use(ElementPlus).mount('#app')
