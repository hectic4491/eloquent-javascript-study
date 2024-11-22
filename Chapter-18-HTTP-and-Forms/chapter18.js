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


## Fetch !!Important!! <--TODO

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


*/