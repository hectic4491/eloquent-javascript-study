// Chapter 3. Functions
// Notes and Solutions for Chapter 3.


// A function with no parameters.
const makeNoise = function() {
  console.log("Boink!");
};
// Call the function.
makeNoise();
// makeNoise does not return a value, so this will return 'undefined'.
x = makeNoise()
console.log(typeof x)


// A function with a single parameter.
const square = function(x) {
  return x * x;
};
// console.log the return value of the function.
console.log(square(12));


// A function with two paramters
const roundTo = function(n, step) {
  let remainder = n % step;
  return n - remainder + (remainder < step / 2 ? 0 : step);
};
console.log(roundTo(23, 10));


// Function declaration.
// Doing it this way allows us to call the function before it is defined.
console.log(cube(3));

function cube(x) {
  return x*x*x;
}


// Arrow Functions
const addEight = (n) => {
  return n + 8
};

console.log(addEight(7));


// Exercises

//Minimum
function minimum(a, b) {
  if (a < b) {return a}
  else {return b}
};

console.log(minimum(14, 7));


// Recursion (i hate recursion, skipped for now)
function isEven(n) {
  if (n == 0) {
    return true;
  } else if (n == 1) {
    return false;
  } else {
    return isEven(n-2);
  }
};
console.log("isEven function:", isEven(3))

// Bean Counting
function countBs(string) {
  let i = 0;
  let max = string.length;
  let counter = 0;

  while (i < max) {
    if (string[i] == "B") {
      counter += 1
      };
    i += 1
    };
  return counter
  };
console.log(countBs("BOB"));


// Bean Counting pt 2.
function countChar(string, char) {
  let i = 0;
  let max = string.length;
  let counter = 0;

  while (i < max) {
    if (string[i] == char) {
      counter += 1
      };
    i += 1
    };
  return counter
  };
console.log(countChar("kakkerlak", "k"));