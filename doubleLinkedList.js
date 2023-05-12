class Node {
    constructor(data) {
        this.data = data;
        this.previous = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }


    isEmpty() {
        return this.length === 0;
    }


    getLength() {
        return this.length;
    }


    append(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.previous = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }


    prepend(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }

        this.length++;
    }


    insert(data, index) {
        if (index < 0 || index > this.length) {
            throw new Error('Index out of bounds');
        }

        if (index === 0) {
            this.prepend(data);
        } else if (index === this.length) {
            this.append(data);
        } else {
            const newNode = new Node(data);
            let current = this.head;
            let count = 0;

            while (count < index - 1) {
                current = current.next;
                count++;
            }

            newNode.previous = current;
            newNode.next = current.next;
            current.next.previous = newNode;
            current.next = newNode;

            this.length++;
        }
    }


    insertAtFront(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }

        this.length++;
    }


    insertAtBack(data) {
        const newNode = new Node(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.previous = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
    }


    moveMinToFront() {
        if (this.isEmpty() || this.length === 1) {
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
            this.tail = minNode.previous;
            this.tail.next = null;
        } else {
            minNode.previous.next = minNode.next;
            minNode.next.previous = minNode.previous;
        }

        minNode.previous = null;
        minNode.next = this.head;
        this.head.previous = minNode;
        this.head = minNode;
    }


    removeVal(val) {
        let current = this.head;

        while (current !== null) {
            if (current.data === val) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head) {
                        this.head.previous = null;
                    }
                } else if (current === this.tail) {
                    this.tail = current.previous;
                    this.tail.next = null;
                } else {
                    current.previous.next = current.next;
                    current.next.previous = current.previous;
                }

                current.previous = null;
                current.next = null;
                this.length--;

                return;
            }

            current = current.next;
        }
    }


    removeAt(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index out of bounds');
        }

        let removedNode;

        if (index === 0) {
            removedNode = this.head;

            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                this.head = this.head.next;
                this.head.previous = null;
            }
        } else if (index === this.length - 1) {
            removedNode = this.tail;
            this.tail = this.tail.previous;
            this.tail.next = null;
        } else {
            let current;
            if (index < this.length / 2) {
                current = this.head;
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
            } else {
                current = this.tail;
                for (let i = this.length - 1; i > index; i--) {
                    current = current.previous;
                }
            }

            removedNode = current;
            current.previous.next = current.next;
            current.next.previous = current.previous;
        }

        removedNode.previous = null;
        removedNode.next = null;
        this.length--;

        return removedNode.data;
    }


    remove(data) {
        let current = this.head;

        while (current !== null) {
            if (current.data === data) {
                if (current === this.head) {
                    this.head = this.head.next;
                    if (this.head) {
                        this.head.previous = null;
                    }
                } else if (current === this.tail) {
                    this.tail = this.tail.previous;
                    this.tail.next = null;
                } else {
                    const prevNode = current.previous;
                    const nextNode = current.next;
                    prevNode.next = nextNode;
                    nextNode.previous = prevNode;
                }

                current.previous = null;
                current.next = null;
                this.length--;

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
