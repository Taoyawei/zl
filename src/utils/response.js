/**
 * @abstract 返回结果模板
 * @author taoyawei
 */

// 失败模板
class ErrorModal {
  constructor ({ code, data, message }) {
    this.code = code
    this.data = data ? data : {}
    this.message = message ? message : null
  }
}

class SuccessModal {
  constructor (data = {}, message = null) {
    this.code = 0
    this.data = data ? data : {}
    this.message = message ? message : null
  }
}

module.exports = {
  ErrorModal,
  SuccessModal
}
