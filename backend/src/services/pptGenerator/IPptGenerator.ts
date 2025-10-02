import { GenerateRequest } from "../../dto/generateRequestDto";

/**
 * IPptGenerator defines the contract for any PPTX generator implementation.
 * - It takes a validated GenerateRequest (your JSON payload).
 * - It returns a Buffer containing the binary PPTX file.
 *
 * This allows you to swap implementations (mock vs real) without changing
 * controllers or use cases.
 */
export interface IPptGenerator {
    generate(payload: GenerateRequest): Promise<Buffer>
}