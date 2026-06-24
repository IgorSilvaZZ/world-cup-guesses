import type { Request, Response } from "firebase-functions/v1";
import { RakingService } from "../services/ranking.service";
import { ErrorResolver } from "../shared/resolvers/ErrorResolver";


export class RakingController {
    private readonly rakingService: RakingService

    constructor() {
        this.rakingService = new RakingService()
    }

    public async process(req: Request, res: Response) {
        try {

            await this.rakingService.process()

            res.status(200).send()
            
        } catch (error) {
            ErrorResolver.execute(error, res);
        }
    }

}