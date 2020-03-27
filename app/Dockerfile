FROM node:12
WORKDIR /usr/src/app
ENV APP_PORT 4000

ENV NODE_TLS_REJECT_UNAUTHORIZED 0
ENV npm config set strict-ssl false

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${APP_PORT}
CMD [ "npm", "start" ]