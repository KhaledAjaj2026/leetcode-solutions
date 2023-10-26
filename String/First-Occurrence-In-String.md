# Find the Index of the First Occurrence in a String (LeetCode #28)

## Prompt:

> Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

## Test Cases:

```
haystack: "iubavansfoupand"
needle: "fou"
```

```
haystack: "mississippi"
needle: "issip"
```

```
haystack: "gentleman"
needle: "guy"
```

## Problem Analysis:

The prompt asks us to, essentially, find a substring within a string, and return its first index within the given string. The obvious approach would be to compare letters to one another like we do with our eyes when scanning between the string and its substring for the answer. However, using the Knuth-Morris-Pratt (KMP) algorithm makes this a much more efficient feat to accomplish, as will be discussed in the 'optimized' solution.

## Solutions:

#### Brute Force:

The naive approach to this problem would be to scan the letters of `needle` and compare them to those of `haystack` to find the first occurrence of `needle`. We can do this by starting with the first letter of `needle`, whose index is stored in our variable `indexOfN`, and comparing it to each letter of `haystack` until a match is found, using a for-loop to interate over every letter.

If a match is found, then we first store the index in our variable `firstIndex`, and start a while loop which uses the variables `indexOfN` and `i` to track the indexes of `needle` and `haystack`, respectively. We keep looping until either the end of `needle` is reached, or we encounter a mismatch. If we have the former, then we simply return `firstIndex`.

If we have the latter, then we must set variable `i` (the iterator for our for-loop) to the value in `firstIndex`, and reset the values of `indexOfN` and `firstIndex` to their original values (i.e. '0' and '-1', respectively). The for-loop continues with the index after our first encounter with a match, until it reaches the end or finds a solution.

```
const needleInHaystack = (haystack, needle) => {
  if (haystack.length < needle.length) return -1;

  let firstIndex = -1;
  let indexOfN = 0;

  for (let i = 0; i < haystack.length; i++) {
    if (needle[indexOfN] === haystack[i]) {

      firstIndex = i;

      while (needle[indexOfN] === haystack[i] && indexOfN < needle.length) {
        indexOfN++;
        i++;
      }

      if (indexOfN === needle.length) {
        return firstIndex;
      }
      else {
        i = firstIndex;
        firstIndex = -1;
        indexOfN = 0;
      }

    }
  }
  return firstIndex;
}
```

#### Optimized:

The optimized solution to this problem is to use the previously mentioned KMP algorithm. This algorithm is an efficient search algorithm that is especially good at finding multiple instances of patterns (substrings) within a string, and prevents repitition in already-scanned items. It does this by precomputing the Longest Prefix Suffix (LPS), which is the longest proper prefix of the string which is also a suffix of the pattern. By having an LPS, unecessary character comparisons can be avoided and the answer more optimally searched.

There are two main steps to completing the KMP algorithm: precomputing the LPS, and matching patterns.

To precompute the LPS, we make a separate function for this operation so as to keep a separation of concerns. This makes it easier to debug and to maintain code in the future once you revisit it. In this function, we create an array `lps` of the same length as our `needle`, and fill it with `0`'s. Then, we create two variables for traversing `needle`'s characters, `i` and `len`, where `i = 1` and `len = 0`.

We then loop through `needle` using these two variables as our indexes for comparison. The goal here is to find patterns within `needle` which provides opportunities to skip unnecessary comparisons. For example, the string `'DARDARMAGA'` has a repeating instance of `'DAR'`, so when we are searching for the needle in our haystack and encounter a mismatch, there is no need to go all the way back to the beginning of our needle. Instead, we just go to the last instance of the `'DARDAR'` pattern and start comparing thereon.

Once we reach the end of `needle` (that is, when `i` is equal to `needle.length`), we will have an array that tells us which indexes of `needle` it is safe to skip when finding our first index occurrence within `haystack`.

```
function computeLPSArray(needle) {
  const needleLength = needle.length;
  const lps = new Array(needleLength).fill(0);
  let len = 0;
  let i = 1;

  while (i < needleLength) {
    if (needle[i] === needle[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}
```

After we find the LPS, we can begin searching for the first occurrence of `needle` within `haystack`. In our main function, `strStr`, we first check if `needle` is not empty, for if it is then return 0. We keep the lengths of `haystack` and `needle` in constant variables for later reference and to lessen the amount of memory accesses. We store our lps array in a constant `lps` with the return-value of our lps function. Finally, we have two variables to iterate through the indexes of `haystack` and `needle`, `i` and `j` respectively.

Make a while-loop to iterate through both strings. First, we compare the characters in each string. If they match, then we increment both `i` and `j`, since that means they could be part of the same pattern. Next, we check if `j` is equal to `needleLength`, and if it is then that means we have found our pattern, so we return `i - j` which is the first index of its occurrence.

If `j` is not equal to `needleLength`, then we check if `i` is still less than `haystackLength` and if the characters at `haystack[i]` and `needle[j]` do not match. If both conditions return true then we check if `j` is not 0, and if it is not 0 then we use our LPS array to skip matching characters, and set its value to the current value of `j-1`. If the previous two conditions are true but `j` is equal to 0, then we simply increment `i` by 1.

This loop continues until either we find our pattern, which is when `j` equals `needleLength`, or if we reach the end of `haystack`, which is when `i` equals `haystackLength`. The former returns the first index of the occurrence of `needle` in `haystack`, the latter returns -1, i.e. not-found.

```
const strStr = (haystack, needle) => {
  if (needle === "") return 0; // Empty needle matches at index 0.

  const haystackLength = haystack.length;
  const needleLength = needle.length;
  const lps = computeLPSArray(needle);

  let i = 0; // Index for haystack.
  let j = 0; // Index for needle.

  while (i < haystackLength) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    }

    if (j === needleLength) {
      return i - j; // Found the first occurrence of the needle.
    } else if (i < haystackLength && haystack[i] !== needle[j]) {
      if (j !== 0) {
        j = lps[j - 1]; // Use the LPS array to skip matching characters.
      } else {
        i++;
      }
    }
  }

  return -1;
}
```

## Time & Space Complexities

#### Time:

The time complexity for our brute force solution is `O(H * N)`, where `H` is `haystack.length` and `N` is `needle.length`. The actual time complexity would be `O((H - N) * N)`. The outer loop of our BF solution iterates through as many as `haystack.length - needle.length` indexes, and the inner loop iterates through as many as `needle.length` indexes, but the actual complexity simplifies to `O(H + N)`.

The time complexity for our optimized solution is `O(H + N)`, where `H` is `haystack.length` and `N` is `needle.length`. This is because our LPS allows us to skip over unnecessary comparisons thanks to its precalculated patterns beforehand. The LPS function takes `O(N)` time and the main search takes `O(H)`, resulting in a time complexity of `O(H + N)`.

#### Space:

The space complexity for our brute force solution is `O(1)` since it always uses a constant amount of space, regardless of string size. The minor variables used for iteration and string length are trivial when calculating space complexity, such is the case for all Big-O notations.

The space complexity for our optimized solution is `O(N)` because of our LPS array which consists of `needle.length` indexes. This remains linear with respect to the `needle` string.
