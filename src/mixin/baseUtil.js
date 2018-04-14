let mixins = {
  data: function () {
    return {}
  },
  methods: {
    alert (msg) {
      alert(msg)
    }
    // 'toast': function (msg) {
    //   modal.toast({
    //     message: msg,
    //     duration: 1
    //   })
    // },
    // 'alert': function (msg, callback, option) {
    //   let okTitle = '确定'
    //   if (option) {
    //     if (option.okTitle) { okTitle = option.okTitle }
    //   }
    //   modal.alert({
    //     message: msg,
    //     duration: 0.4,
    //     okTitle: okTitle
    //   }, function (value) {
    //     callback && callback(value)
    //   })
    // },
    // 'confirm': function (msg, callback, option) {
    //   let okTitle = '确定', cancelTitle = '取消'
    //   if (option) {
    //     if (option.okTitle) { okTitle = option.okTitle }
    //     if (option.cancelTitle) { cancelTitle = option.cancelTitle }
    //   }
    //   modal.confirm({
    //     message: msg,
    //     duration: 0.4,
    //     okTitle: okTitle,
    //     cancelTitle: cancelTitle
    //   }, function (value) {
    //     callback && callback(value)
    //   })
    // },
    // 'showAnimation': function (params, callback) {
    //   let el = params.id
    //   if (!el) {
    //     return
    //   }
    //   let duration = params.duration
    //   let transform = params.transform || 'translate(0, 0)'
    //   let transformOrigin = params.transformOrigin || 'center center'
    //   let timingFunction = params.timingFunction || 'ease'
    //
    //   animation.transition(el, {
    //     styles: {
    //       opacity: '1',
    //       transform: transform,
    //       transformOrigin: transformOrigin
    //     },
    //     duration: duration || 0,
    //     timingFunction: timingFunction,
    //     delay: 0
    //   }, function () {
    //     callback && callback()
    //   })
    // },
    // 'hide': function (params, callback) {
    //   let el = params.id
    //   if (!el) {
    //     return
    //   }
    //   let duration = params.duration
    //   let transform = params.transform || 'translate(0, 0)'
    //   let transformOrigin = params.transformOrigin || 'center center'
    //   let timingFunction = params.timingFunction || 'ease'
    //
    //   animation.transition(el, {
    //     styles: {
    //       opacity: '0',
    //       transform: transform,
    //       transformOrigin: transformOrigin
    //     },
    //     duration: duration || 0,
    //     timingFunction: timingFunction,
    //     delay: 0
    //   }, function () {
    //     callback && callback()
    //   })
    // },
    // 'getContextPath': function () {
    //   let url
    //   let bundleUrl = weex.config.bundleUrl
    //   url = bundleUrl.split('/').slice(0, -1).join('/')
    //   return url
    // },
    // 'getPageParams': function () {
    //   let params = {}
    //   let url = weex.config.bundleUrl
    //   let index = url.indexOf('?')
    //   if (index > 0) {
    //     let query = url.substring(index + 1)
    //     let temp = query.split('&')
    //     let key, value
    //     for (let p in temp) {
    //       if (temp[p]) {
    //         key = temp[p].split('=')[0]
    //         value = temp[p].split('=')[1]
    //         params[key] = decodeURIComponent(value)
    //       }
    //     }
    //   }
    //   return params
    // }
  }
}

export default mixins
