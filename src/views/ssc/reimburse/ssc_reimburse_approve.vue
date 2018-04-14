<template>
  <div class="body" >
    <!--<saber-dialog :showTitle="false"-->
                  <!--:visible.sync="isDialogVisible"-->
                  <!--:width="saberDialogWidth">-->
      <!--<bpm-d-submitstepdialog v-if = "target && completeTaskType.completeTaskTypeNext=== target.completeTaskType"-->
                              <!--@btnClicked="submitStepBtnClicked"/>-->
      <!--<bpm-d-submittaskdialog v-if = "target && completeTaskType.completeTaskTypeSame=== target.completeTaskType"-->
                              <!--@btnClicked="submitTaskBtnClicked"/>-->
    <!--</saber-dialog>-->
    <bpm-c-navbar title="费用报销核算流程1"
                  :showLeft="true"
                  @submitVerify="submitVerify"
                  @confirmVerify="confirmVerify"
                  :rightShowArray="['submit','save','signout','close']"/>
    <bpm-d-basearea/>
    <bpm-d-businessarea  :readonlys="[true, true, true, true, true, true, true, true]"
                         :shows="[true, true, true, true, true, true, false, false]"/>
    <bpm-d-attacharea/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'page',
  data () {
    return {
      isDialogVisible: false,
      saberDialogWidth: '882px'
    }
  },
  computed: {
    ...mapState(['apiloading', 'isSubmitVerify', 'isConfirmVerify', 'targetUsers', 'approvalType', 'completeTaskType', 'lang', 'userId', 'bpdUri', 'tsId', 'target']),
  },
  mounted () {
  },
  methods: {
    ...mapActions(['setApiloading', 'setIsSubmitVerify', 'setIsConfirmVerify']),
    submitVerify () {
      this.setIsSubmitVerify(false)
      console.log('submitVerify start- >')
      // todo 业务校验
      console.log('submitVerify end- >')
      this.setIsSubmitVerify(true)
    },
    confirmVerify () {
      this.setIsConfirmVerify(false)
      console.log('confirmVerify 校验业务数据开始- >')
      // todo 业务校验
      console.log('confirmVerify 校验业务数据结束- >')
      this.setIsConfirmVerify(true)
    }
  },
  created () {
    this.$store.dispatch('setPageType', 'approve')

    // 初始化tsId，后续可以删除 todo

    // let tsId = 'PIID-48fe3cf7-162d-465d-b27d-985f9af941ca'
    // this.getDataFromTableDdSub({ me: this, tsId: tsId })
    // this.getDataFromTableCostshare({ me: this, tsId: tsId })
    // this.getDataFromTableTravelSubsidyDetails({ me: this, tsId: tsId })
    // this.getDataFromTableTransportationDetails({ me: this, tsId: tsId })
    // this.getDataFromTableFareDetails({ me: this, tsId: tsId })
    // this.getDataFromTableStayDetails({ me: this, tsId: tsId })
    // this.getDataFromTableRcmDetails({ me: this, tsId: tsId })
  }
}
</script>

<style scoped>
.body {
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
</style>
