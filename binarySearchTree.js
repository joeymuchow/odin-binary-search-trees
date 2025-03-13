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
}