// Chapter 5. Higher-Order Functions.

// Exercises

// Flattening
// ((This was my solution))
function flatten (array) {
    let result = [];
    array.forEach(innerArray => result = result.concat(innerArray));
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


function flatten3 (array) {
    return [].concat(...array);
}
console.log("flatten3 method:", flatten3(myArray))