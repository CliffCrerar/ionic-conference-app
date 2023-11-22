FROM node:20 as base

FROM base as build
WORKDIR /build
# RUN apt-get update || : && apt-get install python3 -y
COPY package*.json .
RUN npm i
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:20-slim as run
WORKDIR /app
COPY --from=build /build/www www
COPY ./server.js .
RUN npm init -y
RUN npm install express

EXPOSE 80 
EXPOSE 3000
EXPOSE 8080

CMD ["node", "server"]

