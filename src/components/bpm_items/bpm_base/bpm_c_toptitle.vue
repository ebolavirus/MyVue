<template>
  <div :v-show="show">
    <div class="head jlayoutBetween" @click="pclick" style="margin-top: 1px;">
      <div class="icon">{{title}}
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
  .head {
    width: 100%;
    text-align: left;
    vertical-align: middle;
    background: url(/static/images/contentBg.png) repeat-x 0 -363px;
    height: 24px;
  }

  .content {
    width: 100%;
  }

  .icon {
    font-size: 12px;
    font-weight: bolder !important;
    padding: 0px 0px 0px 22px;
    color: #000;
    height: 20px;
    margin: 0;
    margin-left: 12px;
    float: left;
    width: 300px;
    font-weight: 100;
    background: url(/static/images/contentBg.png) no-repeat -192px -97px;
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
