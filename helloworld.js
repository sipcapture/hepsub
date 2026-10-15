/*
 * HEP-PUBSUB Interface Controller
 * (C) 2019 QXIP BV
 */

try {
  var config = require('./config.js');
} catch(e) { console.log('Missing config!',e); process.exit(1); }

var express = require('express');
const app = express();
var http = require('http');
var https = require('https');
var url = require('url');
var bodyParser = require("body-parser");
app.use(bodyParser.json());

var port = config.service.port;

// API SETTINGS
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});

// HEP Post Paths
app.post('/get/:id', function (req, res) {
  var data = { params: req.params, body: req.body }
  console.log('NEW API POST REQ', data);
  res.send({"hello": "world", "data": JSON.stringify(data)})
})

app.listen(port, () => console.log('API Server started',port))


// HEP PUBSUB Hooks
var api = config.backend;
const { v1: uuidv1 } = require('uuid');
var uuid = uuidv1();
var ttl = config.service.ttl;
var token = config.token;

var postRegister = function (targetUrl, payload, authToken, callback) {
  var parsed = url.parse(targetUrl);
  var body = JSON.stringify(payload);
  var isHttps = parsed.protocol === 'https:';
  var transport = isHttps ? https : http;
  var options = {
    hostname: parsed.hostname,
    port: parsed.port || (isHttps ? 443 : 80),
    path: parsed.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'Auth-Token': authToken
    }
  };

  var req = transport.request(options, function (response) {
    var chunks = '';
    response.on('data', function (chunk) { chunks += chunk; });
    response.on('end', function () {
      var responseBody;
      try {
        responseBody = JSON.parse(chunks);
      } catch (e) {
        responseBody = chunks;
      }
      callback(null, response, responseBody);
    });
  });

  req.on('error', function (error) {
    callback(error);
  });

  req.write(body);
  req.end();
};

var publish = function(){

  try {
    var settings = config.service;
    settings.uuid = uuid;

    const options = {
        url: api,
        method: 'POST',
        json: settings,
        headers: {
          'Auth-Token': token
        }
    }

    if (config.debug) console.log("Body:", JSON.stringify(options));

    postRegister(api, settings, token, function (error, response, body) {
        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
            if (config.debug) {
                console.log("RESPONSE API:", body)
            }
        } else {
            if (config.debug) {
                if(body && body.message) console.log('REGISTER API ERROR: ', body.message);
                else console.log('REGISTER UNKNOWN ERROR: ', error);
            }
        }
    });

  } catch(e) { console.error(e) }
}

/* REGISTER SERVICE w/ TTL REFRESH */
if (ttl) {
	publish();
	/* REGISTER LOOP */
	setInterval(function() {
	   publish()
	}, (.9 * ttl)*1000 );
}

/* END */


