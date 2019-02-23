const token = [
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


function parser(token) {
  let current = 0

  function walk() {
    let token = tokens[current]
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
  }
}
