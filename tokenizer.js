const latexCode = '/sqrt {356} 3 /frac 1 {}'

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

    if (char === '{' || char === '}') {
      tokens.push({ type: 'patten', value: char})
      current ++
      continue
    }

    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = ''

      while (NUMBERS.test(char)) {
        value += char
        char = input[++ current]
      }

      tokens.push({ type: 'number', value })
      continue
    }

    if (char === "/") {
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

    throw new TypeError('I dont know what this character is: ' + char)
  }

  return tokens
}


const result = tokenizer(latexCode)
console.log(result)
