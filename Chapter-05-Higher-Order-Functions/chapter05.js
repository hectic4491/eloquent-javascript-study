// Chapter 5. Higher-Order Functions.

// Exercises

// Flattening
// ((This was my solution))
function flatten (array) {
  let result = [];
  array.forEach(subArray => result = result.concat(subArray));
  return result;
}
let myArray = [[1, 2, 3], [4, 5], [6]];
console.log("flatten method:", flatten(myArray));

// ((Here are a few other solutions))
function flatten2 (array) {
  return array.reduce(
    (accumulator, value) => accumulator.concat(value), []
  );
}
console.log("flatten2 method:", flatten2(myArray))

// ((This one uses the spread operator '...'))
function flatten3 (array) {
  return [].concat(...array);
}
console.log("flatten3 method:", flatten3(myArray))


// Your Own Loop
// ((My solution))
function loop (value, testFunction, updateFunction, bodyFunction) {
  while (true) {
    if (testFunction(value)) {
      bodyFunction(value);
      value = updateFunction(value);
    } else {
        break;
    }
  }
}
loop(3, n => n > 0, n => n - 1, console.log);


// Everything
// ((My solution))
function every(array, test) {
  let result = true;
  array.some(element => {
    if (!test(element)) {
      result = false;
    }
  });
  return result;
}
console.log(every([1, 3, 5], n => n < 10));
console.log(every([2, 4, 16], n => n < 10));
console.log(every([], n => n < 10));


// Dominant Writing Direction
// Passed