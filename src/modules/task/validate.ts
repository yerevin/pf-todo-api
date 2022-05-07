export const taskValidate = {
  findAll: {
    headers: {
      type: "object",
      required: ["Authorization"],
      properties: {
        Authorization: { type: "string" },
      },
    },
    querystring: {
      // limit: { type: "string" },
    },
    tags: ['task'],
  },
  create: {
    headers: {
      type: "object",
      required: ["Authorization"],
      properties: {
        Authorization: { type: "string" },
      },
    },
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    tags: ['task'],
  },
  find: {
    headers: {
      type: "object",
      required: ["Authorization"],
      properties: {
        Authorization: { type: "string" },
      },
    },
    params: {
      id: { type: "string" },
    },
    tags: ['task'],
  },
  update: {
    headers: {
      type: "object",
      required: ["Authorization"],
      properties: {
        Authorization: { type: "string" },
      },
    },
    params: {
      id: { type: "string" },
    },
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    tags: ['task'],
  },
  delete: {
    headers: {
      type: "object",
      required: ["Authorization"],
      properties: {
        Authorization: { type: "string" },
      },
    },
    params: {
      id: { type: "string" },
    },
    tags: ['task'],
  },
};
