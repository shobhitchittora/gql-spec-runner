FROM node:12
WORKDIR /usr/src/gql-spec-runner

ENV NODE_TLS_REJECT_UNAUTHORIZED 0
ENV npm config set strict-ssl false

COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]