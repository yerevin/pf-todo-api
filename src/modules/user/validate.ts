export const userValidate = {
  login: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", format: "email" },
        password: {
          type: "string",
          pattern: "^[a-zA-Z0-9!@#$%^&*)(+=.]{6,30}$",
        },
      },
    },
    tags: ["user"],
  },
  signup: {
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: { type: "string", format: "email" },
        password: {
          type: "string",
          pattern: "^[a-zA-Z0-9!@#$%^&*)(+=.]{6,30}$",
        },
      },
    },
    tags: ["user"],
  },
};
