<template>
  <div class="head">
    <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
         v-show="indexOfShowArray('zhizheng')"
         title="add"
         onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
         onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
         @click="zhizhengClicked">
      <img src="/static/images/addBtn.jpg" class="span_image">
      <div class="dhx_toolbar_txt">制证</div>
    </div>
    <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
         v-show="indexOfShowArray('add')"
         title="add"
         onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
         onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
         @click="addClicked">
      <img src="/static/images/addBtn.jpg" class="span_image">
      <div class="dhx_toolbar_txt">新增</div>
    </div>
    <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
         v-show="indexOfShowArray('update')"
         onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
         onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
         @click="updateClicked">
      <img src="/static/images/save.gif" class="span_image">
      <div class="dhx_toolbar_txt">修改</div>
    </div>
    <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
         v-show="indexOfShowArray('save')"
         onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
         onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
         @click="saveClicked">
      <img src="/static/images/save.gif" class="span_image">
      <div class="dhx_toolbar_txt">保存</div>
    </div>
    <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
         v-show="indexOfShowArray('delete')"
         onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
         onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
         @click="deleteClicked">
      <img src="/static/images/delBtn.jpg" class="span_image">
      <div class="dhx_toolbar_txt">删除</div>
    </div>
    <div v-show="show">
      <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
           onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
           @click="rightSaveClicked">
        <img src="/static/images/save.gif" class="span_image">
        <div class="dhx_toolbar_txt">保存</div>
      </div>
      <div class="dhx_toolbar_btnbase dhx_toolbar_btn"
           onmouseover="this.className='dhx_toolbar_btnbase dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btnbase dhx_toolbar_btn'"
           @click="rightCancelClicked">
        <img src="/static/images/delBtn.jpg" class="span_image">
        <div class="dhx_toolbar_txt">隐藏</div>
      </div>
    </div>
    <div class="dhx_toolbar_text" title="">{{note}}</div>
  </div>
</template>
<script>
import $ from 'jquery'
import {mapState, mapActions} from 'vuex'
import JS_Reimburse_ApproveFee from '../../../js/business/SSCV3/Reimburse/SSCV3.Reimburse_ApproveFee.js'

export default {
  name: 'bpmCGridbar',
  data () {
    return {
      collapse: false
    }
  },
  computed: {
    ...mapState(['tsPiid', 'ssc', 'tsId'])
  },
  props: {
    showArray: {
      type: Array,
      default () {
        return ['zhizheng', 'add', 'update', 'delete', 'save']
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    param: '',
    isCollapse: {
      type: Boolean,
      default: false
    },
    note: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions(['PREXPR_AJAX_CheckReimburseByTsId']),
    pclick () {
      this.isCollapse = !this.isCollapse
      this.$emit('click', this.param)
    },
    makeOver (aover) {
      console.log(aover)
    },
    zhizhengClicked () {
      JS_Reimburse_ApproveFee.cMakingMain()
    },
    addClicked () {
      this.$emit('addClicked')
    },
    updateClicked () {
      this.$emit('updateClicked')
    },
    deleteClicked () {
      this.$emit('deleteClicked')
    },
    saveClicked () {
      this.$emit('saveClicked')
    },
    rightCancelClicked () {
      this.$emit('rightCancelClicked')
    },
    rightSaveClicked () {
      this.$emit('rightSaveClicked')
    },
    indexOfShowArray (aStr) {
      let index = $.inArray(aStr, this.showArray)
      return index > -1
    }
  }
}
</script>

<style scoped>
  .head {
    float: left;
    background-image: url(/static/images/dhxtoolbar_imgs.gif);
    background-position: 0px -27px;
    background-repeat: repeat-x;
    direction: ltr;
    width: 100%;
    display: block;
    height: 27px;
  }

  .dhx_toolbar_btnbase {
    cursor: default;
    display: block;
    float: left;
    height: 18px;
    margin: 2px 1px 0px 2px;
    padding: 3px 3px 2px 3px;
    position: relative;
    width: 48px;
  }

  .dhx_toolbar_btntail {
    cursor: default;
    display: block;
    float: left;
    height: 24px;
    margin: 5px 4px 2px 5px;
    position: relative;
    width: 60px;
  }

  .dhx_tail {
  }

  .dhx_toolbar_btn {
  }

  .dhx_toolbar_over {
    background-image: url(/static/images/dhxtoolbar_imgs.gif);
    background-repeat: repeat-x;
    background-position: 0 -54px;
  }

  .dhx_toolbar_txt {
    margin: 2px 2px 0 2px;
    float: right;
    font-size: 11px;
    line-height: normal;
    height: 16px;
    cursor: default;
  }

  .dhx_toolbar_text {
    float: left;
    vertical-align: middle;
    font-size: 11px;
    margin-top: 5px;
    margin-right: 1px;
    padding: 0 4px;
    color: #0000ff;
  }

  .span_image {
    width: 18px;
    height: 18px;
  }
</style>
