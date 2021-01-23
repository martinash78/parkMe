FROM node:11-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# RUN npm install && npm install tsc -g
# RUN npm run build

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
