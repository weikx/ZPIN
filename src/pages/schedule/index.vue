<template>
<div class="schedule">
  <div class="item" v-if="data" v-for="(item, index) in data" :key="index" @click="go(item.jobNumber)">
    <div class="logo" v-if="item.company.logoUrl">
      <img :src="item.company.logoUrl" alt="">
    </div>
    <div class="logo" v-else>
      <span>{{logoText}}</span>
    </div>
    <div class="content">
      <p>{{item.company.name}}</p>
      <span>{{item.jobStatus.statusDesc}}</span>
    </div>
    <div class="time">
      {{item.time}}
    </div>
  </div>
</div>
</template>

<script>
  import {request, ERR_OK} from '@/utils/api'
export default {
    data () {
      return {
        data: null
      }
    },
    methods: {
      _getData () {
        let vm = this
        vm.data = null
        request('/schedule').then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.data = data.data.data
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
          }
        })
      },
      go (id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        })
      }
    },
    computed: {
      logoText () {
        return '智'
      }
    },
    onPullDownRefresh: function () { // 监听下拉刷新事件
      wx.showNavigationBarLoading()
      this._getData()
    },
    onShow () {
      wx.startPullDownRefresh()
      console.log(6)
    }
  }
</script>

<style scoped lang="scss">
.schedule{
  .item{
    background: #fff;
    padding: 15px 0 0 5px;
    box-sizing: border-box;
    display: flex;
    font-size: 14px;
    .logo{
      flex: 0 0 50px;
      height: 50px;
      padding: 5px;
      box-sizing: border-box;
      margin-right: 10px;
      border-radius: 50%;
      border: 1px solid #f7f7f7;
      overflow: hidden;
      text-align: center;
      img{
        width: 100%;
        height: 100%;
      }
      span{
        font-size: 28px;
      }
    }
    .content{
      flex: 1;
      line-height: 22px;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      p{
        font-size: 14px;
      }
      span{
        font-size: 12px;
        color: #999990;
      }
    }
    .time {
      flex: 0 0 50px;
      text-align: right;
      border-bottom: 1px solid #f7f7f7;
      font-size: 12px;
      color: #999999;
      padding-right: 15px;
    }
  }
}
</style>
