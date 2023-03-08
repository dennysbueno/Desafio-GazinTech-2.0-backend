FROM node:latest

WORKDIR /usr/app

COPY package.json /usr/app
COPY yarn.lock /usr/app

RUN yarn install --frozen-lockfile

COPY . .

ENV API_PORT=3333
EXPOSE "${API_PORT}"

CMD ["yarn", "run", "dev"]