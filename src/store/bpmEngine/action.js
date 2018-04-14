'use strict'
let actions = {}
// 变量中心
actions.setBpdUri = function ({commit}, abusi) {
  commit('SetBpdUri', abusi)
}
actions.setPageType = function ({commit}, abusi) {
  commit('SetPageType', abusi)
}
actions.setUserId = function ({commit}, abusi) {
  commit('SetUserId', abusi)
}
actions.setTsId = function ({commit}, abusi) {
  commit('SetTsId', abusi)
}
actions.setTarget = function ({commit}, abusi) {
  commit('SetTarget', abusi)
}
actions.setTargetUsers = function ({commit}, abusi) {
  commit('SetTargetUsers', abusi)
}
actions.setIsStartProc = function ({commit}, abusi) {
  commit('SetIsStartProc', abusi)
}
actions.setComments = function ({commit}, abusi) {
  commit('SetComments', abusi)
}
actions.setComments = function ({commit}, abusi) {
  commit('SetComments', abusi)
}
actions.setIsFlowDialogVisible = function ({commit}, abusi) {
  commit('SetIsFlowDialogVisible', abusi)
}
actions.setIsSubmitVerify = function ({commit}, abusi) {
  commit('SetIsSubmitVerify', abusi)
}
actions.setIsConfirmVerify = function ({commit}, abusi) {
  commit('SetIsConfirmVerify', abusi)
}
actions.setApiloading = function ({commit}, abusi) {
  commit('SetApiloading', abusi)
}

actions.startProcess = function (store, paramObj) {
  paramObj.me.httpBpmFlow({
    'userId': paramObj.me.userId,
    'bpdUri': paramObj.me.bpdUri,
    'tsPiid': paramObj.me.tsId,
    'comments': paramObj.me.comments,
    'isStartProc': paramObj.me.isStartProc,
    'bizData': JSON.stringify({}),
    'async': false,
    'apiName': 'EBTA@StartProcess_R2'
  }, data => {
    console.log('isStartProc', paramObj.me.isStartProc)
    console.log('tsId', paramObj.me.tsId)
    store.commit('SetTsId', data.result.tsPiid)
    // 弹框需要解析结果，真正发起流程不需要，因为真正发起没有target
    if (!paramObj.me.isStartProc) {
      console.log('target', data.result.target)
      let target = JSON.parse(data.result.target)
      // target.completeTaskType = 'same'
      // target.nextTaskType = 'single'
      store.commit('SetTarget', target)
      console.log('target', target)
      // 如果是单人签核默认选择第一个人
      if (paramObj.me.approvalType.approvalTypeSingle === target.nextTaskType) {
        let targetUsers = []
        store.commit('SetTargetUsers', [])
        targetUsers[0] = target.nextUsers[0].userId
        store.commit('SetTargetUsers', targetUsers)
      }
    }
    store.commit('SetIsFlowDialogVisible', true)
    store.commit('SetApiloading', false)
    if (paramObj.me.isStartProc) {
      paramObj.me.window.close()
    }
  }, (data, e) => {
    store.commit('SetApiloading', false)
  })
}
actions.retrieveNextActivity = function (store, paramObj) {
  paramObj.me.httpBpmFlow({
    'tsTaskId': paramObj.me.tsTaskId,
    'taskId': paramObj.me.taskId,
    'bizData': JSON.stringify({}),
    'async': false,
    'apiName': 'EBTA@RetrieveNextActivity_R2'
  }, data => {
    let target = JSON.parse(data.result.target)
    target.completeTaskType = 'same' // test todo
    target.nextTaskType = 'single' // test todo
    store.commit('SetTarget', target)
    console.log('target', target)
    // 如果是单人签核默认选择第一个人
    if (paramObj.me.approvalType.approvalTypeSingle === target.nextTaskType) {
      let targetUsers = []
      store.commit('SetTargetUsers', [])
      targetUsers[0] = target.nextUsers[0].userId
      store.commit('SetTargetUsers', targetUsers)
    }
    store.commit('SetIsFlowDialogVisible', true)
    store.commit('SetApiloading', false)
  }, (data, e) => {
    store.commit('SetApiloading', false)
  })
}
export default actions
