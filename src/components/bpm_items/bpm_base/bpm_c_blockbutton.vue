<template>
  <div class="blockContent" :v-show="show">
    <div class="blockLeft">
      <button type="button" class="confirmbtn" @click="buttonClick">{{title}}</button>
    </div>
    <div :class="pline === 1?'blockRightLong':'blockRight'">
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCBlockbutton',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    // 可能占一整行或行的一半
    pline: {
      type: Number,
      default: 2
    },
    ptitle: {
      type: String,
      default: ' '
    }
  },
  data: function () {
    return {}
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    }
  },
  methods: {
    buttonClick () {
      // console.log('clicked!!')
      this.$emit('buttonClick')// ,{item})
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

  .confirmbtn {
    background-color: rgb(217, 233, 247);
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    display: inline-block;
    font-family: Arial;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    margin: 1px;
    padding: 0px 6px 0px 6px;
    text-align: center;
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

  .Wdate {
    border: #999 1px solid;
    height: 20px;
    background: #fff url(/static/images/datePicker.gif) no-repeat right;
  }

  .selectRecord {
    background: url(/static/images/contentBg.png) no-repeat -116px -212px;
    cursor: pointer;
    width: 16px;
    height: 15px;
    border: 0;
  }

  .aClass {
    display: block;
    margin-top: 4px;
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
