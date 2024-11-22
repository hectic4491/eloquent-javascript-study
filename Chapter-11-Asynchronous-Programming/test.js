const fs = require('fs'); //-> gives a warning

/*
Importing modules this way pushes a TypeScript error that suggest
converting the file from CommonJS module syntax to ES module syntax.
My current tooling is expecting ES module syntax.
*/

// Notes on section ## Callbacks

//setTimeout(() => console.log("Tick"), 1000);
// -> code will take at least 1.000 seconds to execute.
//
// "[Done] exited with code=0 in 1.074 seconds"
//
//
// Suppose we want to read some files:

// NOTE! You can use forward slashes in JavaScript for either OS


const filePathA = 'Chapter-11-Asynchronous-Programming/The-Picture-of-Dorian-Gray.txt';
const fileA = fs.readFileSync(filePathA, 'utf8');
console.log(fileA);
// -> Takes about 0.060 seconds

const filePathB = 'Chapter-11-Asynchronous-Programming/The-Republic.txt';
const fileB = fs.readFileSync(filePathB, 'utf8');
console.log(fileB);
// -> Takes about 0.081 seconds

// Doing both still takes around 0.07 seconds.
