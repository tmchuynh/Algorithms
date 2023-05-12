class ListNode {
    /**
     * Constructs a new Node instance. Executed when the 'new' keyword is used.
     * @param {any} data The data to be added into this new instance of a Node.
     *    The data can be anything, just like an array can contain strings,
     *    numbers, objects, etc.
     * @returns {ListNode} A new Node instance is returned automatically without
     *    having to be explicitly written (implicit return).
     */
    constructor(data) {
        this.data = data;
        /**
         * This property is used to link this node to whichever node is next
         * in the list. By default, this new node is not linked to any other
         * nodes, so the setting / updating of this property will happen sometime
         * after this node is created.
         *
         * @type {ListNode|null}
         */
        this.next = null;
    }
}

/**
 * This class keeps track of the start (head) of the list and to store all the
 * functionality (methods) that each list should have.
 */
class SinglyLinkedList {
    /**
     * Constructs a new instance of an empty linked list that inherits all the
     * methods.
     * @returns {SinglyLinkedList} The new list that is instantiated is implicitly
     *    returned without having to explicitly write "return".
     */
    constructor() {
        /** @type {ListNode|null} */
        this.head = null;
    }

    /**
     * Determines if this list is empty.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {boolean}
     */
    isEmpty() {
        if (!this.head) {
            return true;
        }
        return false;
    }

    /**
     * Creates a new node with the given data and inserts it at the back of
     * this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} data The data to be added to the new node.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtBack(data) {
        const newElement = new ListNode(data);

        if (this.head == null) {
            this.head = newElement;
            this.tail = this.head;
        } else {
            this.tail.next = newElement;
            this.tail = newElement;
        }

        return this;
    }


    /**
     * Creates a new node with the given data and inserts it at the back of
     * this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} data The data to be added to the new node.
     * @param {?ListNode} runner The current node during the traversal of this list
     *    or null when the end of the list has been reached.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtBackRecursive(data, runner = this.head) {
        const newNode = new ListNode(data);

        if (this.isEmpty()) {
            this.head = newNode;
            return this;
        }

        if (runner.next == null) {
            runner.next = newNode;
            return this;
        }

        return this.insertAtBackRecursive(data, runner.next);
    }


    /**
     * Calls insertAtBack on each item of the given array.
     * - Time: O(n * m) n = list length, m = arr.length.
     * - Space: O(1) constant.
     * @param {Array<any>} vals The data for each new node.
     * @returns {SinglyLinkedList} This list.
     */
    insertAtBackMany(vals) {
        for (const item of vals) {
            const newNode = new ListNode(item);
            if (this.isEmpty()) {
                this.head = newNode;
            } else {
                let runner = this.head;
                while (runner.next !== null) {
                    runner = runner.next;
                }
                runner.next = newNode;
            }
        }
        return this;
    }


    /**
     * Concatenates the nodes of a given list onto the back of this list.
     * - Time: O(?).
     * - Space: O(?).
     * @param {SinglyLinkedList} addList An instance of a different list whose
     *    whose nodes will be added to the back of this list.
     * @returns {SinglyLinkedList} This list with the added nodes.
     */
    concat(addList) {
        if (this.isEmpty()) {
            return addList;
        }
        if (addList.isEmpty()) {
            return this;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = addList.head;
        return this;
    }


    /**
     * Finds the node with the smallest data and moves that node to the front of
     * this list.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {SinglyLinkedList} This list.
     */
    moveMinToFront() {
        if (this.isEmpty()) {
            return this;
        }

        let minValNode = this.head;
        let nodeBeforeMin = null;
        let prev = null;
        let current = this.head;

        while (current && current.next) {
            if (current.next.data < minValNode.data) {
                minValNode = current.next;
                nodeBeforeMin = prev;
            }
            prev = current;
            current = current.next;
        }

        if (nodeBeforeMin) {
            nodeBeforeMin.next = minValNode.next;
            minValNode.next = this.head;
            this.head = minValNode;
        }

        return this;
    }


    /**
     * Splits this list into two lists where the 2nd list starts with the node
     * that has the given value.
     * splitOnVal(5) for the list this(1=>3=>5=>2=>4) will change list to (1=>3)
     * and the return value will be a new list containing (5=>2=>4).
     * If the value is not in the list return -1
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} val The value in the node that the list should be split on.
     * @returns {SinglyLinkedList} The split list containing the nodes that are
     *    no longer in this list.
     */
    splitOnVal(val) {
        if (this.isEmpty()) {
            return null;
        }

        let current = this.head;
        let prev = null;

        while (current != null && current.data != val) {
            prev = current;
            current = current.next;
        }

        if (current == null) {
            return null;
        }

        const newList = new SinglyLinkedList();
        newList.head = current;
        if (prev != null) {
            prev.next = null;
        } else {
            this.head = null;
        }

        return newList;
    }


    /**
    * Creates a new node with the given data and inserts that node at the front
    * of this list.
    * - Time: (?).
    * - Space: (?).
    * @param {any} data The data for the new node.
    * @returns {SinglyLinkedList} This list.
    */
    insertAtFront(data) {
        const newElement = new ListNode(data);
        newElement.next = this.head;
        this.head = newElement;
        return this;
    }


    /**
     * Removes the first node of this list.
     * - Time: (?).
     * - Space: (?).
     * @returns {any} The data from the removed node.
     */
    removeHead() {
        if (this.isEmpty()) {
            return null;
        }
        const oldHead = this.head;
        this.head = this.head.next;
        oldHead.next = null;
        return oldHead.data;
    }


    /**
     * Removes the node that has the matching given val as it's data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} val The value to compare to the node's data to find the
     *    node to be removed.
     * @returns {boolean} Indicates if a node was removed or not.
     */
    removeVal(val) {
        if (this.isEmpty()) {
            return false;
        }
        let current = this.head;
        let previous = null;
        while (current != null) {
            if (current.data === val) {
                if (current === this.head) {
                    this.removeHead();
                } else {
                    previous.next = current.next;
                    current.next = null;
                }
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }


    /**
     * Determines whether or not the given search value exists in this list.
     * - Time: O(n).
     * - Space: O(?).
     * @param {any} val The data to search for in the nodes of this list.
     * @returns {boolean}
     */
    contains(val) {
        let current = this.head;
        while (current) {
            if (current.data == val) {
                return true;
            }
            current = current.next;
        }
        return false;

    }

    /**
     * Determines whether or not the given search value exists in this list.
     * - Time: O(n).
     * - Space: O(?).
     * @param {any} val The data to search for in the nodes of this list.
     * @param {?ListNode} current The current node during the traversal of this list
     *    or null when the end of the list has been reached.
     * @returns {boolean}
     */
    containsRecursive(val, current = this.head) {
        if (!current) {
            return false;
        }
        if (current.data === val) {
            return true;
        }
        return this.containsRecursive(val, current.next);
    }

    /**
     * Retrieves the data of the second to last node in this list.
     * - Time: O(?).
     * - Space: O(?).
     * @returns {any} The data of the second to last node or null if there is no
     *    second to last node.
     */
    secondToLast() {
        if (this.head === null || this.head.next === null) {
            return null;
        }
        let runner = this.head;

        while (runner.next.next !== null) {
            runner = runner.next;
        }
        return runner.data;
    }


    /**
     * Inserts a new node before a node that has the given value as its data.
     * - Time: O(?).
     * - Space: O(?).
     * @param {any} newVal The value to use for the new node that is being added.
     * @param {any} targetVal The value to use to find the node that the newVal
     *    should be inserted in front of.
     * @returns {boolean} To indicate whether the node was pre-pended or not.
     */
    prepend(newVal, targetVal) {
        if (this.isEmpty()) {
            return false;
        }

        const newNode = new Node(newVal);

        if (this.head.data === targetVal) {
            newNode.next = this.head;
            this.head = newNode;
            return true;
        }

        let current = this.head.next;
        let previous = this.head;

        while (current) {
            if (current.data === targetVal) {
                newNode.next = current;
                previous.next = newNode;
                return true;
            }
            previous = current;
            current = current.next;
        }
        return false;
    }


    /**
     * Calculates the average of this list.
     * - Time: (?).
     * - Space: (?).
     * @returns {number|NaN} The average of the node's data.
     */
    average() {
        if (this.isEmpty()) {
            return NaN;
        }

        let runner = this.head;
        let count = 0;
        let sum = 0;

        while (runner) {
            count++;
            sum += runner.data;
            runner = runner.next;
        }

        return sum / count;
    }


    /**
     * Converts this list into an array containing the data of each node.
     * - Time: O(n) linear.
     * - Space: O(n).
     * @returns {Array<any>} An array of each node's data.
     */
    toArr() {
        const arr = [];
        let runner = this.head;

        while (runner) {
            arr.push(runner.data);
            runner = runner.next;
        }

        return arr;
    }
}

const list = new SinglyLinkedList();
console.log(list.isEmpty()); // Output: true
list.insertAtBack(1);
list.insertAtBack(2);
list.insertAtBack(3);
list.removeVal(2);
console.log(list.toArr()); // Output: [1, 3]
list.insertAtBack(2);
console.log(list.average()); // Output: 2

const list1 = new SinglyLinkedList();
list1.insertAtBack(1);
list1.insertAtBack(2);

const list2 = new SinglyLinkedList();
list2.insertAtBack(3);
list2.insertAtBack(4);

list1.concat(list2);
console.log(list1.toArr()); // Output: [1, 2, 3, 4]
