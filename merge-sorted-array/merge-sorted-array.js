/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // initialize variables i and j.
        // i is number of items in nums1 that are not 0 (m) - 1.
        // j is number of items in nums2 (n) - 1.
   let i = m - 1, j = n - 1;
   // initialize variable to hold total length of both i and j
   // to know lenght of all items.
   let k = m + n - 1;
   // Main iteration: as long as both i >= 0 and j >= 0.
   while (i >= 0 && j >= 0) {
       // if the value at nums1[i] is less than value at nums2[j].
       if (nums1[i] < nums2[j]) {
           // set the furthest index down of nums1 to the 
           // greater value of the two.
           nums1[k] = nums2[j];
           // decrement k to move up from end of nums1.
           // decrement j to move up nums2.
           k--;
           j--;
       } else {
           // set the furthest index of nums1 to the 
           // lesser value of the two.
           nums1[k] = nums1[i];
           // decrement k to move up from end of nums1.
           // decrement i to move up nums1.
           k--;
           i--;
       }
   }
   // Second iteration: if j or i are not yet 0 then
   // continue setting nums1[k] to their remaining values
   // until they reach 0.
   while (j >= 0) {
       nums1[k] = nums2[j];
       k--;
       j--;
   }
   while (i >= 0) {
       nums1[k] = nums1[i];
       k--;
       i--;
   }
};