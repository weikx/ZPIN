<template>
<div class="resume">
  <my-loading type="2" v-if="!data"></my-loading>
  <div v-if="data" style="background: #fff">
    <div class="information">
      <h1 class="name">{{data.Name}}
        <i class="iconfont bi" @click="_showTip"></i>
      </h1>
      <div class="desc">
        {{data.sex}} / {{data.age}} / {{data.city}} / {{data.WorkYears}}年
      </div>
      <div class="phone">
        <i class="iconfont shouji"></i>
        <span>{{data.phone}}</span>
      </div>
      <div class="mail">
        <i class="iconfont youxiang"></i>
        <span>{{data.mail}}</span>
      </div>
    </div>
    <div class="intention">
      <i class="iconfont bi" @click="_showTip"></i>
      <h1>求职意向</h1>
      <div class="desc">{{data.requirement.work}}</div>
      <div class="desc">{{data.requirement.city}} / {{data.requirement.emplType}} / {{data.requirement.wages}}元/月</div>
    </div>
    <div class="experience">
      <i class="iconfont bi" @click="_showTip"></i>
      <h1>工作经历</h1>
      <div v-for="(item, index) in data.WorkExperiences" :key="index">
        <div class="desc">{{item.JobName}}</div>
        <div class="desc">{{item.CompanyName}}   {{item.wages}}元/月</div>
        <div class="desc">{{item.Date}}</div>
        <p> 工作内容:</p>
        <div class="desc">{{item.Responsibility}}</div>
      </div>
      <div class="addJob" @click="_showTip">
        <i class="iconfont plus"></i>
        <span>添加工作经历</span>
      </div>
    </div>
    <div class="education">
      <i class="iconfont bi" @click="_showTip"></i>
      <h1>教育经历</h1>
      <div v-for="(item, index) in data.EducationExperiences" :key="index">
        <div class="desc">{{item.SchoolName}}</div>
        <div class="desc">{{item.Degree}}/{{item.MajorName}}</div>
        <div class="desc">{{item.Date}}毕业</div>
      </div>
      <div class="addJob" @click="_showTip">
        <i class="iconfont plus"></i>
        <span>添加教育经历</span>
      </div>
    </div>
    <div class="tip">/更多简历信息请前往智障招聘网站填写/</div>
    <div class="more" @click="_showPopup" :class="{'showPopup': showPopup}">
      <img width="100%" src="../../../static/images/more.png" alt="">
    </div>
    <div class="popup-wrapper" v-if="showPopup">
      <div class="popup">
        <div class="img-wrapper" @click="_showTip">
          <img src="../../../static/images/quxiaomoren.png" alt="">
        </div>
        <div class="img-wrapper" @click="_showTip">
          <img src="../../../static/images/shuaxinjianli.png" alt="">
        </div>
        <div class="img-wrapper" @click="_showTip">
          <img src="../../../static/images/zhidingjianli.png" alt="">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import myLoading from '@/components/loading/loading'
  import {request, ERR_OK} from '@/utils/api'

  export default {
    data () {
      return {
        data: null,
        showPopup: false
      }
    },
    methods: {
      _getData () {
        let vm = this
        request('/resume').then((data) => {
          if (data.StatusCode === ERR_OK) {
            vm.data = data
            console.log(vm.data)
          }
        })
      },
      _showPopup () {
        this.showPopup = !this.showPopup
      },
      _showTip () {
        wx.showToast({
          title: '开发中~',
          icon: 'none'
        })
      }
    },
    onShow () {
      this._getData()
    },
    onHide () {
      this.data = null
    },
    components: {
      myLoading
    }
  }
</script>

<style scoped lang="scss">
.resume{
  padding: 15px 15px 0 15px;
  box-sizing: border-box;
  .information{
    font-size: 14px;
    border-bottom: 1px dotted #dbdbdb;
    color: #626262;
    padding-bottom: 15px;
    .name{
      font-size: 20px;
      font-weight: 700;
      color: #000;
    }
    i{
      display: inline-block;
      color: #f9db61;
      font-weight: 700;
      font-size: 14px;
    }
    .desc{
      line-height: 40px;
    }
    span{
      padding-left: 22px;
    }
    .phone, .mail{
      line-height: 25px;
      position: relative;
      .iconfont{
        width: 12px;
        height: 16px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 5px;
        left: 0px;
        &.bi{
          background-image: url("../../../static/images/pen.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 15px;
          height: 18px;
        }
      }
      .shouji{
        background-image: url("../../../static/images/phone.png");
      }
      .youxiang{
        width: 16px;
        height: 13px;
        background-image: url("../../../static/images/mail.png");
        left: -1px;
      }
    }
  }
  .intention{
    position: relative;
    padding: 25px 0 15px 0;
    border-bottom: 1px dotted #dbdbdb;
    font-size: 14px;
    color: #626262;
    .iconfont{
      position: absolute;
      right: 0px;
      top: 50px;
      color: #f9db61;
      &.bi{
        background-image: url("../../../static/images/pen.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 15px;
        height: 18px;
      }
    }
    h1{
      font-size: 18px;
      color: #1e1e1e;
      padding-bottom: 15px;
    }
    .desc{
      line-height: 30px;
    }
  }
  .experience{
    padding: 25px 0 15px 0;
    border-bottom: 1px dotted #dbdbdb;
    font-size: 14px;
    color: #626262;
    position: relative;
    .bi{
      position: absolute;
      right: 0px;
      top: 40px;
      color: #f9db61;
      background-image: url("../../../static/images/pen.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 15px;
      height: 18px;
    }
    h1{
      font-size: 18px;
      color: #1e1e1e;
      padding-bottom: 15px;
    }
    p{
      color: #999999;
      padding-top: 15px;
    }
    .desc{
      line-height: 25px;
    }
    .addJob{
      color: #442f12;
      line-height: 40px;
      text-align: center;
      position: relative;
      i{
        display: inline-block;
        color: #f9db61;
        width: 14px;
        height: 14px;
        background-image: url("../../../static/images/plus.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 13px;
      }
      span{
        padding-left: 18px;
      }
    }
  }
  .education{
    padding: 25px 0 15px 0;
    font-size: 14px;
    color: #626262;
    position: relative;
    border-bottom: 1px dotted #dbdbdb;
    .bi{
      position: absolute;
      right: 0px;
      top: 40px;
      color: #f9db61;
      background-image: url("../../../static/images/pen.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 15px;
      height: 18px;
    }
    .desc{
      line-height: 30px;
    }
    .addJob{
      color: #442f12;
      line-height: 40px;
      text-align: center;
      position: relative;
      i{
        display: inline-block;
        color: #f9db61;
        width: 14px;
        height: 14px;
        background-image: url("../../../static/images/plus.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 13px;
      }
      span{
        padding-left: 18px;
      }
    }
  }
  .tip{
    line-height: 40px;
    text-align: center;
    color: #eeedf2;
    font-size: 12px;
  }
  .showPopup{
    transform: rotate(90deg);
  }
  .more{
    transition: all .3s;
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 40px;
    height: 40px;
    padding: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .8);
    z-index: 999;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .popup-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, .8);
    .popup{
      position: fixed;
      bottom: 90px;
      right: 30px;
      .img-wrapper{
        width: 40px;
        height: 40px;
        padding: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
