// Chapter 2. Program Structures
// Solutions for chapter 2.

// Looping a Triangle
let triangle = "#";
while (triangle.length < 8) {
    console.log(triangle)
    triangle += "#"
};
console.log("\n");


// FizzBuzz
let number = 1;
while (number < 101) {
    if (number % 3 == 0 && number % 5 != 0) {
        console.log(number, "Fizz")

    } else if (number % 5 == 0 && number % 3 != 0) {
        console.log(number, "Buzz")

    } else if (number % 3 == 0 && number % 5 == 0) {
        console.log(number, "FizzBuzz")
    } else {
        console.log(number)
    }
    number ++
};


// Chessboard
size = 8;
counter = 0;
let line = ``;
while (counter < size) {
    if (counter % 2 == 0) {
        for (var i = 0; i < (size / 2); i++) {
            line += ` #`};
        i = 0;
    } else {
        for (var i = 0; i < (size / 2); i++) {
            line += `# `};
        i = 0;
    }
    line += `\n`
    counter += 1;
}

console.log(line)