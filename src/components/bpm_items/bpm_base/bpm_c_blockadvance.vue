<template>
  <div>
    <div class="blockContent">
      <div class="blockLeft">
        <span class="aSpan">{{title}}</span>
      </div>
      <div :class="pline === 1?'blockRightLong':'blockRight'">
        <span v-if="preadonly" class="aSpan">{{content}}</span>
        <span v-else>
        <input type="text" class="aInput" :value="content" readonly="readonly">
        <button class="selectRecord" @click="showSelect"/>
      </span>
      </div>
    </div>
    <saber-dialog :title="title"
                  :visible.sync="dialogVisible"
                  width="980px"
                  append-to-body>
      <bpm-d-simplechoose v-if="dialogType==='simplechoose'"
                          :title="title"
                          :pselectType="pselectType"
                          @selectClicked="selectClicked"
                          @closeClicked="setDialogClose"/>
      <bpm-d-commonchoose v-else-if="dialogType==='commonchoose'"
                          :title="title"
                          :pselectType="pselectType"
                          @selectClicked="selectClicked"
                          @closeClicked="setDialogClose"/>
      <bpm-d-personchoose v-else-if="dialogType==='personchoose'"
                          :title="title"
                          :pselectType="pselectType"
                          @selectClicked="selectClicked"
                          @closeClicked="setDialogClose"/>
      <bpm-d-taskchoose v-else-if="dialogType==='taskchoose'"
                        :title="title"
                        :pselectType="pselectType"
                        @selectClicked="selectClicked"
                          @closeClicked="setDialogClose"/>
    </saber-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'bpmCBlock',
  model: {
    prop: 'pcontent',
    event: 'changed'
  },
  props: {
    // 只读/可编辑,
    preadonly: {
      type: Boolean,
      default: false
    },
    // 可能占一整行或行的一半
    pline: {
      type: Number,
      default: 2
    },
    ptitle: {
      type: String,
      default: ' '
    },
    pcontent: {
      type: String,
      default: ' '
    },
    pselectType: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      dialogVisible: false,
      content: this.pcontent,
      realValue: ''
    }
  },
  computed: {
    ...mapState(['chooseDialogEnum']),
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    },
    dialogType () {
      switch (this.pselectType) {
        case this.chooseDialogEnum.reimbursecompanyname:
        case this.chooseDialogEnum.accountBankNumber:
          return 'simplechoose'
        case this.chooseDialogEnum.gatherupname:
          return 'personchoose'
        case this.chooseDialogEnum.trainlink:
        case this.chooseDialogEnum.aboardlink:
          return 'taskchoose'
        case this.chooseDialogEnum.reimbursecompanycostcenter:
        case this.chooseDialogEnum.internalorder:
        case this.chooseDialogEnum.subject:
          return 'commonchoose'
        default:
          return ''
      }
    },
    // 配置高级选择框的展示值和实际保存值的字典
    translateDic () {
      switch (this.pselectType) {
        case this.chooseDialogEnum.reimbursecompanyname:
          return {
            value: 'companycode',
            name: 'companyname'
          }
        case this.chooseDialogEnum.accountBankNumber:
          return {
            value: 'employeeBankNo',
            name: 'employeeBankNo'
          }
        case this.chooseDialogEnum.gatherupname:
          return {
            value: 'uid',
            name: 'cn'
          }
        case this.chooseDialogEnum.trainlink:
          return {
            value: 'piid',
            name: 'piid'
          }
        case this.chooseDialogEnum.aboardlink:
          return {
            value: 'piid',
            name: 'piid'
          }
        case this.chooseDialogEnum.reimbursecompanycostcenter:
          return {
            value: 'costCenterCode',
            name: 'costCenterName'
          }
        case this.chooseDialogEnum.internalorder:
          return {
            value: 'inwardOrderCode',
            name: 'inwardOrderName'
          }
        case this.chooseDialogEnum.subject:
          return {
            value: 'budgetSubjectCode',
            name: 'budgetSubjectName'
          }
        default:
          return {}
      }
    }
  },
  watch: {
    pcontent (to) {
      this.content = to
    }
  },
  methods: {
    showSelect () {
      this.dialogVisible = true
    },
    selectClicked (aItem) {
      // console.log('clicked!!')
      console.log('advance selected:::', aItem)
      if(this.translateDic !== {}) {
        this.content = aItem[this.translateDic['name']]
        this.realValue = aItem[this.translateDic['name']]
      }
      this.$emit('valueChanged', this.realValue)
      this.dialogVisible = false
    },
    setDialogClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blockContent {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .blockLeft {
    background-color: #f4f4f4;
    float: left;
    text-align: center;
    width: 140px;
    min-height: 26px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }

  .blockRight {
    background-color: #eff3f6;
    float: left;
    padding-left: 8px;
    min-height: 26px;
    width: 340px;
    min-width: 340px;
    text-align: start;
    border-bottom: 1px solid #e3e3e3;
  }

  .blockRightLong {
    background-color: #eff3f6;
    float: left;
    padding-left: 8px;
    min-height: 26px;
    width: 830px;
    min-width: 830px;
    text-align: start;
    border-bottom: 1px solid #e3e3e3;
  }

  .selectRecord {
    background: url(/static/images/contentBg.png) no-repeat -116px -212px;
    cursor: pointer;
    width: 16px;
    height: 15px;
    border: 0;
  }

  .aSpan {
    display: block;
    margin-top: 4px;
  }

  .aInput {
    width: 240px;
    margin-top: 4px;
  }
</style>
