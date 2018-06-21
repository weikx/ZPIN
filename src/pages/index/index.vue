<template>
  <div class="container">
    <div class="header">
      <h1 class="appName">智障招聘</h1>
      <div class="search-wrapper" :class="{focus : isFocus}">
        <i class="iconfont icon-suosou icon"></i>
        <input type="text" class="search" @blur="inputBlur" @focus="inputFocus"  v-model="searchText" confirm-type="search" @confirm="search">
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
    <div class="list" v-for="(company, index) in companys" :key="index">
      <div v-if="index == 2" class="advertisement" @click="advertisement">
        <div class="top">
          <p> 简历没人看? 不会写? <span><i class="iconfont icon-remen"></i>Hot</span></p>
          <span> 升职加薪</span>
        </div>
        <div class="center">
          <p># 被查看率Up<span></span> #获面试几率Up<span></span> </p>
        </div>
        <div class="bottom">
          <div class="p">
            <div class="avatar">
              <open-data type="userAvatarUrl"></open-data>
            </div>
            <span> <open-data type="userNickName"></open-data>大佬强力推荐</span>
          </div>
          <span>17.6W查看</span>
        </div>
      </div>
      <div @click="go(company.Number)" >
        <lists :company="company"></lists>
      </div>
    </div>
    <div class="more" @click="more" v-if="companys">
      <p> 附近职位看不够? </p>
      <span> 点我看个够</span>
    </div>
  </div>
</template>
<script>
  import lists from '@/components/list/list.vue'
  import {request, ERR_OK} from '@/utils/api'
  export default {
    data () {
      return {
        companys: null,
        isFocus: false,
        searchText: '',
        showPrompt: false
      }
    },
    computed: {
    },
    components: {
      lists
    },
    methods: {
      _getData () {
        let vm = this
        vm.companys = null
        request('/home').then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.companys = data.Positions
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
          }
        })
      },
      go (id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        })
      },
      advertisement () {
        wx.navigateTo({
          url: '/pages/advertisement/main'
        })
      },
      more () {
        wx.navigateTo({
          url: `/pages/search/main`
        })
      },
      search () {
        let text = this.searchText
        if (text) {
          wx.navigateTo({
            url: `/pages/search/main?text=${text}`
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
    onPullDownRefresh: function () { // 监听下拉刷新事件
      wx.showNavigationBarLoading()
      this._getData()
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
    .list{
      margin-top: 10px;
    }
    .more{
      line-height: 50px;
      text-align: center;
      font-size: 12px;
      p{
        display: inline-block;

      }
      span{
        display: inline-block;
        color: #f9db61;
      }
    }
    .advertisement{
      background: #fff;
      margin-bottom: 10px;
      padding: 12px;
      box-sizing: border-box;
      .top{
        display: flex;
        line-height: 33.3px;
        font-size: 16px;
        font-weight: 700;
        p{
          flex: 1;
          color: #282828;
          span{
            width: 30px;
            height: 10px;
            background: #f9db61;
            border-radius: 3px;
            font-size: 12px;
            padding: 0 4px 0 4px;
            color: #4b3911;
            i{
              display: inline-block;
              font-size: 12px;
            }
          }
        }
        span{
          flex: 0 0 80px;
          color: #ec675d;
          text-align: right;
        }
      }
      .center,.bottom{
        font-size: 12px;
        color: #666666;
      }
      .center{
        line-height: 22px;
        p{
          span{
            width: 10px;
            height: 10px;
            display: inline-block;
            background-image: url("../../../static/images/up.png");
            background-size: 100% 100%;
          }
        }
      }
      .bottom{
        display: flex;
        line-height: 43.6px;
        .p{
          flex: 1;
          overflow: hidden;
          line-height: 43.6px;
          position: relative;
          .avatar{
            width: 20px;
            height: 20px;
            display: inline-block;
            vertical-align: top;
            border: 1px solid #f8f8fa;
            position: absolute;
            top: 10px;
            border-radius: 50%;
            overflow: hidden;
            open-data{
              width: 100%;
              height: 100%;
            }
          }
          span{
            padding-left: 26px;
          }
        }
        span{
          flex: 0 0 80px;
          text-align: right;
        }
      }
    }
  }
</style>
