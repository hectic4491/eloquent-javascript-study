// Values, Types, and Operators
// Notes for Chapter 1.

let myNum = 25;
// ' let myNum = "This is a string" ' this would cause an error, as we can't redeclare a variable declared with 'let'.
console.log(myNum);

const myConst = true;
// ' myConst = false; ' this would cause an error, as we can't reassign a const variable.
console.log(myConst);


let counter = 0;
while (counter < 10) {
    if (counter % 2 == 0) {
        console.log(counter, "is divisible by 2")
    } else if (counter == 7) {console.log(
        counter, "lucky number 7")
    } else {console.log(counter)}
    counter ++
}