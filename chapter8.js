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


// Error Propagation ... !!TODO!!