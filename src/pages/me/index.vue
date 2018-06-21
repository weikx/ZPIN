<template>
<div class="me">
  <!--<my-loading :type="2"></my-loading>-->
  <div class="item" @click="_toschedule">
    <div class="text">
      <i class="iconimg icon1"></i>
      <span>求职进展</span>
    </div>
      <i class="icon iconfont icon-jiantouxia"></i>
  </div>
  <div class="item">
    <div class="text">
      <i class="iconimg icon2"></i>
      <span>我的订单</span>
    </div>
      <i class="icon iconfont icon-jiantouxia"></i>
  </div>
  <div class="item">
    <div class="text">
      <i class="iconimg icon3"></i>
      <span>清除缓存</span>
    </div>
      <i class="icon iconfont icon-jiantouxia"></i>
  </div>
  <div class="item github" @click="copy">
    <span>GITHUB</span>
  </div>

  <div class="copyright">
    <h1>智障招聘</h1>
    <p>Copyright © 2016-2018 Weikexin.me</p>
  </div>
</div>
</template>

<script>
  import myLoading from '@/components/loading/loading'
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
      },
      _toschedule () {
        wx.navigateTo({
          url: `/pages/schedule/main`
        })
      }
    },
    components: {
      myLoading
    }
  }
</script>

<style scoped lang="scss">
.me{
  width: 100%;
  height: 100%;
  background-color: #f8f8fa;
  position: fixed;
  .item{
    line-height: 45px;
    background: #fff;
    display: flex;
    margin-top: 10px;
    padding: 0 14px 0 14px;
    font-size: 14px;
    position: relative;
    .text{
      flex: 1;
      i{
        display: inline-block;
        height: 17px;
        width: 15px;
        line-height: 45px;
        vertical-align: center;
      }
      span{
        margin-left: 25px;
      }
      .iconimg{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 13px;
        left: 15px;
      }
      .icon1{
        background-image: url("../../../static/images/jinzhan.png");
      }
      .icon2{
        background-image: url("../../../static/images/dingdan.png");
      }
      .icon3{
        background-image: url("../../../static/images/huancun.png");
      }
    }
    .icon{
      flex: 0 0 20px;
      font-size: 14px;
      color: #e1e1e1;
      transform:rotate(270deg);
    }
  }
  .github{
    margin-top: 50px;
    display: block;
    text-align: center;
    color: #e1e1e1;
  }
  .copyright{
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 25px;
    left: 0px;
    text-align: center;
    color: #f0f1f5;
    h1{
      font-size: 32px;
      font-style: italic;
    }
    p{
      font-size: 12px;
    }
  }
}
</style>
