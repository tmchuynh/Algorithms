class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    clear() {
        this.items = [];
    }

    toArray() {
        return this.items.slice();
    }

    contains(element) {
        return this.items.includes(element);
    }

    clone() {
        const clonedStack = new Stack();
        clonedStack.items = this.items.slice();
        return clonedStack;
    }

    toString() {
        return this.items.toString();
    }

    getElements() {
        return this.items.slice();
    }

    swap() {
        if (this.size() < 2) {
            return;
        }
        const top = this.pop();
        const secondTop = this.pop();
        this.push(top);
        this.push(secondTop);
    }

    peekAt(index) {
        if (index < 0 || index >= this.size()) {
            return null;
        }
        return this.items[index];
    }
}
const stack = new Stack();
console.log(stack.isEmpty()); // Output: true
stack.push(10);
console.log(stack.isEmpty()); // Output: false
stack.push(20);
stack.push(30);
console.log(stack.size()); // Output: 3
console.log(stack.pop()); // Output: 30
console.log(stack.pop()); // Output: 20


const stack1 = new Stack();
stack1.push('apple');
stack1.push('banana');
stack1.push('cherry');
console.log(stack1.peek()); // Output: 'cherry'


const stack2 = new Stack();
stack2.push('one');
stack2.push('two');
stack2.push('three');
stack2.clear();
console.log(stack2.size()); // Output: 0

const stack3 = new Stack();
stack3.push('a');
stack3.push('b');
stack3.push('c');
console.log(stack3.toArray()); // Output: ['a', 'b', 'c']
