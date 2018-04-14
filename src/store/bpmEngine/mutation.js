'use strict'
let mutations = {}
mutations.SetBpdUri = function (state, bpdUri) {
  state.bpdUri = bpdUri
}
mutations.SetPageType = function (state, pageType) {
  state.pageType = pageType
}
mutations.SetUserId = function (state, userId) {
  state.userId = userId
}
mutations.SetTsId = function (state, tsId) {
  state.tsId = tsId
}
mutations.SetTarget = function (state, target) {
  state.target = target
}
mutations.SetTargetUsers = function (state, targetUsers) {
  state.targetUsers = targetUsers
}
mutations.SetIsStartProc = function (state, isStartProc) {
  state.isStartProc = isStartProc
}
mutations.SetComments = function (state, comments) {
  state.comments = comments
}
mutations.SetIsFlowDialogVisible = function (state, isFlowDialogVisible) {
  state.isFlowDialogVisible = isFlowDialogVisible
}
mutations.SetIsSubmitVerify = function (state, isSubmitVerify) {
  state.isSubmitVerify = isSubmitVerify
}
mutations.SetIsConfirmVerify = function (state, isConfirmVerify) {
  state.isConfirmVerify = isConfirmVerify
}
mutations.SetApiloading = function (state, apiloading) {
  state.apiloading = apiloading
}
export default mutations
