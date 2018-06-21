import Vue from 'vue'
import App from './App'
import '../static/scss/iconfont.scss'
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进
    pages: ['^pages/index/main', 'pages/resume/main', 'pages/me/main', 'pages/detail/main'],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#f9db61',
      navigationBarTitleText: '',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#50370d',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: 'pages/index/main',
        text: '职位',
        iconPath: '/static/images/icon-home1.png',
        selectedIconPath: '/static/images/icon-home2.png'
      }, {
        pagePath: 'pages/resume/main',
        text: '简历',
        iconPath: '/static/images/icon-resume1.png',
        selectedIconPath: '/static/images/icon-resume2.png'
      }, {
        pagePath: 'pages/me/main',
        text: ' 我的',
        iconPath: '/static/images/icon-me1.png',
        selectedIconPath: '/static/images/icon-me2.png'
      }]
    }
  }
}
