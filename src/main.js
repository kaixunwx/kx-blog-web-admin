import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './router/index'

Vue.config.productionTip = false

// element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 自定义css样式
import './assets/styles/index.scss'

// svg-icon
import './assets/icons' // icon

// markdown mavon-editor
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(MavonEditor)

// echarts
import 'echarts-gl'


Vue.use(Element)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
