import $ from 'jquery'

let adapterConf = {
  dev: {
    url: 'http://10.10.23.20:7091/api/adapter/requestData'
  },
  qas: {
    url: 'http://10.10.23.20:7091/api/adapter/requestData'
  },
  prd: {
    url: 'http://10.10.23.20:7091/api/adapter/requestData'
  }
}

let bpmConf = {
  dev: {
    url: 'http://bpmdev02.whchem.com/'
  },
  qas: {
    url: 'http://bpmqas02.whchem.com/'
  },
  prd: {
    url: ''
  }
}
let envCurr = 'dev'// 默认开发环境

let apiConf = {
  apiPath: 'rest/bpm/wle/v1/service/',
  apiName: {// 名字和path值得后缀不一致需要配置
    'bpm1': 'rest/bpm/wle/v1/service/PREXPR@AJAX_Reim_001_Draft_Open'
  }
}

global.httpBase = function (paramObj, succFunc, failFunc) {
  let adapterUrl = adapterConf[envCurr].url
  let bpmUrl = bpmConf[envCurr].url
  // let bpmUrl = 'http://bpmgw.whchem.com:8000/'
  // 参数校验
  if (!paramObj) {
    failFunc && failFunc('', '入参对象不能为空')
    return
  }
  if (!paramObj.apiName) {
    failFunc && failFunc('', '入参对象里无apiName，例如bpm1')
    return
  }
  let realApiPath = apiConf.apiName[paramObj.apiName]
  if (!apiConf.apiName[paramObj.apiName]) {
    realApiPath = apiConf.apiPath + paramObj.apiName
  }
  let reqUrl = bpmUrl + '/' + realApiPath + '?action=start&createTask=false&parts=all'
  let async = false
  if (typeof paramObj.async !== 'undefined') {
    async = paramObj.async
    delete paramObj.async
  }
  delete paramObj.apiName
  let paramStr = '&params=' + JSON.stringify(paramObj)
  reqUrl += paramStr
  let adapterParam = {
    paramIn: '',
    url: reqUrl
  }
  console.log('请求地址：', reqUrl)
  let ajaxConf = {
    url: adapterUrl,
    header: {
      Authorization: 'Basic YnBtYWRtaW46CWJwbWlzb2s=',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    /* xhrFields: {
      withCredentials: true
    }, */
    async: async,
    type: 'post',
    data: adapterParam,
    success: (data, status, xhr) => {
      console.log('请求成功：', data)
      succFunc && succFunc(data)
    },
    error: function (data) {
      console.log('请求失败', data)
      failFunc && failFunc(data, '请求失败')
    }
  }
  // 走api网关
  /* ajaxConf.url = reqUrl
  ajaxConf.data = '' */
  $.ajax(ajaxConf)
}
