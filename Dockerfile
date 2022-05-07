FROM node:12.8-alpine as build

WORKDIR /app
COPY . .
RUN apk --no-cache add make gcc g++ python bash
RUN npm i && npm run build

FROM node:12.8-alpine

COPY --from=build /app /

EXPOSE 8080
CMD ["npm", "start", "--silent"]