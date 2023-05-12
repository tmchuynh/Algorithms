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
