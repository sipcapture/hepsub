FROM node:8-alpine

RUN apk add --update git

RUN git clone https://github.com/sipcapture/hepsub /app
WORKDIR /app

RUN npm install 

# Expose Ports
EXPOSE 18088

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD [ "npm", "start" ]
