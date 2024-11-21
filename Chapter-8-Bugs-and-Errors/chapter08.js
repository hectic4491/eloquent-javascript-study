// Chapter 8; Bugs and Errors.

/* 
Strict Mode

JavaScript can be made a little more strict be enabling `strict mode`.
This can be done by putting the string "use strict"; as the top of a file
or a function body.

e.g:
*/
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter ++) {
    console.log("Happy happy");
  }
}
// canYouSpotTheProblem(); // -> ReferenceError: counter is not defined
/*
Code inside classes and modules is automatically strict.
*/
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops, we didn't use the keyword 'new'
console.log(name); // now the variable name will point to "Ferdinand"

/*
with

don't use the keyword 'with'.

that's it. that's the note.
*/

/*
Types.

Some languages want to know the types of all your bindings (i.e. variables)
and expressions before even running a program. JavaScript only considers
types when it's running the program, and it often tries to implicitly
convert values to the type it expects; which isn't much help.

e.g. of making a comment to describe the intended input and output types.
*/

// (graph: Object, from: string, to: string) => string[]
function findRoute(graph, from, to) {
  //...
}

/*
When the types of a program is known, it is possible for the computer to
check them for you, pointing out mistakes before the program is run.
There are several JavaScript dialects that add types to the language and
check them. The most popular one is called TypeScript. You should be using
TypeScript. 
 */

/*
Testing and debugging.

Testing and debugging by hand is annoying. So you should write test scripts
and use your editors debugging capabilities (like breakpoint) to help with
debugging. 
*/

let myAge = 12;
console.log(myAge)


// Exceptions
/*
When a function cannot proceed normally, what we would often like to do
is just stop what we are doing and immediately jump to a place that knows
how to handle the problem. This is what 'exception handling' does
*/
// e.g:
// function promptDirection(question) {
//   let result = prompt(question);
//   if (result.toLowerCase == 'left') return "L";
//   if (result.toLowerCase == 'right') return "R";
//   throw new Error("Invalid direction: " + result);
// }

// function look() {
//   if (promptDirection("Which way?") == "L") {
//     return "a house";
//   } else {
//     return "two angry bears";
//   }
// }

// try {
//   console.log("You see", look());
// } catch (error) {
//   console.log("Something went wrong: " + error);
// }

// Assertions
/*
In JavaScript, assertions are a way to verify that a specific condition or
expression evaluates to true. They are commonly used in testing to ensure
that code behaves as expected. While JavaScript doesn't have a built-in 
'assert' keyword, assertion libraries and frameworks, like Node.js 'assert'
module or testing frameworks like Jest and Mocha, provide this functionality.
*/
// Here is a vanilla JavaSript way to do an assertion:
function firstElement(array) {
  if (array.length == 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
// This will throw the error we defined.
// console.log(firstElement([]))


// Exercises

// Retry
// ((My Solution))
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b)
  } catch (error) {
    if (error instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b)
    } else {
      throw error; // if a different error occurs, we'll exit the loop.
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64

// The Locked Box
// ((My Solution))
const box = new class {
  locked = true;
  #content = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }

  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};

function withBoxUnlocked(body) {
  let wasLocked = box.locked;
  if (wasLocked) {
    box.unlock()};
  try {
    body();
  } finally {
    if (wasLocked) {
    box.lock();
    }
  }
}

withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true