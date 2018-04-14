<template>
  <bpm-c-subtitle title="借款冲减信息"
                  :isCollapse="true">
    <bpm-c-block  :preadonly="true"
                  ptitle="借款未还总金额"
                  pinputtype="number"
                  v-model="unpaidaggregateamount"/>
    <bpm-c-block  :preadonly="true"
                  ptitle="本次冲抵金额"
                  pinputtype="number"
                  v-model="chargeagainstsum"/>
  </bpm-c-subtitle>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'bpmDLoanarea',
  data () {
    return {
      msg: 'Welcome to  Vue.js App'
    }
  },
  computed: {
    ...mapState(['ssc']),
    unpaidaggregateamount: {
      get () {
        return this.ssc.reimburse.whBtReimburse.unpaidaggregateamount
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'unpaidaggregateamount', value: value })
      }
    },
    chargeagainstsum: {
      get () {
        return this.ssc.reimburse.whBtReimburse.chargeagainstsum
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'chargeagainstsum', value: value })
      }
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
    background: url(/static/images/ecsbpm/comentBg.jpg) repeat-y center top;
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
