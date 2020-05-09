const tokenizer = require('../src/tokenizer')
const parser = require('../src/parser')
const codeGenerator = require('../src/codeGenerator')
const transformer = require('../src/transformer')
const latexCode = require('./latexCode')

console.time('use time')
// console.log('【latexCode】\n', latexCode, '\n')

const tokens = tokenizer(latexCode)
// console.log('【tokens】\n', tokens, '\n')

const ast = parser(tokens)
// console.log('【ast】\n', ast, '\n')

const newAst = transformer(ast)
// console.log('【newAst】\n', newAst, '\n')

const newCode = codeGenerator(newAst)
console.timeEnd('use time')
console.log('【newCode】\n', newCode)
console.log('【sourceCode】\n', latexCode, '\n')