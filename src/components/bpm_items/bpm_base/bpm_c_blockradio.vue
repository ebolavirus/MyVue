<template>
  <div class="blockContent" :v-show="show">
    <div class="blockLeft"><span class="aSpan">{{title}}</span></div>
    <div class="blockRightLong">
      <div class="radioContent" data-validateexp="">
        <span v-for="(val,i) in poptions"
              :key="i">
          <input type="radio" v-model="radioValue" :value="pvalues[i]" name="CVPageText3">{{val}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCBlockradio',
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
    ptitle: {
      type: String,
      default: ' '
    },
    poptions: {
      type: Array,
      default () {
        return ['中国', '其他国家']
      }
    },
    pvalues: {
      type: Array,
      default () {
        return ['IN', 'OUT']
      }
    },
    pcontent: {
      type: String,
      default: 'IN'
    }
  },
  data () {
    return {
      radioValue: this.pcontent
    }
  },
  watch: {
    radioValue (to) {
      this.$emit('changed', to)
    }
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    },
    content () {
      return this.pcontent && this.pcontent === '' ? ' ' : this.pcontent
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
  .blockRightLong {
    background-color: #eff3f6;
    float: left;
    padding: 0px 0px 0px 4px;
    min-height: 26px;
    min-width: 830px;
    text-align: start;
    border-width: 0px 0px 1px 0px;
    border-bottom: 1px solid #e3e3e3;
  }
  .aSpan {
    display: block;
    margin-top: 4px;
  }
  .radioContent {
    margin-top: 4px;
    vertical-align: middle;
  }
</style>
