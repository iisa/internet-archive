FROM node:alpine
MAINTAINER @iisa

RUN mkdir -p -m777 /usr/src/app

WORKDIR /usr/src/app

USER node

COPY . /usr/src/app

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "app.js"]