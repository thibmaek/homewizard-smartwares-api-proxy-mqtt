FROM node:12

WORKDIR /usr/src/homewizard-smartwares-proxy-mqtt
COPY . .

ENV BROKER ""
ENV BROKER_PORT ""
ENV BROKER_USER ""
ENV BROKER_PASS ""

ENV HOMEWIZARD_USER ""
ENV HOMEWIZARD_PASS ""

RUN npm install
RUN npm run build

CMD ["npm", "start"]
