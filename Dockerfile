FROM node:20-alpine3.16
WORKDIR /user/app
COPY package.json ./
RUN npm install

COPY ./src ./src
COPY .env .env
COPY swagger.yml swagger.yml

CMD ["npm", "run", "start"]