<template>
  <div class="blockContent">
    <div class="blockLeft">标题</div>
    <div class="blockRight">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'bpmDPaymentinput',
  data () {
    return {
      msg: 'Welcome to  Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
.blockContent {
    line-height: 27px;
    border-bottom: 1px solid #e3e3e3;
    padding: 0;
    margin: 0;
    background: url(/webasset/images/ecsbpm/comentBg.jpg) repeat-y center top;
}
.blockLeft {
    background-color: #f4f4f4;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    float: left;
    text-align: center;
    width: 138px;
    min-height: 3px;
}
.blockRight {
    background-color: #eff3f6;
    float: left;
    padding-left: 8px;
    width: 342px;
    min-height: 3px;
}
</style>
