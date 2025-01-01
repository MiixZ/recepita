FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/app.js"]
