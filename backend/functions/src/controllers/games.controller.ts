import type { Request, Response } from "firebase-functions/v1";
import { ZodError } from "zod";
import type { GamesByDateInput } from "../adapters/Game";
import { GamesService } from "../services/games.service";
import { getGamesByDateValidation } from "../validations/getGamesByDateValidation";

export class GamesController {
	private readonly gamesService: GamesService;

	constructor() {
		this.gamesService = new GamesService();
	}

	public async getGameById(req: Request, res: Response) {
		try {
			const id = req.params[0] as string;

			const game = await this.gamesService.getGamesById(id);

			res.json({ game });
		} catch (error) {
			console.error(error);

			res.status(500).json({ message: "Internal server error." });
		}
	}

	public async getGamesByDate(req: Request, res: Response) {
		try {
			const { date } = getGamesByDateValidation(
				req.query as unknown as GamesByDateInput,
			);

			const games = await this.gamesService.getGamesByDate(date);

			res.json({ games });
		} catch (error) {
			console.error(error);

			if (error instanceof ZodError) {
				res
					.status(400)
					.json({ message: "Validation error", issues: error.issues });
			} else {
				res.status(500).json({ message: "Internal server error." });
			}
		}
	}
}
