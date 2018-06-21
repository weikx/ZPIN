<template>
 <div class="advertisement">
   <h1>这是一页广告</h1>
   <div style="margin-top: 20px"></div>
   <p> 这是一个使用 mpvue 框架, 模仿智联招聘写的小程序.</p>
   <p> 使用 easy-mock 模拟后台数据.</p>
   <p @click="copy"> 项目已开源, 欢迎 star~ (地址点这)</p>
   <div style="margin-top: 20px"></div>
   <p>一些页面提示"服务器挂了": <br/>因为我只模拟了几家公司的数据,所以有些公司数据不存在 就会提示这个了;</p>
 </div>
</template>

<script>
  export default {
    methods: {
      copy () {
        wx.setClipboardData({
          data: 'https://github.com/weikx/ZPIN',
          success: function (res) {
            wx.showToast({
              title: '项目地址已复制'
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .advertisement{
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;
    color: #999;
    h1{
      font-size: 18px;
      text-align: center;
      color: #000;
    }
    ul{
      li{
        list-style: disc;
      }
    }
  }
</style>
