<template>
    <div class="detail">
      <div class="loading">
        <my-loading :type="2" v-if="!data"></my-loading>
      </div>
      <div v-if="data">
        <div class="tab">
          <div class="tab-item" @click="check(1)">
            <span :class="{checked: checkNum == 1}">职位详情</span>
          </div>
          <div class="tab-item" @click="check(2)">
            <span :class="{checked: checkNum == 2}">公司详情</span>
          </div>
        </div>
        <div class="job-detail" v-if="checkNum == 1">
          <div class="card" v-if="data.PositionDetail">
            <div class="job">
              <p>{{data.PositionDetail.Name}}</p>
              <span>{{data.PositionDetail.Salary65}}</span>
            </div>
            <div class="company">
              {{data.PositionDetail.CompanyName}}
            </div>
            <div class="requirement">
              <p v-if="data.PositionDetail.WorkingExp">
                <i class="iconfont icon-gongzuo"></i>
                <span>{{data.PositionDetail.WorkingExp}}</span>
              </p>
              <p v-if="data.PositionDetail.Education">
                <i class="iconfont icon-xueli1"></i>
                <span>{{data.PositionDetail.Education}}</span>
              </p>
              <p v-if="data.PositionDetail.workType">
                <i class="iconfont icon-jianzhizhongdiangong"></i>
                <span>{{data.PositionDetail.workType}}</span>
              </p>
            </div>
            <div class="welfare">
              <p v-for="(item, index) in data.PositionDetail.WelfareTab" :key="index">{{item.value}}</p>
            </div>
            <div class="location">
              <p>
                <i class="iconfont icon-dengpao"></i>
                <span>{{data.PositionDetail.WorkAddress}}</span>
              </p>
            </div>
          </div>
          <div class="card card2">
            <div class="jobDesc">
              <div class="line"></div>
              <p>职位描述</p>
            </div>
            <div class="descText" v-html="data.PositionDetail.Description">
            </div>
            <div class="tip">
              <i class="iconfont icon-tishi"></i>
              <span>提醒: 向应聘者收取任何费用都属违法行为, 请提高警惕!</span>
            </div>
          </div>
          <div class="likeJob">
            /相似职位/
          </div>
          <div class="list-wraper" @click="go(company.Number)"  v-for="(company, index) in  similar.Positions" :key="index">
            <lists :company="company"></lists>
          </div>
          <div class="delivery">
            <div class="btn" @click="delivery">
              投递简历
            </div>
          </div>
        </div>
        <div class="company-detail" v-if="checkNum == 2">
          <div class="card">
            <div class="job">
              <p>{{data.CompanyDetail.Name}}</p>
            </div>
            <div class="company">
              <i class="iconfont icon-jiyinpailie"></i>
              <span>{{data.CompanyDetail.Industry}}</span>
            </div>
            <div class="company">
              <i class="iconfont icon-biaoqian"></i>
              <span> 民营</span>
            </div>
            <div class="company">
              <i class="iconfont icon-ren"></i>
              <span>{{data.CompanyDetail.CompanySize}}</span>
            </div>
          </div>
          <div class="card card2">
            <div class="jobDesc">
              <div class="line"></div>
              <p>公司介绍</p>
            </div>
            <div class="descText" v-html="data.CompanyDetail.Description">
              <p>&nbsp;</p>
            </div>
          </div>
          <div class="likeJob">
            /他们还在招☕️/
          </div>
          <div class="list-wraper" @click="go(company.Number)" v-for="(company, index) in  data.OtherPositions" :key="index">
            <lists :company="company" :thisCompany="true"></lists>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import lists from '@/components/list/list'
  import myLoading from '@/components/loading/loading'
  import {request, ERR_OK} from '@/utils/api'

  export default {
    data () {
      return {
        checkNum: 1,
        data: [],
        similar: []
      }
    },
    methods: {
      check (num) {
        this.checkNum = num
        num === 1 ? wx.setNavigationBarTitle({title: this.data.PositionDetail.Name}) : wx.setNavigationBarTitle({title: this.data.CompanyDetail.Name})
      },
      delivery () {
        wx.showToast({
          title: '假装已投递~'
        })
      },
      _getDetail () {
        wx.showNavigationBarLoading()
        let previousData = this.$root.$mp.query
        let vm = this
        request(`/detail/${previousData.id}`).then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.data = data
            wx.hideNavigationBarLoading()
            wx.setNavigationBarTitle({
              title: data.PositionDetail.Name
            })
          } else {
            wx.showToast({
              title: ' 服务器挂咯~',
              icon: 'none'
            })
            setTimeout(() => {
              wx.showToast({
                title: ' 原因见首页广告~',
                icon: 'none'
              })
            }, 1000)
          }
        })
      },
      _getSimilar () {
        let vm = this
        request('/similar').then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.similar = data
            console.log(vm.data)
          }
        })
      },
      go (id) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${id}`
        })
      }
    },
    onShow: function () {
      this.checkNum = 1
      this.data = null // data 默认设为空 因为小程序进入页面的时候会缓存上一次的数据
      this._getSimilar()
      this._getDetail()
    },
    components: {
      lists,
      myLoading
    }
  }
</script>

<style scoped lang="scss">
.detail{
  background: #f8f8fa;
  .tab{
    width: 100%;
    height: 40px;
    background: #fff;
    line-height: 40px;
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    display: flex;
    position: fixed;
    top: 0px;
    .tab-item{
      flex: 1;
      .checked{
        border-bottom: 2px solid #f9db61;
        padding-bottom:9px;
      }
    }
  }
  .card{
    background: #fff;
    font-size: 14px;
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    color: #5f5f5f;
    margin-top: 40px;
    border-top: 15px solid #f8f8fa;
    .job{
      display: flex;
      p{
        flex: 1;
        font-size: 16px;
        font-weight: 700;
        line-height: 35px;
      }
      span{
        flex: 0 0 100px;
        text-align: right;
        line-height: 35px;
        color: #e96765;
        font-size: 16px;
        font-weight: 700;
      }
    }
    .company{
      font-size: 14px;
      line-height: 30px;
      i{
        display: inline-block;
        font-size: 12px;
        color: #f9db61;
        padding-right: 10px;
      }
    }
    .requirement{
      line-height: 30px;
      p{
        display: inline-block;
        margin-right: 15px;
        i{
          font-size: 12px;
          display: inline-block;
          padding-right: 5px;
          font-weight: 700;
          color: #fbde60;
        }
      }
    }
    .welfare{
      line-height: 30px;
      p{
        box-sizing: border-box;
        display: inline-block;
        padding: 0 8px 0 8px;
        margin-right: 10px;
        margin-top: 10px;
        background: #f4f4f4;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        color: #b4b2a5;
      }
    }
    .location{
      border-top: 1px solid #f3f3f3;
      margin-top: 30px;
      p{
        line-height: 50px;
        i{
          display: inline-block;
          color: #fbde60;
          padding-right: 5px;
        }
      }
    }
  }
  .card2{
    margin-top: 13px;
    .jobDesc{
      font-size: 16px;
      font-weight: 700;
      line-height: 40px;
      overflow: hidden;
      .line{
        width: 2px;
        background: #f9db61;
        display: inline-block;
        height: 20px;
        margin-top: 5px;
        margin-right: 10px;
      }
      p{
        display: inline-block;
      }
    }
    .tip{
      margin-top: 20px;
      font-size: 12px;
      line-height: 30px;
      i{
        color: #f9db61;
        display: inline-block;
        padding-right: 5px;
      }
    }
  }
  .likeJob{
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    color: #999;
  }
  .delivery{
    width: 100%;
    height: 70px;
    background: rgba(255, 255, 255, .9);
    position: fixed;
    bottom: 0px;
    .btn{
      line-height: 50px;
      text-align: center;
      background: #f9db61;
      border-radius: 5px;
      width: 90%;
      text-align: center;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
  .list-wraper{
    margin-top: 1px;
  }
  .loading{
    position: fixed;
    top: 0px;
    left: 0px;
  }
}
</style>
