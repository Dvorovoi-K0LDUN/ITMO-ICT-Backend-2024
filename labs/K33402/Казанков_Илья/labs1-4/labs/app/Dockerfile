FROM node:20

WORKDIR /auth

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]