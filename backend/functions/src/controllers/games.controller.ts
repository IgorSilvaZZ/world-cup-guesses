import type { Request, Response } from "firebase-functions/v1";
import type { GamesByDateInput } from "../adapters/Game";
import { GamesService } from "../services/games.service";
import { ErrorResolver } from "../shared/resolvers/ErrorResolver";
import { getGamesByDateValidation } from "../validations/getGamesByDateValidation";

export class GamesController {
	private readonly gamesService: GamesService;

	constructor() {
		this.gamesService = new GamesService();
	}

	public async getById(req: Request, res: Response) {
		try {
			const id = req.params[0] as string;

			const game = await this.gamesService.getById(id);

			res.json({ game });
		} catch (error) {
			ErrorResolver.execute(error, res);
		}
	}

	public async getByDate(req: Request, res: Response) {
		try {
			const { date } = getGamesByDateValidation(
				req.query as unknown as GamesByDateInput,
			);

			const games = await this.gamesService.getByDate(date);

			res.json({ games });
		} catch (error) {
			ErrorResolver.execute(error, res);
		}
	}

	public async finishedGamesByIds(req: Request, res: Response) {
		try {
			const { gamesIds } = req.body;

			await this.gamesService.processedFinished(gamesIds);

			res.status(200).send();
		} catch (error) {
			ErrorResolver.execute(error, res);
		}
	}
}
