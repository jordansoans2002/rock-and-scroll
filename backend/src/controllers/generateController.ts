import { FastifyReply, FastifyRequest } from "fastify";
import { GenerateRequest, GenerateRequestSchema } from "../dto/generateRequestDto";
import { MockGenerator } from "../services/pptGenerator/MockGenerator";
import { GeneratePresentationUseCase } from "../usecases/generatePresentationUseCase";

const generator = new MockGenerator()
const useCase = new GeneratePresentationUseCase(generator)

export async function generateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const payload: GenerateRequest = GenerateRequestSchema.parse(request.body)

    const buffer = await useCase.execute(payload)

    reply
      .header("content-type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
      .header("content-disposition", "attachment; filename=lyrics.pptx")
      .send();
  } catch (err: any) {
    reply.status(400).send({ error: err.message ?? "Invalid request"});
  }
}