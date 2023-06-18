## Rate Limiter Algorithm (Fixed Window Strategy) in ExpressJs 
This repository contains an implementation of a rate limiter algorithm using the fixed window strategy in Node.js and TypeScript. The rate limiter helps control the rate of incoming requests to an application, preventing abuse, and ensuring fair resource allocation.

## Algorithm Description
The fixed window strategy rate limiter algorithm divides time into fixed intervals (windows) and limits the number of requests allowed within each window. If the number of requests exceeds the limit for a given window, subsequent requests are rejected until the next window starts.
