# deploy/Dockerfile
FROM node:12.22.5-alpine3.14
MAINTAINER <enzo.derenzis@gmail.com>

RUN npm install -g serve

RUN mkdir -p /opt/client/src
RUN mkdir /opt/client/public

ADD ./src  /opt/client/src
ADD ./public  /opt/client/public
ADD package.json  /opt/client

WORKDIR /opt/client

RUN npm install
RUN npm run-script build

CMD ["serve", "-p", "5000", "-s", "build"]
