import { Tree } from "./binarySearchTree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const test = new Tree([2,1,3,4,2]);

const test2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

prettyPrint(test.root);

prettyPrint(test2.root);

test2.insert(6);
test2.insert(21);
test2.insert(2);
test2.insert(33);

prettyPrint(test2.root);

test2.deleteItem(2);
test2.deleteItem(33);
test2.deleteItem(7);

prettyPrint(test2.root);

test2.deleteItem(67);

prettyPrint(test2.root);

test2.deleteItem(8);

console.log(test2.find(5));

prettyPrint(test2.root);

function logNode(node) {
    console.log(node.data);
}

test2.levelOrder(logNode, test2.root);
console.log("------");
test2.preorderRec(logNode, test2.root);
console.log("------");
test2.inorderRec(logNode, test2.root);
console.log("------");
test2.postorderRec(logNode, test2.root);
console.log("------");
const heightNode = test2.find(4);
console.log(test2.height(heightNode));
console.log("------");
console.log(test2.depth(test2.root));
console.log("------");
console.log("is test2 balanced? " + test2.isBalanced());

test2.insert(20);
test2.insert(19);
test2.insert(18);
test2.insert(17);
prettyPrint(test2.root);
console.log("is test2 balanced? " + test2.isBalanced());