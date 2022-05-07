import * as fastify from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

import taskRoutes from "./routes";

describe("/task", () => {
  let server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

  beforeAll(() => {});

  beforeEach(async () => {
    server = fastify({});
    // eslint-disable-next-line global-require
    server.register(taskRoutes);
    await server.ready();

    jest.clearAllMocks();
  });

  it("GET returns 200", async (done) => {
    const response = await server.inject({ method: "GET", url: "/task" });
    expect(response.statusCode).toEqual(200);

    done();
  });

  it("POST returns 404", async (done) => {
    const response = await server.inject({ method: "POST", url: "/task" });
    expect(response.statusCode).toEqual(404);
    expect(response.payload).toMatchSnapshot();

    done();
  });
});
