/*
 * HEP-PUBSUB Interface Controller
 * (C) 2019 QXIP BV
 */

try {
  var config = require('./config.js');
} catch(e) { console.log('Missing config!',e); process.exit(1); }

var express = require('express');
const app = express();
const request = require('request');
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
const uuidv1 = require('uuid/v1');
var uuid = uuidv1();
var ttl = config.service.ttl;
var token = config.token;

var publish = function(){

  try {
    var settings = config.service;
    settings.uuid = uuid;  
    
    const data = JSON.stringify(settings)

    const options = {
        url: api,
        method: 'POST',
        json: settings,
        headers: {
          'Auth-Token': token
        }
    }
    
    if (config.debug) console.log("Body:", JSON.stringify(options));

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if (config.debug) console.log("BODY", body) // Print the shortened url.
        } else {
            if (config.debug) console.log('REGISTER API ERROR: ', body.message)
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


