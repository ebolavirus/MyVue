<template>
  <div class="blockContent">
    <div class="blockLeft"><span class="aSpan">{{title}}</span></div>
    <div :class="pline === 1?'blockRightLong':'blockRight'">
      <a target="_blank" class="aClass" :href="content.url"><font color="#0000ff">{{content.text}}</font></a>
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
      default: ''
    }
  },
  data: function () {
    return { }
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    },
    content () {
      return JSON.parse(this.pcontent)
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
  .aClass {
    display: block;
    margin-top: 4px;
  }
  .aSpan {
    display: block;
    margin-top: 4px;
  }
</style>
