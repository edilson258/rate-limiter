## Rate Limiter Algorithm (Fixed Window Strategy) in ExpressJs 
This repository contains an implementation of a rate limiter algorithm using the fixed window strategy in Node.js and TypeScript. The rate limiter helps control the rate of incoming requests to an application, preventing abuse, and ensuring fair resource allocation.

## Algorithm Description
The fixed window strategy rate limiter algorithm divides time into fixed intervals (windows) and limits the number of requests allowed within each window. If the number of requests exceeds the limit for a given window, subsequent requests are rejected until the next window starts.

To learn more about rate limiting, check out [this link](https://en.m.wikipedia.org/wiki/Rate_limiting) for further information.

## Get Started

```shell
git clone https://github.com/edilson258/rate-limiter.git
cd rate-limiter
npm install
```

## API Provided Services
This repository serves as a demonstration of a rate limiter implementation and does not provide any API services. The code here showcases how to effectively control the rate of requests to an API or service, preventing abuse and ensuring optimal performance. Users are encouraged to explore and integrate this rate limiter implementation into their own projects as needed. However, please note that this repository does not offer any live API endpoints or services.

Although, it has a simple API endpoint which you can send an text and will return the same text in upper case. Can use it for testing.

## Usage

1. Sign an API key by email
`http://127.0.0.1:3000/users/sign-key/?email=<your-email>`

2. Make request to the provided services
`http://127.0.0.1:3000/upper/?key=<your-key>&text=hello world`
