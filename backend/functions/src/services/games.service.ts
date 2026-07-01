import type { FinishedGamesInput } from "../adapters/Game";
import type { IGamesRepository } from "../adapters/IGamesRepository";
import { GamesRepository } from "../repositories/GamesRepository";

export class GamesService {
	private readonly gamesRepository: IGamesRepository;

	constructor() {
		this.gamesRepository = new GamesRepository();
	}

	public async getById(id: string) {
		const game = await this.gamesRepository.findById(id);

		return game;
	}

	public async getByDate(date: string) {
		const games = await this.gamesRepository.findByRange(date, date);

		return games;
	}

	public async processedFinished(gamesIds: FinishedGamesInput[]) {
		for (const game of gamesIds) {
			await this.gamesRepository.update(game.gameId, {
				firstTeamPoints: String(game.firstTeamPoints),
				secondTeamPoints: String(game.secondTeamPoints),
				finished: true,
			});
		}
	}
}
