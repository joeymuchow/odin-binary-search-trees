import { mergeSort } from "./sort.js";

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        // sort array
        const sortedArray = mergeSort(array);

        //remove duplicate values
        const noDupes = this.removeDupes(sortedArray);

        // build nodes
        return this.sortedArrayToBST(noDupes, 0, noDupes.length - 1);
    }

    removeDupes(array) {
        const noDupes = [];

        for (let i = 0; i < array.length; i++) {
            if (i === 0) {
                noDupes.push(array[i]);
            } else if (array[i] !== array[i-1]) {
                noDupes.push(array[i]);
            }
        }

        return noDupes;
    }

    sortedArrayToBST(array, start, end) {
        if (start > end) return null;

        const mid = start + Math.floor((end - start) / 2);

        let root = new Node(array[mid]);

        root.left = this.sortedArrayToBST(array, start, mid-1);
        root.right = this.sortedArrayToBST(array, mid+1, end);

        return root;
    }

    insert(value) {
        let currentNode = this.root;
        let prevNode = null;
        let side = "left";

        while (currentNode !== null) {
            prevNode = currentNode;
            if (value < currentNode.data) {
                currentNode = currentNode.left;
                side = "left";
            } else {
                currentNode = currentNode.right;
                side = "right";
            }
        }

        const node = new Node(value);
        node.left = null;
        node.right = null;
        prevNode[side] = node;
    }

    deleteItem(value) {
        let currentNode = this.root;
        let prevNode = null;
        let side = "left";

        while (currentNode !== null) {
            if (value === currentNode.data) {
                // how to deal with deleted node having two children and the prev node having two children(including what is being deleted)

                if (currentNode.left === null && currentNode.right === null) {
                    // leaf node
                    prevNode[side] = null;
                } else if (currentNode.left !== null && currentNode.right !== null) {
                    // two children
                    // find smallest value that is larger than current node's value
                    // go to the right child and then go left until null
                    // delete that node and place its value at this point
                    let newNode = currentNode.right;

                    while (newNode.left !== null) {
                        newNode = newNode.left;
                    }

                    this.deleteItem(newNode.data);

                    currentNode.data = newNode.data;
                } else {
                    // one child
                    prevNode[side] = currentNode.left === null ? currentNode.right : currentNode.left;
                }
                break;
            } else if (value < currentNode.data) {
                prevNode = currentNode;
                currentNode = currentNode.left;
                side = "left";
            } else {
                prevNode = currentNode;
                currentNode = currentNode.right;
                side = "right";
            }
        }
    }

    find(value) {
        let result = null;
        let currentNode = this.root;

        while (currentNode !== null) {
            if (value === currentNode.data) {
                result = currentNode;
                break;
            } else if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return result;
    }

    levelOrder(callback) {
        if (!callback) throw new Error("Callback function required");

        const queue = [];
        queue.push(this.root);

        while (queue.length) {
            const node = queue.shift();

            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    preorderRec(callback, node = this.root) {
        if (!callback) throw new Error("Callback function required");
        if (!node) return;

        callback(node);

        this.preorderRec(callback, node.left);
        this.preorderRec(callback, node.right);
    }

    inorderRec(callback, node = this.root) {
        if (!callback) throw new Error("Callback function required");
        if (!node) return;

        this.inorderRec(callback, node.left);
        callback(node);
        this.inorderRec(callback, node.right);
    }

    postorderRec(callback, node = this.root) {
        if (!callback) throw new Error("Callback function required");
        if (!node) return;

        this.postorderRec(callback, node.left);
        this.postorderRec(callback, node.right);
        callback(node);
    }

    height(node) {
        if (!node) return 0;

        let left = 0;
        if (node.left) {
            left = this.height(node.left);
        }

        let right = 0;
        if (node.left) {
            right = this.height(node.right);
        }

        return Math.max(left, right) + 1;
    }

    depth(node) {
        let depth = 0;
        let currentNode = this.root;

        while (currentNode !== null) {
            if (node.data === currentNode.data) {
                break;
            } else if (node.data < currentNode.data) {
                currentNode = currentNode.left;
                depth += 1;
            } else {
                currentNode = currentNode.right;
                depth += 1;
            }
        }

        return depth;
    }

    isBalanced(currentNode = this.root) {
        const left = this.height(currentNode.left);
        const right = this.height(currentNode.right);

        const diff = left - right;

        if (diff > 1 || diff < -1) {
            return false;
        }

        let leftResult = true;
        let rightResult = true;

        if (currentNode.left) {
            leftResult = this.isBalanced(currentNode.left);
        }

        if (currentNode.right) {
            rightResult = this.isBalanced(currentNode.right);
        }

        return leftResult && rightResult;
    }

    rebalance() {
        // check if tree is balanced
        // if balanced return this.root
        if (this.isBalanced()) {
            return;
        }

        // create array to store data
        const array = [];
        // use traversal function to grab all node data
        // levelorder, preorder, etc
        // callback given should be a function to push data into array
        this.levelOrder((node) => {
            array.push(node.data);
        });

        // call build tree with array of data
        // get root node from this method
        this.root = this.buildTree(array);
    }
}