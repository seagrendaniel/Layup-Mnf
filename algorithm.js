// Layup Sequence Algorithm

function layupSequence(n) {
  // Base cases
  if (n === 1) return 1;
  if (n === 2) return 2;

  let prev1 = BigInt(2) // S(n-1)
  let prev2 = BigInt(1); // S(n-2)
  let current;

  for (let i = 3; i <= n; i++) {
      if (i % 2 === 0) {
          current = prev1 + prev2;  // n is even
      } else {
          current = 2n * prev1 - prev2;  // n is odd (2n is "2" in BigInt literal notation)
      }

      prev2 = prev1;
      prev1 = current;
  }

  return current;
}

// Measure runtime
console.time("layupSequenceRuntime");
console.log(layupSequence(10000).toString()); // Compute S(10,000) and print the result
console.timeEnd("layupSequenceRuntime");


/* 
  The time complexity of this algorithm is O(n) and the runtime is printed when the file is run:
  `node algorithm.js`

  JS runtime limitations: 
   - For smaller n values where BigInt isn't required, the Number class can be used which yields quicker computation times
   - For larger n values, updating the key/value pair of `prev1` and `prev2` through destructuring would reduce the time complexity to O(log(n)) but is 
      slower at n = 10000 due to JS internal matrix exponentiation runtime.
*/