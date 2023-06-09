/**
 * Class to represent a MinHeap which is a Priority Queue optimized for fast
 * retrieval of the minimum value. It is implemented using an array but it is
 * best visualized as a tree structure where each 'node' has left and right
 * children except the 'node' may only have a left child.
 * - parent is located at: Math.floor(i / 2);
 * - left child is located at: i * 2
 * - right child is located at: i * 2 + 1
 */
class MinHeap {
    constructor() {
        /**
         * 0th index not used, so null is a placeholder. Not using 0th index makes
         * calculating the left and right children's index cleaner.
         * This also effectively makes our array start at index 1.
         */
        this.heap = [null];
    }

    /**
     * @param {number} i
     */
    idxOfParent(i) {
        return Math.floor(i / 2);
    }

    /**
     * @param {number} i
     */
    idxOfLeftChild(i) {
        return i * 2;
    }

    /**
     * @param {number} i
     */
    idxOfRightChild(i) {
        return i * 2 + 1;
    }

    /**
     * Swaps two nodes.
     * @param {number} i
     * @param {number} j
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    /**
     * Retrieves the size of the heap, ignoring the null placeholder.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {number}
     */
    size() {
        // - 1 since 0 index is unused
        return this.heap.length - 1;
    }

    /**
     * Retrieves the top (minimum number) in the heap without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {?number} Null if empty.
     */
    top() {
        if (this.heap.length < 2) {
            return null;
        }
        return this.heap[1];
    }

    /**
     * Inserts a new number into the heap and maintains the heap's order.
     * 1. Push new num to back.
     * 2. Iteratively swap the new num with its parent while it is smaller than
     *    its parent.
     * - Time: O(log n) logarithmic due to shiftUp / iterative swapping.
     * - Space: O(1) constant.
     * @param {number} num The num to add.
     */
    insert(num) {
        this.heap.push(num);
        let currentIndex = this.size();

        while (currentIndex > 1) {
            const parentIndex = this.idxOfParent(currentIndex);
            const currentElement = this.heap[currentIndex];
            const parentElement = this.heap[parentIndex];

            if (currentElement >= parentElement) {
                break;
            }

            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    /**
    * Extracts the min num from the heap and then re-orders the heap to
    * maintain order so the next min is ready to be extracted.
    * 1. Save the first node to a temp var.
    * 2. Pop last node off and set idx1 equal to the popped value.
    * 3. Iteratively swap the old last node that is now at idx1 with it's
    *    smallest child IF the smallest child is smaller than it.
    * - Time: O(log n) logarithmic due to shiftDown.
    * - Space: O(1) constant.
    * @returns {?number} The min number or null if empty.
    */
    extract() {
        if (this.heap === 1) {
            return null;
        }
        const min = this.heap[1];
        this.heap[1] = this.heap.pop();
        let current = 1;

        while (true) {
            const leftChild = this.idxOfLeftChild(current);
            const rightChild = this.idxOfRightChild(current);

            let smallerChild = null;

            if (leftChild <= this.size()) {
                smallerChild = leftChild;
            }

            if (rightChild <= this.size() && this.heap[rightChild] < this.heap[leftChild]) {
                smallerChild = rightChild;
            }

            if (smallerChild && this.heap[smallerChild] < this.heap[1]) {
                this.heap[current] = this.heap[smallerChild];
                current = smallerChild;
            } else {
                break;
            }
        }
        this.heap[current] = this.heap[1];

        // while(
        //   (this.heap[leftChild] && this.heap[current] > this.heap[leftChild]) ||
        //   (this.heap[rightChild] && this.heap[current] > this.heap[rightChild])
        // ) {
        //   if (this.heap[rightChild] && this.heap[rightChild] < this.heap[leftChild]) {
        //     this.swap(current,rightChild);
        //     current = rightChild;
        //   } else {
        //     this.swap(current, leftChild);
        //     current = leftChild;
        //   }
        //   leftChild = this.idxOfLeftChild(current);
        //   rightChild = this.idxOfRightChild(current);
        // }
        return min;
    }

    /**
     * Logs the tree horizontally with the root on the left and the index in
     * parenthesis using reverse inorder traversal.
     */
    printHorizontalTree(parentIdx = 1, spaceCnt = 0, spaceIncr = 10) {
        if (parentIdx > this.heap.length - 1) {
            return;
        }

        spaceCnt += spaceIncr;
        this.printHorizontalTree(parentIdx * 2 + 1, spaceCnt);

        console.log(
            " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
            `${this.heap[parentIdx]} (${parentIdx})`
        );

        this.printHorizontalTree(parentIdx * 2, spaceCnt);
    }
}