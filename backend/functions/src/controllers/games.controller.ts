import type { Request, Response } from "firebase-functions/v1";
import type { GamesByTodayInput } from "../adapters/Game";
import { GamesService } from "../services/games.service";
import { getGamesByTodayValidation } from "../validations/getGamesByTodayValidation";
import { ZodError } from "zod";

export class GamesController {
	private readonly gamesService: GamesService;

	constructor() {
		this.gamesService = new GamesService();
	}

	public async getGamesByToday(req: Request, res: Response) {
		try {
			
			const { date } = getGamesByTodayValidation(
			req.query as unknown as GamesByTodayInput,
		);

		const games = await this.gamesService.getGamesByDate(date);

		res.json({ games });

		} catch (error) {
			console.error(error)
			
			if (error instanceof ZodError) {
				res.status(400).json({ message: "Validation error", issues: error.issues })
			} else {
				res.status(500).json({ message: "Internal server error." })
			}



		}
	}
}
