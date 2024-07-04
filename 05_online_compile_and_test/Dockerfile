FROM node:22-alpine3.19 as env

RUN npm install -g npm@latest

FROM env as build

WORKDIR /app

COPY package*.json ./
RUN npm install --no-save

COPY . .

RUN npm run lint
RUN npm run test:ts-node:esm
RUN npm run test:swc:esm
RUN npm run test:tsx:simple
RUN npm run build

FROM env

WORKDIR /app

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

COPY package.json .
COPY --from=build /app/dist ./dist

CMD ["npm", "run", "start"]
