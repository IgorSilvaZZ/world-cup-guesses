import type { Request, Response } from "firebase-functions/v1";
import { GamesService } from "../services/games.service";

export class GamesController {
	private readonly gamesService: GamesService;

	constructor() {
		this.gamesService = new GamesService();
	}

	public async getGamesByToday(req: Request, res: Response) {
		const today = new Date().toISOString();

		const games = await this.gamesService.getGamesByDate(today);

		res.json({ games });
	}
}
