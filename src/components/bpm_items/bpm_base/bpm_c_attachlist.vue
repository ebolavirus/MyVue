<template>
  <div class="attachlistdiv" :v-show="show">
    <table class="documentListTable" id="documentListTable">
      <tr class="documentListTR">
        <th class="documentListTH" style="flex: 5;">文件名</th>
        <th class="documentListTH" style="flex: 1;">操作</th>
      </tr>
      <tr v-for="(val,i) in attachList"
          :key="i">
        <td class="classNameTd">{{val.name}}</td>
        <td class="classActionsTd">
          <span class=""></span>
          <a class="">
            <img src="/static/images/ecm_viewdocument_image.png" height="16" width="16" title="查看文档">
          </a>
          <a class="">
            <img src="/static/images/ecm_updatedocument_image.png" height="16" width="16" title="更新文档">
          </a>
          <a class="">
            <img src="/static/images/ecm_documentversions_image.png" height="16" width="16" title="修订版">
          </a>
          <a class="">
            <img src="/static/images/ecm_documentdelete_image.png" height="16" width="16" title="删除">
          </a>
        </td>
      </tr>
      <tr class="">
        <td class="classNavBar" colspan="6">
          <a v-show="currentPage > 1" @click="prevClicked">
            <img src="/static/images/prev.png" height="16" width="16">后退</a>
          <span class="">&nbsp;&nbsp;&nbsp; 页面 : </span>
          <span class="selectedPage">{{currentPage}}</span>
          <span class="">&nbsp;&nbsp;&nbsp;</span>
          <a v-show="pageSum > currentPage" @click="nextClicked">
            下一页<img src="/static/images/next.png" height="16" width="16">
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'bpmCAttachlist',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      attachList: [{
        name: 'engine_dev.js'
      }, {
        name: 'engine_dev.js'
      }],
      pageSum: 2,
      currentPage: 1
    }
  },
  methods: {
    prevClicked () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextClicked () {
      if (this.pageSum > this.currentPage) {
        this.currentPage++
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .attachlistdiv {
    padding: 5px;
  }

  .documentListTable {
    width: 100%;
    border: 1px solid #bbb;
    border-collapse: collapse;
    border-spacing: 2px;
  }

  .documentListTR {
    vertical-align: middle;
  }

  .documentListTH {
    background-image: -webkit-gradient(linear, 0% 100%, 0% 0%, from(rgb(177, 190, 199)), to(rgb(234, 234, 234)));
    border: 1px solid #bbb;
    border-collapse: collapse;
    color: rgb(45, 45, 45);
    font-size: 12px;
    font-weight: bold;
    padding: 5px 8px 5px 8px;
    text-align: center;
    vertical-align: middle;
  }
  .classNameTd {
    background-color: #fafafa;
    padding: 5px 8px 5px 8px;
    border: 1px solid #bbb;
    border-collapse: collapse;
    text-align: start;
  }
  .classActionsTd {
    width: 100px;
    background-color: #fafafa;
    padding: 5px 8px 5px 8px;
    border: 1px solid #bbb;
  }
  .classNavBar {
    font-weight: bold;
    background-color: #ebebeb;
    text-align: center;
    padding: 5px 8px 5px 8px;
    border-bottom: none;
    border: 1px solid #bbb;
    border-collapse: collapse;
  }
</style>
