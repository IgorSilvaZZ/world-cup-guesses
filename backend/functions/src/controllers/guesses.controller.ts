import type { Request, Response } from "firebase-functions/v1";
import { GuessesService } from "../services/guesses.service";
import { ErrorResolver } from "../shared/resolvers/ErrorResolver";
import { GuessValidation } from "../validations/GuessValidation";

export class GuessesController {
	private readonly guessesService: GuessesService;

	constructor() {
		this.guessesService = new GuessesService();
	}

	public async getByUserId(req: Request, res: Response) {
		try {
			const userId = req.params[0] as string;

			const guesses = await this.guessesService.getByUserId(userId);

			res.status(200).json({ guesses });
		} catch (error) {
			ErrorResolver.execute(error, res);
		}
	}

	public async createAndUpdate(req: Request, res: Response) {
		try {
			const { firstTeamPoints, secondTeamPoints, gameId, userId } = req.body;

			GuessValidation.createGuessValidation({
				firstTeamPoints,
				secondTeamPoints,
				gameId,
				userId,
			});

			await this.guessesService.createAndUpdate({
				firstTeamPoints,
				secondTeamPoints,
				gameId,
				userId,
			});

			res.status(200).send();
		} catch (error) {
			ErrorResolver.execute(error, res);
		}
	}
}
