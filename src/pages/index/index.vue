<template>
  <div class="container">
    <div class="header">
      <h1 class="appName">智障招聘</h1>
      <div class="search-wrapper" :class="{focus : isFocus}">
        <i class="iconfont icon-suosou icon"></i>
        <input type="text" class="search" @blur="inputBlur" @focus="inputFocus"  v-model="searchText" @submit="search">
        <i class="desc" v-if="searchText.length <= 0">搜索公司/职位</i>
      </div>
    </div>
    <div class="tip" @click="go">
      <div class="tip-icon"></div>
      <div class="tip-text">
        <i class="iconfont icon-qian1"></i>
        <span>附近的高薪职位都在这, 涨薪36%噢~</span>
      </div>
    </div>
    <div class="list" @click="go(company.Number)" v-for="(company, index) in companys" :key="index">
      <list :company="company"></list>
    </div>
  </div>
</template>

<script>
  import list from '@/components/list/list.vue'
  import {request, ERR_OK} from '@/utils/api'

  export default {
    data () {
      return {
        companys: [],
        datas: [],
        isFocus: false,
        searchText: ''
      }
    },
    computed: {
    },
    components: {
      list
    },
    methods: {
      _getData () {
        let vm = this
        request('/home').then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.companys = data.Positions
            console.log(vm.companys)
          }
        })
      },
      go (id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        })
      },
      search () {
        console.log(77)
        if (this.searchText) {
          wx.navigateTo({
            url: '/pages/search/search'
          })
        }
      },
      inputFocus () {
        this.isFocus = true
      },
      inputBlur () {
        this.isFocus = false
        this.searchText = ''
      }
    },
    created () {
      this._getData()
    },
    onPullDownRefresh: function () { // 监听下拉刷新事件
      wx.showNavigationBarLoading()
      setTimeout(() => {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      }, 0)
    },
    onReachBottom: function () {
      console.log('加载')
    },
    onShow: function () {
      wx.startPullDownRefresh()
    }
  }
</script>

<style scoped lang="scss">
  .container{
    background: #f8f8fa;
  }
  .header{
    height: 110px;
    background: #f9db61;
    padding: 0 15px 10px 15px;
    box-sizing: border-box;
    .appName{
      font-size: 24px;
      font-weight: 700;
      font-style: italic;
    }
    .search-wrapper{
      height: 38px;
      background: #fff;
      border-radius: 30px;
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
      line-height: 38px;
      position: relative;
      overflow: hidden;
      &.focus{
        .icon{
          position: absolute;
          top: 0px;
          left: 10px;
        }
        .search{
          box-sizing: border-box;
          text-align: left;
          padding-left: 30px;
        }
        .desc{
          position: absolute;
          left: 30px;
          top: 0px;
        }
      }
      .icon{
        position: absolute;
        top: 0px;
        left: 35%;
        transition: all .3s;
        color: #b2b2b2;
      }
      .search{
        width: 100%;
        height: 100%;
      }
      .desc{
        position: absolute;
        left: 40%;
        top: 0px;
        font-size: 14px;
        color: #cccccc;
        transition: all .3s;
      }
    }
  }
  .tip{
    background: #092142;
    padding: 0 0 0 15px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    .tip-text{
      color: #fff;
      i{
        display: inline-block;
        color: #f9db61;
        font-size: 12px;
        padding-right: 10px;
      }
    }
  }
</style>
