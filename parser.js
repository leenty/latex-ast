const tokens = [
  { type: 'formula', value: '\\frac' },
  { type: 'braces', value: '{' },
  { type: 'braces', value: '{' },
  { type: 'operator', value: '-' },
  { type: 'params', value: 'b' },
  { type: 'formula', value: '\\pm' },
  { type: 'formula', value: '\\sqrt' },
  { type: 'braces', value: '{' },
  { type: 'braces', value: '{' },
  { type: 'params', value: 'b' },
  { type: 'operator', value: '^' },
  { type: 'params', value: '2' },
  { type: 'braces', value: '}' },
  { type: 'operator', value: '-' },
  { type: 'params', value: '4ac' },
  { type: 'braces', value: '}' },
  { type: 'braces', value: '}' },
  { type: 'braces', value: '}' },
  { type: 'braces', value: '{' },
  { type: 'braces', value: '{' },
  { type: 'params', value: '2a' },
  { type: 'braces', value: '}' },
  { type: 'braces', value: '}' }
]


function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]
    if (token.type === 'formula') {
      current ++
      return {
        type: 'Formula',
        value: token.value,
      }
    }
    if (token.type === 'params') {
      current ++
      return {
        type: 'Parameter',
        value: token.value,
      }
    }
    if (token.type === 'operator') {
      current ++
      return {
        type: 'Operator',
        value: token.value,
      }
    }
    if (token.type === 'braces' && token.value === '{') {
      token = tokens[++current]
      let node = {
        type: 'Wrapper',
        pramas: [],
      }

      token = tokens[++current]
      while (
        token.type !== 'braces' ||
        token.type === 'braces' && token.value !== '}'
      ) {
        node.pramas.push(walk())
        token = tokens[current]
      }
      current ++
      return node
    }
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

console.log(tokens)
console.log(parser(tokens))
