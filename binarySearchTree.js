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
}