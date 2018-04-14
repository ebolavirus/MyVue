<template>
  <div id="_completeTaskLay" class="smallLay">
    <div class="smallLayTitle">
      <b>任务提交-同环节处理人</b></div>
    <div class="smallLayContent showCompleteTaskSmallLayContent" >
      <span v-for="(val,i) in target.nextUsers" :key="i">
        <br v-if="i>0">
        {{val.displayName}}&nbsp;&nbsp;&nbsp;{{val.deptName}}
      </span>
      <span id="_completeTaskErrorMsg" style="font-size:10pt;color:red;font-weight:bold;margin-left:20px"></span>
      <div>
        <textarea class="commentsTxtare" id="_completeTaskCommentsId" style="height: 25px;width: 550px;"
                  onkeyup="resourceUtil.validInputLength(this,300,'_completeTaskRemnant')"
                  v-model="comments">同意</textarea>
        <div style="text-align:right;padding-right:5px"><font color="blue" id="_completeTaskRemnant">(0/300)</font>
        </div>
      </div>
      <div style="text-align:center">
        <input type="button" data-ext="okBtn" id="divLayOKBtn" value="确定"
               @click="completeTaskOKBtnClicked">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="取消"
               @click="completeTaskCancelBtnClicked"></div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'bpmDSubmittaskdialog',
  data () {
    return {}
  },
  computed: {
    ...mapState(['targetUsers', 'comments', 'target', 'lang', 'approvalType', 'approvalTypeEnum'])

  },
  props: {},
  methods: {
    ...mapActions(['setApiloading', 'setIsConfirmVerify', 'setIsSubmitVerify', 'startProcess', 'setIsStartProc', 'setIsFlowDialogVisible']),

    completeTaskOKBtnClicked () {
      this.setIsSubmitVerify(false)
      this.$emit('completeTaskOKBtnClicked')
    },
    completeTaskCancelBtnClicked () {
      // 点击取消，隐藏dialog,校验位置为false，防止首次成功后续失败的情况
      this.setIsFlowDialogVisible(false)
      this.setIsSubmitVerify(false)
      this.setIsConfirmVerify(false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.smallLay {
  width: 600px;
  height: 194px;
  background-color: #cbd3e0;
  border: 1px solid #909497;
  color: #333;
  line-height: 24px;
  text-align: left;
  -webkit-box-shadow: 5px 2px 6px #000;
}
.smallLayTitle {
  background: url(/static/images/ecsbpm/smallLayBG.jpg) repeat-x center top;
  height: 32px;
  color: #48515a;
}
.smallLayTitle b {
  padding-left: 12px;
  color: #48515a;
  font-size: 14px;
  line-height: 33px;
}
.smallLayContent {
  background-color: #fff;
  border: 1px solid #9da4be;
  height: 131px;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 12px;
}
.showCompleteTaskSmallLayContent {
  overflow: auto;
}
</style>
