import { FastifyReply, FastifyRequest } from "fastify";
import { GeneratePresentationRequest, GeneratePresentationRequestSchema } from "../dto/generatePresentationRequestDto";
import { MockGenerator } from "../services/presentationGenerator/MockPresentationGenerator";
import { GeneratePresentationUseCase } from "../usecases/generatePresentationUseCase";
import { RealPresentationGenerator2 } from "../services/presentationGenerator/RealPresentationGenerator2";
import { RealPresentationGenerator } from "../services/presentationGenerator/RealPresentationGenerator";


export async function generatePresentationController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const payload: GeneratePresentationRequest = GeneratePresentationRequestSchema.parse(request.body)

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