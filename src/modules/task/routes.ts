import * as fp from "fastify-plugin";
import { taskController } from "./controller";
import { taskValidate } from "./validate";

export default fp(async (server, opts, next) => {
  server.route({
    url: "/task",
    method: ["GET"],
    handler: taskController.findAll(server),
    schema: taskValidate.findAll,
  });
  server.route({
    url: "/task",
    method: ["POST"],
    handler: taskController.create(server),
    schema: taskValidate.create,
  });

  server.route({
    url: "/task/:id",
    method: ["GET"],
    handler: taskController.find(server),
    schema: taskValidate.find,
  });

  server.route({
    url: "/task/:id",
    method: ["PUT"],
    handler: taskController.update(server),
    schema: taskValidate.update,
  });

  server.route({
    url: "/task/:id",
    method: ["DELETE"],
    handler: taskController.delete(server),
    schema: taskValidate.delete,
  });
  next();
});
