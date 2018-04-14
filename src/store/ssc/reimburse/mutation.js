'use strict'
let mutations = {}

mutations.SET_APPID = function (state, appid) {
  state.appid = appid
}
mutations.updateDataSscReimburseWhBtReimburse = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburse[paramObj.name] = paramObj.value
}
mutations.SetDataSscReimburseWhBtReimburse = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburse = paramObj
}
mutations.SetDataSscReimburseWhBtReimburseDdSub = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburseDdSub = paramObj
}

mutations.SetDataSscReimburseWhBtReimburseCostshare = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburseCostshare = paramObj
}
mutations.SetDataSscReimburseWhBtTravelSubsidyDetails = function (state, paramObj) {
  state.ssc.reimburse.whBtTravelSubsidyDetails = paramObj
}
mutations.SetDataSscReimburseWhBtTransportationDetails = function (state, paramObj) {
  state.ssc.reimburse.whBtTransportationDetails = paramObj
}
mutations.SetDataSscReimburseWhBtFareDetails = function (state, paramObj) {
  state.ssc.reimburse.whBtFareDetails = paramObj
}
mutations.SetDataSscReimburseWhBtStayDetails = function (state, paramObj) {
  state.ssc.reimburse.whBtStayDetails = paramObj
}
mutations.SetDataSscReimburseWhBtReimburseRcmDetails = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburseRcmDetail = paramObj
}
mutations.SetDataSscReimburseCtCrossCompany = function (state, paramObj) {
  state.ssc.reimburse.crossCompanyInfo = paramObj
}

mutations.updateDataSscReimburseWhBtReimburseRcmSub = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburseRcmSub[paramObj.name] = paramObj.value
}
mutations.SetDataSscReimburseWhBtReimburseRcmSub = function (state, paramObj) {
  state.ssc.reimburse.whBtReimburseRcmSub = paramObj
}
mutations.SetDataSscReimburseCostCenterList = function (state, paramObj) {
  state.ssc.reimburse.costCenterList = paramObj
}
export default mutations
