FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn global add serverless 

COPY . .

RUN yarn build

EXPOSE 3000

CMD [ "npm", "run", "start:dev"]
