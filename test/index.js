const sinon = require('sinon');
const test = require('ava');
const expressRobotsMiddleware = require ('../index')


test.beforeEach(t => {
  t.context.fakeRes = {
    header: sinon.spy(),
    send: sinon.spy(),
  }
})

test("works with no allow or disallow", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
  });
  
  middleware(undefined, t.context.fakeRes);
  t.is(t.context.fakeRes.send.calledWith('User-agent: *'), true);
});

test("sets content type correctly", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
  });
  
  middleware(undefined, t.context.fakeRes);
  t.is(t.context.fakeRes.header.calledWith('Content-Type', 'text/plain'), true);
});


test("work with a single allow", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
    Allow: 'all'
  });
  
  middleware(undefined, t.context.fakeRes);
  t.is(t.context.fakeRes.send.calledWith('User-agent: *\nAllow: all'), true);
});

test("works with an allow and a disallow", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
    Allow: 'all',
    Disallow: '/login'
  });
  
  middleware(undefined, t.context.fakeRes);
  t.is(t.context.fakeRes.send.calledWith('User-agent: *\nAllow: all\nDisallow: /login'), true);
});

test("works with an allow and disallow but backwards", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
    Disallow: '/login',
    Allow: 'all',
  });
  
  middleware(undefined, t.context.fakeRes);
  t.is(t.context.fakeRes.send.calledWith('User-agent: *\nAllow: all\nDisallow: /login'), true);
});

test("work with a multiple allows and disallows", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
    Allow: ['/', '/foo'],
    Disallow: ['/login', '/private']
  });
  
  middleware(undefined, t.context.fakeRes);
  const expected = 'User-agent: *\nAllow: /\nAllow: /foo\nDisallow: /login\nDisallow: /private';
  t.is(t.context.fakeRes.send.calledWith(expected), true);
});


test("work with a multiple allows and disallows and a crawl-delay", t => {
  const middleware = expressRobotsMiddleware({
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/login', '/private'],
    CrawlDelay: '5',
  });
  
  middleware(undefined, t.context.fakeRes);
  const expected = 'User-agent: *\nAllow: /\nDisallow: /login\nDisallow: /private\nCrawl-delay: 5';
  t.is(t.context.fakeRes.send.calledWith(expected), true);
});
