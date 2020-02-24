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