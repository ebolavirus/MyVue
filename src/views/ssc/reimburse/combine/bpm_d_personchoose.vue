<template>
  <div class="blockContent">
    <table width="980px" class="userTable" cellspacing="0" cellpadding="5" height="500px">
      <tbody>
      <tr valign="top">
        <!--<td class="userTableTd" min-width="20%">-->
        <!--<table class="userTableTdTable">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td width="54%" valign="middle"><input id="nodeName"></td>-->
        <!--<td width="13%" valign="middle"><input id="nodeLocation" type="button"></td>-->
        <!--<td width="9%" valign="middle"><input id="prev" type="button"></td>-->
        <!--<td width="24%" valign="middle"><input id="next" type="button"></td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--&lt;!&ndash;<ul style="width:230px;height:400px;overflow:auto;" id="treeDemo_" class="ztree">&ndash;&gt;-->
        <!--&lt;!&ndash;<li id="treeDemo__1" class="level0" tabindex="0" hidefocus="true" treenode="">&ndash;&gt;-->
        <!--&lt;!&ndash;<span id="treeDemo__1_switch" title="" class="button level0 switch root_close" treenode_switch=""></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<a id="treeDemo__1_a" class="level0" treenode_a="" onclick="" target="_blank" style="" title="万华集团">&ndash;&gt;-->
        <!--&lt;!&ndash;<span id="treeDemo__1_ico" title="" treenode_ico="" class="button ico_close" style=""></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span id="treeDemo__1_span" class="node_name">万华集团</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</a>&ndash;&gt;-->
        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
        <!--</td>-->
        <td bgcolor="#fdfdfd" style="padding:10px;">
          <div class="queryuser">
            <div class="queryborder">
              <table align="center">
                <tbody>
                <tr>
                  <td><span id="orgFullName">搜索条件</span></td>
                  <td><input id="keywords" onkeydown="enterSumbit()">&nbsp;&nbsp;</td>
                  <td><input id="keywords_search" @click="queryKeywordsUserList" class="search" type="button"
                             value="查询">&nbsp;&nbsp;
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div id="middleTd" style=" margin-top:10px;">
            <table cellspacing="0" cellpadding="0" width="100%" class="querytable">
              <thead>
              <tr class="querytableTr">
                <td width="5%"><input style="display:none" onclick="checkAll(this);" id="checkAll" type="checkbox"></td>
                <td width="10%">ID</td>
                <td width="15%">姓名</td>
                <td width="45%">部门</td>
                <td width="10%">工号</td>
              </tr>
              </thead>
              <tbody id="dataTable" class="MMTab">
              <tr style="height:18px;" v-for="(val,i) in choiceArray" :key="i">
                <td>
                  <input name="userCheck" @click="userCheckChange(val)" class="userCheck" type="radio">
                </td>
                <td><font color="red">{{val.uid}}</font></td>
                <td>{{val.cn}}</td>
                <td>{{val.displayname}}</td>
                <td>{{val.employeenumber}}</td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="5" style="height:27px;">
                  <div class="singleDivBg">
                    <table style="margin: 0 auto;">
                      <tbody>
                      <tr>
                        <td><span id="undefined" style="cursor: default;font-size:13px;">Total
                          &nbsp;
                          <span id="resultCount">0</span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <a href="#" onclick="javascript:firstPage();return false;">
                            <img width="18" height="18" title="首页" alt="首页"
                                 src="/static/images/ecsbpm/page/index3.gif"
                                 style="border: 0">
                          </a>
                          &nbsp;
                          <a href="#" onclick="javascript:prevPage();return false;">
                            <img width="18" height="18" title="上一页" alt="上一页"
                                 src="/static/images/ecsbpm/page/pre3.gif" style="border: 0">
                          </a>
                          &nbsp;
                          <a href="#" onclick="javascript:nextPage();return false;">
                            <img width="18" height="18" title="下一页" alt="下一页"
                                 src="/static/images/ecsbpm/page/next3.gif"
                                 style="border: 0">
                          </a>
                          &nbsp;
                          <a href="#" onclick="javascript:lastPage();return false;">
                            <img width="18" height="18" title="尾页" alt="尾页"
                                 src="/static/images/ecsbpm/page/last3.gif"
                                 style="border: 0"></a>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <span style="cursor: default;font-size:13px;">
                            <span id="currPage">1</span>/<span id="pageCount">0</span>&nbsp;page
                          </span>
                        </span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
        </td>
        <td colspan="2" id="userList" width="50%">
          <div class="usertitle">已选中人员列表</div>
          <div style="padding:10px;">
            <!--<input style="display:none;" id="selectedUser" class="" onkeydown="selecLocate()">-->
            <select id="selectedUserList" multiple="multiple">
              <option v-for="(val,i) in selectArray" :key="i">{{val.cn}}({{val.uid}})</option>
            </select>
            <br>
            <div class="groupBtnRihgt"><input class="groupBtn" type="button" @click="delete_" value="移除"></div>
            <div class="groupBtnRihgt"><input class="groupBtn" type="button" @click="deleteAll" value="全部移除"></div>
            <!--<div class="groupBtnRihgt"><input class="groupBtn" type="hidden" onclick="up_()" value="向上"></div>-->
            <!--<div class="groupBtnRihgt"><input class="groupBtn" type="hidden" onclick="down_()" value="向下"></div>-->
            <!--<div class="groupBtnRihgt"><input class="groupBtn" type="hidden" onclick="top_()" value="置顶"></div>-->
            <!--<div class="groupBtnRihgt"><input class="groupBtn" type="hidden" onclick="bottom_()" value="置底"></div>-->
          </div>
        </td>
      </tr>
      <tr class="userBottom">
        <td height="33" colspan="4">
          <center>
            <input type="button" id="DF_00005" value=" 确 定 " @click="btnClick(1)">
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" id="DF_00006" value=" 取 消 " @click="btnClick(2)">
          </center>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'bpmDPersonchoose',
  props: {
    pselectType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      msg: 'Welcome to  Vue.js App',
      choiceArray: [],
      selectArray: []
    }
  },
  computed: {
    ...mapState(['chooseDialogEnum'])
  },
  methods: {
    btnClick (aIndex) {
      if (aIndex === 2) {
        this.$emit('closeClicked')
      } else {
        this.$emit('selectClicked', this.selectArray.length > 0 ? this.selectArray[0] : {})
      }
    },
    delete_ () {
      this.selectArray.splice(0, this.selectArray.length)
    },
    deleteAll () {
      this.selectArray.splice(0, this.selectArray.length)
    },
    userCheckChange (aItem) {
      let appeard = false
      // 多选逻辑，勿删
      // for (let i in this.selectArray) {
      //   let item = this.selectArray[i]
      //   if (item.uid === aItem.uid) {
      //     appeard = true
      //   }
      // }
      // 单选逻辑，去掉全部元素
      this.selectArray.splice(0, this.selectArray.length)
      !appeard && this.selectArray.push(aItem)
    },
    queryKeywordsUserList () {
      this.choiceArray = [{
        uid: 'mmsun',
        cn: '孙明明',
        displayname: '生产技术部 - 日常项目',
        employeenumber: '222'
      }, {
        uid: 'mmsunA',
        cn: '孙明明',
        displayname: '协同办公',
        employeenumber: '80876'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blockContent {
    width: 980px;
    height: 500px;
  }

  .userTable {
    border-top: 1px solid #b9b9b9;
    border-left: 1px solid #b9b9b9;
    border-right: 1px solid #b9b9b9;
  }

  #nodeName {
    height: 18px;
    line-height: 18px;
    font-size: 16px;
    width: 100%;
    border-bottom: 1PX solid #e2e3ea;
    border-left: 1PX solid #e2e3ea;
    border-right: 1PX solid #e2e3ea;
    border-top: 1px solid #abadb3;
  }

  #nodeLocation {
    background: url(/static/images/rootGroup_06.jpg) no-repeat center top;
    width: 15px;
    height: 16px;
    border: none;
  }

  #prev {
    background: url(/static/images/rootGroup_09.jpg) no-repeat center top;
    width: 15px;
    height: 13px;
    border: none;
  }

  #next {
    background: url(/static/images/rootGroup_11.jpg) no-repeat center top;
    width: 15px;
    height: 13px;
    border: none;
  }

  .userTableTd {
    background: url(/static/images/rootGroup_29.jpg) repeat-y right top;
    background-color: #eff3f6;
    padding: 0px;
    width: 140px;
  }

  .userTableTdTable {
    background: url(/static/images/rootGroup_25.jpg) repeat-x center top;
    height: 33px;
    width: 99%;
  }

  .queryuser {
    border: 1px solid #cbcbcb;
    background-color: #FFF;
  }

  .queryborder {
    border: 5px solid #f8f8f8;
    margin: 1px;
    background-color: #fefefe;
    padding: 1px;
    font-size: 12px;
    color: #3e4858;
  }

  #keywords {
    height: 20px;
    line-height: 20px;
    width: 300px;
    font-size: 12px;
  }

  #keywords_search {
    background: url(/static/images/rootGroup_18.jpg) no-repeat center top;
    width: 85px;
    height: 27px;
    font-size: 12px;
    color: #58646d;
  }

  .querytable {
    font-size: 15px;
    overflow: scroll;
    text-align: center;
    border: 1px solid #b9b9b9;
  }

  .querytableTr {
    height: 32px;
    font-weight: bold;
    background: url(/static/images/title.jpg) repeat-x center top;
    color: #3e4858;
  }

  .MMTab {
    color: #5e6267;
    font-size: 12px;
    background: url(/static/images/userlist.jpg) repeat center top;
    table-layout: fixed;
  }

  .singleDivBg {
    background: url(/static/images/feny.jpg) repeat-x 0 0;
    color: #24386B;
    height: 27px;
  }

  #userList {
    background: url(/static/images/rootGroup_21.jpg) repeat-y left top;
    background-color: #eff3f6;
    padding: 0px;
    margin: 0px;
    width: 20%;
  }

  .usertitle {
    background: url(/static/images/rootGroup_03.jpg) no-repeat left center;
    height: 28px;
    font-size: 12px;
    font-weight: bolder;
    line-height: 28px;
    padding-left: 10px;
    color: #3e4858;
  }

  #selectedUser {
    height: 18px;
    line-height: 30px;
    font-size: 18px;
    width: 100%;
  }

  #selectedUserList {
    border: 1px solid #CCCCCC;
    height: 250px;
    margin-top: 10px;
    width: 100%;
  }

  .groupBtnRihgt {
    background: url(/static/images/rootGroup.jpg) no-repeat left top;
    margin-top: 6px;
    padding-left: 2px;
    margin-right: 8px;
    float: left;
  }

  .groupBtn {
    background: url(/static/images/rootGroup_33.jpg) no-repeat right top;
    padding-left: 4px;
    padding-right: 4px;
    height: 20px;
    text-align: center;
    border: none;
    color: #3a3a3a;
    line-height: 20px;
  }

  .userBottom {
    background: url(/static/images/rootGroup_37.jpg) repeat-x center top;
    height: 46px;
  }

  #DF_00005 {
    background: url(/static/images/rootGroup_43.jpg) no-repeat center top;
    color: #ffffff;
    width: 53px;
    height: 27px;
    border: none;
    margin-left: 10px;
  }

  #DF_00006 {
    background: url(/static/images/rootGroup_40.jpg) no-repeat center top;
    width: 55px;
    height: 27px;
    border: none;
    color: #3a3a3a;
    margin-right: 10px;
  }

  #dataTable tr {
    line-height: 32px;
    overflow: hidden;
    height: 32px;
  }

  #dataTable td {
    border-right: 1px solid #dfdfdf;
  }

  .MMTab td {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 0px;
    height: 25px;
  }
</style>
