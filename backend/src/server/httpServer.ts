import Fastify from "fastify";
import routes from "../routes";

export async function createServer() {
  const app = Fastify({ logger: true });

  // Register routes
  app.register(routes, { prefix: "/api" });

  return app;
}