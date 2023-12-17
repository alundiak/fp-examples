fp-http-examples/experiments
===

HTTP caching of "idempotent" requests looks like is very similar as JavaScript Pure Functions term.

TODO: Implement Server/Client to show how and which HTTP methods can be cached.

Tech Stack:
- Use HTTP/2 ExpressJS version (NodeJS ecosystem)
- Maybe use another NodeJS server-base framework, like NestJS.


## from https://http.dev/1.1

- "HTTP/1.1 introduced standardization, new features, and improved the efficiency of the protocol through better Caching, encoding, reusing of HTTP connections, and pipelining HTTP requests.""

## from https://http.dev/2

- "HTTP/2 introduces HTTP header field Compression and supports multiple concurrent data exchanges on a single HTTP Connection."
- "HTTP/2 also makes provision for servers to suggest alternative services. For example, by sending the Alt-Svc header, the server can tell the client about another route to the same resource that may be using an alternative server, host, and/or port number.""

## from https://http.dev/3

- "HTTP/3 Currently the specification for HTTP/3 is still an IETF draft.""
- "The Quick UDP Internet Connections (QUIC) protocol was developed by Google and after SPDY, which became HTTP/2, it is the next experimental technology from Google to become a standard. It is a multiplexed communication algorithm that is built on top of the UDP protocol."
- "HTTP/3 essentially relies on QUIC for security and integrity of data, peer authentication, and reliable, in-order data delivery with improved performance.
QUIC uses compressed Headers, as does HTTP/2. However, QUIC utilizes the QPACK algorithm for header compression, whereas HTTP/2 uses HPACK. The difference is that QPACK is designed to work with streams.""

## from https://www.baeldung.com/cs/http-versions
- "HTTP 3.0 is an Internet-Draft, different from the previous HTTP versions, which were/are Request For Comments (RFC) documents of the Internet Engineering Task Force (IETF). Its first draft was published in 2020."


## from ChatGPT: 

- "Responses to safe methods (e.g., GET, HEAD, OPTIONS) and idempotent methods (e.g., PUT, DELETE) are generally more likely to be cacheable. 
Safe methods are considered read-only and don't change the server's state, while idempotent methods produce the same result regardless of how many times they are repeated."

- "Idempotent methods are those that can be repeated with the same result, meaning that making the same request multiple times should have the same effect as making it once. Examples of idempotent methods: GET, HEAD, PUT, DELETE."

- "The HTTP methods that are typically cacheable are GET and HEAD. These methods are considered safe and idempotent, making them suitable for caching."
