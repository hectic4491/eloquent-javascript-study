const fs = require('fs');
// Chapter 11; Asynchronous Programming

/*
The central part of a computer, the part that carries out the individial
steps that make up our programs, is called the processor. The programs we
have seen so far will keep the processor busy until they have finished 
their work. The speed at which something like a loop that manipulates 
numbers can be executed depends pretty much entirely on the speed of the
computer's processor and memory.

But many progrmas interact with things outside of the processor. For
example, they may communicate over a computer network or request data
from the hard disk—which is a lot slower than getting it from memory.

When such a thing is happening, it would be a shame to let the processor
sit idle—there might be some other work it could do in the meantime. In
part, this is handled by your operating system, which will switch the
processor between multiple running programs. But that doesn't help when
we want a 'single' program to be able to make progress while it is waiting
for a network request.


## Asynchronicity

In a synchronous programming model, things happen one at a time. When you
call a function that performs a long-running action, it returns only when
the action has finished and it can return the result. This stops your
program for the time the action takes.

An asynchronous model allows multiple things to happen at the same time.
When you start an action, your program continues to run. When the action
finishes, the program is informed and gets access to the result (for
example, the data read from disk).

We can compare synchronous and asynchronous programming using a small
example: a program that makes two requests over the network and then 
combines the results.

In a synchronous environment, where the request function returns only 
after it has done its work, the easiest way to perform this task is to 
make the requests one after the other. This has the drawback that the
second request will be started only when the first has finished. The 
total time taken will be at least the sum of the two response times.

The solution to this problem, in a synchronous system, is to start
additional threads of control. A 'thread' is another running program whose
execution may be interleaved with other programs by the operating system
—since most modern computers contain multiple processors, multiple
threads may even run at the same time, on different processors. A second
thread could start the second request, and then both threads wait for their
results to come back, after which they resynchronise to combine their 
results.

Asynchronicity cuts both ways. It makes expressing programs that do not
fir the straight-line model of control easier, but it can also make
expressing program that do follow a straight line more awkward. we'll see
some ways to reduce this awkwardness later in the chapter.

Both prominent JavaScript programming platforms—browsers and node.js—make
operations that might take a while asynchronous, rather than relying on
threads. Since programming with threads is notoriously hard (understanding
what a program does is much more difficult when it's doing multiple things
at once), this is generally considered a good thing.


## Callbacks

One approach to asynchronous programming is to make functions that need
to wait for something take an extra argument, a callback function. The
asynchronous function starts an extra process, sets things up so that the
callback function is called when the process finishes, and then returns.

As an example, the 'setTimeout()' function, available both in Node.js and
in browsers, waits a given number of milliseconds and then calls a 
function.

setTimeout(()) => console.log("Tick"), 500);

Waiting is not generally important work, but it can be very useful when
you need to arrange for something to happen at a certain time or check
whether some action is taking longer than expected.

Another example of a common asynchronous operation is reading a file from
a device's storage. Imagine you have a function readTextFile that reads a
file's content as a string and passes it to a callback function.

readTextFile("shopping_list.txt". content => {
    console.log(`Shopping List:\n${content}`);
});
// -> {Shopping List}
// -> Peanut butter
// -> Bananas

The readTextFile function is not part of standard JavaScript. We will see
now to read files in the browser nad in Node.js in later chapters.

Performing multiple asynchronous actions in a row using callbacks means
that you have to keep passing new functions to handle the continuation of
the computation after the actions. An synchronous function that compares
two files and produces a boolean indicating whether their content is the
same might look like this:

function compareFiles(fileA, fileB, callback) {
  readTextFile(fileA, contentA => {
    readTextFile(fileB, contentB => {
      callback(contentA == content.B);
      });
    });
  }

This style of programming is workable, but the indentation level
increases with each asynchronous action because you end up in another
function. Doing more complicated things, such as wrapping asynchronous
actions in a loop, can get awkward.

In a way, asynchronicity is contagious. Any function that calls a function
that works asynchronously must itself be asynchronous, using a callback or
similar mechanism to deliver its result. Calling a callback is somewhat
more involved and error prone than simply return a value, so needing to
structure large parts of your program that way is not great.


## Promises

A slightly differnt way to build an asynchronous program is to have
asynchronous functions return an object that represents its (future)
result instead of passing around callback functions. This way, such
functions actually return something meaningful, and the shape of the
program more closely resembles that of synchronous programs.

This is what the standard class Promise is for. A 'promise' is a receipt
representing a value that may not be available yet. It provides a '.then'
method that allows you to register a function that should be called when
the action for which it is waiting finishes. When the promise is resolved,
meaning its value becomes available, such functions (there can be multiple)
are called with the result value. It is possible to call '.then' on a
promise that has already resolved your function will still be called.

The easiest way to create a promise is by calling Promise.resolve. This 
function ensures that the value you give it is wrapped in a promise. If
it's already a promise, it is simply returned. Otherwise, you get a new
promise that immediately resolves with your value as its result.

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// -> Got 15

To create a promise that does not immediately resolve, you can use Promise
as a constructor. It has a somewhat odd interface: the constructor expects
a function as its argument, which it immediately calls, passing it a 
function that it can use to resolve the promise.

For example, this is how you could create a promise-based interface for the
readTextFile function:

function textFile(filename) {
  return new Promise(resolve => {
    readTextFile(filename, text => resolve(text))
  });
}

textFile("plans.txt").then(console.log);


event loop


promises


async


## Notes from Asynchronous JavaScript in ~10 Minutes by James Q Quick
url: https://www.youtube.com/watch?v=670f71LTWpM

There are three main categories of asynchronous JavaScript
  - Callbacks
  - Promises
  - Async/Await (Most modern way)

# Callback

A callback in JavaScript is a function that is passed as an argument to
another function and is executed after some operation has been completed.
Callbacks are used to handle asynchronous operations, allowing your code
to remain responsive while waiting for operations like reading files,
making network requests, or setTimeout to complete.
*/
// How Callbacks Work:
// e.g.:

function greet(name) {
  console.log(`Hello, ${name}`);
}

function processUserInput(callback) {
  const name = "Alice";
  callback(name);
}

processUserInput(greet);

/*
'greet' is a function that takes a name and logs a greeting.

'processUserInput is a function that takes a callback function as
an arguement. Inside processUserInput, the callback is executed with
a specific name.


Asynchronous Callbacks:

Callbacks are particularly powerful for handling asynchronous
operations. For instance, reading a file or making an API request.
*/
// example: ((Using an arrow function))

filePath = 'Chapter-11-Asynchronous-Programming/The-Republic.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  //console.log('File content:', data);
});

// example: ((Using a traditional function expression))

filePath = 'Chapter-11-Asynchronous-Programming/The-Republic.txt';
fs.readFile(filePath, 'utf8', function(err, data) {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  //console.log('File content:', data);
});

/*
'fs.readFile' is an asynchronous function that reads a file.

The anonymous callback arrow function (err, data) is executed once the file has been
read. If an error occurs, it is handled within the callback.

*Anonymous functions: are functions that are defined without a name. They
are often used as arguements to other functions or as immediately 
invoked function expressions (IIFEs).

*Arrow functions: are a more concise way to write anonymous functions
and come with some differences in behaviors, particularly regarding
the 'this' keyword.

#Callback Function
This anonymous function is used as a callback, which means it will be
executed after fs.readFile finishes reading the file.
The fs.readFile function takes a path to the file, the encoding, and a
callback function that processes the result.

#Handling Errors and Data:
If an error occurs while reading the file, the 'err' parameter will be set,
and the function logs the error.
If the file is read successfully, 'data' will contain the file contents,
and the function logs this data.

#Why Use Arrow Functions?
-Conciseness: Arrow functions provide a shorter and clearer way to write
functions, especially when used as callbacks.
-Lexical 'this': Arrow functions do not have their own 'this' context,
which can be useful in many scenarios like event handlers and nested
functions.
*/

/* 
In setTimeout, the first parameter is the callback function, the
second parameter is the delay in milliseconds.

Notice how altough the 'console.log("This will be...")' is evoked after
the setTimeout function, it will be logged before the "Waited 1 second".
That's because the program continues after we evoke setTimeout, and it 
takes less that 1 second to execute 'console.log("This will be...")'.
Hence the callback function in setTimeout is asynchronous, and will
be executed after 1 second.

"In the future, do this function"
*/
setTimeout(callback = () => {
  console.log("Waited 1 second")
}, delay = 1000);

console.log("This will be logged before the callback function!")

// Nested setTimeout
/*
callback hell.
*/
setTimeout(() => {
  console.log('3');
  setTimeout(() => {
    console.log('2');
    setTimeout(() => {
      console.log('1');
    }, 1000);
  }, 1000);
}, 1000);

// (waits one second)
// -> 3
// (waits one second)
// -> 2
// (waits one second)
// -> 1


// button event handler in browser JavaScript

// const btn;
// btn.addEventListener('click', () => {
//   'This is a callback'
// })


//error first callback

filePath = 'Chapter-11-Asynchronous-Programming/The-Republic.txt';
fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  } else {
    //console.log('File content:', data);
  }
});

/*
## Promises:

Kind of like the evolution of the idea of callbacks.

We start by creating a 'new' promise. We pass it a function that accepts
both a resolve and a reject callback. In your code, we detect if it fails
or passes. If it fails, we call reject. If it passes, we call resolve.

*/

// # Creating a promise

const myPromise = new Promise((resolve, reject) => {
  // This is the action we want to do. Depending on the result,
  // we either execute resolve() or reject().
  const rand = Math.floor(Math.random() * 2); // either 0 or 1
  if (rand === 0){ // If it's 0, that's what we want. To pass resolve.
    resolve();
  } else {
    reject();
  }
});

// Then we provide the resolve and reject arguements.
myPromise
  .then(() => console.log("Success")) //-> don't place a ;
  .catch(() => console.error("Something went wrong"));
/*
Note** Don't be confused by this notation, it's just to avoid
a really long line. If we wrote it like this it may be easier to
understand: 
*/
myPromise.then(() => console.log("Success")).catch(() => console.error("Something went wrong"));
/*
Thats why we don't place a semicolon after the '.then' method.

the '.then' method is basically the "resolve" that we pass into myPromise,
where as the '.catch' is the 'reject'. 
*/


// What if we wanted to use an existing promise?
// **!! Important !! **

fs.promises
    .readFile(filePath, {encoding: 'utf8'})
    .then(data => console.log(`We got the data. It's a : ${typeof data}`))
    .catch(err => console.error(err));

// Now we can directly use a .then and .catch right after what we want
// to do.

// # fetch API with promises
fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

/*
What did we just do.

1. We call fetch, which is a promise
   and handle the success case with the first '.then'.
2. We get the response, which is just a raw response.
3. We convert that reponse to json. 'the res.json' returns
   another promise.
4. We chain on another '.then' to handle the new inner promise.
5. Then we get the actual data and log it.
6. If it were invalid, we would handle it with the final '.catch'.
*/


/*
Async/Await
This is the evolution of promises to Async/Await

Here's an updated snippet of the read file.
*/
const loadMyFile = async () => {
  const data = await fs.promises.readFile(filePath,
    {encoding: 'utf8'},
  );
  console.log((typeof data));
}
loadMyFile ();
/* 
we have to define a loadFile function. It's similar to marking an
Arrow function, but with the 'async' keyword.

Now loadFile is an asynchronous function. Inside of it, we can use the
'await' keyword. So we call our fs.promises.readFile the same way we did
before, but instead of passing callbacks or doing '.then' to handle the
response, we add the await keyword and get our data outside of the await
call. This is a lot more streamlined and readable.

What to do if there's an error? We insert a 'try-catch' like this:
*/

const loadFile = async () => {
  try {
    const data = await fs.promises.readFile((filePath + "123"),
      {encoding: 'utf8'},
    );
    console.log((typeof data));

  } catch(error){
      console.error(error);
  }

}
loadFile ();


// ### Back to eloquent-JavaScript

/*


*/