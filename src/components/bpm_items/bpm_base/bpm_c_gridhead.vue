<template>
  <div :v-show="show">
    <div class="head jlayoutBetween">
      <div class="icon icon1">{{title}}
      </div>
      <div class="rPadding rIcon2">
      </div>
    </div>
    <div class="content" style="display: block">

    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCSubtitle',
  data () {
    return {
      collapse: false
    }
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '表单内容详情'
    },
    param: ''
  },
  methods: {
  }
}
</script>

<style scoped>
  .head {
    width: 100%;
    text-align: left;
    background: url(/static/images/contentBg.png) repeat-x 0 -387px;
    height: 24px;
  }

  .content {
    width: 100%;
  }

  .icon {
    font-size: 12px;
    padding-left: 12px;
    color: #ab51ab;
    line-height: 24px;
    height: 20px;
    margin: 0;
    margin-left: 30px;
    float: left;
    width: 300px;
    font-weight: 100;
  }

  .icon1 {
    background: url(/static/images/contentBg.png) no-repeat -193px -147px;
  }

  .rIcon2 {
    background: url(/static/images/contentBg.png) no-repeat -206px -127px;
  }

  .rPadding {
    cursor: pointer;
    height: 14px;
    width: 13px;
    margin-right: 12px;
  }
</style>
