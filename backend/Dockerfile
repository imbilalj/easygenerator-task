FROM node:19.9.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]