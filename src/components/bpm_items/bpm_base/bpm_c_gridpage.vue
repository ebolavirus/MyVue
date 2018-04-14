<template>
  <div class="head" :v-show="show">
    <saber-pop ref="popover1" placement="bottom" width="100" v-model="visible1" trigger="click">
      <div dir="ltr" class="dhx_toolbar_poly_18_dhx_skyblue">
        <table class="buttons_cont" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
          <tbody>
          <tr v-for="(val,i) in pageArray" :key="i"
              class="tr_btn"
              @click="choosePage(val)"
              onmouseover="this.className='tr_btn dhx_toolbar_over'"
              onmouseout="this.className='tr_btn'">
            <td class="td_btn_txt">Page {{val}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </saber-pop>
    <saber-pop ref="popover2" placement="bottom" width="160" v-model="visible2" trigger="click">
      <div dir="ltr" class="dhx_toolbar_poly_18_dhx_skyblue">
        <table class="buttons_cont" cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
          <tbody>
          <tr v-for="(val,i) in countPerRow" :key="i"
              class="tr_btn"
              @click="choosePageCount(val)"
              onmouseover="this.className='tr_btn dhx_toolbar_over'"
              onmouseout="this.className='tr_btn'">
            <td class="td_btn_txt">{{val}} rows per page</td>
          </tr>
          </tbody>
        </table>
      </div>
    </saber-pop>
    <div class="float_left">
      <div class="dhx_toolbar_btn"
           onmouseover="this.className='dhx_toolbar_btn dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btn'"
      @click="btnClick(1)">
        <img src="/static/images/ar_left_abs_dis.gif">
      </div>
      <div class="dhx_toolbar_btn"
           onmouseover="this.className='dhx_toolbar_btn dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btn'"
           @click="btnClick(2)">
        <img src="/static/images/ar_left_dis.gif">
      </div>
      <div class="dhx_toolbar_text">
        <div class="middle">Records from {{numFrom}} to {{numTo}}</div>
      </div>
      <div class="dhx_toolbar_btn"
           onmouseover="this.className='dhx_toolbar_btn dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btn'"
           @click="btnClick(3)">
        <img src="/static/images/ar_right_dis.gif">
      </div>
      <div class="dhx_toolbar_btn"
           onmouseover="this.className='dhx_toolbar_btn dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btn'"
           @click="btnClick(4)">
        <img src="/static/images/ar_right_abs_dis.gif">
      </div>
      <div class="dhx_toolbar_btn def" style="width: 100px;"
           onmouseover="this.className='dhx_toolbar_btn dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btn'"
           v-popover:popover1 >
          <div class="middle">Page {{currentPage}}◢</div>
      </div>
      <div class="dhx_toolbar_btn def" style="width: 160px;"
           onmouseover="this.className='dhx_toolbar_btn dhx_toolbar_over'"
           onmouseout="this.className='dhx_toolbar_btn'"
           v-popover:popover2 >
          <div class="middle">{{currentCountPerRow}} rows per page◢</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bpmCGridpage',
  data () {
    return {
      visible1: false,
      visible2: false,
      collapse: false,
      countPerRow: [5, 10, 15, 20, 25, 30],
      currentCountPerRow: 10,
      currentPage: 1,
      maxPage: this.pageNum
    }
  },
  props: {
    pageNum: {
      type: Number,
      default: 3
    },
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    },
    param: '',
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentPage (to) {
      this.$emit('pageChanged', to)
    },
    currentCountPerRow (to) {
      this.$emit('numPerPageChanged', to)
    }
  },
  computed: {
    pageArray () {
      let array = []
      for (let i = 1; i <= this.maxPage; i++) {
        array.push(i)
      }
      return array
    },
    numFrom () {
      return (this.currentPage - 1) * this.currentCountPerRow + 1
    },
    numTo () {
      return this.currentPage * this.currentCountPerRow
    }
  },
  methods: {
    pclick () {
      this.isCollapse = !this.isCollapse
      this.$emit('click', this.param)
    },
    makeOver (aover) {
      console.log(aover)
    },
    choosePageCount (acount) {
      console.log(acount)
      this.currentCountPerRow = acount
      this.visible2 = false
    },
    choosePage (acount) {
      console.log(acount)
      this.currentPage = acount
      this.visible1 = false
    },
    btnClick (aIndex) {
      switch (aIndex) {
        case 1:this.currentPage = 1; break
        case 2:this.currentPage > 1 && this.currentPage--; break
        case 3:this.currentPage < this.maxPage && this.currentPage++; break
        case 4:this.currentPage = this.maxPage; break
      }
    }
  }
}
</script>

<style scoped>
  .head {
    float: left;
    background-image: url(/static/images/dhxtoolbar_imgs.gif);
    background-position: 0px -0px;
    background-repeat: repeat-x;
    direction: ltr;
    width: 100%;
    display: block;
    height: 27px;
  }

  .dhx_toolbar_btn {
    display: block;
    float: left;
    height: 18px;
    margin: 2px 1px 0px 2px;
    padding: 3px 3px 2px 3px;
    position: relative;
    width: 24px;
  }

  .dhx_toolbar_over {
    background-image: url(/static/images/dhxtoolbar_imgs.gif);
    background-repeat: repeat-x;
    background-position: 0 -54px;
  }

  .dhx_toolbar_text {
    float: left;
    vertical-align: middle;
    font-size: 11px;
    margin-top: 5px;
    margin-right: 1px;
    padding: 0 4px;
    width: 150px;
  }

  .float_left {
    float: left;
  }

  .dhxtoolbar_hdrline_r {
    background-image: url(/static/images/dragImage.png);
    background-position: 0px 0px;
    background-repeat: no-repeat;
    right: 0 !important;
    direction: ltr;
    height: 25px;
    padding: 0px 5px 0px 5px;
    width: 36px;
  }

  .dhx_toolbar_arw {
    display: block;
    float: left;
    font-size: 12px;
    margin: 2px 1px 0px -2px;
    padding: 3px 3px 2px 3px;
  }

  .arwimg {
    background-image: url(/static/images/dhxtoolbar_imgs.gif);
    background-position: -2px -177px;
    background-repeat: no-repeat;
    height: 16px;
    margin-top: 2px;
    width: 7px;
  }
  .middle {
    width: 100%;
    text-align: center;
  }
  .right {
    width: 100%;
    text-align: right;
  }

  .dhx_toolbar_poly_18_dhx_skyblue {
    margin: 0;
    padding: 0;
    border: #a4bed4 1px solid;
    background-color: #eaf2fb;
    overflow: hidden;
    cursor: default;
    line-height: normal;
  }
  .tr_btn {
    height: 24px;
  }
  .td_btn_txt {
    width: 100%;
    font-size: 1px;
    vertical-align: middle;
    text-align: center;
  }
</style>
