FROM node:11-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --force

COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "start:dev"]



