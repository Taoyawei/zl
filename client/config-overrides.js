/**
 * @abstract 修改默认设置
 * @author taoyawei
 */
const {override, fixBabelImports} = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css',
  })
)