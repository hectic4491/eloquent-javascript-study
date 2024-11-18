// Chapter 10; Modules.
/*
A Module is a piece of program that specifies which other
pieces it relies on and which functionality it provides for
other modules to use (its 'interface'). 

Module interfaces have a lot in common with object interfaces.

But the interface that a module provides for others to use is only
half the story. A good module system also requires modules to specify
which code they use from other modules. These relations are called
'dependencies'. If module A uses functionality from module B, it is said
to 'depend' on that module.
*/

/*
ES Modules

The original JavaScript language did not have any concept of a module.
Since ECMAScript 2015, JavaScript supports two different types of programs.
Scripts and Modules.
*/

/*
Scripts:
Global Scope: Variables and functions declared in a script are added to
    the global scope.

Execution: Scripts are executed immediately as the browser loads the HTML
    document. All script tags are loaded and executed sequentially unless
    specified otherwise with attributes like defer or async.

Dependencies: Scripts can depend on other scripts, but managing dependencies
    manually can be cumbersome and error-prone.

Legacy Code: Historically, scripts were the primary way to include
    JavaScript in web pages. They are still widely used for simpler tasks.

EXAMPLE
//file HTML
<head>
    <script src="script.js"></script>
</head>
*/



/*
Modules:
Module Scope: Variables and functions declared in a module are not added
    to the global scope. Instead, they are scoped to the module itself.

Execution: Modules are deferred by default, meaning they are executed after
    the HTML document is fully parsed. They can be asynchronously loaded
    using the 'import()' function.

Dependencies: Modules support 'import' and 'export' keyword statements,
    allowing for a clean and efficient way to manage dependencies.

Use Cases: Modules are designed for larger, more complex codebases where
    modularity and reusability are important.

EXAMPLE
// file HTML
<head>
    <script type="module" src="module.js"></script>
</head>

// file module.js
// Exporting a function.
export function greet(name) {
    return 'Hello, ${name}!'
}

// file importModule.js
// Importing and using the function in another module.
import { greet } from './module.js';

console.log(greet('World)); // -> Hello, World!
*/

// e.g:
const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];

export function dayName(number) {
    return names[number];
}
export function dayNumber(name) {
    return names.indexOf(name);
}

/*
The 'export' keyword can be put in front of a function, class,
or binding definition to indicate that that binding is part
of the module's interface. This makes it possible for other
modules to use that binding by importing it.
*/

// -> Refer to chapter10_2.js for the import example.

/*
The 'import' keyword, followed by a list of binding names in braces, makes 
bindings from another module available in the current module. Modules are
identified by quoted strings.
*/

/*
How such a module name is resolved to an actual program differs by platform.
The browser treats them as web addresses, whereas Node.js resolved them
to files. When you run a module, all the other modules it depends on-and
the modules those depend on-are loaded, and the exported bindings are made
available to the modules that import them.
*/

/*
Import and Export declarations cannot appear inside of functions, loops, or
other blocks. They are immediately resolved when the module is loaded, 
regardless of how the code in the module executes. To reflect this, they 
must appear only in the outer module body.

The import braces notation allows for renaming:
import {module as mdl} ...

To import all bindings use the * notation:
import * as dayName from ...
*/


/*
Packages

A package is a chunk of code that can be distributed (copied and installed).
That way you can use it across multiple projects. It may contain one or more
modules and has information about which other packages it depends on.
A package also usually comes with documentation explaining what it does so
that people who didn't write it might still be able to use it. By updating
the package, all programs that depend on the package can copy the new 
version to get the improvements.

Working this way requires infrastructure. We need a place to store and find
packages and a convenient way to install and upgrade them. In the JavaScript
world, this infrastructure is provided by the NPM (npm) package manager.

NPM is two things: an online service where you can download and upload
packages, and a program (bundled with Node.js) that helps you install and
manage them.
*/


/*
CommonJS modules.

-> an older way of importing modules.

require

exports
*/

