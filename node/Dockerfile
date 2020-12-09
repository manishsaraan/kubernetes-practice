FROM node:alpine

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 3000

ENV PORT=3002

CMD ["npm", "start"]