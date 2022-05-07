import { generateAccessToken } from "../../services/generateAccessToken.service";

export const userController = {
  login: (server) => async (request, reply) => {
    try {
      const user = await server.db.models.User.findOne({
        email: request.body.email,
      });
      if (user) {
        const isMatch = await user.comparePassword(request.body.password);
        if (isMatch) {
          const accessToken = await new server.db.models.AccessToken(
            generateAccessToken(user)
          ).save();
          return reply.code(200).send({
            user,
            accessToken: accessToken.accessToken,
            refreshToken: accessToken.refreshToken,
          });
        } else {
          return reply.code(422).send({
            error: {
              message: "Wrong password",
            },
          });
        }
      } else {
        return reply.code(422).send({
          error: {
            message: "Wrong email",
          },
        });
      }
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },
  signup: (server) => async (request, reply) => {
    try {
      const user = await new server.db.models.User(request.body).save();
      const accessToken = await new server.db.models.AccessToken(
        generateAccessToken(user)
      ).save();

      return reply.code(201).send({
        user,
        success: true,
        accessToken: accessToken.accessToken,
        refreshToken: accessToken.refreshToken,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },
};
