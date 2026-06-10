import type { Request, Response } from "firebase-functions/v1";
import type { GamesByTodayInput } from "../adapters/Game";
import { GamesService } from "../services/games.service";
import { getGamesByTodayValidation } from "../validations/getGamesByTodayValidation";

export class GamesController {
	private readonly gamesService: GamesService;

	constructor() {
		this.gamesService = new GamesService();
	}

	public async getGamesByToday(req: Request, res: Response) {
		const { date } = getGamesByTodayValidation(
			req.query as unknown as GamesByTodayInput,
		);

		const games = await this.gamesService.getGamesByDate(date);

		res.json({ games });
	}
}
