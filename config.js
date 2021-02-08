var config = {
  backend: 'http://your.homer.host/api/v3/agent/subscribe',
  token: 'hEvLmrcXhMKAjIPILgycOJHVVxZfohztYDELNzKjLUeKWIuiksFdVWzZcMHnnmztDMsmkqCCFdypTVYK',
  service: {
	"uuid": Math.random().toString(36).substring(7),
	"host":"your.homer.host",
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
