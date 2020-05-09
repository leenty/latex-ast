const traverser = require('../traverser')

const transformerDemo = (ast) => {
  const newAst = {
    type: 'Expression',
    body: [],
  }

  ast._context = newAst.body

  traverser(ast, {
    Wrapper: {
      enter(node, parent) {
        const nodeAst = {
          type: 'Wrapper',
          params: [],
        }
        node._context = nodeAst.params
        parent._context.push(nodeAst)
      }
    },
    WeakWrapper: {
      enter(node, parent) {
        const nodeAst = {
          type: 'WeakWrapper',
          params: [],
        }
        node._context = nodeAst.params
        parent._context.push(nodeAst)
      }
    },
    Block: {
      enter(node, parent) {
        const nodeAst = {
          type: 'Block',
          params: [],
        }
        node._context = nodeAst.params
        parent._context.push(nodeAst)
      }
    },
    WhiteSpace: {
      enter(node, parent) {
        parent._context.push({
          type: 'Formula',
          value: node.value,
        })
      },
    },
    Formula: {
      enter(node, parent) {
        parent._context.push({
          type: 'Formula',
          value: node.value,
        })
      },
    },
    Parameter: {
      enter(node, parent) {
        parent._context.push({
          type: 'Parameter',
          value: node.value,
        })
      },
    },
    Number: {
      enter(node, parent) {
        parent._context.push({
          type: 'Number',
          value: node.value,
        })
      },
    },
    Operator: {
      enter(node, parent) {
        parent._context.push({
          type: 'Operator',
          value: node.value,
        })
      },
    },
    Other: {
      enter(node, parent) {
        parent._context.push({
          type: 'Other',
          value: node.value,
        })
      },
    },
  })

  return newAst
}

module.exports = transformerDemo