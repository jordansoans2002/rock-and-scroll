import Fastify from "fastify";
import routes from "../routes";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import config from "../config";

export async function createServer() {
  const app = Fastify({ 
    logger: true,
    bodyLimit: config.bodyLimit
  });

  // Security headers
  await app.register(helmet);

  await app.register(cors, {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
  })

  await app.register(rateLimit, {
    max: config.maxRequests,
    timeWindow: config.timeWindow
  })

  // Register routes
  app.register(routes, { prefix: "/api/presentations" });

  return app;
}