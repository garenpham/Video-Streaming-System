FROM node:latest

WORKDIR /app

RUN apt -y update
RUN apt install -y iputils-ping curl

COPY package.json .
RUN npm install

COPY . .

CMD ["npm","start"]