<template>
  <div class="blockContent">
    <div class="blockLeft">
      <span class="aSpan">{{title}}</span>
    </div>
    <div :class="pline === 1?'blockRightLong':'blockRight'">
      <span v-if="preadonly"
            class="aSpan">{{content}}</span>
      <input v-else
             type="number"
             v-model="realValue"
             @keypress="keyPressAction"
             @change="changeAction"
             class="aInput">
    </div>
  </div>
</template>

<script>
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
  data: function () {
    return {
      realValue: this.pcontent,
      pover: false
    }
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    },
    content () {
      return this.toHaveComma(this.realValue)
    }
  },
  watch: {
    pcontent (to) {
      this.realValue = to
    }
  },
  methods: {
    toHaveComma (value) {
      if (!value) {
        return '0'
      }
      // 判断是否是纯数字，如果不是不进行加点运算
      if (!this.validate(value)) { return value }
      value += ''
      var intPart = Math.floor(Number(value)) // 获取整数部分
      var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
      var floatPart = '.00' // 预定义小数部分
      var value2Array = value.split('.')
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString() // 拿到小数部分
        if (floatPart.length === 1) { // 补0,实际上用不着
          return intPartFormat + '.' + floatPart + '0'
        } else {
          return intPartFormat + '.' + floatPart
        }
      } else {
        return intPartFormat + floatPart
      }
    },
    keyPressAction (event) {
      return /[\d]/.test(String.fromCharCode(event.keyCode))
    },
    changeAction () {
      // console.log(event)
      this.$emit('changed', this.realValue)
      this.$emit('valueChanged', this.realValue)
    },
    // 正则表达式
    validate (value) {
      let reg = /^(\+)?\d+(\.\d+)?$/
      // var reg = new RegExp(vali, 'g')
      return reg.test(value)
    }
  },
  mounted () {
  },
  created () {
    // this.finalValue = this.varValue.value ? this.varValue.value + '' : ''
    // this.inputvalue = this.conf.config.attr.pre + this.finalValue
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

  .aSpan {
    display: block;
    margin-top: 4px;
  }

  .aInput {
    width: 240px;
    margin-top: 4px;
  }
</style>
