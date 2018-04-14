'use strict'
let actions = {}
// 变量中心
actions.toggleAppID = function ({commit}, abusi) {
  commit('SET_APPID', abusi)
}

/**
 * 获取数据-费用报销-业务信息-起草
 * @param store
 * @param paramObj
 */
actions.getDataSscReimburseByUserId = function (store, paramObj) {
  paramObj.me.httpBpm({
    inputParameter: JSON.stringify({
      'tsId': '11111',
      'itCode': 'gyren',
      'lang': 'zh',
      'ts_piid': '-1'
    }),
    'apiName': 'bpm1'
  }, data => {
    paramObj.me.apiloading = false
    if (data.returnCode === '000000') {
      let resObj = JSON.parse(data.jsonResult)
      store.commit('SetDataSscReimburseWhBtReimburse', resObj)
    } else {
      paramObj.me.alert('业务失败,错误码' + data.returnCode + data.returnMsg)
    }
  }, (data, e) => {
    paramObj.me.apiloading = false
  })
}
/**
 * 调用接口321查询可用预算
 * @param store
 * @param paramObj
 */
actions.getAvailableAmount = function (store, paramObj) {
  let businessData = store.state.ssc.reimburse.whBtReimburseDdSub // BO 业务数据
  let mainData = store.state.ssc.reimburse.whBtReimburse
  let params = {}
  let params2 = {}
  params.lang = 'zh'
  params.currentPage = ''
  params.lineNumber = ''
  params.field1 = ''
  params.field2 = ''
  params.Data = []
  for (var i = 0; i < businessData.length; i++) {
    params.Data[i] = {}
    params.Data[i].costCenterCode = mainData.reimbursecompanycostcenter
    params.Data[i].internalOrderCode = businessData[i].internalOrderCode
    params.Data[i].subjectCode = businessData[i].subjectCode
    params.Data[i].field3 = ''
    params.Data[i].field4 = ''
  }
  params2.DT_321_BPM_AvailableBudgetQuery = params
  params2.apiName = 'PREXPR@AJAX_321_AvailableBudgetQuery'
  paramObj.me.httpBpm(params2, data => {
    paramObj.me.apiloading = false
    if (data.DT_321_BPM_AvailableBudgetQuery_Resp.executeStatus === 'S') {
      let rate = store.ssc.reimburse.whBtReimburse.rate === 0 ? 1 : store.ssc.reimburse.whBtReimburse.rate
      let listLen = data.data.data.DT_321_BPM_AvailableBudgetQuery_Resp.Data.items.length
      if (listLen > 0) {
        for (var i = 0; i < listLen; i++) {
          store.ssc.reimburse.whBtReimburseDdSub.costCenterbudGet[i] = (data.DT_321_BPM_AvailableBudgetQuery_Resp.Data.items[i].availableAmount) * rate
        }
      } else {
        paramObj.me.alert('业务失败,错误码:' + '未获取到订单数据')
      }
    } else {
      paramObj.me.alert('业务失败,错误码:' + data.DT_321_BPM_AvailableBudgetQuery_Resp.errorMessage)
    }
  }, (data, e) => {
    paramObj.me.apiloading = false
  })
}
/**
 * 获取数据-费用报销-主表信息
 * @param store
 * @param paramObj
 */
actions.getDataSscReimburseWhBtReimburse = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.me.tsId,
    'tableName': 'WH_BT_REIMBURSE',
    'dictFields': paramObj.me.dictFields
  }, data => {
    if (data && data.length > 0) {
      let whBtReimburse = data[0]
      paramObj.me.costshareActtotalsum = whBtReimburse.costshareActtotalsum
      store.commit('SetDataSscReimburseWhBtReimburse', whBtReimburse)
    } else {
      store.commit('SetDataSscReimburseWhBtReimburse', {})
    }
    paramObj.me.apiloading = false
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取出租费数据失败,错误码' + data.returnCode + data.returnMsg)
  })
}
/**
 * 获取费用报销订单信息
 * @param store
 * @param paramObj
 */
actions.getDataFromTableDdSub = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_REIMBURSE_DD_SUB',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtReimburseDdSub', data)
    actions.getAvailableAmount(store, paramObj)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取费用报销订单信息失败,错误码' + data.returnCode + data.returnMsg)
  })
}

/**
 * 获取费用报销成本分摊表信息
 * @param store
 * @param paramObj
 */
actions.getDataFromTableCostshare = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_REIMBURSE_COSTSHARE',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtReimburseCostshare', data)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取费用报销成本分摊表信息失败,错误码' + data.returnCode + data.returnMsg)
  })
}

/**
   * 获取差率补贴表数据
   * @param store
   * @param paramObj
   */
actions.getDataFromTableTravelSubsidyDetails = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_TRAVELSUBSIDYDETAILS',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtTravelSubsidyDetails', data)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取差率补贴表数据失败,错误码' + data.returnCode + data.returnMsg)
  })
}
/**
   * 获取出租表数据
   * @param store
   * @param paramObj
   */
actions.getDataFromTableTransportationDetails = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_TRANSPORTATIONDETAILS',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtTransportationDetails', data)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取出租表数据失败,错误码' + data.returnCode + data.returnMsg)
  })
}
/**
   * 获取交通费表数据
   * @param store
   * @param paramObj
   */
actions.getDataFromTableFareDetails = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_TRANSPORTATIONDETAILS',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtFareDetails', data)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取交通费表数据失败,错误码' + data.returnCode + data.returnMsg)
  })
}
/**
   * 获取住宿费表数据
   * @param store
   * @param paramObj
   */
actions.getDataFromTableStayDetails = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_STAYDETAILS',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtStayDetails', data)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取住宿费表数据失败,错误码' + data.returnCode + data.returnMsg)
  })
}
/**
   * 获取制证数据
   * @param store
   * @param paramObj
   */
actions.getDataFromAJAX_Reim_005_Approve_Open = function (store, paramObj) {
  paramObj.me.httpBpm({
    'tsId': paramObj.tsId,
    'apiName': 'PREXPR@AJAX_Reim_005_Approve_Open'
  }, data => {
    paramObj.me.apiloading = false
    if (data.returnCode === '100000') {
      store.commit('SetDataSscReimburseWhBtReimburseRcmSub', data.whBtReimburseRcmSub)
    } else {
      paramObj.me.alert('业务失败,错误码' + data.returnCode + data.returnMsg)
    }
  }, (data, e) => {
    paramObj.me.apiloading = false
  })
}

/**
 * 获取制证表明细数据
 * @param store
 * @param paramObj
 */
actions.getDataFromTableRcmDetails = function (store, paramObj) {
  paramObj.me.httpBpmGetBz({
    'tsId': paramObj.tsId,
    'tableName': 'WH_BT_REIMBURSE_RCM_DETAILS',
    'dictFields': paramObj.me.dictFields,
    'page_LineNbr': '10'
  }, data => {
    paramObj.me.apiloading = false
    store.commit('SetDataSscReimburseWhBtReimburseRcmDetails', data)
  }, (data, e) => {
    paramObj.me.apiloading = false
    paramObj.me.alert('获取制证明细表数据失败,错误码' + data.returnCode + data.returnMsg)
  })
}
/**
 * 查询跨公司提报数据
 * @param store
 * @param paramObj
 */
actions.getCrossCompany = function (store, paramObj) {
  let obj = {}
  let params = {}
  let params2 = {}
  obj.isMultiple = false
  obj.flowType = 'SSCV3.ExpenseReimburse'
  // obj.userId = 'gyren'
  obj.userId = store.state.userId
  let searchClause = JSON.stringify(obj)
  params.searchClause = searchClause
  params.begin_line = -1
  params.page_LineNbr = 10
  params.countFlag = 0
  params.returnBoName = ''
  let inputParameter = JSON.stringify(params)
  params2.apiName = 'EBCOMMA@AJAX_RetrieveCrossCompanyData'
  params2.inputParameter = inputParameter
  paramObj.me.httpBpm(params2, data => {
    paramObj.me.apiloading = false
    if (data.returnCode === '000000') {
      let jsonList = JSON.parse(data.jsonResult)
      if (jsonList.length > 0) {
        store.commit('SetDataSscReimburseCtCrossCompany', jsonList)
      } else {
        store.state.ssc.reimburse.crossCompanyInfo = []
      }
    } else {
      paramObj.me.alert('获取公司数据失败,错误码:' + data.returnMsg)
    }
  }, (data, e) => {
    paramObj.me.apiloading = false
  })
}

/**
 * 通过接口查询成本中心数据
 * @param store
 * @param paramObj
 */
actions.queryCostCenter = function (store, paramObj) {
  let obj = {}
  let params = {}
  let params2 = {}
  obj.proposer = store.state.userId
  obj.companyCode = '1000'
  obj.costCenterCode = ''
  obj.costCenterName = ''
  let searchClause = JSON.stringify(obj)
  params.searchClause = searchClause
  params.begin_line = 0
  params.page_LineNbr = 10
  params.countFlag = 0
  params.returnBoName = ''
  let inputParameter = JSON.stringify(params)
  params2.apiName = 'EBSA@AJAX_172_CostCenterQuery'
  params2.inputParameter = inputParameter
  paramObj.me.httpBpm(params2, data => {
    paramObj.me.apiloading = false
    if (data.returnCode === '000000') {
      let jsonList = JSON.parse(data.jsonResult)
      if (jsonList.length > 0) {
        store.commit('SetDataSscReimburseCostCenterList', jsonList)
        // console.log('=========', store.reimburse.costCenterList)
      } else {
        store.state.ssc.reimburse.costCenterList = []
      }
    } else {
      paramObj.me.alert('获取成本中心数据失败,错误码:' + data.returnMsg)
    }
  }, (data, e) => {
    paramObj.me.apiloading = false
  })
}

/**
 * 制证提交校验
 * @param store
 * @param paramObj
 */
actions.PREXPR_AJAX_CheckReimburseByTsId = function (store, paramObj) {
  paramObj.me.httpBpm({'tsId': 'PIID-9e982e74-d555-4a03-8a01-11e7dab76bc5',
    'apiName': 'PREXPR@AJAX_CheckReimburseByTsId'
  }, data => {
    console.log('dfdfdfd', data)
    paramObj.me.apiloading = false
    if (data.returnCode === '000000') {
      let resObj = JSON.parse(data.jsonResult)
      store.commit('SetDataSscReimburseWhBtReimburse', resObj)
    } else {
      paramObj.me.alert('业务失败,错误码' + data.returnCode + data.returnMsg)
    }
  }, (data, e) => {
    paramObj.me.apiloading = false
  })
}
export default actions
