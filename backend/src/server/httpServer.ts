import Fastify from "fastify";
import routes from "../routes";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import config from "../config";

export async function createServer() {
  const app = Fastify({ 
    logger: true,
    bodyLimit: config.pptRequestLimits.bodyLimit
  });

  // Security headers
  await app.register(helmet);

  await app.register(cors, {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  })

  await app.register(rateLimit, {
    max: 200,
    timeWindow: "15 minutes"
  })

  // Register routes
  app.register(routes, { prefix: "/api" });

  return app;
}