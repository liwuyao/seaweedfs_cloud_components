import { createApp } from 'vue'
import App from './App.vue'
import './assets/icon/iconfont.css'
import './assets/_menu.css'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/global.css'
import Axios from './http/axios'
import axios from 'axios'
import router from './router/index.js'
import filter from './filter/index.js'
import Plugin from './plugin/index.js'
import {login_dialog_state} from './communication'
axios.interceptors.request.use((config) => {
    config.headers['Authorization'] = localStorage.token
    return config
    }, (error) => {
    return Promise.reject(error);
})
axios.interceptors.response.use((response) => {
    return response

  }, (error) => {
    if(error.response.data){
        if(error.response.data.code === -1){
            localStorage.removeItem('token')
            console.log('token error')
            login_dialog_state.value = true
        }
    }
    return Promise.reject(error);
  })
const url = window.location.href
let pathArr = url.split('/')
let id = pathArr.filter((item)=>item.length === 12)[0]
let rule = /^[A-Za-z0-9]+$/
if(id && rule.test(id)){
    localStorage.clusterId = id
}
createApp(App).use(Axios).use(router).use(filter).use(ElementPlus).use(Plugin).mount('#app')

