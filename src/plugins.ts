import * as fastifyBlipp from "fastify-blipp";
import * as fastifySwagger from "fastify-swagger";
import * as fastifyCors from "fastify-cors";
import * as fastifyUrlData from "fastify-url-data";

export const plugins = (server) => {
  server.register(fastifySwagger, {
    routePrefix: "/swagger-documentation",
    swagger: {
      info: {
        title: "Documentation",
        description: "Swagger API",
        version: "1.0.0",
      },
      host: "localhost:8080",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    exposeRoute: true,
  });
  server.register(fastifyBlipp);
  server.register(fastifyCors);
  server.register(fastifyUrlData);
};
