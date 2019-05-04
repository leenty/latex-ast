var tokenizer = require('./tokenizer')
var parser = require('./parser')
var latexCode = require('./latexCode')


console.log('【latexCode】\n', latexCode, '\n')

const tokens = tokenizer(latexCode)
console.log('【tokens】\n', tokens, '\n')

const ast = parser(tokens)
console.log('【ast】\n', ast, '\n')
