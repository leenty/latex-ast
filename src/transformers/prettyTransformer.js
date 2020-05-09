const traverser = require('../traverser')

/**
 * 对latex进行美化
 * 去除多余的空格 “\sqrt   3” -> “\sqrt 3”
 * 去除多余的大括号 “\sqrt {{{34}}}” -> “\sqrt {34}”
 * @param {*} ast 
 */
const prettyTransformer = (ast) => {
  const newAst = {
    type: 'Expression',
    body: [],
  }

  ast._context = newAst.body

  // 清理冗余的括号 “\sqrt {{{34}}}” -> “\sqrt {34}”
  function clearRedundant(node, type = 'Wrapper') {
    if (node.params.length === 1 && node.params[0].type === type) { // 两级单个Wrapper嵌套，无意义，遇到则去除
      node.params = node.params[0].params
      clearRedundant(node)
    }
  }

  traverser(ast, {
    Wrapper: {
      enter(node, parent) {
        const nodeAst = {
          type: 'Wrapper',
          params: [],
        }

        
        clearRedundant(node, 'Wrapper')

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
        // 对重复空白符进行缩减 “\sqrt   3” -> “\sqrt 3”
        const value = node.value.slice(0,1)
        parent._context.push({
          type: 'WhiteSpace',
          value,
          repeat: node.value.length,
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

module.exports = prettyTransformer