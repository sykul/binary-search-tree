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

  insert(valueToInsert, rootValue = null) {
    let currentNode;
    if (rootValue === null) {
      currentNode = this.root;
    } else {
      currentNode = rootValue;
    }
    
    if (currentNode.leftChild === null && currentNode.rightChild === null) {
      if (valueToInsert < currentNode.data) {
        currentNode.leftChild = new Node(valueToInsert);
        return;
      } else if (valueToInsert > currentNode.data) {
        currentNode.rightChild = new Node(valueToInsert);
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

  delete(value) {}

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  isBalanced() {}

  rebalance() {}

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