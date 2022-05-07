import taskRoutes from "./modules/task/routes";
import userRoutes from "./modules/user/routes";

export const router = (server) => {
  server.register(taskRoutes);
  server.register(userRoutes);
};
