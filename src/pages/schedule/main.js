import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    navigationBarTitleText: '求职进展',
    enablePullDownRefresh: true,
    backgroundColor: '#f8f8fa'
  }
}
