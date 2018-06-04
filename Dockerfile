FROM node:7
MAINTAINER Rosario Mensi

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY index.js /app

CMD ["npm", "start"]