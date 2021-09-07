// https://leetcode.com/problems/find-median-from-data-stream/
// https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
// 4. 寻找两个正序数组的中位数
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    let len1 = nums1.length;
    let len2 = nums2.length;
    let leftLen = parseInt((len1 + len2 + 1) / 2);
    let left = 0;
    let right = len1;
    while(left < right) {
        let i = left + parseInt((right - left + 1) / 2);
        let j = leftLen - i;
        if (nums1[i - 1] > nums2[j]) {
            right = i - 1;
        } else {
            left = i;
        }
    }
    let m = left;
    let n = leftLen - m;
    let nums1LMax = m === 0 ? -Infinity : nums1[m - 1];
    let nums1RMin = m === len1 ? Infinity : nums1[m];
    let nums2LMax = n === 0 ? -Infinity : nums2[n - 1];
    let nums2RMix = n === len2 ? Infinity : nums2[n];
    if (((len1 + len2) % 2) === 1) {
        return Math.max(nums1LMax, nums2LMax);
    } else {
        return ((Math.max(nums1LMax, nums2LMax) + Math.min(nums1RMin, nums2RMix))).toFixed(5) / 2;
    }
 };
// https://leetcode-cn.com/problems/rotate-image/
//  48. 旋转图像
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
 var rotate = function(matrix) {
    let n = matrix.length;
    for (let i = 0; i < parseInt(n / 2); i++) {
        for (let j = 0; j < n; j++) {
            [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    return matrix;
};

 