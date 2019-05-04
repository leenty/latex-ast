// const latexCode = '/sqrt {356} 3 /frac 1 {/sqrt 3}'
// const latexCode = '-b\\pm \\sqrt {{b^2}-4ac}测试'
// const latexCode = '\\frac{{-b\\pm \\sqrt {{b^2}-4ac}}}{{2a}}'

const tokenizer = (input = '') => {
  let current = 0
  let tokens = []

  while (current < input.length) {
    let char = input[current];

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current ++
      continue
    }

    // braces
    if (char === '{' || char === '}') {
      tokens.push({ type: 'wrapper', value: char})
      current ++
      continue
    }

    if (char === '[' || char === ']') {
      tokens.push({ type: 'weakWrapper', value: char})
      current ++
      continue
    }

    if (char === '(' || char === ')') {
      tokens.push({ type: 'block', value: char})
      current ++
      continue
    }

    const OPERATORS = /[\+\-\=\_\^]/
    if (OPERATORS.test(char)) {
      tokens.push({ type: 'operator', value: char})
      current ++
      continue
    }

    // let NUMBERS = /[0-9]/;
    // if (NUMBERS.test(char)) {
    //   let value = ''

    //   while (NUMBERS.test(char)) {
    //     value += char
    //     char = input[++ current]
    //   }

    //   tokens.push({ type: 'number', value })
    //   continue
    // }

    if (char === "\\") {
      let value = char
      const FORMULA = /[a-z]/i
      char = input[++current]

      while (FORMULA.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({type: 'formula', value})
      continue
    }

    // debugger
    const PARAMS = /\w/
    if (PARAMS.test(char)) {
      let value = char
      char = input[++current]

      while (current < input.length && PARAMS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({type: 'params', value})
      continue
    }

    tokens.push({type: 'other', value: char})
    current ++
    // throw new TypeError('I dont know what this character is: ' + char)
  }



  return tokens
}


// const result = tokenizer(latexCode)
// console.log(latexCode)
// console.log(result)

module.exports = tokenizer