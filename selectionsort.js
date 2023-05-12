let arr1 = [5, 2, 4, 6, 1, 3];
let arr2 = [6, 9, 2, 7, 8, 6];
let arr3 = [9, 6, 8, 5, 6, 1];
let arr4 = [15, 22, 66, 4, 1, 2, 9, 6];
let arr5 = [15, 0, 6, 3, 2, 9, 6, 7];


function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minimum = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minimum]) {
                minimum = j;
            }
        }
        if (minimum !== i) {
            [arr[i], arr[minimum]] = [arr[minimum], arr[i]];
        }
    }
    return arr;
}


console.log(selectionSort(arr1));
console.log(selectionSort(arr2));
console.log(selectionSort(arr3));
console.log(selectionSort(arr4));
console.log(selectionSort(arr5));
