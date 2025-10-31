import { FastifyInstance } from "fastify";
import { generatePresentationController } from "../controllers/generatePresentationController";

export default async function routes(app: FastifyInstance) {
  app.post("/create", generatePresentationController);
}