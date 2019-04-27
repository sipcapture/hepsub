<img src="https://github.com/sipcapture/homer-app/raw/master/public/img/homerseven.png" width=200 />

# HEP PUBSUB Endpoint
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

