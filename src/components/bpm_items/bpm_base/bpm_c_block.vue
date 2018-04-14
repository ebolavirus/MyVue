<template>
  <bpm-c-blocktext v-if="pinputtype === 'text'"
                   :preadonly="preadonly"
                   :ptitle="ptitle"
                   v-model="realValue"
                   @valueChanged="valueChanged"
                   :pline="pline" />
  <bpm-c-blockurl v-else-if="pinputtype === 'url'"
                   :preadonly="preadonly"
                   :ptitle="ptitle"
                  v-model="realValue"
                   :pline="pline" />
  <bpm-c-blocknumber v-else-if="pinputtype === 'number'"
                   :preadonly="preadonly"
                   :ptitle="ptitle"
                     v-model="realValue"
                     @valueChanged="valueChanged"
                   :pline="pline" />
  <bpm-c-blockselect v-else-if="pinputtype === 'select'"
                     :preadonly="preadonly"
                     :ptitle="ptitle"
                     v-model="realValue"
                     :pselectType="pselectType"
                     @valueChanged="valueChanged"
                     :pline="pline" />
  <bpm-c-blockdate v-else-if="pinputtype === 'date'"
                     :preadonly="preadonly"
                     :ptitle="ptitle"
                   v-model="realValue"
                   @valueChanged="valueChanged"
                     :pline="pline" />
  <bpm-c-blocktextarea v-else-if="pinputtype === 'textarea'"
                      :preadonly="preadonly"
                      :ptitle="ptitle"
                       v-model="realValue"
                       @valueChanged="valueChanged"
                      :pline="pline" />
  <bpm-c-blockadvance v-else-if="isAdvance(pinputtype)"
                      :preadonly="preadonly"
                      :ptitle="ptitle"
                      :pselectType="pinputtype"
                      v-model="realValue"
                      @valueChanged="valueChanged"
                      :pline="pline" />
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
    show: {
      type: Boolean,
      default: true
    },
    // 只读/可编辑,
    preadonly: {
      type: Boolean,
      default: false
    },
    pselectType: {
      type: Number,
      default: 0
    },
    // 输入类型可选文本/链接/数字/日期/下拉/高级选择,仅可编辑状态有效
    // text,url,number,date,select,advanceselect
    pinputtype: {
      type: String,
      default: 'text'
    },
    // 可能占一整行或行的一半
    pline: {
      type: Number,
      default: 2
    },
    // 可能带注释文字信息（“如无同行人员填写无”）
    pnote: {
      type: String,
      default: ''
    },
    ptitle: {
      type: String,
      default: ' '
    },
    pcontent: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      realValue: this.pcontent
    }
  },
  watch: {
    pcontent (to) {
      this.realValue = to
    }
  },
  computed: {
    ...mapState(['chooseDialogEnum'])
  },
  methods: {
    valueChanged (aValue) {
      this.realValue = aValue
      this.$emit('changed', this.realValue)
      this.$emit('valueChanged', this.realValue)
    },
    isAdvance (pinputtype) {
      switch (pinputtype) {
        case this.chooseDialogEnum.reimbursecompanyname:
        case this.chooseDialogEnum.accountBankNumber:
        case this.chooseDialogEnum.gatherupname:
        case this.chooseDialogEnum.trainlink:
        case this.chooseDialogEnum.aboardlink:
        case this.chooseDialogEnum.reimbursecompanycostcenter:
        case this.chooseDialogEnum.internalorder:
        case this.chooseDialogEnum.subject:
          return true
        default:
          return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
