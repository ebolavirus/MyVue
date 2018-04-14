<template>
  <div>
    <bpm-c-subtitle title="报销明细"
                    :isCollapse="true">
      <bpm-c-gridbar note="注:请双击一行记录来编辑或查看记录!"
                     :showArray="['add','update','delete']"
                     @addClicked="addClicked"
                     @updateClicked="updateClicked"
                     @deleteClicked="deleteClicked"/>
      <bpm-c-gridmain
        :gridInfo="ssc.reimburse.whBtReimburseDdSub"
        :gridTitleInfo="gridTitleInfo"
        :gridShowInfo="gridShowInfo"
        :gridWidthInfo="gridWidthInfo"/>
      <bpm-c-gridpage/>
    </bpm-c-subtitle>
    <saber-dialog title=""
                  :visible.sync="dialogVisible"
                  width="980px">
      <bpm-d-feerebursechoose
        title="费用报销核算流程"
        @closeClicked="setDialogClose"/>
    </saber-dialog>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'bpmDPaymentarea',
  data () {
    return {
      gridTitleInfo: ['内部订单', '核算科目', '不含税金额', '税额', '申请报销金额', '实际报销金额', '摘要'],
      gridShowInfo: ['internalordername', 'subjectname', 'notincludetaxessum', 'taxrate', 'reimbursesum', 'actualreimbursesum', 'summary'],
      gridWidthInfo: [120, 120, 100, 100, 100, 100, 300], // 保证总和为980，如果有复选框则总和为940
      dialogVisible: false
    }
  },
  computed: {
    ...mapState(['tsPiid']),
    ...mapState(['ssc'])
  },
  methods: {
    updateClicked () {
      this.dialogVisible = true
    },
    addClicked () {
      this.dialogVisible = true
    },
    deleteClicked () {

    },
    setDialogClose () {
      this.dialogVisible = false
    },
    login () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
