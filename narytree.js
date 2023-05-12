class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}

class NaryTree {
    constructor(rootData) {
        this.root = new Node(rootData);
    }

    traverseDFS(node = this.root) {
        console.log(node.data);
        for (let child of node.children) {
            this.traverseDFS(child);
        }
    }

    traverseBFS() {
        const queue = [this.root];
        while (queue.length > 0) {
            const node = queue.shift();
            console.log(node.data);
            for (let child of node.children) {
                queue.push(child);
            }
        }
    }
}
