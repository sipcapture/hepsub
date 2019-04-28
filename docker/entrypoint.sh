#!/bin/bash

HOMER_IP="${HONER_IP:-127.0.0.1}"
PUBLIC_IP="${PUBLIC_IP:-127.0.0.1}"

sed -i 's/homer.seven/'"$HOMER_IP"'/g' /usr/src/hepsrc/config.js
sed -i 's/PUBLIC_IP_HERE/'"$PUBLIC_IP"'/g' /usr/src/hepsrc/config.js

exec "$@"
