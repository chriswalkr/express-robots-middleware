const express = require('express');
const expressRobotsMiddleware = require('./index.js');

const app = express();

const robotsMiddleware = expressRobotsMiddleware([{
  UserAgent: '*',
  Disallow: ['/', '/test', '/private'],
  Allow: ['/foo', '/bar'],
  CrawlDelay: '5'
}, {
  UserAgent: 'bar',
  Disallow: ['/', '/test', '/private'],
  Allow: ['/foo', '/bar'],
  CrawlDelay: '5'
}]);

app.get('/robots.txt', robotsMiddleware);

app.listen(3000, function() {
  /* eslint-disable no-console */
  console.log('Example app listening on port 3000!');
  /* eslint-enable no-console */
});
