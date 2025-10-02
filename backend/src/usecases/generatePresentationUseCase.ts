import config from "../config";
import { GenerateRequest } from "../dto/generateRequestDto";
import { IPptGenerator } from "../services/pptGenerator/IPptGenerator";

export class GeneratePresentationUseCase {
    constructor(private generator: IPptGenerator) {}

    async execute(payload: GenerateRequest): Promise<Buffer> {
        if(payload.songs.length > config.pptRequestLimits.maxSongs) {
            throw new Error(`Too many songs. Max songs allowed at a time are ${config.pptRequestLimits.maxSongs}`)
        }
        
        for(const song of payload.songs) {
            if(song.settings.stanzas.length > config.pptRequestLimits.maxSongs) {
                throw new Error(`Song: ${song.title} has too many stanzas. Max allowed is ${config.pptRequestLimits.maxSlidesPerSong}`)
            }

            // todo add stanza splitting, pagination etc
        }
        
        return this.generator.generate(payload);
    }
}