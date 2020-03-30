FROM node:12

WORKDIR /usr/src/homewizard-smartwares-proxy-mqtt
COPY . .

ENV BROKER ""
ENV BROKER_PORT ""
ENV BROKER_USER ""
ENV BROKER_USER ""

ENV HOMEWIZARD_USER ""
ENV HOMEWIZARD_PASS ""

RUN npm ci

CMD ["npm", "start"]
