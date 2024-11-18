import {dayName} from "./chapter10_1.js";

let now = new Date();
console.log(`Today is ${dayName(now.getDay())}`);
// -> Today is Monday

/*
The import keyword, followed by a list of binding names in braces, makes 
bindings from another module available in the current module. Modules are
identified by quoted strings.
*/