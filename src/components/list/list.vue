<template>
  <div class="list-wrapper">
    <div class="list-top">
      <div class="list-left">
        {{company.Name}}
      </div>
      <div class="list-right">
        {{company.Salary65}}
      </div>
    </div>
    <div class="list-center">
      <div class="list-left">
        {{company.WorkCity}} {{company.emplType}} {{company.Education}}
      </div>
      <div class="list-right"></div>
    </div>
    <div class="list-bottom" v-if="!thisCompany">
      <div class="list-left">
        {{company.CompanyName}}
      </div>
      <div class="list-right" v-if="Distance > 0">
        {{Distance}}m
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props: {
        company: {
          type: Object
        },
        thisCompany: {
          type: Boolean
        }
      },
      data () {
        return {
          aa: {
            bb: 999
          }
        }
      },
      computed: {
        Distance () {
          return this.company.Distance.toFixed(0)
        }
      },
      created () {
        console.log(this.company)
      }
    }
</script>

<style scoped lang="scss">
  .list-wrapper{
    background: #fff;
    padding: 12px;
    box-sizing: border-box;
    .list-top, .list-center, .list-bottom{
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
    .list-bottom{
      line-height: 43.6px;
    }
  }
</style>
