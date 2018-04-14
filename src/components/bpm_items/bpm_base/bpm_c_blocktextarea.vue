<template>
  <div class="blockContent" :v-show="show">
    <div class="blockLeft"><span class="aSpan">{{title}}</span></div>
    <div class="blockRightLong">
      <textarea class="textarea"
                draggable="false"
                @change="changeAction"
                v-model="realValue"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCBlockTextarea',
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
    min-height: 58px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }
  .blockRightLong {
    background-color: #eff3f6;
    float: left;
    padding-left: 8px;
    min-height: 58px;
    width: 830px;
    min-width: 830px;
    text-align: start;
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
  .textarea {
     min-width: 800px;
     height: 40px;
     margin: 3px 30px 3px 0px;
     font: 13px Arial;
   }
</style>
