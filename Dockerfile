FROM node:21-alpine

ENV PORT=3000

EXPOSE 3000/tcp

RUN mkdir /app

RUN adduser --disabled-password app

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

USER app:app

WORKDIR /app

COPY [".", "."]

CMD ["node", "index.js"]