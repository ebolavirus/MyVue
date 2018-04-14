<template>
  <div class="libtabborder">
      <div v-for="(val,i) in ptabs"
           :key="i"
           @click="setTab(i)"
           :class="getClassName(i)">{{val}}</div>
      <div class="aleft"/>
  </div>
</template>

<script>
export default {
  name: 'bpmCTab',
  model: {
    prop: 'pcontent',
    event: 'changed'
  },
  props: {
    ptabs: {
      type: Array,
      default () {
        return []
      }
    },
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
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      tabIndex: this.pcontent
    }
  },
  computed: {
    title () {
      return this.ptitle && this.ptitle === '' ? ' ' : this.ptitle
    },
    content () {
      return this.pcontent && this.pcontent === '' ? ' ' : this.pcontent
    }
  },
  watch: {
    pcontent (to) {
      this.tabIndex = to
    }
  },
  methods: {
    selectClicked: function () {
      // console.log('clicked!!')
      this.$emit('selectClick')// ,{item})
    },
    setTab (index) {
      this.tabIndex = index
      this.$emit('changed', this.tabIndex)
      this.$emit('tabChanged', index)
    },
    getClassName (index) {
      if (index === this.tabIndex) {
        return 'ahover'
      }
      return 'ali'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .libtabborder {
    width: 100%;
    padding: 0;
    margin: 0;
    text-align: center;
    vertical-align: bottom;
  }

  .ali {
    background-color: #f4f4f4;
    color: #0042ae;
    float: left;
    text-align: center;
    vertical-align: bottom;
    width: 150px;
    min-height: 26px;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding: 2px 0px 0px 0px;
    font-weight: normal;
  }

  .aleft {
    background-color: #f4f4f4;
    color: #0042ae;
    float: left;
    text-align: center;
    vertical-align: bottom;
    min-width: 375px;
    min-height: 26px;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding: 2px 0px 0px 0px;
    font-weight: normal;
  }

  .ahover {
    background-color: #ffffff;
    color: #0042ae;
    float: left;
    text-align: center;
    vertical-align: bottom;
    width: 150px;
    min-height: 26px;
    border-right: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    padding: 2px 0px 0px 0px;
    font-weight: bold;
  }
</style>
