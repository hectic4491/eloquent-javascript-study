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

e.g.: example 5

<p>A paragraph with a <button>button</button>.</p>
<script>
  let para = document.querySelector("p");
  let button = document.querySelector("button");
  para.addEventListener("mousedown", () => {
    console.log("Handler for paragraph.");
  });
  button.addEventListener("mousedown", event => {
    console.log("Hander for button.");
    if (event.button == 2) event.stopPropagation();
  });
</script>

Most event objects have a .target property that refer to the node where they
originated. You can use this property to ensure that you're not accidentally
handling something that propagated up from a node you do not want to handle.

It is also possible to use the .target property to cast a wide net for a
specific type of event. For example, if you have a node containing a long
list of buttons, it may be more convenient to register a single click
handler on the outer node and have it use the .target property to figure
out whether a button was clicked, rather than registering individual
handlers on all of the buttons.

e.g.: example 6

<button>A</button>
<button>B</button>
<button>C</button>
<script>
  document.body.addEventListener("click", event => {
    if (event.target.nodeName == "BUTTON") {
      console.log("Clicked", event.target.textContent);
    }
  });
</script>


## Default Actions

Many events have a default action. If you click a link, you will be taken
to the link's target. If you press the down arrow, the browser will scroll
the page down. If you right-click, you'll get a context menu, and so on.

For most types of events, the JavaScript event handlers are called before
the default behavior takes place. If the handler doesn't want this normal
behavior to happen, typically because it has already taken care of handling
the event, it can call the .preventDefault method on the event object.

This can be used to to implement your own keyboard shortcuts or context
menus. It can also be used to obnoxiously interfere with the behavior that
users expect. For example, here is a link that cannot be followed.

e.g.: example 7

<a href="https://developer.mozilla.org/">MDN</a>
<script>
  let link = document.querySelector("a");
  link.addEventListener("click", event => {
    console.log("Nope.");
    event.preventDefault();
  });
</script>

Try not to do such things without  a really good reason. It'll be unpleasent
for people who use your pages when expected behavior is broken.

Depending on the browser, some events can't be intercepted at all. On
Chrome, for example, the keyboard shortcut to close the current tab (ctrl+w)
cannot be handled by JavaScript.


## Key Events



## Pointer Events



## Scroll Events



## Focus Events



## Load Event



## Events and The Event Loop



## Timers



## Debouncing



## Summary

Event handlers make it possible to detect and react to events happening in
our web page. the .addEventListener method is used to register such a
handler.

Each event has a type ("keydown", "focus", and so on) that identifies it.
Most events are called on specific DOM element and then propagate to that
element's ancestors, allowing handlers associated with those elements to
handle them.

When an event handler is called, it's passed as event object with additonal
information about the event. This object also has methods that allow us to
stop further propagation (.stopPropagation) and prevent the browser's
default handling of the event (.preventDefault).

Pressing a key fires "keydown" and "keyup" events. Pressing a mouse button
fires "mousedown", "mouseup", and "click" events. Moving the mouse fires
"mousemove" events. Touchscreen interaction will result in "touchstart",
"touchmove", and "touched" events.

Scrolling can be detected with the "scroll" event, and focus changes can be
detected with the "focus" and "blur" events. When the document finishes
loading, a "load" event fires on ther window.

*/