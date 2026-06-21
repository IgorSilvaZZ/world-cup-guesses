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
}
