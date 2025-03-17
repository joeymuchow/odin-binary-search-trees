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

const randomNumbers = () => {
    const rand = Math.floor(Math.random() * 10);
    const numArray = [];

    for (let i = 0; i < rand; i++) {
        numArray.push(Math.floor(Math.random() * 100));
    }

    return numArray;
}

const bstDriver = () => {
    const array = randomNumbers();

    const tree = new Tree(array);

    prettyPrint(tree.root);
    console.log("Is the tree balanced? " + tree.isBalanced());
    console.log("");

    console.log("Elements in level order:");
    tree.levelOrder((node) => {
        console.log(node.data);
    });
    console.log("");

    console.log("Elements in preorder:");
    tree.preorderRec((node) => {
        console.log(node.data);
    });
    console.log("");

    console.log("Elements in postorder:");
    tree.postorderRec((node) => {
        console.log(node.data);
    });
    console.log("");

    console.log("Elements in inorder:");
    tree.inorderRec((node) => {
        console.log(node.data);
    });
    console.log("");

    tree.insert(101);
    tree.insert(333);
    tree.insert(400);
    tree.insert(200);
    tree.insert(150);

    prettyPrint(tree.root);
    console.log("Is the tree balanced? " + tree.isBalanced());
    console.log("");

    tree.rebalance();
    prettyPrint(tree.root);
    console.log("Is the tree balanced? " + tree.isBalanced());
    console.log("");

    console.log("Elements in level order:");
    tree.levelOrder((node) => {
        console.log(node.data);
    });
    console.log("");

    console.log("Elements in preorder:");
    tree.preorderRec((node) => {
        console.log(node.data);
    });
    console.log("");

    console.log("Elements in postorder:");
    tree.postorderRec((node) => {
        console.log(node.data);
    });
    console.log("");

    console.log("Elements in inorder:");
    tree.inorderRec((node) => {
        console.log(node.data);
    });
    console.log("");
}

bstDriver();