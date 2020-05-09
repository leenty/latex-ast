// const latexCode = '\\frac{{-b\\pm \\sqrt {{b^2}-4ac}}}{{2a}}'

// const tokens = [
//   { type: 'formula', value: '\\frac' },
//   { type: 'braces', value: '{' },
//   { type: 'braces', value: '{' },
//   { type: 'operator', value: '-' },
//   { type: 'params', value: 'b' },
//   { type: 'formula', value: '\\pm' },
//   { type: 'formula', value: '\\sqrt' },
//   { type: 'braces', value: '{' },
//   { type: 'braces', value: '{' },
//   { type: 'params', value: 'b' },
//   { type: 'operator', value: '^' },
//   { type: 'params', value: '2' },
//   { type: 'braces', value: '}' },
//   { type: 'operator', value: '-' },
//   { type: 'params', value: '4ac' },
//   { type: 'braces', value: '}' },
//   { type: 'braces', value: '}' },
//   { type: 'braces', value: '}' },
//   { type: 'braces', value: '{' },
//   { type: 'braces', value: '{' },
//   { type: 'params', value: '2a' },
//   { type: 'braces', value: '}' },
//   { type: 'braces', value: '}' }
// ]


function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]
    // // 换行
    // if (token.type === 'linkBreak') {
    //   return {
    //     type: 'LinkBreak',
    //     value: token.value,
    //   }
    // }

    // 空白字符
    if (token.type === 'whiteSpace') {
      current ++
      return {
        type: 'WhiteSpace',
        value: token.value,
      }
    }
    
    // 公式
    if (token.type === 'formula') {
      current ++
      return {
        type: 'Formula',
        value: token.value,
        // name: token.value,
      }
    }

    // 参数
    if (token.type === 'params') {
      current ++
      return {
        type: 'Parameter',
        value: token.value,
      }
    }

    // 参数
    if (token.type === 'number') {
      current ++
      return {
        type: 'Number',
        value: token.value,
      }
    }

    // 操作符
    if (token.type === 'operator') {
      current ++
      return {
        type: 'Operator',
        value: token.value,
      }
    }

    // 包裹
    if (token.type === 'wrapper' && token.value === '{') {
      token = tokens[++current]
      let node = {
        type: 'Wrapper',
        pramas: [],
      }
      // token = tokens[++current]
      while (
        token.type !== 'wrapper' ||
        token.type === 'wrapper' && token.value !== '}'
      ) {
        node.pramas.push(walk())
        token = tokens[current]
      }
      current ++
      return node
    }

    // 弱包裹
    if (token.type === 'weakWrapper' && token.value === '[') {
      token = tokens[++current]
      let node = {
        type: 'WeakWrapper',
        pramas: [],
      }
      // token = tokens[++current]
      while (
        token.type !== 'weakWrapper' ||
        token.type === 'weakWrapper' && token.value !== ']'
      ) {
        node.pramas.push(walk())
        token = tokens[current]
      }
      current ++
      return node
    }

    // 括号
    if (token.type === 'block' && token.value === '(') {
      token = tokens[++current]
      let node = {
        type: 'Block',
        pramas: [],
      }

      // token = tokens[++current]
      while (
        token.type !== 'block' ||
        token.type === 'block' && token.value !== ')'
      ) {
        node.pramas.push(walk())
        token = tokens[current]
      }
      current ++
      return node
    }
    current ++
    return {
      type: 'Other',
      value: token.value,
    }
  }

  let ast = {
    type: 'Expression',
    body: [],
  }
  while (current < tokens.length) {
    ast.body.push(walk())
  }
  return ast
}

// console.log(tokens)
// console.log(parser(tokens))

module.exports = parser
