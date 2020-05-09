const traverser = (ast, visitor) => {
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }
  
  function traverseNode(node, parent) {
    const methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Expression':
        traverseArray(node.body, node)
        break
      case 'Wrapper':
      case 'WeakWrapper':
      case 'Block':
        traverseArray(node.params, node)
        break
      case 'WhiteSpace':
      case 'Formula':
      case 'Parameter':
      case 'Number':
      case 'Operator':
      case 'Other':
        break
      default:
        throw new TypeError(node.type)
    }
    
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  
  traverseNode(ast, null)
}

module.exports = traverser