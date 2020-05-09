const tokenizer = require('./src/tokenizer')
const parser = require('./src/parser')
const codeGenerator = require('./src/codeGenerator')
const latexCode = require('./tests/latexCode')


console.log('【latexCode】\n', latexCode, '\n')

const tokens = tokenizer(latexCode)
console.log('【tokens】\n', tokens, '\n')

const ast = parser(tokens)
console.log('【ast】\n', ast, '\n')

const newCode = codeGenerator(ast)
console.log('【newCode】\n', newCode)
console.log('【sourceCode】\n', latexCode, '\n')

module.exports = function ast(latex) {
  const tokens = tokenizer(latexCode)
  const ast = parser(tokens)
  const newCode = codeGenerator(ast)
  return newCode
}
