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

const tree = new NaryTree('A');
const nodeB = new Node('B');
const nodeC = new Node('C');
const nodeD = new Node('D');
const nodeE = new Node('E');
const nodeF = new Node('F');

tree.root.addChild(nodeB);
tree.root.addChild(nodeC);
nodeB.addChild(nodeD);
nodeB.addChild(nodeE);
nodeC.addChild(nodeF);

tree.traverseDFS(); // Output: A B D E C F
tree.traverseBFS(); // Output: A B C D E F
