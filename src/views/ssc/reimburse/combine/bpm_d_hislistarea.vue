<template>
  <bpm-c-toptitle title="历史"
                  :isCollapse="true">
    <div class="area">
    <table cellpadding="0" cellspacing="1" border="0" class="historyTable">
      <thead>
      <tr>
        <th width="5%" data-i18n="historyListIndex">序号</th>
        <th width="34%" data-i18n="historyListActName">任务名称</th>
        <th width="12%" data-i18n="historyListUserName">用户名
        </th>
        <th width="12%" data-i18n="historyListOperate">操作</th>
        <th width="16%" data-i18n="historyListReceTime">接收时间</th>
        <th width="16%" data-i18n="historyListCompTime">完成时间</th>
        <th width="5%" data-i18n="historyListUserTime">用时(天)</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(val,i) in gridInfo">
      <tr :key="i">
        <td rowspan="2">{{i+1}}</td>
        <td>{{val.info1}}</td>
        <td>{{val.info2}}({{val.info3}})</td>
        <td>{{val.info4}}</td>
        <td>{{val.info5}}</td>
        <td>{{val.info6}}</td>
        <td>{{val.info7}}</td>
      </tr>
      <tr :key="'list' + i">
        <td colspan="6" align="left">{{val.info8}}</td>
      </tr>
      </template>
      </tbody>
    </table>
    </div>
  </bpm-c-toptitle>
</template>

<script>
export default {
  name: 'bpmDHislistarea',
  data () {
    let gridInfo = [{
      info1: '起草',
      info2: '王燕燕',
      info3: 'YYWANGC',
      info4: '提交',
      info5: '2017-12-15 15:11:3',
      info6: '2017-12-15 15:11:14',
      info7: '0',
      info8: '同意'
    }, {
      info1: '扫描岗',
      info2: '扫描岗',
      info3: '扫描岗',
      info4: '驳回',
      info5: '2017-12-15 15:37:40',
      info6: '2017-12-15 15:37:42',
      info7: '0',
      info8: ''
    }]
    let taskInfo = {
      info1: '起草',
      info2: '王燕燕',
      info3: '单一签核'
    }
    return {
      gridInfo: gridInfo,
      taskInfo: taskInfo
    }
  },
  methods: {
    addClicked () {
    },
    updateClicked () {
    },
    deleteClicked () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .historyTable {
    font-size: 12px;
    background-color: #E3E3E3;
    width: 980px;
    padding: 0px;
    margin: 0px;
  }
  .area {
    width: 100%;
    min-height: 600px;
    background-color: #EFF3F6;
  }
  .historyTable thead tr {
    background-color: #F4F4F4;
    height: 24px;
    text-align: center;
  }
  .historyTable tbody tr {
    background-color: #EFF3F6;
    height: 24px;
    text-align: center;
  }
  th, td {
    padding: 0px;
    border-bottom: none;
  }
  tbody {
    padding: 0;
    margin: 0;
  }
  .historyTable thead tr th {
    font-weight: 100;
  }
</style>
