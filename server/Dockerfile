# deploy/Dockerfile
FROM node:12.22.5-alpine3.14

MAINTAINER <enzo.derenzis@gmail.com>

RUN npm install -g forever

RUN mkdir -p /opt/server

ADD . /opt/server

WORKDIR /opt/server

RUN ls /opt/server

RUN yarn build

RUN mkdir ./logs

CMD ["forever",  "-o", "logs/out.log", "-e", "logs/err.log", "--minUptime", "1000", "--spinSleepTime", "1000", "./dist/index.js"]
