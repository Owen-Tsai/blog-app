import Vue from 'vue'
import App from './App.vue'
import router from './lib/router'
import './lib/icons'
import './lib/image-viewer'

import './styles/all.scss'
import 'highlightjs/styles/tomorrow-night.css'

import Message from './lib/message'
import { globalSetup } from './lib/requests'
Vue.prototype.$msg = Message

globalSetup()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
