import { GenerateRequest } from "../../dto/generateRequestDto";
import { IPptGenerator } from "./IPptGenerator";

export class MockGenerator implements IPptGenerator {
    async generate(_payload: GenerateRequest): Promise<Buffer> {
    const text = "PPTX generation stub. Replace with real generator.";
    return Buffer.from(text, "utf-8");    }
}