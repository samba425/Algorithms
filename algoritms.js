// Problem 1
// Symmetric difference (commonly denoted by Δ) of two sets is the set of elements which are in either of the two sets, but not in both.

// For example, sym([1, 2, 3], [5, 2, 1, 4]) should yield [3, 4, 5].

// options 1

const diff = (arr1, arr2) => [
  ...arr1.filter(e => !arr2.includes(e)),
  ...arr2.filter(e => !arr1.includes(e))
];

const sym1 = (...args) => [...new Set(args.reduce(diff))];


// options 2

const sym = (...params) =>  params.reduce(symDiff);
const symDiff = (arrayOne, arrayTwo) => {
  var result = [];
  arrayOne.forEach((item) =>  {
    if (arrayTwo.indexOf(item) < 0 && result.indexOf(item) < 0) result.push(item)
  });
  
  arrayTwo.forEach(function(item) {
    if (arrayOne.indexOf(item) < 0 && result.indexOf(item) < 0) result.push(item)
  });
  
  return result;
}

// test here
console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));
console.log(sym1([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3], [5, 3, 9, 8], [1]));