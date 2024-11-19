// Chapter 14; The Document Object Model.

/*
When you open a web page, your browser retrieves the page's HTML text and
parses it. The browser builds up a model of the document's structure and
uses this model to draw the page on the screen.

This representation of the document is one of the objects that a JavaScript
program has access to. It is a data structure that you can read or modify.
It acts as a live data structure, changes are updated in real time. This
is the [Document Object Model (DOM)].

## Document Structure

You can imagine an HTML document as a nested set of boxes. Tags such as
<body> and </body> enclose other tags, which in turn contain other tags
or text. Here's an example:

<!doctype html>
<html>
  <head>
    <title>My home page</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello, I am Robert and this is my homepage.</p>
    <p>Check out my website:
      <a href="http://www.furtiveplant.com">here</a>.
    </p>
  </body>
</html>

The global binding 'document' gives us access to these element objects.
The 'documentElement' property refers to the object representing the
<html> tag.
Since every HTML document has a head and a body, it also has 'head' and
'body' properties pointing at those elements.

## Trees

The structure of a browser's document is similar to a tree data structure.
We call a data structure a tree when it has a branching structure, no cycles
(a node may not contain itself, directly or indirectly), and a single
well-defined root. In the case of the DOM, 'document.documentElement' serves
as the root.

Trees come up a lot in computer science. In addition to representing a 
recursive structures such as HTML documents or programs, they are often used
to maintain sorted sets of data because elements can usually be found or
inserted more efficiently in a tree than in a flat array.

Key Concepts of the Tree Data Structure:
    Nodes: The fundamental element of a tree. Each node contains data, and
           links to its child nodes. e.g: each element in an HTML DOM.

    Root: The topmost node in a tree. There is only one root node in a tree,
          and it does not have a parent. e.g: the <HTML> element.

    Edge: The connection between two nodes. Each edge connects a parent
          node to a child node. e.g: the link between a directory and
          subdirectory in file system.

    Child: A node directly connected to another node when moving away from
           the root. The node directly under another node is called its
           child. e.g: The <head> and <body> elements are children of the
           <html> element.
    
    Parent: A node directly connected to another node whne moving towards 
            the root. The node directly above another node is called its
            parent. e.g: the <html> element is a parent of the <head> and
            <body> elements.

    Sibling: Nodes that share the same parent. They are on the same level.
             e.g: in a directory structure, folders at the same level under
             the same parent directory.

    Leaf: A node with no children. Leaf nodes are also known as terminal
          nodes. e.g: a file in a file system, or a text node in the DOM.

    Subtree: A tree consisting of a node and all its descendants. Any node
             of a tree, along with its decendants, forms a subtree.
             e.g: any nested directory structure or nested HTML elements.

    Level: The level of a node is defined by the number of connections
           (edges) between the node and the root. The root node is at level 0.
           e.g: the <html> tag is at level 0. The <head> and <body> are at
           level 1.

    Height/Depth: The height of a tree is the length of the longest path
                  from the root to a leaf. The depth of a node is the
                  number of edges from the root to the node.
                  e.g: In a file system, the depth of a file is the number
                  of directories from the root directory to the file.

Each DOM node object has a nodeType property, which contains a code (number)
that identifies the type of node. Elements have code 1, which is also defined
as the constant property Node.ELEMENT_NODE. Text nodes, representing a
section of text in the document, get code 3 (Node.TEXT_NODE). Comments have
code 8 (node.COMMENT_NODE).

Another way to visualize our document tree is as follows:


html -> head -> title -> 'My home page'
     |
     -> body -> h1 -> 'My home page'
             |
             -> p -> 'Hello! I am...'
             |
             -> p -> 'Check out my...'
                  |
                  -> a -> here
                  |
                  -> .

The leaves are text nodes, and the arrows indicate parent-child relationships
between nodes.

## The Standard
...

## Moving Through the Tree

Every node has a 'parentNode' property that points to the node it is part of,
if any. Likewise, every element node has a 'childNodes' property that points 
to an array-like object holding its children.

In theory, you could move anywhere in the tree using just these parent and
child links. But JavaScript also gives you access to a number of additional
convenience links. The 'firstChild' and 'lastChild' properties point to the
first and last child elements or have the value 'null' for nodes without
children. Similarly, 'previousSibling' and 'nextSibling' point to adjacent
nodes, which are nodes with the same parent that appear immediately before
or after the node itself. For a fist child, 'previousSibling' will be null.
For a last child, 'nextSibling' will be null.

There's also the 'children' property, which is like 'childNodes' but
contains only element (type 1) children, not other types of child nodes.
This can be useful when you aren't interested in text nodes.

When dealing with a nested data structure like this one, recursive functions
are often useful. The following function scans a document for text nodes
containing a given string and returns true when it has found one.
*/

// define function
function talksAbout(node, string) {
  // checks if the current node is an element node.
  if (node.nodeType == Node.ELEMENT_NODE) {
    // if the node is an element, the function iterates over all
    // of its child nodes.
    for (let child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
    // if the node is a text node, the function checks if the text conent
    // of the node contains the specific string.
  } else if (node.nodeType == Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

/* This will start from the body element and recursively look for the 
// string "book".

//console.log(talksAbout(document.body, "book"));


## Finding elements

Navigating these links among parents, children, and siblings is often
useful. But if we want to find a specific node in the document, we typically
want to access it in a more specific way.

If we wanted to get the first link in the document, we should do:


// let link = document.body.getElementsByTagName("a")[0];
// console.log(link.href);


All element nodes have a 'getElementsByTagName' method, which collects all
elements with the given tag name that are descendants of that node and
return an array-like object.

To find a specific single node, you can give it an 'id' attribute and use 
document.getElementById instead.


// HTML
// <p>My ostrich Gertrude:</p>
// <p><img id="gertrude" src="img/ostrich.ong></p>"
//
// <script>
//  let ostrich = document.getElementById("gertrude");
//  console.log(ostrich.src)
// </script>


Another similar method is 'getElementsByClassName' which searches through
the content of an element node and retrieves all elements that have the given
string in the class attribute.


## Changing the Document

Almost everything about the DOM data structure can be changed. The shape of
the document tree can be modified by changing parent-child relationships.
Node have a 'remove' method to remove them from their current parent node.
To add a child node to an element node, we can use 'appendChild', which puts
it at the end of the list of children, or 'insertBefore', which inserts the
node given as the first argument before the node given as the second argument.


// <p>One</p>
// <p>Two</p>
// <p>Three</p>
//
// <script>
//  let paragraphs = document.body.getElementsByTagName("p");
//  document.body.insertBefore(paragraph[2], paragraphs[0]);
// </script>

// -> output
//
// <p>Three</p>
// <p>One</p>
// <p>Two</p>


The 'replaceChild' method is used to replace a child node with another one.
It takes as arguments two nodes: a new node and the node to be replaced.
The replaced node must be a child of the element the method is called on.
Note that both 'replaceChild' and 'insertBefore' expect the new nodes as 
their first argument.


## Creating Nodes
Suppose we wanted to write a script that replaces all images in the document
with the text held in their 'alt' attributes. We need to remove the image
and also adding a new text node to replace them.
*/

function replaceImages() {
  let images = document.body.getElementsByTagName("img");
  // ! Notice how we start at the end of the list and work back.
  // This is necessary because the node list returned by the
  // .getElementsByTagName is live, meaning it is updated as the document
  // changes.
  for (let i = images.length - 1; i >= 0; i--) {
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

/*
If we want a solid collection of nodes, as opposed to a live one, you can
convert the collection to a real array by calling Array.from:

// let arrayish - {0: "one", 1: "two", length: 2};
// let array = Array.from(arrayish);
// console.log(array.map(s => s.toUpperCase()));
// -> ["ONE", "TWO"]


To create element nodes, you can use the 'document.createElement' method.
This method takes a tag name and returns a new empty node of the given type.

## Attributes

getAttribute
setAttribute


## Layout

Different types of elements are laid out differently.
Some, such as paragraphs (<p>) and headings (<h>) take up a while width of
the document and are rendered on seperate lines. These are called [block]
elements.
Others, such as links (<a>) or the <strong> element are rendered on the same
line with their surrounding text. Such elements are called inline elements.

The size and position of an element can be accessed from JavaScript.

These give us the space the element takes up in pixels.
.offsetWidth
.offsetHeight 

These give us the space inside the element, ignoring the border width.
.clientWidth
.clientHeight

The most effective way to find the precise position of an element on the
screen is the .getBoundingClientRect method. It returns an object with :
top, bottom, left, right; properties indicating the pixel positions of
the sides of the element relative to the upper left of the screen.

If you want pixel positions relative to the whole document, you must add
the current scroll position, which you can find in these bindings:
'pageXOffest'
'pageYOffest'

## Styling

JavaScript code can directly manipulate the style of an element through the
element's 'style' property. This property holds an object that has properties
for all possible style properties. The values of these properties are strings,
which we can write to in order to change a particular aspect of the element's
style.

// HTML
// <p id ="para" style="color: purple"
//  Nice text
// </p>
//
// <script>
//  let para = document.getElementById("para");
//  console.log(para.style.color);
//  para.style.color = "magenta";
// </script>

Some style property names contain hyphens, such as font-family. Because of
this, the property names in the 'style' object have their hyphens removed
and the letters are in camel case. e.g: 'style.fontFamily'

## Cascading Styles

Selector syntax within a css file:

To target elements with the class="abc" attribute.
.abc {...}

To target elements with the id="xyz" attribute.
#abc {...}

To target all <a? elements that are direct children of <p> tags.
p > a {...}

To target all <a> elements inside of a <p> element.
p a {...}


## Query Selectors

We can use a similar selector syntax to find DOM elements.

The .querySelectAll method, which is defined on both the document object
and element nodes takes a selector string and returns as NodeList containing
all the elements that it matches.

e.g:

<p>And if you go chasing
  <span class="animal">rabbits</span></p>
<p>And you know you're going to fall</p>
<p>Tell 'em a <span class="character">hookah smoking
  <span class="animal">caterpillar</span></span></p>
<p>Has given you the call</p>

<script>
  function count(selector) {
    return document.querySelectorAll(selector).length;
  }
  console.log(count("p"));           // All <p> elements
  // → 4
  console.log(count(".animal"));     // Class animal
  // → 2
  console.log(count("p .animal"));   // Animal inside of <p>
  // → 2
  console.log(count("p > .animal")); // Direct child of <p>
  // → 1
</script>

The object returned by .querySelectorAll is not live. It won't change when
you change the document. It is still not a real Array, though, so you need
to call Array.from if you want to treat it like one.

The .querySelector method works in a similar way. This one is used to find
a specific single element, and will return only the first matching element
or null when nothing is found.


## Positioning and Animating

.requestAnimationFrame

e.g: rotate an image in an ellipse
<p style="text-align: center">
  <img src="img/cat.png" style="position: relative">
</p>
<script>
  let cat = document.querySelector("img");
  let angle = Math.PI / 2;
  function animate(time, lastTime) {
    if (lastTime != null) {
      angle += (time - lastTime) * 0.001;
    }
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(newTime => animate(newTime, time));
  }
  requestAnimationFrame(animate);
</script>


## Summary

JavaScript programs may inspect and interfere with the document that the 
browser is displaying through a data structure called the DOM. This data
structure represents the browser's model of the document, and a JavaScript
program can modify it to change the visible document.

The DOM is organized like a tree, where elements are arranged hierarchically
according to the structure of the document. The objects representing elements
have properties such as .parentNode and .childNodes, which can be used to
navigate through this tree.

The way a document is displayed can be influenced by styling, both by
attaching styles to nodes directly and by defining rules that match certain
nodes. There are many different style properties, such as 'color' or 'display.'
JavaScript code can manipulate an element's style directly through its style
property.
*/


/*
### Exercises ###
// Build a Table
// ((My solution))


For each row, the <table> tag contains a <tr> tag. Inside of these <tr> tags
we can put cell elements: either heading cells <th> or regular cells <td>.

<h1>Mountains</h1>

<div id="mountains"></div>

<script>
  const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
  ];
  
  // Solution Below:

 
  // First, create a reference to the element where we want
  // the table to be appended to.
  const mountainDiv = document.getElementById("mountains");

  // Next, create the table element.
  const mountainTable = document.createElement("table");
  const mountainTableHeaders = document.createElement("tr");

  // We assume all objects have identical data in the same order.

  // Heres a function to build the headers.
  function buildHeader() {
    for (const headerName of Object.keys(MOUNTAINS[0])) {
      const header = document.createElement("th");
      header.textContent = headerName;
      mountainTableHeaders.appendChild(header); 
    }
    mountainTable.appendChild(mountainTableHeaders);
  }

  // Heres a function to build the remaining data.
  function buildContent() {
    for (const mountain of MOUNTAINS) {
      const newRow = document.createElement("tr");
      
      const nameCell = document.createElement("td");
      nameCell.textContent = mountain["name"];
      newRow.appendChild(nameCell);
      
      const heightCell = document.createElement("td");
      heightCell.textContent = mountain["height"];
      newRow.appendChild(heightCell);
      
      const placeCell = document.createElement("td");
      placeCell.textContent = mountain["place"];
      newRow.appendChild(placeCell);

      mountainTable.appendChild(newRow);
    }
  }

  buildHeader();

  buildContent();

  mountainDiv.appendChild(mountainTable);
</script>

*/