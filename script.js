import { prettyPrint, Tree } from "./binary-search-tree.js";

const testTree = new Tree([1, 2, 6, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
 


prettyPrint(testTree.root)
testTree.delete(7)
prettyPrint(testTree.root)