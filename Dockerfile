FROM resin/raspberrypi3-alpine-node:slim

WORKDIR /usr/src/homewizard-smartwares-api-proxy-mqtt
COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]
