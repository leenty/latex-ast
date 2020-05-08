// latex代码生成
const codeGenerator = (node) => {
  switch(node.type) {
    case 'Expression': // latex表达式（根节点）
      return node.body.map(codeGenerator).join('');
    case 'Wrapper': // 包裹,由“{”和“}”包裹起来的部分latex
      return '{' + node.pramas.map(codeGenerator).join('') + '}'
    case 'weakWrapper': // 弱包裹,由“[”和“]”包裹起来的部分latex
      return '[' + node.pramas.map(codeGenerator).join('') + ']'
    case 'Block': // 块,由“(”和“)”包裹起来的部分latex
      return '(' + node.pramas.map(codeGenerator).join('') + ')'
    case 'Formula': // 函数运算标识
      return node.value + ''
    case 'WhiteSpace': // 空白符
      return node.value
    case 'Parameter': // 参数(未知数)
    case 'Number': // 数值
    case 'Operator': // 操作符
    case 'Other': // 其他无法识别的内容 比如：双字节文字
      return node.value
  }
}

module.exports = codeGenerator