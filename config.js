var config = {
  backend: 'http://homer.seven/api/v2/agent/subscribe',
  service: {
	"uuid": Math.random().toString(36).substring(7),
	"host":"PUBLIC_IP_HERE",
	"port": 18088,
	"protocol": "http",
	"path": "/get",
	"type": "rtp;cdr",
	"ttl": 300,
	"node": "test-endpoint",
	"gid": 10
  },
  "debug": true
};

module.exports = config;
