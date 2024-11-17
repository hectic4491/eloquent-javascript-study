// Chapter 6; The Secret Life of Objects

/*
Summary:
Objects have prototypes. The Object will derive other properties
not defined in the object from their prototype. Simple objects have
Object.prototype as their prototype.

Constructors, which are functions called when Objects are built, are
called when the 'new' keyword operator is called. e.g:
> let myRabbit = new rabbit()
The new object's prototype will be the object found in the .prototype
property of the constructor.
There is a class keyword that provides a clear way to define constructors
and its prototype.

  Prototypes:
    -> Fundamental to JavaScript: Objects can inherit properties and
       methods from other objects.
    -> Prototype Object: Every JavaScript object has an internal property
       called [[prototype]], which points to another object. This chain
       of objects is called the prototype chain.
    -> Prototype Property: Functions in JavaScript have a prototype 
       property that is used when creating new objects. When you create
       an object using a constructor function, the prototype property of
       the constructor function is assigned to the [[prototype]] of the
       new object.
  Classes:
    * Introduced in ES6
    -> Classes were added to provide a more familiar syntax for creating
       objects and handleing inheritance in JavaScript. They exist as
       a "syntax sugar" over the existing prototype-based inheritance.
    -> Classes use the 'class' keyword. You can define constructor
       functions, methods, and static methods within a class.
    -> Classes can extend other classes using the 'extends' keyword,
       enabling the creation of subclasses. 

By using the statis keyword to declare a method, we can create alternate
constructors:
*/
//e.g:

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }

  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  // alternative constructor
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit); // -> 71.6
temp.fahrenheit = 86;
console.log(temp.celsius); // -> 30

let boil = Temperature.fromFahrenheit(212)
console.log(boil.celsius) // -> 100

/*
Getters & Setters.

You can define the special methods 'get' and 'set' with their respective
keyword to get and set the values of a property within a object. You can
think of them as being secretly called every time an object's property
is accessed. They provide a way to encapsulate the internal representation
of an object's properties and can help to create more controlled and
predictable behavior.

Static methods are methods stored in a class's constructor rather than its
prototype.

*/
// e.g:

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  // Getter for width
  get width() {
    return this._width;
  }

  // Setter for width
  set width(newWidth) {
    if (newWidth > 0) {
      this._width = newWidth;
    } else {
      console.error('Width must be a positive number');
    }
  }

  // Getter for height
  get height() {
    return this._height;
  }

  // Setter for height
  set height(newHeight) {
    if (newHeight > 0) {
      this._height = newHeight;
    } else {
      console.error('Height must be a positive number');
    }
  }

  get area() {
    return this._width * this._height;
  }
}
let rect = new Rectangle(10, 20);

console.log(rect.width);
console.log(rect.height);
console.log(rect.area);

rect.width = 30;
console.log(rect.width);

//rect.height = -10; throws an error.

/*
Why use Getters and Setters?
-> Encapsulation: Hide the internal representation of the property.
-> Validation: Add validation logic when setting a property value.
-> Computed Properties: Calculate the properties dynamically based
   on their other properties.


The 'instanceof' operator keyword is used to check whether an object is
an instance of a specific class or constructor function. It helps determine
the prototype chain of an object.
*/
// e.g:

console.log(`rect instanceof Rectange: ${rect instanceof Rectangle}`);
// -> rect instanceof Rectanle: true
console.log(`rect instanceof Array: ${rect instanceof Array}`);
// -> rect instanceof Array: false

/*
Encapsulation, Interface, Polymorphisms

Encapsulation is a fundamental principle of object-oriented programming (OOP)
that involves bundling data (properties) and methods (functions) that operate
on the data into a single unit, typically a class. It involed restricting 
direct access to some of the object's components, which can help to prevent
unintended interference and misuse. This restricted properties are sometimes
called "private ."
Use naming conventions like _name or #age to define private properties.

Interface is the intended way for an object to interact with other objects.
By using encapsulation, we are promoting an interface design.

By having different objects inherit from an interface, they all know how to
interact with eachother. This is called Polymorphism.
*/
//e.g:

class Person {
  constructor(name, age) {
    this._name = name; // private only by convention.
    this._age = age; //private only by convention.
  }

  getName() {
    return this._name;
  }

  setName(newName) {
    if (newName) {
      this._name = newName;
    }
  }
}

class Car {
  #make; //-> strict private property
  #model; //-> strict private property

  constructor(make, model) {
    this.#make = make;
    this.#model = model;
  }

  getMake() {
    return this.#make;
  }

  getModel(){
    return this.#model;
  }
}

const myCar = new Car('Toyota', 'Camry');
//console.log(myCar.#make); this throws an error.
console.log(myCar.getMake());



// Exercises

// A Vector Type
// ((My Solution))
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(
      this.x + vector.x,
      this.y + vector.y
    );
  }

  minus(vector) {
    return new Vec(
      this.x - vector.x,
      this.y - vector.y
    );
  }

  get length() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2))
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

let myVec = new Vec(1, 2);

console.log(typeof myVec); // -> object
console.log(myVec instanceof Vec); // -> true


// Groups & Iterable Groups (sets)
// ((My Solution))
class Group {
  #elements;

  constructor() {
    this.#elements = [];
  }

  add(n) {
    if (!this.#elements.includes(n)) {
      this.#elements.push(n)
    }
  }

  delete(n) {
    if (this.#elements.includes(n)) {
      this.#elements = this.#elements.filter(function(element) {
        return element !== n
      });
    }
  }

  has(n) {
    if (this.#elements.includes(n)) {
      return true
    } else {return false}
  }

  print() {
    console.log(this.#elements)
  }

  static from(array) {
    let uniques = [];
    let group = new Group()
    for (let element of array) {
      if (!uniques.includes(element)) {
        uniques.push(element)
        group.add(element)
      }
    }
    return group
  }

}

let group = Group.from([10, 20]);
console.log(group.has(10)); // -> true
console.log(group.has(30)); // -> false
group.add(10);
group.delete(10);
console.log(group.has(10)); // -> false
group.print()


// Iterable Group
// ((passed))