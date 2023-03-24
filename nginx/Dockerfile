FROM nginx:latest

WORKDIR /etc/nginx

RUN apt -y update
RUN apt install -y iputils-ping curl

COPY . .