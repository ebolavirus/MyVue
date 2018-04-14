let mixins = {
  data: function () {
    return {}
  },
  methods: {
    /**
     * bpm的请求封装，默认走pi
     * @param paramObj
     * @param succFunc
     * @param failFunc
     * @param reqFailFunc
     */
    /* let paramObj = {
        'tsId': '11111',
        'itCode': 'gyren',
        'lang': 'zh',
        'tsId': '-1',
        'apiName':'bpm1'
      } */
    httpBpm (paramObj, succFunc, failFunc) {
      httpBase(paramObj, data => {
        if (!data.data || !data.data.data) {
          console.log('返回数据格式错误', data)
          failFunc && failFunc(data, '请求失败')
          return
        }
        succFunc && succFunc(data.data.data)
      }, failFunc)
    },
    httpBpmFlow (paramObj, succFunc, failFunc) {
      this.httpBpm(paramObj, data => {
        console.log('httpBpmFlow return JSON', data)
        // 异常码遍历
        if (data.respCode === '900001') {
          this.alert('900001')
          return
        } else if (data.respCode === '900002') {
          this.alert('900002')
          return
        } else if (data.respCode === '930001') {
          this.alert('930001')
          return
        }
        succFunc && succFunc(data)
      }, failFunc)
    },
    /**
     * 获取bpm的表数据通用方法
     * @param paramObj{tsPiid,tableName,dictFields,begin_line,page_LineNbr}
     * @param succFunc
     * @param failFunc
     */
    httpBpmGetBz (paramObj, succFunc, failFunc) {
      let searchClause = {
        sql: ' TS_ID=?',
        parameters: [paramObj.tsId]
      }
      this.httpBpm({
        inputParameter: JSON.stringify({
          'tableName': paramObj.tableName,
          'searchClause': JSON.stringify(searchClause),
          'dictFields': paramObj.dictFields,
          'begin_line': typeof paramObj.begin_line !== 'undefined' ? paramObj.begin_line : '0',
          'page_LineNbr': typeof paramObj.page_LineNbr !== 'undefined' ? paramObj.page_LineNbr : '1'
        }),
        'apiName': 'EBCV_V3@AJAX_RetrieveProcessBzData'
      }, data => {
        if (data && data.returnCode === '000000') {
          let jsonResult = JSON.parse(data.jsonResult)
          console.log('调用EBCV_V3@AJAX_RetrieveProcessBzData的表【' + paramObj.tableName + '】的结果', jsonResult)
          succFunc && succFunc(jsonResult)
        } else {
          failFunc && failFunc('', '业务失败,错误码' + data.returnCode + data.returnMsg)
        }
      }, failFunc)
    }
  }
}
export default mixins
