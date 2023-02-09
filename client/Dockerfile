FROM node:latest

WORKDIR /app

RUN apt -y update
RUN apt install -y iputils-ping curl

# Initiate the Service 
# and install required dependencies
COPY package.json .
RUN npm install

# Deliver the source code to Docker image
COPY . .

# Run the app
CMD ["npm","run","dev"]