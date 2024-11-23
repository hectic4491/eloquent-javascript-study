// Chapter 18; HTTP and Forms

/*
The [HyperText Transfer Protocol (HTTP)] is the mechanism through which
data is requested and provided on the World Wide Web. This chapter
describes the protocol in more detail and explains the way browser
JavaScript has access to it.

## The Protocol

If you type 'eloquentjavascript.net/18_http.html' in your browser's
address bar, the browser first looks up the address of the server
associated with 'eloquentjavascript.net' and tries to open a
[Transmission Control Protocol(TCP)] connection to it on port 80, the
default port for HTTP traffic. If the server exists and accepts the
connection, the browser might send something like this:

GET /18_http.html HTTP/1.1
Host: eloquentjavascript.net
User-Agent: Your browser's name


Then the server responds through the same connection with something like:

HTTP/1.1 200 OK
Content-Length: 87320
Content-Type: text/html
Last-Modified: Fri, 13 Oct 2023 10:05:41 GMT

<!doctype html>
... the rest of the document ...


The browser takes the part of the response after the blank line, its 
body, and displays it as an HTML document.


The information sent by the client is called the request. It starts
with this line:

GET /18.http.html HTTP/1.1


The first word is the method of the request is GET:
  GET means that we want to get the specified resource.
  DELETE means to delete a resource on the server.
  PUT to create or replace a resource.
  POST to send information to it.

Note that the server is not obliged to carry out every request it gets.
If you walk up to a random website and tell it to DELETE its main page,
it would likely refuse.

The part after the method name is the path of the resouce the request 
applies to. In the simplest case, a resource is simply a file on the
server, but the protocol doesn't require it to be. A resource may be
anything that can be transferred as if it is a file. Many servers
generate the responses they produced on the fly. For example, if you
open https://github.com/marijnh, the server looks in its databaser for
a user named "marijnh", and if it finds one, it will generate a profile
page for that user.

After the resource path, the first line of the request mentions 
HTTP/1.1 to indicate the version of the HTTP protocol it is using.

In practice, many sites uses HTTP version 2, which supports the same
concepts as version 1.1 but is a lot more complicated so that it can be
faster. Browsers will automatically switch to the appropriate protocol
version when talking to a given server, and the outcome of a request is
the same regardless of which version is used. Because version 1.1 is more
straightforward and easier to play around with, we'll use that to
illustrate the protocol.

The server's response will start with a version as well, followed by the
status of the response, first as a three-digit status code and then as a
human-readble string.

HTTP/1.1 200 OK


Status codes starting with a 2 indicate that the request succeeded. Codes
starting with 4 mean there was something wrong with the request. The most
famouse HTTP status code is probably 404, which means that the resource
could not be found. Codes that start with 5 mean an error happened on the
server and the request is not to blame.

The first line of a request or a response may be followed by any number
of headers. These are lines in the form of 'name: value' pairs that
specify extra information about the request or response. These headers
were part of the example resposne:

Content-Length: 87320
Content-Type: text/html
Last-Modified: Fro, 13 Oct 2023 10:05:41 GMT

This tells us the size and type of the response document. In this case,
it as an HTML document of 87,320 bytes. It also tells us when the
document was last modified.

The client and server are free to decide what headers to include in their
requests or reponses. But some of them are necessary for things to work.
For example, without a Content-Type header in the response, the browser
won't know how to display the document.

After the headers, both requests and responses may include a blank like
followed by a body, which contains the actual document being sent. GET
and DELETE requests don't send along any data, but PUT and POST requests
do. Some response types, such as error responses, also don't require a 
body.


## Browsers and HTTP

As we saw, a browser will make a request when we enter a URL in its
address bar. When the resulting HTML page references other files, such
as images and JavaScript files, it will retrieve those as well.

A moderately complicated website can easily include anywhere from 10 to
200 resources. To be able to fetch those quickly, browsers will make
several GET requests simultaneously, rather than waiting for the
responses one at a time.

HTML pages may include 'forms', which allow the user to fill out
information and send it to the server. This is an example of a form:

<form method="GET" action="example/message.html">
  <p>Name: <input type="text" name="name"></p>
  <p>Message:<br><textarea name="message"></textarea></p>
  <p><button type="submit">Send</button></p>
</form>


This code described a form with two fields: a small one asking for a name
and a larger one to write a message in. When you click the Send button,
the form is submitted, meaning that the content of its field is packed
into an HTTP request and the browser navigates to the result of that
request.

When the <form> element's method attribute is GET (or is omitted), the
information in the form is added to the end of the action URL as a
'query string.' The browser might make a request to this URL:

GET /example/message/html?name=Jean&message=Yes%3F HTTP/1.1


The question mark indicates the end of the path part of the URL and the
start of the query. It is followed by pairs of names and values,
corresponding to the name attribute on the form field elements and the
content of those elements, respectively. An ampersand character (&) is
used to separate the pairs.

The actual message encoded in the URL is "Yes?" but the question mark is
replaced by a strange code. Some characters in query strings must be
escaped. The question mark, represented as %3F, is one of those. There
seems to be an unwritten rule that every format needs its own way of
escaping characters. This one, called 'URL encoding' uses a percent sign
followed by two hexadecimal (base 16) digits that encode the character
code. In this case, 3F, which is 63 in decimal nnotation, is the code of
a question mark character. JavaScript provides the encodeURIComponent and
decodeURIComponent functions to encode and decode this format.

console.log(encodeURIComponent("Yes?"));
// -> Yes%3F
console.log(encodeURIComponent("Yes%3F"));
// -> Yes?


If we change the method attribute of the HTML form in the example we saw
earlier to POST, the HTTP request made to submit the form will use the 
POST method and put the query string in the body of the request rather 
then adding it to the URL.

POST /example/message/html HTTP/1.1
Content-length: 24
Content-type: application/x-www-to-urlencoded

name=Jean&message=Yes3F


GET requests should be used for requests that do not have side effects
but simply ask for information. Requests that change something on the
server, for example creating a new account or posting a message, should
be expressed with other methods, such as POST. Client-side software such
as a browser knows that it shouldn't blindly make POST requests but will
often implicitly make GET requests-to prefetch a resource it believes the
user will soon need, for example.


## Fetch !!Important!!

The interface through which browser JavaScript can make HTTP request is
called fetch.

fetch("example/data.txt").then(response => {
  console.log(response.status);

  console.log(reponse.headers.get("Content-Type"));
  // -> text/plain
});

Calling fetch returns a promise that resolves to a reponse object holding
information about the server's response, such as its status code and its
headers. The headers are wrapped in a Map-like object that treats its keys
(the header names) as case insensitive because header names are not
supposed to be case sensitive. This means 'headers.get("Content-Type")'
and 'headers.get("content-TYPE")' will return the same value.

Note that the promise returned by 'fetch' resolves successfully even if
the server responded with an error code. It can also be rejected if there
is a network error or if the server to which that the request is
addressed can't be found.

The first argument to 'fetch' is the URL that should be requested. When
that URL doesn't start with a protocol name (such as http:), it is 
treated as a 'relative', which means it is interpreted relative to the
current document. When it starts with a slash (/), it replaces the
current path, which is the part after the server name. When it does not,
the part of the current path up to and including its last slash character
is put in front of the relative URL.

To get at the actual content of a response, you can use its text method.
Because the initial promise is resolved as soon asthe response's headers
have been received and because reading the response body might take a
while longer, this again returns a promise.

e.g.:

fetch("example/data.txt")
  .then(resp => resp.text())
  .then(test => console.log(text));
  // -> this is the content of data.txt


A similar method, called json, returns a promise that resolves to the
value you get when parsing the body as JSON or rejects if it's not valid
JSON.

By default, fetch uses the GET method to make its request and does not
include a request body. You can configure it differently by passing an
object with extra options as a second argument. For example, this request
tries to delete example/data.txt:

fetch("example/data.txt", {method: "DELETE"})
  .then(resp => {
    console.log(resp.status)
    // -> 405
  });

The 405 status code means "method not allowed", and HTTP server's way of
saying "I'm afraid I can't do that".

To add a request body for a PUT or POST request, you can include a body
option. To set headers, there's the headers option. For example, this
request includes a Range header, which instructs the server to return
only a part of a document.

fetch("example/data.txt", {headers: {Range: "bytes=8-19"}})
  .then(resp => resp.text())
  .then(console.log);
  // -> the content

The browser will automatically add some request headers, such as "Host"
and those needed for the server to figure out the size of the body. But
adding your own headers is often useful to include things such as
authentication information or to tell the server which file format you'd
like to receive.


## HTTP Sandboxing

Making HTTP requests in web page scripts once again raises concerns about
security. The person who controls the script might not have the same
interests as the person on who computer it is running. More specifically,
if I visit 'themafia.org', I do not want its scripts to be able to make
a request to 'mybank.com', using identifying information from my browser,
with instructions to transfer away all my money.

For this reason, browsers protect us by disallowing scripts to make HTTP
requests to other domains (names such as themafia.org and mybank.com).

This can be an annoying problem when building systems that want to access
several domains for legitimate reasons. Fortunately, servers can include
a header like this in their response to explicity indicate to the browser
that it is okay for the request to come from another domain:

Access-Control-Allow-Origin: *


## Appreciating HTTP !! Important !!

When building a system that requires communication between a JavaScript
program running in the browser (client-side) and a program on a server 
(server-side), there are several different ways to model this
communication.

A commonly used model is that of 'remote procedure calls'. In this model,
communication follows the patterns of normal function calls, except that
the function is actually running on another machine. Calling it involves
making a request to the server that includes the function's name and
arguments. The response to that request contains the returned value.

When thinking in terms of 'remote procedure calls', HTTP is just a 
vehicle for communication, and you will most likely write an abstraction
layer that hides it entirely.

Another approach is to build your communication around the concept of
resources and HTTP methods. Instead of a remote procedure called addUser,
you use a PUT request to /users/larry. Instead of encoding that user's
properties in function arguments, you define a JSON document format (or 
use an existing format) that represents a user. The body of the PUT
request to create a new resource in then such a document. A resource is
fetched by making a GET request to the resource's URL (for example,
/users/larry), which again returns the document representing the resource.

This second approach makes it easier to use some of the features that
HTTP provides, such as support for caching resources (keeping a copy of
a resource on the client for fast access). The concepts used in HTTP, 
which are well designed, can provide a helpful set of principles to 
design your server interface around.


## Security and HTTP

Data traveling over the internet tends to follow a long, dangerous road.
To get to its destination, it must hop through anything from coffee shop
Wi-Fi hotspots to networks controlled by various companies and states. At
any point along its route, it may be inspected or even modified.

If it is important that something remain secret, such as the password to
your email account, or that it arrive at its destination unmodified, such
as the account number you transfer money to via your bank's website, 
plain HTTP is not good enough.

The secure HTTP protocol, used for URLs starting with https://, wraps
HTTP traffic in a way that makes it harder to read and tamper with. Before
exchanging data, the client verifies that the server is who it claims to
be by asking it to prove that is has a cryptographic certificate issued 
by a certificate authority that the browser recognizes. Next, all data
going over the connection is encrypted in a way that should prevent 
eavesdropping and tampering.

Thus, when it works right, HTTPS prevents other people from impersonating
the website you are trying to talk to and from snooping on your
communication. It's not perfect, and there have been various incidents 
where HTTPS failed because of forged or stolen certificates and broken
software, but it is a lot safer than plain HTTP.


## A bunch about fields...


## Storing Data Client-Side ...


## Summary


*/