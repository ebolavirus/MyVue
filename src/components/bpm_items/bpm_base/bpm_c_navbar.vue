<template>
  <div :v-show="show">
    <saber-pop ref="popover1" placement="bottom" width="60" v-model="visible1" trigger="hover">
      <div dir="ltr" class="dhx_toolbar_poly_18_dhx_skyblue">
        <table class="buttons_cont" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
          <tbody>
          <tr v-for="(val,i) in btnArray" :key="i"
              class="tr_btn"
              @click="choosePage(val)"
              onmouseover="this.className='tr_btn dhx_toolbar_over'"
              onmouseout="this.className='tr_btn'">
            <td class="td_btn_txt">{{val}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </saber-pop>
    <div class="head jlayoutBetween">
      <div class="btnleft">
        <button class="btn" v-show="showLeft" @click="btnClicked('main')">主表单</button>
        <button class="btn" v-show="showLeft" @click="btnClicked('history')">历史</button>
        <button class="btn" v-show="showLeft" @click="btnClicked('process')">流程图</button>
      </div>
      <div class="btnright">
        <a class="abtn"
           v-show="indexOfShowArray('close')"
           @click="btnClicked('close')"><i class="aicon i6"></i>关闭</a>
        <a class="abtn" @click="btnClicked('signout')"
           v-show="indexOfShowArray('signout')"><i class="aicon i5"></i>注销</a>
        <a class="abtn"
           v-show="indexOfShowArray('advance')"
           v-popover:popover1><i class="aicon i4"></i>高级</a>
        <a class="abtn" @click="btnClicked('save')"
           v-show="indexOfShowArray('save')"><i class="aicon i3"></i>保存</a>
        <a class="abtn" @click="btnClicked('reject')"
           v-show="indexOfShowArray('reject')"><i class="aicon i2"></i>驳回</a>
        <a class="abtn" @click="submitVerify()"
           v-show="indexOfShowArray('submit')"><i class="aicon i1"></i>提交</a>
      </div>
    </div>
    <div class="head1 jlayoutCenter">{{title}}</div>
    <!--下一环节弹框-->
    <saber-dialog :showTitle="false"
                  :visible.sync="isFlowDialogVisible"
                  :width="saberDialogWidth">
      <bpm-d-submitstepdialog v-if = "target && completeTaskType.completeTaskTypeNext=== target.completeTaskType"
                              @completeStepOKBtnClicked="completeStepOKBtnClicked"/>
      <bpm-d-submittaskdialog v-if = "target && completeTaskType.completeTaskTypeSame=== target.completeTaskType"
                              @completeTaskOKBtnClicked="completeTaskOKBtnClicked"/>
    </saber-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'bpmCNavbar',
  data () {
    return {
      msg: 'Welcome to  Vue.js App',
      visible1: false,
      btnArray: ['通知', '转办', '加签']
    }
  },
  props: {
    title: '',
    show: {
      type: Boolean,
      default: true
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    // close signout advance save reject submit
    rightShowArray: {
      type: Array,
      default () {
        return ['submit', 'close', 'advance', 'save']
      }
    }
  },
  computed: {
    ...mapState(['isSubmitVerify', 'isConfirmVerify', 'isFlowDialogVisible', 'pageTypeEnum', 'pageType', 'isStartProc', 'targetUsers', 'approvalType']),
    ...mapState(['completeTaskType', 'lang', 'userId', 'bpdUri', 'tsId', 'tsTaskId', 'target', 'taskId']),
    saberDialogWidth: function () {
      if (this.target.completeTaskType) {
        return '600px'
      } else {
        return '998px'
      }
    }
  },
  mounted () {
  },
  watch: {
    isSubmitVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isSubmitVerify-> can do flow ')
        console.log('watch isSubmitVerify-> old val : ', oldVal)
        console.log('watch isSubmitVerify-> cur val : ', curVal)
        this.doRetrieveNextActivity()
      }
    },
    isConfirmVerify (curVal, oldVal) {
      if (curVal === true && oldVal === false) {
        console.log('watch isConfirmVerify-> can do flow ')
        console.log('watch isConfirmVerify-> old val : ', oldVal)
        console.log('watch isConfirmVerify-> cur val : ', curVal)
        this.doSubmitTask()
      }
    }
  },
  methods: {
    ...mapActions(['retrieveNextActivity', 'startProcess', 'setIsStartProc', 'setIsSubmitVerify', 'setIsConfirmVerify']),
    indexOfShowArray (aStr) {
      let index = $.inArray(aStr, this.rightShowArray)
      return index > -1
    },
    completeStepOKBtnClicked () {
      this.$emit('confirmVerify')
    },
    completeTaskOKBtnClicked () {
      this.$emit('confirmVerify')
    },
    doRetrieveNextActivity () {
      if (this.pageType === this.pageTypeEnum.draft) {
        // 获取发起弹框，调用发起接口前，先保存草稿，之后调用接口就可以一直传输tsid，不需要考虑首次传-1 todo
        console.log('nav header btn click -> back into nav draft child -> 调用发起接口参数为false')
        this.setIsStartProc(false)
        this.startProcess({me: this})
      } else if (this.pageType === this.pageTypeEnum.approve) {
        // 获取审批弹框
        console.log('nav header btn click -> back into nav approve child -> 调用获取下一环节接口')
        this.retrieveNextActivity({me: this})
      }
    },
    doSubmitTask () {
      if (this.pageType === this.pageTypeEnum.draft) {
        // 正式发起流程
        console.log('nav header btn click -> back into nav draft child -> 调用发起接口参数为false')
        this.setIsStartProc(true)
        this.startProcess({me: this})
      } else if (this.pageType === this.pageTypeEnum.approve) {
        // 提交审批任务 todo
        console.log('nav header btn click -> back into nav approve child -> 调用完成任务接口')
      }
    },
    submitVerify () {
      this.$emit('submitVerify')
    },
    confirmVerify () {
      this.$emit('confirmVerify')
    },
    btnClicked (btnType) {
      console.log('nav header btn click -> back into nav:', btnType)
      if (btnType === 'history') {
        // todo 历史
      } else if (btnType === 'process') {
        // todo 流程图
      // } else if (btnType === 'submit') {
      //   // 添加该方法用于暴露开口进行校验,校验结果回传至isSubmitFinish
      //   this.$emit('btnClicked', btnType)
      } else if (btnType === 'reject') {
        // todo 驳回
      } else if (btnType === 'signout') {
        // todo 注销
      } else if (btnType === 'advance') {
        // todo 高级
      } else if (btnType === 'save') {
        // todo 保存
      } else if (btnType === 'close') {
        // todo 关闭
        this.$emit('navClicked', btnType)
      }
    },
    choosePage (acount) {
      console.log(acount)
      this.visible1 = false
      this.$emit('chooseBtn', acount)
    }
  }
}
</script>

<style scoped>
  .head {
    width: 100%;
    height: 39px;
    padding: 0 19px;
    box-sizing: border-box;
    background: url(/static/images/contentBg.png) repeat-x 0 0;
  }

  .head1 {
    background: url(/static/images/contentBg.png) repeat-x 0 -337px;
    color: #475d68;
    font-size: 14px;
    font-weight: bold;
    width: 980px;
    height: 26px;
    line-height: 26px;
  }

  .btn {
    background: url(/static/images/contentBg.png) no-repeat -116px -122px;
    height: 24px;
    width: 60px;
    display: block;
    color: #f0f0f0;
    text-align: center;
    line-height: 24px;
    float: left;
    margin-right: 5px;
    border: 0;
    cursor: pointer;
  }

  .aicon {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    float: left;
  }

  .abtn {
    color: #fff;
    display: block;
    padding: 5px;
    float: right;
    height: 14px;
    text-align: left;
    cursor: pointer;
  }

  .i1 {
    background: url(/static/images/contentBg.png) no-repeat 0 -86px;
  }

  .i2 {
    background: url(/static/images/contentBg.png) no-repeat 0 -130px;
  }

  .i3 {
    background: url(/static/images/contentBg.png) no-repeat 0 -44px;
  }

  .i4 {
    background: url(/static/images/contentBg.png) no-repeat 0 -258px;
  }

  .i5 {
    background: url(/static/images/contentBg.png) no-repeat 0 -238px;
  }

  .i6 {
    background: url(/static/images/contentBg.png) no-repeat 0 -217px;
  }
  .btnleft {
    float: left;
    width: 30%;
  }
  .btnright {
    float: right;
    width: 70%;
  }

  .dhx_toolbar_btn {
    display: block;
    float: left;
    height: 18px;
    margin: 2px 1px 0px 2px;
    padding: 3px 3px 2px 3px;
    position: relative;
    width: 24px;
  }

  .dhx_toolbar_over {
    background: cornflowerblue;
  }

  .dhx_toolbar_text {
    float: left;
    vertical-align: middle;
    font-size: 11px;
    margin-top: 5px;
    margin-right: 1px;
    padding: 0 4px;
    width: 150px;
  }

  .float_left {
    float: left;
  }

  .dhxtoolbar_hdrline_r {
    background-image: url(/static/images/dragImage.png);
    background-position: 0px 0px;
    background-repeat: no-repeat;
    right: 0 !important;
    direction: ltr;
    height: 25px;
    padding: 0px 5px 0px 5px;
    width: 36px;
  }

  .dhx_toolbar_arw {
    display: block;
    float: left;
    font-size: 12px;
    margin: 2px 1px 0px -2px;
    padding: 3px 3px 2px 3px;
  }

  .arwimg {
    background-image: url(/static/images/dhxtoolbar_imgs.gif);
    background-position: -2px -177px;
    background-repeat: no-repeat;
    height: 16px;
    margin-top: 2px;
    width: 7px;
  }
  .middle {
    width: 100%;
    text-align: center;
  }
  .right {
    width: 100%;
    text-align: right;
  }

  .dhx_toolbar_poly_18_dhx_skyblue {
    margin: 0;
    padding: 0;
    border: #a4bed4 1px solid;
    background-color: #1C68C0;
    overflow: hidden;
    cursor: default;
    line-height: normal;
  }
  .tr_btn {
    height: 24px;
  }
  .td_btn_txt {
    width: 100%;
    font-size: 1px;
    color: #fff;
    vertical-align: middle;
    text-align: center;
  }
</style>
