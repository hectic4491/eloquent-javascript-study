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

When a key on the keyboard is pressed, your brower fires a "keydown"
event. When it is released, you get a "keyup" event.

e.g.: example 8

  <p>This page turns violet when you hold the V key.</p>
  <script>
    window.addEventListener("keydown", event => {
      if (event.key == "v") {
        console.log("Pressed v")
        document.body.style.background = "violet";
      }
    });
    window.addEventListener("keyup", event => {
      if (event.key == "v") {
        document.body.style.background = "";
      }
    });
  </script>

The "keydown" event not only fires when the key is pushed, but as it's
held the event is repeated.

We can listen for modifier keys aswell. These event strings are:
'shiftKey'
'ctrlKey'
'altKey'
'metaKey'

e.g.: example 9  (with added repeat checker)

  <p>Press control-space to continue.</p>
  <img id="bunPic" width="500">
    <script>
      const bunPic = document.getElementById("bunPic");
      window.addEventListener("keydown", event => {
        if (event.repeat) {return} else {
        if (event.key == " " && event.ctrlKey) {
          console.log("Showing Bunny...");
          bunPic.setAttribute("src", "bunny.jpg");
        }
      }});
      window.addEventListener("keyup", event => {
        if (event.key == " " || event.ctrlKey) {
          console.log("Removing Bunny...");
          bunPic.setAttribute("src", "");
        }
      })
    </script>

The above example was modified from the book. Because the event keeps
firing while the button is held, we added an if(event.reapet) {return}
check to prevent the event from occuring repeatedly.

The DOM node where a key event originates depends on the element that
has focus when the key is pressed. Most nodes cannot have focus unless
you give them a 'tabindex' attribute, but things like links, buttons, and
form fields can. We'll come back to form fields in chapter 18. When
nothing in particular has focus, 'document.body' acts as the target node
of key events.

Some discussion on the key event methodoly of a user typing text.
// come back to this some other time.


## Pointer Events

There are currently two widely used ways to point at things on a screen:
the mouse and touchscreens. These produce different kinds of events.


# Mouse clicks

Pressing a mouse button causes a number of events to fire:
  "mousedown"
  "mouseup"
These are similar to the "keydown" and "keyup" events. These happen on
the DOM nodes that are immediately below the mouse pointer when the
event occurs.

After the "mouseup" event, a "click" event fires on the most specific
node that contained both the press and the release of the button.

If two clicks happen close together, a "dblclick" event also fires.

To get precise information about the place where a mouse event happened,
you can look at its .clientX and .clientY properties, which contain the
event's coordinates (in pixels) relative to the upper-left corner of the
window, or .pageX and .pageY, which are relative to the upper-left corner
of the whole document (which may be different when the window has been
scrolled).

The follow program implements a primitive drawing application. Every time
you click the document, it adds a dot under your mouse pointer.

e.g.: example 10

<style>
  body {
    height: 200px;
    background: beige;
  }
  
  .dot {
    height: 8px; width: 8px;
    border-radius: 4px;
    background: teal;
    position: absolute;
  }
</style>

<script>
  window.addEventListener("click", event => {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.left = (event.pageX - 4) + "px";
    dot.style.top = (event.pageY - 4) + "px";
    document.body.appendChild(dot);
    });
</script>

We'll create a less primitive drawing application later in chapter 19.

# Mouse Motion

Every time the mouse pointer moves, a "mousemove" event fires. This event
can be used to track the position of the mouse. A common situation in
which this is useful is when implementing some form of mouse-dragging
functionality.

As an example, the following program display a bar and sets up event
handlers so that dragging to the left or right on this bar makes it
narrower or wider.

e.g.: example 11

  <p>Drag the bar to change its width:</p>
  <div style="background: orange; width: 60px; height: 20px">
  </div>
  <script>
    let lastX; // Tracks the last observed mouse X position
    let bar = document.querySelector("div");
    bar.addEventListener("mousedown", event => {
      if (event.button == 0) {
        lastX = event.clientX;
        window.addEventListener("mousemove", moved);
        event.preventDefault(); // Prevent selection
      }
    });
  
    function moved(event) {
      if (event.buttons == 0) {
        window.removeEventListener("mousemove", moved);
      } else {
        let dist = event.clientX - lastX;
        let newWidth = Math.max(10, bar.offsetWidth + dist);
        bar.style.width = newWidth + "px";
        lastX = event.clientX;
      }
    }
  </script>

Notice the difference between "event.button" and "event.buttons".

event.button : returns a number indicating which mouse button was pressed
when the event was triggered:
  0: main button (usually the left)
  1: Auxiliary button (usually the middle button (wheel button))
  2: Secondary button (usually the right)
  3: Fourth button (usually the browser back thumb button)
  4: Fifth button (usually the browser forward thumb button)


event.buttons returns a number indicating which buttons are currently
pressed when the event is triggered, expressed as a bitmask. When it
returns 0, no buttons are down. Otherwise it's the sum of the bitmask
of the buttons being held down. (i.e. 5 -> main and auxiliary.)
  1: Main button pressed (left button)
  2: Secondary button pressed (right button)
  4: Auxiliary button pressed (middle button)
  8: Fourth button pressed (Browser Back button)
  16: Fifth button pressed (Browser Forward button)


# Touch Events

// similar to mouse events. Come back to this second later if need be.


## Scroll Events

Whenever an element is scrolled, a "scroll" event is fired on it.
This has various uses, such as knowing what the user is currently looking
at (for disabling off-screen animations or sending spy reports to your
evil headquarters...) or showing some indication of progress (by
highlighting part of a table of conetns or showing a page number).

The following example draws a progress bar above the document and
updates it to fill up as you scroll down.

e.g.: example 12

  <style>
    #progress {
      border-bottom: 2px solid blue;
      width: 0;
      position: fixed;
      top: 0; left: 0;
    }
  </style>
  <div id="progress"></div>
  <script>
    // Create some content
    document.body.appendChild(document.createTextNode(
      "taro is round. taro is love. taro is life. taro is all ".repeat(1000)));

    let bar = document.querySelector("#progress");
    window.addEventListener("scroll", () => {
      let max = document.body.scrollHeight - innerHeight;
      bar.style.width = `${(pageYOffset / max) * 100}%`;
    });
  </script>

Giving an element a position of fixed acts much like an absolute position
but also prevents it from scrolling along with the rest of the document.
The effect is to make our progress bar stay at the top. Its width is
changed to indicate the current progress. We use % rather than px, as a 
unit when setting the width so that the element is sized relative to the
page width.

the global innerHeight binding gives us the height of the window, which
we must subtract from the total scrollable height. You can't keep
scrolling when you hit the bottom of the document. There's also an
innerWidth for the window width. By dividing pageYOffset, the current
scroll position, by the maximum scroll position and multiplying it by
100, we get the percentage for the progress bar.

Calling preventDefault on a scroll event does not prevent the scrolling
from happening. In fact, the event handler is called only /after/ the 
scrolling takes place.


## Focus Events

When an element gains focus, the browser fires a "focus" event on it.
When it loses focus, the element gets a "blur" event.

Unlike the events discussed earlier, these two events do not propagate. 
A handler on a parent element is not notified when a child element gains
or loses focus.

The following example displays help text for the text field that currently
has focus:

e.g.: example 13

  <p>Name: <input type="text" data-help="Your full name"></p>
  <p>Age: <input type="text" data-help="Your age in yeasr"></p>
  <p id="help"></p>

  <script>
    let help = document.querySelector("#help");
    let fields = document.querySelectorAll("input");
    for (let field of Array.from(fields)) {
      field.addEventListener("focus", event => {
        let text = event.target.getAttribute("data-help");
        help.textContent = text;
      });
      field.addEventListener("blur", event => {
        help.textContent = "";
      });
    }
  </script>

The window object will receive "focus" and "blur" events when the user
moves from or to the browser tab or window in which the document is shown.


## Load Event !!! important !!!

When a page finished loading, the "load" event fires on the window and
the document body objects. This is often used to schedule initialization
actions that require the whole document to have been built. Remember that
the content of <script> tags is run immediately when the tag is
encountered. This may be too soon, for example, when the script needs to
do something with parts of the doccument that appear after the <script>
tag.

Element such as images and script tags that load an external file also
have a "load" event that indicates the files they reference were loaded.
Like the focus-related events, loading events do not propagate.

When you close a page or navigate away from it (for example, by following
a link), a "beforeunload" event fires. The main use of this event is to
prevent the user from accidentally losing work by closing a document. If
you prevent the default behavior on this event and set the returnValue
property on the event object to a string, the browser will show the user
a dialog asking if they really want to leave the page. That dialog box
might include your string, but because some malicious sites try to use
these dialogs to confuse people into staying on their page to look
at dodgy weight-loss ads, most browsers no longer display them.


## Events and The Event Loop

In the context of the event loop, as discussed in chapter 11 
(Asynchronous Programming), browser event handlers behave like other
asynchronous notifications. They are scheduled when the event occurs but
must wait for the other scripts that are running to finish before they
get a chance to run.

The fact that events can be processed only when nothing else is running
means that if the event loop is tied up with other work, any interaction
with the page (which happens through events) will be delayed until there's
time to process it. So if you schedule too much work, either with long-
running event handlers or with lots of short-running ones, the page will
become slow and cumbersome to use.

For cases where you really do want to do some time-consuming thing in the
background without freezing the page, browsers provide something called
web workers. A worker is a JavaScript process that runs alongside the
main script, on its own timeline.

Imagine that squaring a number is a heavy, long-running computation that
we want to perform in a separate thread. We could write a file called
code/squareworker.js that responds to messages by computing a square and
sending a message back.

// example:
//
//  addEventListener("message", event => {
//    postMessage(event.data * event.data);
//  });
//

To avoid the problems of having multiple threads touching the same data,
workers do not share their global scope or any other data with the main
script's environment. Instead, you have to communicate with them by
sending messages back and forth.

This code spawns a worker running that script, sends it a few messages,
and outputs the response

let squareWorker = new Worker("code/squareWorker.js");
squareWorker.addEventListener("message", event => {
  console.log("The worker responded: ", event.data);
})
  squareWorker.postMessage(10);
  squareWorker.postMessage(24);

The postMessage function sends a message, which will cause a "message"
event to fire in the receiver. The script that created the worker sends
and receives messages through the Worker object, whereas the worker talks
to the script that created it by sending and listening directly on its
global scope. Only values that can be represented as JSON can be sent
as messages; the other side will receive a copy of them, rather than the
value itself.
 

## Timers

The setTimeout function we saw in chapter 11, (Asynchronous Programming)
scedules another function to be called later, after a given number of
milliseconds. Sometimes you need to cancel a function you have schedules.
You can do this by storing the value returned by setTime and calling
clearTimeout on it.

e.g.: example 14

let bombTimer = setTimeout(() => {
  console.log("BOOM!");
}, 500);

if (math.random() < 0.5) { // 50% change
  console.log("Defused");
  clearTimeout(bombTimer);
}


## Debouncing

Some types of events have the potential to fire rapidly many times in a
row, such as the "mousemove" and "scroll" events. When handling such
events, you must be careful not to do anything too time-consuming or your
handler will take up much time that interaction with the document starts
to feel slow.

If you need to do something nontrivial in such a handler, you can use
setTimeout to make sure you are not doing it too often. This technique
is usually called debouncing the event. There are several slightly 
different approaches to this.

For example, suppose we want to react when the user typed something, but
we don't want to do it immediately for every input event. When they are
typing quickly, we just want to wait until a pause occurs. Instead of 
immediately performing an action in the event handler, we set a timeout.
We also clear the previous timeout (if any) so that when events occur
close together (closer than our timeout delay), the timeout from the
previous event will be canceled.

e.g.: example 15

<textarea>Type something here...</textarea>
<script>
  let textarea = document.querySelector("textarea");
  let timeout;
  textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    time = setTimeout(() => console.log("Typed!"), 500);
  });
</script>

Giving an undefined value to clearTimeout or calling it on a
timeout that has already fired has no effect. Thus, we don't have to be
careful about when to call it, and we simply do so for every event.

We can use a slightly different pattern if we want to space responses so
that they're separated by at least a certain length of time but want to
fire them during a series of events, not just afterward. For example, we
might want to respond to "mousemove" events by showing the current
coordinates of the mouse, but only every 250 milliseconds.

e.g.: example 16

<script>
  let scheduled = null;
  window.addEventListener("mousemove", event => {
    if (!scheduled) {
      setTimeout(() => {
        document.body.textContent = 
          `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
        scheduled = null;
      }, 250);
    }
    scheduled = event;
  });
</script>

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

// Exercises

// Balloon