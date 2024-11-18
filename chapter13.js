// Chapter 13; JavaScript and the Browser.

/*
Without browsers, there would be no JavaScript.

Web technology has been decentralized from the start. Various browser
vendors have added new functionality in ad hoc and sometimes poorly 
thought-out ways, which were then—sometimes—adopted by others, and finally
set down in standards.

Because of this loose collaboration, the resulting system is not exactly
a shining example of internal consistency. Some parts of it are downright
confusing and badly designed.
*/

/*
Networks and The Internet.

Computer networks have been around since the 1950s. If you put cables
between two or more computers and allow them to send data back and forth
through these cables, you can do all kinds of things.

A computer can use this network to send bits at another computer. For any
effective communication to arise out of this bit sending, the computers
on both ends must know what the bits are supposed to represent. The meaning
of any given sequence of bits depends entirely on the kind of thing that it
is trying to express and on the encoding mechanism used.

A [Network Protocol] describes a style of communication over a network. 
There are protocols for sending email, for fetching email, for sharing files,
and even for controlling computers that happen to be infected by malicious
software.

The [HyperText Transfer Protocol (HTTP)] is a protocol for retrieving 
named resources (chunks of information, such as web pages or pictures).
It specifies that the side making the request should start with a line like
this, naming the resource and the version of the protocol that it is trying
to use:

GET /index.html HTTP/1.1

For a more comprehensive look at the rules, go to chapter 18.

Most protocols are built on top of other protocols. HTTP treats the network
as a streamlike device into which you can put bits and have them arrive at
the correct destination in the correct order. Providing those guarantees on
top of the primitive data-sending that the network gives you is already a
rather tricky problem. The [Transmission Control Protocol (TCP)] is a
protocol that addresses this problem.


### IP Suite ###


[The Internet Protocol Suite (IP Suite) or (TCP/IP)].

The IP Suite is the set of communication protocols used for the Internet 
and similar networks. It's the foundational technology that enables the
transmission of data over interconnected networks and ensures that devices
can communicate with each other across the globe.

Key Components:
  1. Layers: The IP Suite is structured into four layers, each with specific 
           functions and protocols.

    Application Layer: This topmost layer is where network applications
        operate and communicate with each other. Examples of protocols
        in this layer include:
        - HTTP/HTTPS: Used for web browsing.
        - FTP: Used for file transfers.
        - SMTP: Used for email transmission.
        - DNS: Used for domain name resolutions.

    Transport Layer: This layer provides end-to-end communication services
        for applications. The primary protocols here are:
        - TCP (Transmission Control Protocol): Ensures reliable, ordered, 
           and error-checked delivery of data.
        - UDP (User Datagram Protocol): Provides a connectionless datagram
           service with no guarantee of delivery, often used for real-time
           applications like video streaming.
    
    Internet Layer: This layet handles the logical addressing, routing, and
        forwarding of packets. Key protocols include:
        - IP (Internet Protocol): Responsible for addressing and routing
           packets to their destination. There are two versions: IPv4 and
           IPv6.
        - ICMP (Internet Control Message Protocol): Used for diagnostic and
           error messages, like ping.
        - ARP (Address Resolution Protocol): Translates IP addresses into
           physical MAC addresses.

    Link Layer: Also known as the Network Interface or Data Link Layer.
        This bottom layer defines the protocols for data exchange between
        adjacent network nodes. It includes protocols and technologies like
        Ethernet, Wi-Fi, and MAC (Media Access Control) addresses.

  2. IP Addressing:
        -IPv4: Uses 32-bit addresses, providing approximately 4.3 billion
         unique addresses.
        -IPv6: Uses 128-bit addresses, providing a vastly larger number of
         addresses to accommodate the growing number of internet-connected
         devices.

  3. Routing: Routers use IP addresses to determine the best path for data
              packets to travel across networks. They rely on routing tables
              and protocols like OSPF (Open Shortest Path First) and BGP 
              (Border Gateway Protocol) to make these decisions.


### TCP ###


[Transmission Control Protocol (TCP)]. All internet-connected devices
"speak" TCP, and most communication on the internet is built on top of it.

A TCP connection works as follows:
    -One computer must be waiting, or listening, for other computers to
      start talking to it.
    -To be able to listen for different kinds of communication at the same
      time on a single machine, each listener has a number (called a port)
      associated with it.
    -Most protocols specify which port should be used by default.
      e.g: when we want to send an email using the SMTP protcol, the machine
      through which we send it is expected to be listening on port 25.
    -Another computer can then establish a connection by connecting to the
      target machine using the correct port number. If the target machine
      can be reached and is listening on that port, the connection is
      successfully created.
    -The listening computer is called the server, and the connecting computer
      is called the client.

Such a connection acts as a two-way pipe through which bits can flow. The
machines on both ends can put data into it. Once the bits are successfully
transmitted, they can be read out again by the machine on the other side.
This is a convenient model. You can say that TCP provides an abstraction of
the network.

More on TCP (from Copilot)

TCP is a fundamental communication protocol in the Internet Protocol (IP)
suite. It's one of the main protocols of the Internet, and it ensures
the reliable, ordered, and error-checked delivery of data between
applications running on hosts across a network.

Key Features:
+ Connection-Oriented:
    TCP establishes a connection between the two communicating hosts before
    any data is transmitted. This connection is maintained throughout the
    data transfer.
+ Reliable:
    TCP Guarantees that data is delivered to the recipient in the same
    order it was sent. If any data is lost or corrupted during transmission,
    TCP will detect the error and retransmit the affected packets.
+ Stream-Based:
    TCP treats data as a continous stream of bytes rather than discrete 
    messages. It ensures the data stream is correctly reassembled at the
    receiving end.
+ Flow Control:
    TCP implements flow control mechanisms to prevent a sender from
    overwhelming a receiver with too much data at once.
+ Congestion Control:
    TCP monitors network congestion and adjusts the rate of data transmission
    to avoid congestion collapse.


TCP Handsake: The process of establishing a TCP connection is known as
              the "three-way handshake":
    1. SYN (Synchronize): The client sends a SYN packet to the server
        to intiate the connection.
    2. SYN-ACK (Synchronize-Acknowledge): The server responds with a
        SYN-ACK packet, acknowledging the receipt of the SYN packet
        and indicating its readiness to establish a connection.
    3. ACK (Acknowledge): The client sends an ACK packet back to the
        server, acknowledging the receipt of the SYN-ACK packet. The
        connection is now established, and data transfer can begin.

Data Transmission: Once the connection is established, data can be
                   transmitted. TCP uses various techniques to ensure
                   reliable delivery.
    Sequence Numbers: Each byte of data is assigned a sequence number. The
        receiver uses these sequence numbers to reassemble the data stream
        in the correct order.
    Acknowledgements: The receiver sends back acknowledgement (ACK) packets
        to the sender, indicating which bytes have been successfully
        received.
    Retransmission: If the sender does not receive an acknowledgement within
        a certain timeframe, it assumes the data was lost or corrupted and
        retransmits the affected packets.

Connection Termination: To gracefully terminate a TCP connection, a
                        four-step processs is used.
    1. FIN (Finish): The client sends a FIN packet to the server to indicate
        it has finished sending data.
    2. ACK: The server acknowledges the receipt of the FIN packet with an
        ACK packet.
    3. FIN: The server sends a FIN packet back to the client, indicating it
        has also finished sending data.
    4. ACK: The client acknowledges the receipt of the server's FIN packet
        with an ACK packet. The connection is now closed.


### CGI ###


[Common Gateway Interface (CGI)] is a standard protocol used
to enable web servers to execute scripts and generate dynamic
web content. It allows web servers to interact with external
programs, typically written in languages like Perl, Python,
or C, to produce web content based on user requests.


#####
The Web (Back to eloquent JavaScript)

The World Wide Web is a set of protocols and formats that allow us to visit
web pages in a browser. To become part of the web, all you need to do is
connect a machine to the internet and have it listen on port 80 with the
HTTP protocol so that other computers can ask it for documents.

Each document on the web is named by a [Uniform Resource Locator (URL)],
which looks something like this:

http://eloquentjavascript.net/13_browser.html

http:// -> protocol
eloquentjavascript.net -> server
/13_browser.html -> path

The first part tells us that this URL uses the HTTP protocol (as opposed to,
for example, the encrypted protocl HTTPS).
Then comes the part that identifies which server we are requesting the
document from. Last is a path string that identifies the document (or
resource) we are interested in.

...

*/