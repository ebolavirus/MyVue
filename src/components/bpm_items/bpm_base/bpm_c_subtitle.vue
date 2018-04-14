<template>
  <div :v-show="show">
    <div class="head jlayoutBetween" @click="pclick" style="margin-top: 1px;">
      <div class="icon" :class="isCollapse?'icon1':'icon2'">{{title}}
      </div>
      <div class="rPadding" :class="isCollapse?'rIcon1':'rIcon2'">
      </div>
    </div>
    <div class="content" :style="isCollapse?'display: block':'display: none'">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bpmCSubtitle',
  data () {
    return {
      isCollapse: true
    }
  },
  props: {
    type: {
      type: String,
      default: '1'
    },
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    },
    param: ''
  },
  methods: {
    pclick () {
      this.isCollapse = !this.isCollapse
      this.$emit('click', this.param)
    }
  }
}
</script>

<style scoped>
  .head{
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
    color: #1b51ab;
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

  .icon2 {
    background: url(/static/images/contentBg.png) no-repeat -193px -147px;
  }

  .rIcon1 {
    background: url(/static/images/contentBg.png) no-repeat -192px -127px;
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
