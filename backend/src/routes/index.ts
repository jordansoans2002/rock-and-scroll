import { FastifyInstance } from "fastify";
import { generateController } from "../controllers/generateController";

export default async function routes(app: FastifyInstance) {
  app.post("/generate-pptx", generateController);
}