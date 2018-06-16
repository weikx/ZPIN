<template>
<div class="resume">
  <loading></loading>
</div>
</template>

<script>
  import loading from '@/components/loading/loading'
  export default {
    components: {
      loading
    }
  }
</script>

<style scoped lang="scss">
.resume{
  img{
    margin-top: 100px;
    margin-left: 10%;
  }
}
</style>
