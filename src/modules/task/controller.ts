export const taskController = {
  findAll: (server) => async (request, reply) => {
    try {
      const task = await server.db.models.Task.find().lean();

      if (!task) {
        return reply.send(404);
      }

      return reply.code(200).send(task);
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },

  create: (server) => async (request, reply) => {
    try {
      const task = await new server.db.models.Task(request.body).save();

      return reply.code(201).send({
        task,
        success: true,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },

  find: (server) => async (request, reply) => {
    try {
      const task = await server.db.models.Task.findOne({
        _id: request.params.id,
      }).lean();

      if (!task) {
        return reply.send(404);
      }

      return reply.code(200).send(task);
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },

  update: (server) => async (request, reply) => {
    try {
      const task = await server.db.models.Task.findOneAndUpdate(
        {
          _id: request.params.id,
        },
        request.body
      ).lean();

      return reply.code(201).send({
        task,
        success: true,
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },

  delete: (server) => async (request, reply) => {
    try {
      await server.db.models.Task.findOneAndRemove({
        _id: request.params.id,
      }).lean();

      return reply.code(200).send({
        success: true,
        message: "Task deleted",
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(422).send({ error });
    }
  },
};
