FROM node:18.13.0

WORKDIR /app

COPY package.json ./
RUN npm install
RUN apt -y update
RUN apt install -y iputils-ping

COPY . .

CMD ["npm","start"]