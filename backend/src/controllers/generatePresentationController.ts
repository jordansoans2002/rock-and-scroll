import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePresentationRequestSchema } from "../dto/generatePresentationRequestDto";
import { GeneratePresentationUseCase } from "../usecases/generatePresentationUseCase";
import { RealPresentationGenerator } from "../services/presentationGenerator/RealPresentationGenerator";
import { CreatePresentationRequest } from "@rock-and-scroll/shared/types/api";


export async function generatePresentationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const payload: CreatePresentationRequest = CreatePresentationRequestSchema.parse(request.body)

    const presentationGenerator = new RealPresentationGenerator();
    const lyricsPresentationUseCase = new GeneratePresentationUseCase(presentationGenerator);
    const buffer = await lyricsPresentationUseCase.execute(payload)

    reply
      .header("Content-Type", "application/vnd.openxmlformats-officedocument.presentationml.presentation")
      .header("Content-Disposition", "attachment; filename=lyrics.pptx")
      .send(buffer);
  } catch (err: any) {
    reply.status(400).send({ error: err.message ?? "Invalid request"});
  }
}