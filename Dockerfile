FROM node:14-alpine3.10

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT_HTTP 3000

EXPOSE $PORT_HTTP

CMD["npm", "run", "start"]


