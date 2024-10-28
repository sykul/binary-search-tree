class Node {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
  }
}

function uniqSort(arr) {
  return arr
  .filter((item, index) => arr.indexOf(item) === index)
  .sort((a,b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    };
  });
}

class Tree {
  constructor(array) {
    this.array = array
    .filter((item, index) => array.indexOf(item) === index)
    .sort((a,b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      };
    });
    this.root = this.buildTree(array);
  };

  buildTree(arr) {
    arr = uniqSort(arr);

    let midpoint = Math.floor(arr.length/2);
    let arrayCopy = arr.map(elem => elem);
    let midNode = arrayCopy.splice(midpoint,1)[0];
    let rightSide = arrayCopy.splice(midpoint);
    let leftSide = arrayCopy;

    let newNode = new Node(midNode);

    if (leftSide && leftSide.length > 0) {
      newNode.leftChild = this.buildTree(leftSide);
    } else {
      newNode.leftChild = null;
    }
    if (rightSide && rightSide.length > 0) {
      newNode.rightChild = this.buildTree(rightSide);
    } else {
      newNode.rightChild = null;
    }

    return newNode;
  }

  insert(valueToInsert, rootValue = this.root) {
    let currentNode = rootValue;

    if (currentNode === null || currentNode.data === valueToInsert) {
      return;
    }

    if (currentNode.leftChild === null && currentNode.rightChild === null) {
      if (valueToInsert < currentNode.data) {
        currentNode.leftChild = new Node(valueToInsert);
        return;
      } else if (valueToInsert > currentNode.data) {
        currentNode.rightChild = new Node(valueToInsert);
        return;
      } else {
        return;
      }
    }

    if (valueToInsert < currentNode.data) {
      currentNode = currentNode.leftChild;
      this.insert(valueToInsert, currentNode);
    } else if (valueToInsert > currentNode.data) {
      currentNode = currentNode.rightChild;
      this.insert(valueToInsert, currentNode);
    }

  }

  delete(valueToDelete, rootValue = this.root) {
    let currentNode = rootValue;

    // If key not found
    if (currentNode === null
      || (currentNode.leftChild === null && currentNode.rightChild === null
      && currentNode.data !== valueToDelete)) {
        return;
      }
    

    // If key found and the node is a leaf
    if ( currentNode.leftChild !== null
      && currentNode.leftChild.data === valueToDelete
      && currentNode.leftChild.leftChild === null
      && currentNode.leftChild.rightChild === null) {
          currentNode.leftChild = null;
          return;
        }
    if ( currentNode.rightChild !== null
      && currentNode.rightChild.data === valueToDelete
      && currentNode.rightChild.leftChild === null
      && currentNode.rightChild.rightChild === null) {
          currentNode.rightChild = null;
          return;
        }
    
    // If key found and node has one child
     if (currentNode.rightChild !== null
      && currentNode.rightChild.data === valueToDelete) {

      if (currentNode.rightChild.leftChild === null && currentNode.rightChild.rightChild !== null) {
        currentNode.rightChild = currentNode.rightChild.rightChild;
        return;
      }

      if (currentNode.rightChild.leftChild !== null
        && currentNode.rightChild.rightChild === null) {
        currentNode.rightChild = currentNode.rightChild.leftChild;
        return;
      }
    }

    if (currentNode.leftChild !== null
      && currentNode.leftChild.data === valueToDelete) {

      if (currentNode.leftChild.leftChild === null && currentNode.leftChild.rightChild !== null) {
        currentNode.leftChild = currentNode.leftChild.rightChild;
        return;
      }
      if (currentNode.leftChild.leftChild !== null && currentNode.leftChild.rightChild === null) {
        currentNode.leftChild = currentNode.leftChild.leftChild;
        return;
      }
    }


    // If key found and node has two children
    function findSuccessorParent(node) {
      if ( node.leftChild.leftChild === null ) {
        return node;
      } else {
        node = node.leftChild;
        return findSuccessorParent(node);
      }
    }



    if (currentNode.data === valueToDelete
      && currentNode.leftChild !== null 
      && currentNode.rightChild !== null) {
        let successorParent = findSuccessorParent(currentNode.rightChild);
        currentNode.data = successorParent.leftChild.data;
        successorParent.leftChild = null;
        return;
    }

    if (valueToDelete < currentNode.data) {
      currentNode = currentNode.leftChild;
      this.delete(valueToDelete, currentNode);
    } else if (valueToDelete > currentNode.data) {
      currentNode = currentNode.rightChild;
      this.delete(valueToDelete, currentNode);
    }
  }

  find(searchValue, rootValue = this.root) {
    let currentNode = rootValue;

    if (currentNode.data === searchValue) {
      return currentNode;
    }

    if (currentNode.leftChild === null && currentNode.rightChild === null) {
      return null;
    }

    if (searchValue < currentNode.data) {
      currentNode = currentNode.leftChild;
      return this.find(searchValue, currentNode);
    } else if (searchValue > currentNode.data) {
      currentNode = currentNode.rightChild;
      return this.find(searchValue, currentNode);
    }
  }

  levelOrder(callback) {
    if (!callback instanceof Function) {
      throw new Error('Parameter is not a function!');
    }

    if (this.root === null) {
      return;
    }

    let queue = [];
    queue.push(this.root);
    while(queue.length > 0) {
      let currentNode = queue[0];
      if (currentNode.leftChild !== null) {
        queue.push(currentNode.leftChild);
      }
      if (currentNode.rightChild !== null) {
        queue.push(currentNode.rightChild);
      }
      callback(queue.shift().data)
    }
  }

  inOrder(callback, rootValue = this.root) {
    if (!callback instanceof Function) {
      throw new Error('Parameter is not a function!');
    }

    if (rootValue === null) {
      return;
    }

    let currentNode = rootValue;
    this.inOrder(callback, currentNode.leftChild);
    callback(currentNode.data);
    this.inOrder(callback, currentNode.rightChild);
  }

  preOrder(callback, rootValue = this.root) {
    if (!callback instanceof Function) {
      throw new Error('Parameter is not a function!');
    }

    if (rootValue === null) {
      return;
    }

    let currentNode = rootValue;
    callback(currentNode.data);
    this.preOrder(callback, currentNode.leftChild);
    this.preOrder(callback, currentNode.rightChild);
  }

  postOrder(callback, rootValue = this.root) {
    if (!callback instanceof Function) {
      throw new Error('Parameter is not a function!');
    }

    if (rootValue === null) {
      return;
    }

    let currentNode = rootValue;
    this.postOrder(callback, currentNode.leftChild);
    this.postOrder(callback, currentNode.rightChild);
    callback(currentNode.data);
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    if (node.leftChild === null && node.rightChild === null) {
      return 0;
    } else if (node.leftChild === null && node.rightChild !== null) {
      this.height(node.rightChild)
    } else if (node.leftChild !== null && node.rightChild === null) {
      this.height(node.leftChild)
    }

    return (Math.max(this.height(node.leftChild), this.height(node.rightChild)) + 1)
  }

  depth(node, rootValue = this.root) {
    if (node === null) {
      return null;
    }

    if (node.data === rootValue.data) {
      return 0;
    }

    if (rootValue.leftChild === null && rootValue.rightChild === null
      && rootValue.data !== node.data) {
      return null;
    }

    if (rootValue.leftChild !== null && rootValue.data > node.data) {
      rootValue = rootValue.leftChild;
    } else if (rootValue.data < node.data) {
      rootValue = rootValue.rightChild;
    }

    return (this.depth(node, rootValue) + 1)
  }

  isBalanced(node = this.root, balanced = true) {
    if (balanced === false) {
      return false;
    }

    if (node === null || node.leftChild === null && node.rightChild === null) {
      return true;
    }

    let leftHeight = this.height(node.leftChild)
    let rightHeight = this.height(node.rightChild)

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    } else  {
      return [this.isBalanced(node.leftChild, balanced),this.isBalanced(node.rightChild, balanced)].every((e) => (e) === true);
    }
  }

  rebalance() {
    let orderedArray = [];
    this.inOrder((n) => orderedArray.push(n));
    this.root = this.buildTree(orderedArray);
  }

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };


export { Tree, prettyPrint }