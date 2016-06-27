# express-robots-middleware

[![Build Status](https://travis-ci.org/chriswalkr/express-robots-middleware.svg?branch=master)](https://travis-ci.org/chriswalkr/express-robots-middleware)

Middleware for generating robots.txt in Express

# Installation

~~~
npm i express-robots-middleware --save
~~~

## Features

* Multiple User Agents
* Multiple Allow/Disallow
* Crawl-delay argument

# Usage

Simple initialize and assign the middleware to a route and pass in your robots.txt options see 
`mock.js` for a working example. 

~~~
const robotsMiddleware = expressRobotsMiddleware({
  UserAgent: '*',
  Disallow: ['/private'],
  Allow: '/',
  CrawlDelay: '5'
});

app.get('/robots.txt', robotsMiddleware);
~~~

# License

[MIT](LICENSE)

