<template>
  <div class="search-wrapper">
    <div class="header">
      <div class="search">
        <i class="iconfont icon-suosou"></i>
        <input type="text" placeholder="搜索职位名" v-model="searchText">
      </div>
    </div>
    <div class="option" @click="show">
      <div class="option-item">
        <span>工作地点 </span>
        <i class="iconfont icon-jiantouxia"></i>
      </div>
      <div class="option-item">
        <span>月薪范围 </span>
        <i class="iconfont icon-jiantouxia"></i>
      </div>
      <div class="option-item">
        <span>更多条件 </span>
        <i class="iconfont icon-jiantouxia"></i>
      </div>
    </div>
    <div class="tip"  @click="show">
      <i class="iconfont  icon-msnui-link"></i>
      <span>你是在搜索公司吗? 戳我戳我</span>
    </div>
    <div class="list-wrapper" @click="go(company.Number)" v-for="(company, index) in companys" :key="index">
      <lists :company="company"></lists>
    </div>

  </div>

</template>

<script>
  import lists from '@/components/list/list.vue'
  import {request, ERR_OK} from '@/utils/api'
  export default {
    data () {
      return {
        searchText: '',
        companys: []
      }
    },
    methods: {
      show () {
        wx.showToast({
          title: '开发中~',
          icon: 'none'
        })
      },
      _getData () {
        let vm = this
        request('/home').then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.companys = data.Positions
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
            wx.setNavigationBarTitle({
              title: `相关职位(${data.Positions.length})`
            })
          }
        })
      },
      go (id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        })
      }
    },
    onShow () {
      let previousData = this.$root.$mp.query
      this.searchText = previousData.text
      wx.startPullDownRefresh()
      this._getData()
    },
    onPullDownRefresh: function () { // 监听下拉刷新事件
      wx.showNavigationBarLoading()
      this._getData()
    },
    components: {
      lists
    }
  }
</script>

<style scoped lang="scss">
  .search-wrapper{
    background: #f8f8fa;
    .header{
      width: 100%;
      height: 60px;
      background: #f9db61;
      overflow: hidden;
      .search{
        width: 90%;
        height: 38px;
        margin: 0 auto;
        background: #fff;
        border-radius: 30px;
        margin-top: 10px;
        font-size: 14px;
        text-align: left;
        line-height: 38px;
        position: relative;
        overflow: hidden;
        position: relative;
        .iconfont{
          display: inline-block;
          position: absolute;
          left: 10px;
          font-size: 12px;
        }
        input{
          width: 100%;
          height: 100%;
          padding-left: 30px;
        }
      }
    }
    .option{
      display: flex;
      background: #fff;
      font-size: 14px;
      .option-item{
        flex: 1;
        text-align: center;
        line-height: 40px;
        .iconfont{
          font-size: 14px;
          color: #f9db61;
          display: inline-block;
          line-height: 40px;
        }
      }
    }
    .tip{
      margin-top: 10px;
      line-height: 35px;
      text-align: center;
      background: #fff;
      font-size: 12px;
      .iconfont{
        display: inline-block;
        color: #f9db61;
        font-size: 12px;
        padding-right: 5px;
      }
    }
    .list-wrapper{
      margin-top: 10px;
    }
  }
</style>
