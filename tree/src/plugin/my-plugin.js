import axios from 'axios'
export default {
  install: (app, options) => {
    // Plugin code goes here
    app.config.globalProperties.$axios = axios
  }
}