/* !!!: 更为完整的验证方法，暂时不用 杨：注 */
export const VDT = {
  messages: {
    required: '这是必填字段',
    url: '请输入有效的网址'
  },
  required: (value, param) => {
    return value !== undefined ? (value.toString().length > 0) : false
  },
  url: (value) => {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
  }
}

export const VDATA = (value, config) => {
  for (let fun in config) {
    if (typeof VDT[fun] === 'function' && (!(config[fun].param === undefined ? VDT[fun](value) : VDT[fun](value, config[fun].param)))) {
      if (typeof config[fun] === 'object') {
        return { msg: config[fun].msg ? config[fun].msg : VDT[fun], result: false }
      } else {
        return { msg: typeof config[fun] === 'string' ? config[fun] : VDT[fun], result: false }
      }
    } else if (typeof config[fun] === 'function') {
      var tmpr = config[fun](value)
      if (tmpr !== '' && tmpr !== undefined && tmpr !== false) {
        return { msg: tmpr, result: false }
      }
    }
  }

  return { msg: '', result: true }
}
