var config = {
  backend: 'http://homer.app:9080/api/v3/agent/subscribe',
  token: 'XIAgdKTDQwKtSOvLXOLarFCrckWfHDIRtQQegvcDXhFRvISQvszTMLXuRNJtKuiEDNOurBEMtQURQjOx',
  service: {
	"uuid": Math.random().toString(36).substring(7),
	"host":"nyc01.sipcapture.io",
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
