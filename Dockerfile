FROM node:lts-alpine3.19
ENV WORKDIR=/usr/src/app
WORKDIR ${WORKDIR}
COPY . ${WORKDIR}
RUN npm install
RUN npm run build
ENTRYPOINT ["node", "./dist/main.js"]
EXPOSE 3000