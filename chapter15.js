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

e.g.: example 1.

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

e.g.: example 2.

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

e.g.: example 3.

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

Though we have ignored it so far, event handler functions are passed an
argument: the [event object]. This object holds additional information
about the event. For example, if we want to know which mouse button
was pressed, we can look at the event object's button property.

e.g.: example 4

<button>Click me any way you want</button>
<script>
  let button = document.querySelector("button");
  button.addEventListener("mousedown", event => {
    if (event.button == 0) {
      console.log("Left button");
    } else if (event.button == 1) {
      console.log("Middle button");
    } else if (event.button == 2) {
      console.log("Right button");
    }
  });
</script>

The information stored in an event object differs per type of event.
(We'll discuss different types later in the chapter). The object's type
property always holds a string identifying the event (such as "click" 
or "mousedown").


## Propagation

For most event types, handlers registered on nodes with children will
also recieve events that happen in the children. If a button inside a 
paragraph is clicked, event handlers on the paragraph will also see the
click event.

But if both the paragraph and the button have a handler, the more
specific handler—the one on the button—gets to go first. The event is
said to [propagate] outward from the node where it happened to that
node's parent node and on to the root of the document. Finally, after
all handlers registered on a specific node have had their turn, handlers
registered on the whole window get a chance to respond to the event.

At any point, an event handler can call the .stopPropagation method on
the event object to prevent handlers further up from receving the event.
This can be useful when, for example, you have a button inside another
clickable element and you don't want clicks on the button to activate 
the outer element's click behavior.

The following example registers "mousedown" handlers on both a button and
the paragraph around it. When clicked with the right mouse button, the
handler for the button calls .stopPropagation, which will prevent the
handler on the paragraph from running. When the button is clicked with
another mouse button, both handlers will run.


*/