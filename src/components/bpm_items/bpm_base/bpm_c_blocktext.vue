<template>
  <div class="blockContent">
    <div class="blockLeft"><span class="aSpan">{{title}}</span></div>
    <div :class="pline === 1?'blockRightLong':'blockRight'">
      <span v-if="preadonly" class="aSpan">{{realValue}}</span>
      <input v-else type="text" v-model="realValue" class="aInput"
             @change="changeAction">
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCBlockText',
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
      type: String,
      default: ' '
    }
  },
  data: function () {
    return {
      realValue: this.pcontent
    }
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    }
  },
  watch: {
    pcontent (to) {
      this.realValue = to
    }
  },
  methods: {
    changeAction () {
      // console.log(event)
      this.$emit('changed', this.realValue)
      this.$emit('valueChanged', this.realValue)
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
  .aSpan {
    display: block;
    margin-top: 4px;
  }
  .aInput {
    width: 240px;
    margin-top: 4px;
  }
</style>
