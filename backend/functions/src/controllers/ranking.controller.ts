import { RakingService } from "../services/ranking.service";

export class RakingController {
	private readonly rakingService: RakingService;

	constructor() {
		this.rakingService = new RakingService();
	}

	public async process(event: any) {
		try {
			await this.rakingService.process("");
		} catch (error) {
			throw error;
		}
	}
}
