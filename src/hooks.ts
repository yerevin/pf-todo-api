import { bearerTokenCheck } from "./helper/utils";

export const hooks = async (server) => {
  server.addHook("preValidation", async (request, reply) => {
    if (
      reply.context.config.skipBearerTokenAuth ||
      request.urlData("path").includes("swagger-documentation")
    ) {
      return;
    }

    const userId = await bearerTokenCheck(
      server,
      request.headers.authorization
    );

    request.user_id = userId;

    if (request.user_id) {
      return;
    }

    throw { detail: "Authorization failed" };
  });
};
