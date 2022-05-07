import { Model } from "mongoose";
import * as Mongoose from "mongoose";
import { TaskModel, Task } from "./modules/task/model";
import { UserModel, User } from "./modules/user/model";
import { AccessTokenModel, AccessToken } from "./modules/accessToken/model";
import * as fp from "fastify-plugin";
import * as config from "config";

export interface Models {
  Task: Model<TaskModel>;
  User: Model<UserModel>;
  AccessToken: Model<AccessTokenModel>;
}

export interface Db {
  models: Models;
}

export const models: Models = {
  Task: Task,
  User: User,
  AccessToken: AccessToken,
};

export const db = fp(async (fastify, opts: { uri: string }, next) => {
  Mongoose.connection.on("connected", () => {
    fastify.log.info({ actor: "MongoDB" }, "connected");
  });

  Mongoose.connection.on("disconnected", () => {
    fastify.log.error({ actor: "MongoDB" }, "disconnected");
  });

  await Mongoose.connect(opts.uri, {
    useNewUrlParser: true,
    keepAlive: true,
  });

  fastify.decorate("db", { models });

  next();
});

export const database = (server) => {
  server.register(db, config.get("db"));
};
