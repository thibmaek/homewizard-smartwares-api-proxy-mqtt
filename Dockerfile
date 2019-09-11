FROM node:10

WORKDIR /usr/src/app
COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
