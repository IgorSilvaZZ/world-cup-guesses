import type { Game } from "../adapters/Game";
import { RakingService } from "../services/ranking.service";

export class RakingController {
	private readonly rakingService: RakingService;

	constructor() {
		this.rakingService = new RakingService();
	}

	public async process(gameBeforeData: Game, gameAfterData: Game) {
		try {
			if (gameBeforeData.finished) {
				console.warn("Game is already finished!");

				return;
			}

			if (!gameAfterData.finished) {
				console.warn("Game not finished to update ranking!");

				return;
			}

			await this.rakingService.process(gameAfterData as Game);
		} catch (error) {
			console.log(error);

			throw error;
		}
	}
}
