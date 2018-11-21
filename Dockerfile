FROM resin/raspberrypi3-alpine-node:slim

WORKDIR /usr/src/homewizard-smartwares-api-proxy-mqtt
COPY . .

RUN npm install
RUN npm install -g forever --unsafe-perm

CMD [ "npm", "run", "dev" ]
