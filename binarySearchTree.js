import { mergeSort } from "./sort.js";

class Node {
    constructor(data, left, right) {
        this.data = data;
        this.left = left;
        this.right = right;
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

        return array;
    }
}