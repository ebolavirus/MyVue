global.$CV = function (key) {
  if (key.indexOf('local.') !== -1) {
    // 业务表
    if (key.indexOf('local.whBtReimburse') !== -1) {
      return {
        val (v) {
          let keys = key.split('.')
          if (typeof v !== 'undefined') {
            if (keys.length === 2) {
              dora.$store.state.ssc.reimburse[keys[1]] = v
            } else if (keys.length === 3) {
              dora.$store.state.ssc.reimburse[keys[1]][keys[2]] = v
            } else if (keys.length === 4) {
              dora.$store.state.ssc.reimburse[keys[1]][keys[2]][keys[3]] = v
            } else if (keys.length === 5) {
              dora.$store.state.ssc.reimburse[keys[1]][keys[2]][keys[3]][keys[4]] = v
            }
          } else {
            let res = ''
            let k = ''
            if (keys.length === 2) {
              k = keys[1]
              res = dora.$store.state.ssc.reimburse[keys[1]]
            } else if (keys.length === 3) {
              k = keys[2]
              res = dora.$store.state.ssc.reimburse[keys[1]][keys[2]]
            } else if (keys.length === 4) {
              k = keys[3]
              res = dora.$store.state.ssc.reimburse[keys[1]][keys[2]][keys[3]]
            } else if (keys.length === 5) {
              k = keys[4]
              res = dora.$store.state.ssc.reimburse[keys[1]][keys[2]][keys[3]][keys[4]]
            }
            return toDate(k, res)
          }
        }
      }
    } else if (key === 'local.hsInput') {
      return {
        options (param) {
          if (param === 'bpmCoreData') {
            return {
              ts_piid: dora.$store.state.tsId
            }
          }
        }
      }
    } else if (key === 'local.ts_id') {
      return {
        val (v) {
          if (typeof v !== 'undefined') {
            dora.$store.state.tsId = v
          } else {
            return dora.$store.state.tsId
          }
        }
      }
    } else {
      let keys = key.split('.')
      return {
        val (v) {
          if (typeof v !== 'undefined') {
            dora.$store.state[keys[1]] = v
          } else {
            return dora.$store.state[keys[1]]
          }
        }
      }
    }
  }
  if (key === 'CVPageTable1') {
    return {
      callAjaxRetrieveAllData (param) {
        if (param === 'searchClause') {
          return dora.$store.state.ssc.reimburse.whBtReimburseDdSub
        }
      },
      options (param) {
        return param
      }
    }
  } else if (key === 'CVPageTable2') {
    return {
      callAjaxRetrieveAllData (param) {
        if (param === 'searchClause') {
          return dora.$store.state.ssc.reimburse.whBtReimburseRcmDetail
        }
      },
      options (param) {
        return param
      },
      _dhxGrid: {
        setColumnExcellType (p1, p2) {
          console.log('表格的列' + p1 + ' 新属性值' + p2)
        }
      }
    }
  } else if (key === 'CVPageLoading1') {
    return {
      visibility (param) {
        return ''
      }
    }
  }
}

function toDate (k, v) {
  if (k === 'postingdate') {
    return new Date(v)
  } else {
    return v
  }
}
