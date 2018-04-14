<template>
  <div>
    <bpm-c-toptitle title="业务信息"
                    @click="click_toptitle"
                    :isCollapse="true">
      <bpm-c-block :preadonly="readonlys[0]"
                   :ptitle="titles[0]"
                   :pinputtype="inputTypes[0]"
                   v-model="reimbursecompanyname" />
      <bpm-c-block :preadonly="readonlys[1]"
                   :ptitle="titles[1]"
                   :pinputtype="inputTypes[1]"
                   v-model="reimbursecompanycostcenter"/>
      <bpm-c-block :preadonly="readonlys[2]"
                   :ptitle="titles[2]"
                   :pinputtype="inputTypes[2]"
                   v-model="gatherupname"/>
      <bpm-c-block :preadonly="readonlys[3]"
                   :ptitle="titles[3]"
                   :pinputtype="inputTypes[3]"
                   v-model="accountbanknumber" />
      <bpm-c-block :preadonly="readonlys[4]"
                   :ptitle="titles[4]"
                   :pinputtype="inputTypes[4]"
                   v-model="accountbankname"/>
      <bpm-c-block :preadonly="readonlys[5]"
                   :ptitle="titles[5]"
                   :pinputtype="inputTypes[5]"
                   v-model="reimbStandardMoney"/>
      <bpm-c-block :preadonly="readonlys[6]"
                   :ptitle="titles[6]"
                   :pinputtype="inputTypes[6]"
                   v-model="folio"/>
      <bpm-c-block :preadonly="readonlys[7]"
                   :ptitle="titles[7]"
                   :pinputtype="inputTypes[7]"
                   v-model="totalsum" />
      <bpm-d-paymentarea/>
      <!--<bpm-d-taskchoose/>-->
      <bpm-d-loanarea/>
      <bpm-d-splitarea/>
      <bpm-d-postarea></bpm-d-postarea>
      <!--</div>-->
      <bpm-c-block :preadonly="true"
                   ptitle="实际报销金额总和"
                   pinputtype="number"
                   :pline="1"
                   v-model="costshareActtotalsum"/>
      <bpm-d-imagearea/>
      <bpm-d-linkarea/>
    </bpm-c-toptitle>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'bpmDBusinessarea',
  data () {
    return {
      dialogVisible: -1
    }
  },
  computed: {
    ...mapState(['pageTypeEnum', 'pageType', 'tsId', 'ssc', 'ssc.reimburse']),
    reimbursecompanyname: {
      get () {
        return this.ssc.reimburse.whBtReimburse.reimbursecompanyname
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', {
          name: 'reimbursecompanyname',
          value: value
        })
      }
    },
    reimbursecompanycostcenter: {
      get () {
        return this.ssc.reimburse.whBtReimburse.reimbursecompanycostcenter
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', {
          name: 'reimbursecompanycostcenter',
          value: value
        })
      }
    },
    gatherupname: {
      get () {
        return this.ssc.reimburse.whBtReimburse.gatherupname
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'gatherupname', value: value })
      }
    },
    accountbanknumber: {
      get () {
        return this.ssc.reimburse.whBtReimburse.accountbanknumber
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'accountbanknumber', value: value })
      }
    },
    accountbankname: {
      get () {
        return this.ssc.reimburse.whBtReimburse.accountbankname
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'accountbankname', value: value })
      }
    },
    reimbStandardMoney: {
      get () {
        return this.ssc.reimburse.whBtReimburse.reimbStandardMoney
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'reimbStandardMoney', value: value })
      }
    },
    folio: {
      get () {
        return this.ssc.reimburse.whBtReimburse.folio
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'folio', value: value })
      }
    },
    totalsum: {
      get () {
        return this.ssc.reimburse.whBtReimburse.totalsum
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'totalsum', value: value })
      }
    },
    costshareActtotalsum: {
      get () {
        return this.ssc.reimburse.whBtReimburse.costshareActtotalsum
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburse', { name: 'costshareActtotalsum', value: value })
      }
    },
    isDialogVisible () {
      return this.dialogVisible >= 0
    }
  },
  props: {
    readonlys: {
      type: Array,
      default () {
        return [false, false, false, true, true, true, true, true]
      }
    },
    shows: {
      type: Array,
      default () {
        return [true, true, true, true, true, true, true, true]
      }
    },
    titles: {
      type: Array,
      default () {
        return ['业务发生公司', '成本中心', '实际收款人', '卡号', '开户银行', '报销币别', 'A4纸张数', '合计金额']
      }
    },
    inputTypes: {
      type: Array,
      default () {
        return ['reimbursecompanyname', 'reimbursecompanycostcenter', 'gatherupname', 'accountBankNumber', 'text', 'select', 'number', 'number']
      }
    }
  },
  mounted () {
    this.login()
  },
  methods: {
    ...mapActions(['getDataSscReimburseByUserId']),
    ...mapActions(['getDataSscReimburseWhBtReimburse']),
    click_toptitle () {
      alert('点击')
    },
    login () {
      switch (this.pageType) {
        case this.pageTypeEnum.draft:
          this.getDataSscReimburseByUserId({me: this})
          break
        case this.pageTypeEnum.other:
        case this.pageTypeEnum.approve:
        case this.pageTypeEnum.view:
          // 只读页面
          console.log('state pageType:' + this.pageType)
          this.getDataSscReimburseWhBtReimburse({me: this})
          break
      }
    }
  }
}
</script>

<style scoped>
</style>
