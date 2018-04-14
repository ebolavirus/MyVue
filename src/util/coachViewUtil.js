global.coachViewUtil = {
  callAjaxByServiceName (apiName, paramObj, success, fail, flag) {
    if (typeof paramObj === 'string') {
      paramObj = paramObj.replace(/'/g, '"')
      paramObj = JSON.parse(paramObj)
    }
    paramObj.apiName = apiName
    httpBase(paramObj, success, fail)
  },
  getResource (key) {
    if (key.indexOf('alert.') !== -1) {
      switch (key) {
        case 'alert.actSumNotSame':
          return '费用分摊表、制证信息表、报销明细表三个表的实际报销金额不一致，请检查！'
        case 'alert.costShareVerifyDetailsFail':
          return '费用分摊表、明细表的税额之和、不含税金额之和一致'
        case 'alert.transferTaxNotRight':
          return '转出税额总和不能大于税额总和'
        case 'alert.bncfzz':
          return '已经制证,不允许再次制证'
        case 'alert.szbxkbjsxyc':
          return '更新制证数据时异常'
        case 'alert.gxzzsjyc':
          return '更新制证数据时异常'
        case 'alert.zzcg':
          return '制证成功'
        default:
          return key + '未定义信息'
      }
    }
  }
}
global.obj = {}
