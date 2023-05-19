class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }


    isEmpty() {
        return this.size === 0;
    }


    getsize() {
        return this.size;
    }


    append(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }


    prepend(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.size++;
    }


    insert(data, index) {
        if (index < 0 || index > this.size) {
            throw new Error('Index out of bounds');
        }

        if (index === 0) {
            this.prepend(data);
        } else if (index === this.size) {
            this.append(data);
        } else {
            const newNode = new Node(data);
            let current = this.head;
            let count = 0;

            while (count < index - 1) {
                current = current.next;
                count++;
            }

            newNode.prev = current;
            newNode.next = current.next;
            current.next.prev = newNode;
            current.next = newNode;

            this.size++;
        }
    }


    insertAtFront(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }

        this.size++;
    }

    insertAfter(targetVal, newVal) {
        if (this.isEmpty()) {
            return false;
        }


        const newNode = new Node(newVal);
        let runner = this.head;

        while (runner != null) {
            if (runner.data == targetVal) {
                newNode.prev = runner;
                newNode.next = runner.next;

                if (runner.next) {
                    runner.next.prev = newNode;
                } else {
                    this.tail = newNode;
                }

                runner.next = newNode;
                return true;
            }
            runner = runner.next;
        }
        return false;

    }


    insertAtBack(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    insertAtBackMany(items = []) {
        items.forEach((item) => this.insertAtBack(item));
        return this;
    }

    removeMiddleNode() {
        if (this.size > 0 && this.size % 2 !== 0) {
            const middleNode = Math.floor(this.size / 2);
            let count = 1;
            let current = this.head;
            //move to the middle node
            while (count <= middleNode) {
                current = current.next;
                count++
            }
            //remove the node
            current.prev.next = current.next;
            current.next.prev = current.prev;
            current.next = null;
            current.prev = null;
            this.size--

            return current.data;
        } else {
            return null
        }
    }


    moveMinToFront() {
        if (this.isEmpty() || this.size === 1) {
            return;
        }

        let current = this.head;
        let minNode = current;

        while (current !== null) {
            if (current.data < minNode.data) {
                minNode = current;
            }
            current = current.next;
        }

        if (minNode === this.head) {
            return;
        }

        if (minNode === this.tail) {
            this.tail = minNode.prev;
            this.tail.next = null;
        } else {
            minNode.prev.next = minNode.next;
            minNode.next.prev = minNode.prev;
        }

        minNode.prev = null;
        minNode.next = this.head;
        this.head.prev = minNode;
        this.head = minNode;
    }


    removeVal(val) {
        let current = this.head;

        while (current !== null) {
            if (current.data === val) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.prev = null;
                    }
                } else if (current === this.tail) {
                    this.tail = current.prev;
                    this.tail.next = null;
                } else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }

                current.prev = null;
                current.next = null;
                this.size--;

                return;
            }

            current = current.next;
        }
    }


    removeAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error('Index out of bounds');
        }

        let removedNode;

        if (index === 0) {
            removedNode = this.head;

            if (this.size === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.prev = null;
            }
        } else if (index === this.size - 1) {
            removedNode = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            let current;
            if (index < this.size / 2) {
                current = this.head;
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
            } else {
                current = this.tail;
                for (let i = this.size - 1; i > index; i--) {
                    current = current.prev;
                }
            }

            removedNode = current;
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }

        removedNode.prev = null;
        removedNode.next = null;
        this.size--;

        return removedNode.data;
    }


    remove(data) {
        let current = this.head;

        while (current !== null) {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = this.head.next;
                    if (this.head) {
                        this.head.prev = null;
                    }
                } else if (current === this.tail) {
                    this.tail = this.tail.prev;
                    this.tail.next = null;
                } else {
                    const prevNode = current.prev;
                    const nextNode = current.next;
                    prevNode.next = nextNode;
                    nextNode.prev = prevNode;
                }

                current.prev = null;
                current.next = null;
                this.size--;

                return current.data;
            }

            current = current.next;
        }

        return null;
    }


    indexOf(data) {
        let current = this.head;
        let index = 0;

        while (current !== null) {
            if (current.data === data) {
                return index;

            }
            current = current.next;
            index++;
        }

        return -1;
    }


    contains(data) {
        return this.indexOf(data) !== -1;
    }


    average() {
        if (this.isEmpty()) {
            return 0;
        }

        let current = this.head;
        let sum = 0;
        let count = 0;

        while (current !== null) {
            sum += current.data;
            count++;
            current = current.next;
        }

        return sum / count;
    }


    toArray() {
        const array = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.data);
            current = current.next;
        }

        return array;
    }


}


const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.append(10);
doublyLinkedList.append(20);
doublyLinkedList.append(30);
doublyLinkedList.prepend(5);
doublyLinkedList.insert(15, 2);

console.log(doublyLinkedList.toArray()); // [5, 10, 15, 20, 30]

console.log(doublyLinkedList.removeAt(3)); // 20

console.log(doublyLinkedList.contains(10)); // true
console.log(doublyLinkedList.contains(50)); // false

console.log(doublyLinkedList.toString()); // "5, 10, 15, 30"