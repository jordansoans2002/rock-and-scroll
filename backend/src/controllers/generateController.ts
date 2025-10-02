import { FastifyReply, FastifyRequest } from "fastify";

export async function generateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  // For now, just return a stub response
  return reply.send({ message: "PPTX generation stub" });
}