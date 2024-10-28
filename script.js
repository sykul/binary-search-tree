import { prettyPrint, Tree } from "./binary-search-tree.js";
import { randomArray } from "./test-functions.js";

const testArray = randomArray()
console.log(testArray)
const testTree = new Tree(testArray)
 


prettyPrint(testTree.root)
testTree.insert(101)
testTree.insert(102)
testTree.insert(103)
testTree.insert(104)
testTree.insert(105)
testTree.insert(106)
prettyPrint(testTree.root)

console.log(testTree.isBalanced())
testTree.rebalance()
prettyPrint(testTree.root)