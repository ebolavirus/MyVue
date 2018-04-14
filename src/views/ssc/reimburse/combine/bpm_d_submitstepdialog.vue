<template>
  <div id="_nextTaskUserDivId" class="ui-widget-content"
       :v-loading="dialogLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)" >
    <table class="table" cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
        <td>
          <table class="table2" cellpadding="0" cellspacing="1">
            <tbody>
            <tr class="contitle">
              <td colspan="4">
                <b class="tdb">新的任务将被分配给以下用户</b>
              </td>
            </tr>
            <tr id="_task_comment_tr">
              <td class="blockTableLeft">审批意见</td>
              <td class="blockTableRight" colspan="3">
                <textarea class="textarea" id="_submitComments"
                onkeyup="resourceUtil.validInputLength(this,300,'_submitRemnant')"
                v-model="comments"></textarea>
                <span class="">
                  <div color="blue" id="_submitRemnant">(0/300)</div>
                  <div class="clear"></div>
                </span>
              </td>
            </tr>
            <tr>
              <td class="blockTableLeft" height="30">下一任务</td>
              <td class="blockTableRight" id="_nextActivityName">{{showActivityName}}</td>
              <td class="blockTableLeft">任务类型</td>
              <td class="blockTableRight" id="_nextApprovalType">{{approvalTypeEnum[target.nextTaskType]}}</td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table style="background-color: rgb(227, 227, 227);" width="100%" cellpadding="0" cellspacing="1">
            <tbody>
            <tr class="contitle">
              <td style="width:53px; text-align:center; padding-left:0px;"></td>
              <td style="width:210px; text-align:center; font-weight:bold;">名称</td>
              <td style="width:670px; text-align:center; font-weight:bold;">部门</td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <div id="_nextUsersTableDiv">
            <table id="_nextUsersTable" style="background-color: rgb(227, 227, 227);" width="100%" cellpadding="0"
                   cellspacing="1">
              <tbody>
              <tr class="contitle" style="display:none">
                <td style="width:53px; text-align:center; font-weight:bold;"></td>
                <td style="width:210px; text-align:center; font-weight:bold;">名称</td>
                <td style="width:670px; text-align:center; font-weight:bold;">部门</td>
              <tr bgcolor="#EFF3F6" ext="userLine" v-for="(val,i) in target.nextUsers" :key="i">
                <td v-if= "approvalType.approvalTypeCompete=== target.nextTaskType
                        || approvalType.approvalTypeMulti === target.nextTaskType"
                      style="width:53px; text-align:center; padding-left:0px;">{{i+1}}</td>
                <td v-if= "approvalType.approvalTypeMultiSelect=== target.nextTaskType"
                    style="width:53px; text-align:center; padding-left:0px;">
                  <input type="checkbox"  name="boxSelectedUser"  v-model="val.checkboxFlag"/></td>
                <td v-if= "approvalType.approvalTypeSingle === target.nextTaskType"
                    style="width:53px; text-align:center; padding-left:0px;">
                  <input type="radio" name="radioSelectedUser"
                         v-model="targetUsers[0]"
                         :checked="i===0"
                         :value="val.userId"></td>
                <td style="width:210px;text-align:left;margin-left: 10px;">{{val.displayName}}</td>
                <td style="width:670px;text-align:left;margin-left: 10px;">{{val.deptName}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <table class="table2" cellpadding="0" cellspacing="1">
            <tbody>
            <tr class="bottomBtns">
              <td colspan="3"><input type="button" id="completeStepOKBtn" data-ext="okBtn" value="确定"
                                     @click="completeStepOKBtnClicked">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input
                type="button" value="取消" @click="completeStepCancelBtnClicked"></td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'bpmDSubmitdialog',
  data () {
    return {
      msg: 'Welcome to  Vue.js App'
    }
  },
  computed: {
    ...mapState(['apiloading', 'bpdUri', 'tsId', 'pageTypeEnum', 'pageType', 'targetUsers']),
    ...mapState(['comments', 'target', 'lang', 'approvalType', 'approvalTypeEnum']),
    ...mapState(['isSubmitVerify', 'isStartProc', 'completeTaskType', 'userId', 'target', 'isFlowDialogVisible']),

    // 展示下一环节名称
    showActivityName: function () {
      if (this.lang === 'zh') {
        return this.target.nextActivities[0].activityName.substr(0, this.target.nextActivities[0].activityName.indexOf('@'))
      } else {
        return this.target.nextActivities[0].activityName.substr(this.target.nextActivities[0].activityName.indexOf('@') + 1)
      }
    },
    dialogLoading: function () {
      return this.apiloading
    }
  },
  props: {
  },

  methods: {
    ...mapActions(['setApiloading', 'setIsConfirmVerify', 'setIsSubmitVerify', 'startProcess', 'setIsStartProc', 'setIsFlowDialogVisible']),

    completeStepOKBtnClicked () {
      this.setIsSubmitVerify(false)
      console.log('弹框必须选人校验开始 ->')
      // 如果是可选多人签核需要更新数据中心targetUsers，如果存在targetUsers（可选多人和单人签核）则需要校验不为空
      console.log('this.targetUsers:', this.targetUsers)
      if (this.approvalType.approvalTypeMultiSelect === this.target.nextTaskType) {
        this.updateTargetUsers({me: this})
      }
      if ((this.approvalType.approvalTypeMultiSelect === this.target.nextTaskType ||
            this.approvalType.approvalTypeSingle === this.target.nextTaskType) &&
        this.targetUsers.length < 1) {
        alert('请选择审批人')
        return
      }
      console.log('弹框必须选人校验完成 ->')
      this.$emit('completeStepOKBtnClicked')
    },
    completeStepCancelBtnClicked () {
      // 点击取消，隐藏dialog,校验位置为false，防止首次成功后续失败的情况
      this.setIsFlowDialogVisible(false)
      this.setIsSubmitVerify(false)
      this.setIsConfirmVerify(false)
    },
    // 非空校验,如果是可选多人签核，必须选择才可以
    updateTargetUsers (obj) {
      let targetUsers = []
      obj.me.commit('SetTargetUsers', targetUsers)
      console.log('this.targetUsers length:', this.targetUsers.length)
      if (this.approvalType.approvalTypeMultiSelect === this.target.nextTaskType) {
        for (var j = 0; j < this.target.nextUsers.length; j++) {
          let nextUser = this.target.nextUsers[j]
          if (nextUser && nextUser.checkboxFlag) {
            targetUsers[targetUsers.length] = nextUser.userId
          }
        }
        console.log('this.targetUsers length:', this.targetUsers.length)
        obj.me.commit('SetTargetUsers', targetUsers)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ui-widget-content {
    width: 882px;
    min-height: 180px;
    border: 2px solid #777777;
  }
  .table {
    overflow-y:auto;
    width: 100%;
    border-color: grey;
    border-collapse: inherit;
    background-color:#FFFFFF;
  }
  .table2 {
    background-color: rgb(227, 227, 227);
    width: 100%;
  }
  .tdb {
    font-size: 12px;
    background: url(/static/images/contentBg.png) no-repeat -192px -97px;
    padding-left: 22px;
    color: #222;
    line-height: 24px;
    margin-left: 12px;
    float: left;
    width: 100%;
  }
  .textarea {
    width:690px;
    height:30px;
    margin-top:4px;
    margin-bottom:4px;
  }
  .contitle {
    width: 100%;
    text-align: left;
    background: url(/static/images/contentBg.png) repeat-x 0 -363px;
    height: 24px;
  }
  .blockTableLeft {
    background-color: #F4F4F4;
    text-align: center;
    width: 113px;
  }
  .blockTableRight {
    background-color: #EFF3F6;
    padding-left: 8px;
    width: 317px;
  }
  .bottomBtns {
    background-color: #EEEEEE;
    border-top: 1px solid #FFFFFF;
    height:26px;
    line-height:26px;
    text-align: center;
  }
</style>
