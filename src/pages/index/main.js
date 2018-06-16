import Vue from 'vue'
import App from './index'
const app = new Vue(App)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true,
    backgroundColor: '#f9db61'
  }
}
