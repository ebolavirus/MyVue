import Vue from 'vue'
import Vuex from 'vuex'
import SscReimburseAction from './ssc/reimburse/action'
import SscReimburseMutation from './ssc/reimburse/mutation'
import bpmEngineAction from './bpmEngine/action'
import bpmEngineMutation from './bpmEngine/mutation'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // 应用全局ID
    appid: '',
    userId: 'gyren',
    bpdUri: '',
    // (BPM引擎专用）页面状态：起草审批只读页面flag: draft approve view other
    pageType: 'view',
    pageTypeEnum: {
      'draft': 'draft',
      'approve': 'approve',
      'view': 'view',
      'other': 'other'
    },
    // 全局遮罩层，false为不遮罩
    apiloading: false,
    // 工作流用控制dialog显隐，false为dialog隐藏
    isFlowDialogVisible: false,
    // (BPM高级选择弹出对话框类型)
    chooseDialogEnum: {
      'reimbursecompanyname': 'reimbursecompanyname',
      'reimbursecompanycostcenter': 'reimbursecompanycostcenter',
      'gatherupname': 'gatherupname',
      'accountBankNumber': 'accountBankNumber',
      'internalorder': 'internalorder',
      'subject': 'subject',
      'trainlink': 'trainlink',
      'aboardlink': 'aboardlink'
    },
    // isStartProc是否发起流程
    isStartProc: false,
    // tsId
    tsId: 'PIID-48fe3cf7-162d-465d-b27d-985f9af941ca', // todo 后续改成-1 PIID-0f36a26f-cf5b-46ac-9445-059539bef662
    // tsTaskId
    tsTaskId: 'TASK-c890dbf9-8c50-40ac-a0b1-58e8c4d5842c',
    // taskId
    taskId: 203367, // todo 后续改成-1
    // 业务bizdata 网关信息
    bizData: '',
    // 下一环节target，为JSON对象格式
    target: {},
    // 完成任务接口填入的选任列表
    targetUsers: [],
    // 发起/提交校验状态位，true为校验成功
    isSubmitVerify: false,
    // 确认校验状态位，true为校验成功
    isConfirmVerify: false,
    // 审批意见
    comments: '同意 ok',
    // 语言环境
    lang: 'zh',
    // completeTaskType，获取下一环节接口返回的信息
    completeTaskType: {
      completeTaskTypeFail: 'fail',
      completeTaskTypeComplete: 'complete',
      completeTaskTypeSame: 'same',
      completeTaskTypePool: 'pool',
      completeTaskTypeNext: 'next'
    },
    // approval type签核类型
    approvalType: {
      approvalTypeSingle: 'single',
      approvalTypeMulti: 'multi',
      approvalTypeMultiSelect: 'multiSelect',
      approvalTypeCompete: 'compete'
    },
    // approval type 枚举
    approvalTypeEnum: {
      single: '单人签核',
      multi: '多人签核',
      multiSelect: '可选多人签核',
      compete: '抢单签核'
    },
    ssc: {
      reimburse: {
        bpdUri: 'MTV3@MobileTestV3',
        whBtReimburse: {}, // 业务主表
        whBtReimburseDdSub: [], // 业务子表:订单数据
        whBtReimburseCostshare: [], // 业务子表：费用分摊表
        whBtReimburseRcmSub: [], // 业务子表: 制证主表
        whBtReimburseRcmDetail: [], // 业务子表: 制证子表
        whBtTravelSubsidyDetails: [], // 业务孙子表：补贴费
        whBtTransportationDetails: [], // 业务孙子表:出租费
        whBtFareDetails: [], // 业务孙子表:交通费
        whBtStayDetails: [], // 业务孙子表:住宿费
        crossCompanyInfo: [], // 跨公司提报数据
        costCenterList: [] // 成本中心数据
      }
    },
    checkResult: ''
  },
  actions: {
    ...SscReimburseAction,
    ...bpmEngineAction
  },
  mutations: {
    ...SscReimburseMutation,
    ...bpmEngineMutation
  }
})

export default store
