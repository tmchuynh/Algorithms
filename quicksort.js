/**
 * Partitions the given array in-place by selecting the number at the last
 * index to use it as a "pivot" value, then arranges all numbers less than the
 * pivot to be to its left and all larger numbers to its right.
 * - Time: O(?).
 * - Space: O(?).
 * @param {Array<number>} nums
 * @param {number} start The index indicating the start of the slice of array
 *    being processed.
 * @param {number} end The index indicating the end of the slice of array
 *    being processed.
 * @returns {number} The idx where left section of smaller items ends.
 */
function partition(nums = [], start = 0, end = nums.length - 1) {
    const pivot = nums[end];
    let pivotIdx = start;

    for (let i = start; i < end; i++) {
        if (nums[i] <= pivot) {
            [nums[i], nums[pivotIdx]] = [nums[pivotIdx], nums[i]];
            pivotIdx++;
        }
    }

    [nums[pivotIdx], nums[end]] = [nums[end], nums[pivotIdx]];
    return pivotIdx;
}

/**
 * Recursively sorts the given array in-place by mutating the array.
 * Best: O(n log(n)) linearithmic.
 * Average: O(n log(n)) linearithmic.
 * Worst: O(n^2) quadratic.
 * @see https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/visualize/
 *    visualization.
 * @param {Array<number>} nums
 * @param {number} left The index indicating the start of the slice of the
 *    given array being processed.
 * @param {number} right The index indicating the end of the slice of the
 *    given array being processed.
 * @returns {Array<number>} The given array after being sorted.
 */
function quickSort(nums = [], left = 0, right = nums.length - 1) {
    if (left < right) {
        const pivotIdx = partition(nums, left, right);
        quickSort(nums, left, pivotIdx - 1);
        quickSort(nums, pivotIdx + 1, right);
    }

    return nums;
}