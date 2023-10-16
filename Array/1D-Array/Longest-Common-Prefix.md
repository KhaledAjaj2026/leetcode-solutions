# Longest Common Prefix (LeetCode #14)

## Prompt:

> Write a function to find the longest common prefix string amongst an array of strings.
>
> If there is no common prefix, return an empty string "".

## Test Cases:

```
["direct", "dimension", "dinosaur"]
```

```
["linger", "lint", "limit"]
```

## Problem Analysis:

Before we even consider thinking of an algorithm to find this prefix, we must first define what a prefix is. A prefix is a substring of a given string, whose length can range from one letter to the length of the given string, so long as it begins at the start of the given string. For example, the string "convention" has the possible prefixes of "conven", "con", "c", or even "convention", for they all start with the beginning of the string.

With this in mind, the longest common prefix (LCP) is the longest possible prefix among a collection of strings. Using our previous example "convention" and a new string "convince", we can easily see that their LCP would be "conv". We must get our program to do the same: find the LCP of a given array of strings.

## Solutions:

#### Brute Force:

The cave-man way to solve this problem would be to compare every single letter to every other single letter. To be more precise, we must use the first word in our given array and use it as a comparator, comparing its characters to every other word's characters. We use the first word in our array of strings because we can assume that every word has the LCP, including the first word.

To implement the brute-force method for this problem, we first make a variable `prefix` to hold our answer. We then take the first word from our given array and loop through its characters, one after the other. We store this char in our variable `charToCompare` for easier reference. For every char in the other words of our array, we must compare them to `charToCompare`. If the chars at any point do not match then we return our variable `prefix`. Otherwise, we add `charToCompare` to `prefix`.

```
const longestCommonPrefixBrute = (strs) => {
    if (strs.length === 0) return "";

    const strs[0] = strs[0];
    let prefix = "";

    for (let i = 0; i < strs[0].length; i++) {
        let charToCompare = strs[0][i];
        for (let x = 1; x < strs.length; x++) {
            if (i >= strs[x].length || strs[x][i] !== charToCompare) {
                return prefix;
            }
        }
        prefix += charToCompare;
    }

    return prefix;
}
```

#### Optimized:

The above solution works, but it is not optimal and takes too much memory for what it tries to accomplish. To optimize our solution, we must assume that every word in our array has a LCP. Moreover, the words can be sorted into lexicographic order, or in dictionary order. Sorting the words will give us two distinct words of our array: the first word and the last word. These two are important because the first word will become the shortest/lexicographically smallest word, and the last word will become the longest/lexocigraphically largest word.

Using the above assumptions, we can devise an algorithm that takes advantage of sorting. We can implement our own algorithm to sort the array, but it suffices to use the `Array.prototype.sort()` method in this case, since our main focus is not on sorting but on finding the LCP. There is a chance that your interviewer will want to see you implement your own sorting algorithm, so be prepared with the common sorting methods just in case.

Using `Array.prototype.sort()` we simply plug in our given array of strings to sort them into lexicographic order. Then, we loop through our first word, since it will be shorter than the last word, and compare all their letters for similarity. If they have similar characters in the same position, then we push it to our varible `prefix`. If they do not match then we return `prefix`.

```
const longestCommonPrefixOptimized = (strs) => {
    if (strs.length === 0) return "";

    strs.sort();
    let prefix = "";

    for (let i = 0; i < strs[0].length; i++) {
        if (strs[0][i] === strs[strs.length-1][i]) {
            prefix += strs[0][i];
        } else {
            return prefix;
        }
    }
}
```

## Time & Space Complexities

#### Time:

The time complexity for our brute force solution is `O(N * M)`, where `N` is the length of our comparator word and `M` is the length of our given array. We compare every letter of the comparator to every letter of every other word at the same index.

The time complexity for our optimized solution's sorting step is `O(N * M * log N)`, where `N` is the number of strings, and `M` is the length of the longest string. The sorting method takes `O(N log N)` itself. The comparison step only takes `O(M)` time, but since the sorting step takes longer it dominates as the overall time complexity for the optimized solution.

#### Space:

The space complexity for our brute force solution is `O(N)` where `N` is the length of the shortest word in our array, since the shortest string can also be the LCP. There are multiple little variables used for iteration such as `i` or `x`, but they do not impact the space complexity to a major degree so they are disregarded.

The space complexity for the sorting part of our optimized solution is `O(N * M)`, where `N` is the number of strings in our array and `M` is the length of the longest string. The sorted array is held in storage behind the scenes so it is important to remember its presence to show an understanding of memory usage. The comparison part of our solution takes `O(M)` space where M is our variable `prefix`, but in cases like this the greater complexity dominates as the oveall space-complexity.
