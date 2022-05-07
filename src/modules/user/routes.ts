import * as fp from "fastify-plugin";
import { userController } from "./controller";
import { userValidate } from "./validate";

export default fp(async (server, opts, next) => {
  server.route({
    url: "/user/log-in",
    method: ["POST"],
    config: { skipBearerTokenAuth: true },
    handler: userController.login(server),
    schema: userValidate.login,
  });

  server.route({
    url: "/user/sign-up",
    method: ["POST"],
    config: { skipBearerTokenAuth: true },
    handler: userController.signup(server),
    schema: userValidate.signup,
  });

  next();
});
