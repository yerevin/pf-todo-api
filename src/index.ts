import * as fastify from "fastify";

import * as sourceMapSupport from "source-map-support";
import { Server, IncomingMessage, ServerResponse } from "http";

import { database } from "./database";
import { plugins } from "./plugins";
import { router } from "./router";
import { serverStart } from "./server";
import { hooks } from "./hooks";

sourceMapSupport.install();

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: true });

database(server);

plugins(server);

router(server);

hooks(server);

process.on("uncaughtException", (error) => {
  console.error(error);
});
process.on("unhandledRejection", (error) => {
  console.error(error);
});

serverStart(server);
