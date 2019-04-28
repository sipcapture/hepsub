\#!/bin/bash

HOMER_IP="${HOMER_IP:-127.0.0.1}"
PUBLIC_IP="${PUBLIC_IP:-127.0.0.1}"

sed -i "s/homer.seven/$HOMER_IP/g" /app/config.js
sed -i "s/PUBLIC_IP_HERE/$PUBLIC_IP/g" /app/config.js

exec "$@"
