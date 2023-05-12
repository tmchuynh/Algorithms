class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size);
    }

    hash(key) {
        let hashValue = 0;
        for (let i = 0; i < key.length; i++) {
            hashValue += key.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    set(key, value) {
        const index = this.hash(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }
        for (let pair of this.table[index]) {
            if (pair[0] === key) {
                pair[1] = value; // Key already exists, update its value.
                return;
            }
        }
        this.table[index].push([key, value]); // Key doesn't exist, add a new key-value pair.
    }

    get(key) {
        const index = this.hash(key);
        if (!this.table[index]) {
            return undefined; // Key doesn't exist.
        }
        for (let pair of this.table[index]) {
            if (pair[0] === key) {
                return pair[1]; // Key found, return its value.
            }
        }
        return undefined; // Key doesn't exist.
    }

    remove(key) {
        const index = this.hash(key);
        if (!this.table[index]) {
            return; // Key doesn't exist, nothing to remove.
        }
        for (let i = 0; i < this.table[index].length; i++) {
            if (this.table[index][i][0] === key) {
                this.table[index].splice(i, 1); // Key found, remove the key-value pair.
                return;
            }
        }
    }

    contains(key) {
        const index = this.hash(key);
        if (!this.table[index]) {
            return false; // Key doesn't exist.
        }
        for (let pair of this.table[index]) {
            if (pair[0] === key) {
                return true; // Key found.
            }
        }
        return false; // Key doesn't exist.
    }

    isEmpty() {
        for (let i = 0; i < this.size; i++) {
            if (this.table[i] && this.table[i].length > 0) {
                return false; // At least one slot in the table has a key-value pair.
            }
        }
        return true; // All slots in the table are empty.
    }

    clear() {
        this.table = new Array(this.size); // Clear the entire table.
    }

    size() {
        let count = 0;
        for (let i = 0; i < this.size; i++) {
            if (this.table[i]) {
                count += this.table[i].length; // Count the number of key-value pairs in the table.
            }
        }
        return count;
    }

    keys() {
        const keysArray = [];
        for (let i = 0; i < this.size; i++) {
            if (this.table[i]) {
                for (let pair of this.table[i]) {
                    keysArray.push(pair[0]); // Collect all keys from the table.
                }
            }
        }
        return keysArray;
    }

    values() {
        const valuesArray = [];
        for (let i = 0; i < this.size; i++) {
            if (this.table[i]) {
                for (let pair of this.table[i]) {
                    valuesArray.push(pair[1]); // Collect all values from the table.
                }
            }
        }
        return valuesArray;
    }
}