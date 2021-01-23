# FROM mhart/alpine-node:11 AS builder
# WORKDIR /app
# COPY . .
# RUN yarn run build

# FROM mhart/alpine-node
# RUN yarn global add serve
# WORKDIR /app
# COPY --from=builder /app/build .
# CMD ["serve", "-p", "80", "-s", "."]


FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
