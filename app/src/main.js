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

const url = window.location.href
let pathArr = url.split('/')
let id = pathArr.filter((item)=>item.length === 12)[0]
let rule = /^[A-Za-z0-9]+$/
if(id && rule.test(id)){
    localStorage.clusterId = id
}
createApp(App).use(Axios).use(router).use(filter).use(ElementPlus).mount('#app')

