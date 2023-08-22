# Merge Sorted Array

### Patterns:

- Two Pointers

### Prompt:

> You are given two integer arrays `nums1` and `nums2`, sorted in non-decreasing order, and two integers m and n, representing the number of elements in `nums1` and `nums2` respectively.
>
> **Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.
>
> The final sorted array should not be returned by the function, but instead be _stored inside the array_ `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.

### Analysis:

A common pattern in solving sorted arrays is to use a binary search or two pointers to arrive at our desired algorithm. For this problem, we are tasked with merging two arrays that are each in increasing order (e.g. 1,2,3,...).
