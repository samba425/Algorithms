// Question 1)  Symmetric difference (commonly denoted by Δ) of two sets is the set of elements which are in either of the two sets, but not in both.
// For example, sym([1, 2, 3], [5, 2, 1, 4]) should yield [3, 4, 5].

// options 1

const diff = (arr1, arr2) => [
  ...arr1.filter(e => !arr2.includes(e)),
  ...arr2.filter(e => !arr1.includes(e))
];

const sym1 = (...args) => [...new Set(args.reduce(diff))];


// options 2

const sym = (...params) => params.reduce(symDiff);
const symDiff = (arrayOne, arrayTwo) => {
  var result = [];
  arrayOne.forEach((item) => {
    if (arrayTwo.indexOf(item) < 0 && result.indexOf(item) < 0) result.push(item)
  });

  arrayTwo.forEach(function (item) {
    if (arrayOne.indexOf(item) < 0 && result.indexOf(item) < 0) result.push(item)
  });

  return result;
}

// test here
console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));
console.log(sym1([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));

// Question 2) Inventory Update
// Compare and update the inventory stored in a 2D array against a second 2D array of a fresh delivery.
//  Update the current existing inventory item quantities (in arr1). If an item cannot be found, add 
// the new item and quantity into the inventory array. 
// The returned inventory array should be in alphabetical order by item.

// sample o/p updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return an array with a length of 6.
// Passed
// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], [[2, "Hair Pin"], [3, "Half-Eaten Apple"], [67, "Bowling Ball"], [7, "Toothpaste"]]) should return [[88, "Bowling Ball"], [2, "Dirty Sock"], [3, "Hair Pin"], [3, "Half-Eaten Apple"], [5, "Microphone"], [7, "Toothpaste"]].
// Passed
// updateInventory([[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]], []) should return [[21, "Bowling Ball"], [2, "Dirty Sock"], [1, "Hair Pin"], [5, "Microphone"]]



// option1
function updateInventory(arr1, arr2) {
  // All inventory must be accounted for or you're fired!
  const result1 = []
  if (arr1.length > 0) {
    arr1.map((x, y) => {
      const ss = arr2.find((i) => {
        if (i[1] === x[1]) {
          return x[0] += i[0]
        }
      });
      if (!ss && arr2.length) result1.push(arr2[y]);
    });
    return [...arr1, ...result1].sort(compare);
  } else {
    return [...arr2].sort(compare);
  }
}

// option2
function updateInventory1(arr1, arr2) {
  arr2.forEach((item, i) => {
    const x = arr1.map(e => e[1]).indexOf(item[1]);
    if (x == -1) arr1.push(item);
    else arr1[x][0] += item[0];
  });
  return arr1.sort(compare);
}

function compare(a, b) {
  if (a[1] > b[1]) return 1;
  if (b[1] > a[1]) return -1;
  return 0;
}
// output 
console.log(updateInventory([
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"]
], []))
console.log(updateInventory1([
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"]
], []))
console.log(updateInventory([
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
  ],
  [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
  ]))
console.log(updateInventory([], [
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"]
]));


// Question 3) No Repeats Please
// Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that all characters in the provided string are each unique.
// For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating.

function permAlone(str) {
  // Create a regex to match repeated consecutive characters.
  var regex = /(.)\1+/;
  // Split the string into an array of characters.
  var arr = str.split("");
  var permutations = [];
  var tmp;
  // Return 0 if str contains same character.
  if (str.match(regex) !== null && str.match(regex)[0] === str) return 0;

  // Function to swap variables' content.
  function swap(index1, index2) {
    tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
  }

  // Generate arrays of permutations using the algorithm.
  function generate(int) {
    if (int === 1) {
      // Make sure to join the characters as we create  the permutation arrays
      permutations.push(arr.join(""));
    } else {
      for (var i = 0; i != int; ++i) {
        generate(int - 1);
        swap(int % 2 ? 0 : i, int - 1);
      }
    }
  }

  generate(arr.length);
  // Filter the array of repeated permutations.
  var filtered = permutations.filter((string) => !string.match(regex));

  // Return how many have no repetitions.
  return filtered.length;
}

console.log(permAlone('abcdefa'));




// Question 4) Pairwise
// Given an array arr, find element pairs whose sum equal the second argument arg and return the sum of their indices.

// You may use multiple pairs that have the same numeric elements but different indices. Each pair should use the lowest possible available indices. Once an element has been used it cannot be reused to pair with another element. For instance, pairwise([1, 1, 2], 3) creates a pair [2, 1] using the 1 at index 0 rather than the 1 at index 1, because 0+2 < 1+2.

// For example pairwise([7, 9, 11, 13, 15], 20) returns 6. The pairs that sum to 20 are [7, 13] and [9, 11]. We can then write out the array with their indices and values.

// Index	0	1	2	3	4
// Value	7	9	11	13	15
// Below we'll take their corresponding indices and add them.

// 7 + 13 = 20 → Indices 0 + 3 = 3
// 9 + 11 = 20 → Indices 1 + 2 = 3
// 3 + 3 = 6 → Return 6

function pairwise(arr, arg) {
  if (arr.length === 0) return 0;
  let pairs = [];
  arr.forEach((val, i) => {
    if (pairs.length === 0) {
      pairs.push([{
        value: val,
        index: i
      }]);
    } else {
      for (let j = 0; j < pairs.length; j++) {
        if (pairs[j][0].value === arg - arr[i] && pairs[j].length === 1) {
          pairs[j].push({
            value: arr[i],
            index: i
          });
          break;
        } else if (j === pairs.length - 1) {
          pairs.push([{
            value: arr[i],
            index: i
          }]);
          break;
        }
      }
    }
  });
  pairs = pairs.filter(e => e.length === 2);
  let re = pairs.map(e => e[0].index + e[1].index).reduce((a, b) => a + b);
  return re;
}

console.log(pairwise([1, 4, 2, 3, 6], 7)); // 8
console.log(pairwise([], 100)); // 0

----------
Q) Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

solution:
var twoSum = function(nums, target) { 
    for (var i = 0; i <= nums.length; i++) {
      for (var j = 0; j < nums.length; j++) {
        if (nums[i] != nums[j] && nums[j] && nums[i]) {
          if (nums[i] + nums[j] == target) {
          return [i,j];
          }
        }
      }
    }
};

----------

