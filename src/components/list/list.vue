<template>
  <div class="list-wrapper">
    <div class="list-top">
      <div class="list-left">
        {{aa.bb}} Web 前端开发工程师
      </div>
      <div class="list-right">
        {{company.Salary65}}
        15K-30K
      </div>
    </div>
    <div class="list-center">
      <div class="list-left">
        上海 不限 本科
      </div>
      <div class="list-right"></div>
    </div>
    <div class="list-foot">
      <div class="list-left">
        {{company.CompanyName}}上海雷默广告有限公司
      </div>
      <div class="list-right">
        {{company.Distance}}324m
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        company: {
          type: Object
        }
      },
      data () {
        return {
          aa: {
            bb: 999
          }
        }
      },
      create () {
        console.log(99900999)
        console.log(this.company)
      }
    }
</script>

<style scoped lang="scss">
  .list-wrapper{
    background: #fff;
    height: 120px;
    margin-top: 10px;
    padding: 12px;
    box-sizing: border-box;
    .list-top, .list-center, .list-foot{
      display: flex;
      font-size: 12px;
      color: #666666;
      line-height: 26px;
      .list-left{
        flex: 1;
        text-align: left;
      }
      .list-right{
        text-align: right;
        flex: 0 0 80px
      }
    }
    .list-top{
      line-height: 33.3px;
      font-size: 16px;
      font-weight: 700;
      .list-left{
        color: #282828;
      }
      .list-right{
        color: #ec675d;
      }
    }
    .list-center{
      line-height: 22px;
    }
    .list-foot{
      line-height: 43.6px;
    }
  }
</style>
