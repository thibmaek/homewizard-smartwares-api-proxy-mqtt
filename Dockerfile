FROM node:lts-alpine

WORKDIR /usr/src/homewizard-smartwares-api-proxy-mqtt
COPY . .

RUN npm install
RUN npm install -g forever --unsafe-perm

CMD ["npm", "run", "dev"]
