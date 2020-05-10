var config = {
  backend: 'http://de9.sipcapture.io:80/api/v3/agent/subscribe',
  token: 'hEvLmrcXhMKAjIPILgycOJHVVxZfohztYDELNzKjLUeKWIuiksFdVWzZcMHnnmztDMsmkqCCFdypTVYK',
  service: {
	"uuid": Math.random().toString(36).substring(7),
	"host":"de9.sipcapture.io",
	"port": 18088,
	"protocol": "http",
	"path": "/get",
	"type": "cdr",
	"ttl": 300,
	"node": "test-endpoint",
	"gid": 10
  },
  "debug": true
};

module.exports = config;
