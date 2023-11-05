FROM node:20-alpine3.17
RUN apk update

WORKDIR /app/kavita
COPY package*.json ./
RUN npm ci --legacy-peer-deps
RUN npm install -g @angular/cli
