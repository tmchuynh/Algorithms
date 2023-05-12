class BSTNode {
    /**
     * Constructs a new instance of a BST node.
     * @param {number} data The integer to store in the node.
     */
    constructor(data) {
        this.data = data;
        /**
         * These properties are how this node is connected to other nodes to form
         * the tree. Similar to .next in a SinglyLinkedList except a BST node can
         * be connected to two other nodes. To start, new nodes will not be
         * connected to any other nodes, these properties will be set after
         * the new node is instantiated.
         *
         * @type {BSTNode|null}
         */
        this.left = null;
        /** @type {BSTNode|null} */
        this.right = null;
    }
}

/**
* Represents an ordered tree of nodes where the data of left nodes are <= to
* their parent and the data of nodes to the right are > their parent's data.
*/
class BinarySearchTree {
    constructor() {
        /**
         * Just like the head of a linked list, this is the start of our tree which
         * branches downward from here.
         *
         * @type {BSTNode|null}
         */
        this.root = null;
    }

    // pre order = root,left,right
    logPreOrder(node = this.root) {
        if (node) {
            console.log(node.data);
            this.logPreOrder(node.left)
            this.logPreOrder(node.right)
        }
    }
    // in order = left,root,right
    logInOrder(node = this.root) {
        if (node) {
            this.logPreOrder(node.left)
            console.log(node.data);
            this.logPreOrder(node.right)
        }
    }
    // post order = left,right,root
    logPostOrder(node = this.root) {
        if (node) {
            this.logPreOrder(node.left)
            this.logPreOrder(node.right)
            console.log(node.data);
        }
    }


    /**
     * Determines if this tree is empty.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {boolean} Indicates if this tree is empty.
     */
    isEmpty() {
        if (this.root == null) {
            return true;
        }
        return false;

    }


    /**
     * DFS Preorder: (CurrNode, Left, Right)
     * Converts this BST into an array following Depth First Search preorder.
     * Example on the fullTree var:
     * [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90]
     * @param {Node} node The current node during the traversal of this tree.
     * @param {Array<number>} vals The data that has been visited so far.
     * @returns {Array<number>} The vals in DFS Preorder once all nodes visited.
     */
    toArrPreorder(node = this.root) {
        const vals = [];

        function traverse(node) {
            if (node) {
                vals.push(node.data);
                traverse(node.left);
                traverse(node.right);
            }
        }

        traverse(node);
        return vals;
    }


    /**
     * DFS Inorder: (Left, CurrNode, Right)
     * Converts this BST into an array following Depth First Search inorder.
     * See debugger call stack to help understand the recursion.
     * Example on the fullTree var:
     * [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]
     * @param {Node} node The current node during the traversal of this tree.
     * @param {Array<number>} vals The data that has been visited so far.
     * @returns {Array<number>} The vals in DFS Preorder once all nodes visited.
     */
    toArrInorder(node = this.root) {
        const vals = [];

        function traverse(node) {
            if (node) {
                traverse(node.left);
                vals.push(node.data);
                traverse(node.right);
            }
        }

        traverse(node);
        return vals;
    }


    /**
     * DFS Postorder (Left, Right, CurrNode)
     * Converts this BST into an array following Depth First Search postorder.
     * Example on the fullTree var:
     * [4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25]
     * @param {Node} node The current node during the traversal of this tree.
     * @param {Array<number>} vals The data that has been visited so far.
     * @returns {Array<number>} The vals in DFS Preorder once all nodes visited.
     */
    toArrPostorder(node = this.root) {
        const vals = [];

        function traverse(node) {
            if (node) {
                traverse(node.left);
                traverse(node.right);
                vals.push(node.data);
            }
        }

        traverse(node);
        return vals;
    }


    /**
     * Retrieves the smallest integer data from this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number} The smallest integer from this tree.
     */
    min(current = this.root) {
        if (!current) {
            return null;
        }
        if (current.left) {
            return this.min(current.left);
        }
        return current.data;
    }


    /**
     * Retrieves the largest integer data from this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} current The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {number} The largest integer from this tree.
     */
    max(current = this.root) {
        if (!current) {
            return null;
        }
        if (current.right) {
            return this.max(current.right);
        }
        return current.data;
    }


    /**
     * Inserts a new node with the given newVal in the right place to preserver
     * the order of this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} newVal The data to be added to a new node.
     * @returns {BinarySearchTree} This tree.
     */
    insert(newVal) {
        this.root = this.insertNode(this.root, newVal);
        return this;
    }

    insertNode(current, newVal) {
        if (!current) {
            return new BSTNode(newVal);
        }

        if (newVal < current.data) {
            current.left = this.insertNode(current.left, newVal);
        } else if (newVal > current.data) {
            current.right = this.insertNode(current.right, newVal);
        }

        return current;
    }


    /**
     * Inserts a new node with the given newVal in the right place to preserver
     * the order of this tree.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} newVal The data to be added to a new node.
     * @param {Node} curr The node that is currently accessed from the tree as
     *    the tree is being traversed.
     * @returns {BinarySearchTree} This tree.
     */
    insertRecursive(newVal, curr = this.root) {
        if (!curr) {
            this.root = new BSTNode(newVal);
            return this;
        }

        if (newVal >= curr.data) {
            if (curr.right) {
                return this.insertRecursive(newVal, curr.right);
            } else {
                curr.right = new BSTNode(newVal);
                return this;
            }
        } else {
            if (curr.left) {
                return this.insertRecursive(newVal, curr.left);
            } else {
                curr.left = new BSTNode(newVal);
                return this;
            }
        }
    }



    /**
     * Calculates the height of the tree which is based on how many nodes from
     * top to bottom (whichever side is taller).
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} node The current node during traversal of this tree.
     * @returns {number} The height of the tree.
     */
    height(node = this.root) {
        if (!node) {
            return 0;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }


    /**
     * Determines if this tree is a full tree. A full tree is a tree where every
     * node has both a left and a right except for the leaf nodes (last nodes)
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} node The current node during traversal of this tree.
     * @returns {boolean} Indicates if this tree is full.
     */
    isFull(node = this.root) {
        if (!node) {
            return true;
        }

        if ((!node.left && node.right) || (node.left && !node.right)) {
            return false;
        }

        return this.isFull(node.left) && this.isFull(node.right);
    }


    /**
    * Determines if this tree contains the given searchVal.
    * - Time: O(?).
    * - Space: O(?).
    * @param {number} searchVal The number to search for in the node's data.
    * @returns {boolean} Indicates if the searchVal was found.
    */
    contains(searchVal) {
        let current = this.root;

        while (current) {
            if (searchVal === current.data) {
                return true;
            } else if (searchVal < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }


    /**
     * Determines if this tree contains the given searchVal.
     * - Time: O(?).
     * - Space: O(?).
     * @param {number} searchVal The number to search for in the node's data.
     * @returns {boolean} Indicates if the searchVal was found.
     */
    containsRecursive(searchVal, current = this.root) {
        if (!current) {
            return false;
        }

        if (current.data === searchVal) {
            return true;
        }

        return (
            this.containsRecursive(searchVal, current.left) ||
            this.containsRecursive(searchVal, current.right)
        );
    }


    /**
     * Calculates the range (max - min) from the given startNode.
     * - Time: O(?).
     * - Space: O(?).
     * @param {Node} startNode The node to start from to calculate the range.
     * @returns {number|null} The range of this tree or a sub tree depending on if the
     *    startNode is the root or not.
     */
    range(startNode = this.root) {
        if (!startNode) {
            return null;
        }

        let min = startNode;
        let max = startNode;

        while (min.left) {
            min = min.left;
        }
        while (max.right) {
            max = max.right;
        }

        return max.data - min.data;
    }


    print(node = this.root, spaceCnt = 0, spaceIncr = 10) {
        if (!node) {
            return;
        }

        spaceCnt += spaceIncr;
        this.print(node.right, spaceCnt);

        console.log(
            " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
            `${node.data}`
        );

        this.print(node.left, spaceCnt);
    }

    // Logs this tree horizontally with the root on the left.
    print(node = this.root, spaceCnt = 0, spaceIncr = 10) {
        if (!node) {
            return;
        }

        spaceCnt += spaceIncr;
        this.print(node.right, spaceCnt);

        console.log(
            " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
            `${node.data}`
        );

        this.print(node.left, spaceCnt);
    }

}

const bst = new BinarySearchTree();
console.log(bst.isEmpty()); // Output: true
bst.insert(5);
bst.insert(2);
bst.insert(7);
bst.insert(1);
bst.insert(4);

const sortedList = bst.toArrInorder();
console.log(sortedList); // Output: [1, 2, 4, 5, 7]
console.log(bst.contains(7)); // Output: true
console.log(bst.contains(3)); // Output: false
console.log(bst.min()); // Output: 1
console.log(bst.max()); // Output: 7
console.log(bst.isEmpty()); // Output: false