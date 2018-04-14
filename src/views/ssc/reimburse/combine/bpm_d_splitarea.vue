<template>
  <bpm-c-subtitle title="费用分摊表"
                  :isCollapse="true">
    <bpm-d-grid
      :inputLine="inputLine"
      :inputType="inputType"
      :inputReadonly="inputReadonly"
      :inputTitle="gridTitleInfo"
      :gridInfo="gridInfo"
      :gridTitleInfo="gridTitleInfo"
      :gridShowInfo="gridShowInfo"
      :gridWidthInfo="gridWidthInfo"
    />
  </bpm-c-subtitle>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'bpmDSplitarea',
  data () {
    let inputLine = [2, 2, 1, 2, 2, 2, 2]
    let inputType = ['reimbursecompanycostcenter', 'internalorder', 'subject', 'number', 'number', 'number', 'number']
    let inputReadonly = [false, false, false, false, false, false, false]
    let gridShowInfo = ['costcentername', 'internalordername', 'subjectname', 'notaxamountCurrency', 'taxCurrency', 'reimbursesumCurrency', 'actualreimbursesumCurrency']
    let gridTitleInfo = ['成本中心', '内部订单', '核算科目', '不含税金额', '税额', '申请报销金额', '实际报销金额']
    // 保证总和为980，如果有复选框则总和为940
    let gridWidthInfo = [150, 150, 140, 125, 125, 125, 125]
    return {
      inputLine: inputLine,
      inputType: inputType,
      inputReadonly: inputReadonly,
      gridTitleInfo: gridTitleInfo,
      gridShowInfo: gridShowInfo,
      gridWidthInfo: gridWidthInfo
    }
  },
  computed: {
    ...mapState(['ssc']),
    gridInfo () {
      return this.ssc.reimburse.whBtReimburseCostshare
    }
  },
  methods: {
    addClicked () {
    },
    updateClicked () {
    },
    deleteClicked () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
