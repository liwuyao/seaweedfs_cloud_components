import AppContainer from '../components/app-container.vue'
import globalConfig from '../../global.config'
export default {
  install: (app) => {
    app.component('AppContainer',AppContainer)
    app.config.globalProperties.$globalConfig = globalConfig
    // Plugin code goes here
  }
}