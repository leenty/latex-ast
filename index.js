var tokenizer = require('./tokenizer')
var parser = require('./parser')

// const latexCode = '\\frac{{-b\\pm \\sqrt {{b^2}-4ac}}}{{2a}}'
const latexCode = '123'
console.log('【latexCode】\n', latexCode, '\n')

const tokens = tokenizer(latexCode)
console.log('【tokens】\n', tokens, '\n')

const ast = parser(tokens)
console.log('【ast】\n', ast, '\n')
