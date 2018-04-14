<template>
  <div class="saber-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
    <div
      class="saber-dialog"
      :class="[{ 'is-fullscreen': fullscreen, 'saber-dialog--center': center }, customClass]"
      ref="dialog"
      :style="style">
      <div class="saber-dialog__header" v-show="showTitle">
        <slot name="title">
          <span class="saber-dialog__title">{{ title }}</span>
        </slot>
        <button
          type="button"
          class="saber-dialog__headerbtn"
          aria-label="Close"
          v-if="showClose"
          @click="handleClose">
          <i class="saber-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="saber-dialog__body"
           :style="styleStr"
           v-if="rendered">
        <slot></slot>
      </div>
      <div class="saber-dialog__footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from 'element-ui/src/utils/popup'
import Migrating from 'element-ui/src/mixins/migrating'
import emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'ElDialog',

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ''
    },

    modal: {
      type: Boolean,
      default: true
    },

    showTitle: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: false
    },

    showClose: {
      type: Boolean,
      default: false
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ''
    },

    top: {
      type: String,
      default: '15vh'
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: true
    },
    styleStr: {
      type: String,
      default: 'padding: 0px'
    }
  },

  data () {
    return {
      closed: false
    }
  },

  watch: {
    visible (val) {
      if (val) {
        this.closed = false
        this.$emit('open')
        this.$el.addEventListener('scroll', this.updatePopper)
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
        })
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      } else {
        this.$el.removeEventListener('scroll', this.updatePopper)
        if (!this.closed) this.$emit('close')
      }
    }
  },

  computed: {
    style () {
      let style = {}
      if (this.width) {
        style.width = this.width
      }
      if (!this.fullscreen) {
        style.marginTop = this.top
      }
      return style
    }
  },

  methods: {
    getMigratingConfig () {
      return {
        props: {
          'size': 'size is removed.'
        }
      }
    },
    handleWrapperClick () {
      if (!this.closeOnClickModal) return
      this.handleClose()
    },
    handleClose () {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide)
      } else {
        this.hide()
      }
    },
    hide (cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    updatePopper () {
      this.broadcast('ElSelectDropdown', 'updatePopper')
      this.broadcast('ElDropdownMenu', 'updatePopper')
    }
  },

  mounted () {
    if (this.visible) {
      this.rendered = true
      this.open()
      if (this.appendToBody) {
        document.body.appendChild(this.$el)
      }
    }
  },

  destroyed () {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-modal-enter {
    -webkit-animation: v-modal-in .2s ease;
    animation: v-modal-in .2s ease
  }

  .v-modal-leave {
    -webkit-animation: v-modal-out .2s ease forwards;
    animation: v-modal-out .2s ease forwards
  }

  @-webkit-keyframes v-modal-in {
    0% {
      opacity: 0
    }
  }

  @keyframes v-modal-in {
    0% {
      opacity: 0
    }
  }

  @-webkit-keyframes v-modal-out {
    100% {
      opacity: 0
    }
  }

  @keyframes v-modal-out {
    100% {
      opacity: 0
    }
  }

  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .5;
    background: #000
  }

  .saber-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 50%
  }

  .saber-dialog.is-fullscreen {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    height: 100%;
    overflow: auto
  }

  .saber-dialog__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0
  }

  .saber-dialog__header {
    background-color: rgb(171, 214, 255);
    background-image: linear-gradient(rgba(255, 255, 255, 0.701961) 0%, rgba(255, 255, 255, 0) 100%);
    background-repeat: repeat-x;
    width: 100%;
    height: 25px;
    vertical-align: middle;
    border-bottom: 1px solid #ffffff;
  }

  .saber-dialog__headerbtn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: 0 0;
    border: none;
    outline: 0;
    cursor: pointer;
    font-size: 16px
  }

  .saber-dialog__headerbtn .saber-dialog__close {
    color: #909399
  }

  .saber-dialog__headerbtn:focus .saber-dialog__close, .saber-dialog__headerbtn:hover .saber-dialog__close {
    color: #409EFF
  }

  .saber-dialog__title {
    color: rgb(0, 0, 0);
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px;
    font-weight: normal;
    vertical-align: middle;
  }

  .saber-dialog__body {
    background: #ffffff repeat-x top left;
    border-top: 1px solid #759dc0;
    padding: 10px;
    position: relative;
  }

  .saber-dialog__footer {
    padding: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .saber-dialog--center {
    text-align: center
  }

  .saber-dialog--center .saber-dialog__body {
    text-align: initial;
  }

  .saber-dialog--center .saber-dialog__footer {
    text-align: inherit
  }

  .dialog-fade-enter-active {
    -webkit-animation: dialog-fade-in .3s;
    animation: dialog-fade-in .3s
  }

  .dialog-fade-leave-active {
    -webkit-animation: dialog-fade-out .3s;
    animation: dialog-fade-out .3s
  }

  @-webkit-keyframes dialog-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }

  @keyframes dialog-fade-in {
    0% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
    100% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
  }

  @-webkit-keyframes dialog-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
  }

  @keyframes dialog-fade-out {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1
    }
    100% {
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
      opacity: 0
    }
  }
</style>
