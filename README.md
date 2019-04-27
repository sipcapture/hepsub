<img src="https://github.com/sipcapture/homer-app/raw/master/public/img/homerseven.png" width=100 />

# HEP PUBSUB Endpoint
    "does anyone know anything about this thing?"

[HOMER](https://github.com/sipcapture/homer-app) Seven allows external agents to subscribe capabilities to provide *"on-demand"* session details from external APIs, databases, etc. to argument internally available data without requiring data duplication and allowing creative use of the core HEP platform.

This application publishes itself as an endpoint for the HEP Pub-Sub API, announcing its endpoints providing on-demand complementary information about correlated sessions.


## POST SERVER REGISTRATION
```
{   uuid: '68e53c5-xxxxxxx-xxxxxx-xxxxxx',
    host: 'local-server.address',
    port: 18088,
    protocol: 'http',
    path: '/get',
    type: 'rtp',
    ttl: 60,
    node: 'test-endpoint',
    gid: 10 
}
```
### POST POINTER
`protocol://host:port/path/type`

#### Example
```
http://server.address:18088/get/logs
```

