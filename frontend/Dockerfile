FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .

ARG NEXT_PUBLIC_BASE_API

ENV NEXT_PUBLIC_BASE_API=$NEXT_PUBLIC_BASE_API


RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
