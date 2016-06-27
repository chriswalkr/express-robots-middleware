'use strict';

const isArray = require('isarray');

module.exports = function(robots) {
  return (req, res) => {
    res.header('Content-Type', 'text/plain');
    
    if (isArray(robots)) {
      let responseBody = '';
      robots.map((robot) => {
        responseBody = responseBody + buildBlock(robot).join('\n') + '\n\n';
      });
      res.send(responseBody);
      return;
    }
    res.send(buildBlock(robots).join('\n'));
  }
}

function buildBlock(robotItem) {
  let responseLines = [];
  if (robotItem.UserAgent) {
    responseLines.push('User-agent: ' + robotItem.UserAgent);
  }
  
  if (robotItem.Allow) {
    if (isArray(robotItem.Allow)) {
      robotItem.Allow.forEach((item) => {
        responseLines.push('Allow: ' + item);
      })
    } else {
      responseLines.push('Allow: ' + robotItem.Allow);
    }
    
  }
  
  if (robotItem.Disallow) {
    if (isArray(robotItem.Disallow)) {
      robotItem.Disallow.forEach((item) => {
        responseLines.push('Disallow: ' + item);
      })
    } else {
      responseLines.push('Disallow: ' + robotItem.Disallow);
    }
  }
  
  if (robotItem.CrawlDelay) {
    responseLines.push('Crawl-delay: ' + robotItem.CrawlDelay);
  }
  
  return responseLines;
}
