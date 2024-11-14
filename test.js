const util = require('util');

function createNode (value, rest=null) {
    return {
        value: value,
        rest: rest
    };
}

function arrayToLinkedList(array) {
    if (array.length === 0) {
        return null;
    }

    let head = createNode(array[0])
    let currentNode = head;

    for (let i = 1; i < array.length; i++) {
        currentNode.rest = createNode(array[i]);
        currentNode = currentNode.rest;
    }
    return head;
}

let myArray = [1, 2, 3, 4, 5];
let linkedList = arrayToLinkedList(myArray);
console.log(util.inspect(linkedList, { depth: null, colors: true}));