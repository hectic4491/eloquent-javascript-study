// Chapter 15; Handling Events

/*
Some programs work with direct user input, such as mouse and keyboard
actions. That kind of input isn't available ahead of time, as a 
well organized data structure; it comes in piece by piece, in real time,
and the program must respond to it as it happens.


## Event Handlers

A good mechanism for finding out when a key is pressed is to actively
notify the code when an event occurs. Browsers do this by allowing us
to register functions as [handlers] for specific events.

e.g:

<p>Click this document to activate the handler.</p>
<script>
  window.addEventListener("click", () =>{
    console.log("You knocked?");
    })
</script>

The 'window' binding refers to a built-in object provided by the browser.
It represents the browser window that contains the document. Calling its
.addEventListener method registers the second argument to be called
whenever the event described by its first argument occurs.


## Events and DOM Nodes

Each browser event handler is registered in a context. In the previous
example, we called .addEventListener on the 'window' object to register
a handler for the whole window. Such a method can also be found on DOM
elements and some other types of objects. Event listeners are called only
when the event happens in the context of the object on which they are
registered.

e.g:

<button>Click me</button>
<p>No handler here.<.p>
<script>
  let button = document.querySelector("button");
  button.addEventListener("click", () => {
    console.log("Button clicked.");
  });
</script>

The example above attaches a handler to the button node. Clicks on the
button cause that handler to run, but clicks on the rest of the document
do not.

!! Important for Web-Game-of-life project !!
(we can make the grid pattern drawing function with the strategy below)

Giving a node an .onclick attribute has a similar effect. This works for
most types of events. You can attach a handler through the attribute 
whose name is the event with 'on' in front of it.

But a node can have only one .onclick attribute, so you can register only
one handler per node that way. The .addEventListener method allows you to
add any number of handlers, meaning it's safe to add handlers even if
there is already another handler on the element.

The .removeEventListener method, called with arguments similar to
.addEventListener, removes a handler.

e.g.:

<button>Act-once button</button>
<script>
  let button = document.querySelector("button");
  function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
  }
  button.addEventListener("click", once);
</script>

The above function given to .removeEventListener has to be the same
function value given to .addEventListener. When you need to unregister
a handler, you'll want to give the handler function a name (e.g.: 'once')
to be able to pass the same function value on both methods.


## Event Objects


*/