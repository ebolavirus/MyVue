<template>
  <bpm-c-subtitle title="费用岗位"
                  :isCollapse="true">
    <bpm-c-block :preadonly="readonlys[0]"
                 :ptitle="titles[0]"
                 :pinputtype="inputTypes[0]"
                 v-model="companycode"/>
    <bpm-c-block :preadonly="readonlys[1]"
                 :ptitle="titles[1]"
                 :pinputtype="inputTypes[1]"
                 v-model="currency"/>
    <bpm-c-block :preadonly="readonlys[2]"
                 :ptitle="titles[2]"
                 :pinputtype="inputTypes[2]"
                 v-model="certificatedate"/>
    <bpm-c-block :preadonly="readonlys[3]"
                 :ptitle="titles[3]"
                 :pinputtype="inputTypes[3]"
                 v-model="postingdate"/>
    <bpm-c-block :preadonly="readonlys[4]"
                 :ptitle="titles[4]"
                 :pinputtype="inputTypes[4]"
                 v-model="totalSumFee"/>
    <bpm-c-block :preadonly="readonlys[5]"
                 :ptitle="titles[5]"
                 :pinputtype="inputTypes[5]"
                 v-model="defraySum"/>
    <bpm-c-block :preadonly="readonlys[6]"
                 :ptitle="titles[6]"
                 :pinputtype="inputTypes[6]"
                 v-model="certificateNo"/>
    <bpm-c-block :preadonly="readonlys[7]"
                 :ptitle="titles[7]"
                 :pinputtype="inputTypes[7]"
                 v-model="totalsum"/>
    <bpm-d-grid
      :inputTitle="titles2"
      :inputLine="inputLines"
      :inputType="inputTypes2"
      :inputKey="inputKey2"
      :inputReadonly="readonlys2"
      :gridInfo="ssc.reimburse.whBtReimburseRcmDetail"
      :gridTitleInfo="gridTitleInfo"
      :gridShowInfo="gridShowInfo"
      :gridWidthInfo="gridWidthInfo"
    />
  </bpm-c-subtitle>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'bpmDPostarea',
  data () {
    let gridShowInfo = ['costcentername', 'order', 'subjecttype', 'subjectcode', 'notincludetaxessumBx', 'taxrateBx', 'transferTaxBx']
    let gridTitleInfo = ['成本中心', '内部订单', '核算科目', '核算科目代码', '不含税金额', '税额', '转出税额']
    // 保证总和为980，如果有复选框则总和为940
    let gridWidthInfo = [150, 150, 140, 125, 125, 125, 125]
    return {
      gridTitleInfo: gridTitleInfo,
      gridShowInfo: gridShowInfo,
      gridWidthInfo: gridWidthInfo
    }
  },
  props: {
    readonlys: {
      type: Array,
      default () {
        return [true, true, true, false, true, true, true, true]
      }
    },
    inputLines: {
      type: Array,
      default () {
        return [2, 2, 2, 2, 2, 2]
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
        return ['公司代码', '币别', '凭证日期', '过账日期', '实际报销金额', '应支付金额', '凭证号', '驳回影像']
      }
    },
    inputTypes: {
      type: Array,
      default () {
        return ['reimbursecompanycostcenter', 'internalorder', 'date', 'date', 'number', 'number', 'text', 'text']
      }
    },
    readonlys2: {
      type: Array,
      default () {
        return [true, true, false, false, false, false]
      }
    },
    shows2: {
      type: Array,
      default () {
        return [true, true, true, true, true, true]
      }
    },
    titles2: {
      type: Array,
      default () {
        return ['成本中心', ' 内部订单', '核算科目', '转出税额', '不含税金额', '税额']
      }
    },
    inputTypes2: {
      type: Array,
      default () {
        return ['text', 'text', 'subject', 'number', 'number', 'number']
      }
    },
    inputKey2: {
      type: Array,
      default () {
        return ['costcentername', 'order', 'subjecttype', 'notincludetaxessumBx', 'taxrateBx', 'transferTaxBx']
      }
    }
  },
  computed: {
    ...mapState(['pageTypeEnum', 'pageType', 'tsPiid', 'ssc']),
    companycode: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.companycode
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'companycode', value: value
        })
      }
    },
    currency: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.currency
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'currency', value: value
        })
      }
    },
    certificatedate: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.certificatedate
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'certificatedate', value: value
        })
      }
    },
    postingdate: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.postingdate
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'postingdate', value: value
        })
      }
    },
    totalSumFee: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.totalSumFee
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'totalSumFee', value: value
        })
      }
    },
    defraySum: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.defraySum
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'defraySum', value: value
        })
      }
    },
    certificateNo: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.certificateNo
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'certificateNo', value: value
        })
      }
    },
    totalsum: {
      get () {
        return this.ssc.reimburse.whBtReimburseRcmSub.totalsum
      },
      set (value) {
        this.$store.commit('updateDataSscReimburseWhBtReimburseRcmSub', {
          name: 'totalsum', value: value
        })
      }
    }
  },
  methods: {
    ...mapActions(['getDataFromAJAX_Reim_005_Approve_Open', 'getDataFromTableRcmDetails']),
    selectClick () {
      console.log('sssssss', this.ssc)
    },
    selectClick2 () {
    },
    addClicked () {
    },
    updateClicked () {
    },
    deleteClicked () {
    }
  },
  created () {
    let tsId = 'PIID-48fe3cf7-162d-465d-b27d-985f9af941ca'
    this.getDataFromAJAX_Reim_005_Approve_Open({me: this, tsId})
    this.getDataFromTableRcmDetails({me: this, tsId})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
