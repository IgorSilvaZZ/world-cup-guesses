import type { Request, Response } from "firebase-functions/v1";
import { GuessesService } from "../services/guesses.service";
import { ErrorResolver } from "../shared/resolvers/ErrorResolver";
import { GuessValidation } from "../validations/GuessValidation";

export class GuessesController {
	private readonly guessesService: GuessesService;

	constructor() {
		this.guessesService = new GuessesService();
	}

	public async create(req: Request, res: Response) {
		try {
			const { firstTeamPoints, secondTeamPoints, gameId, userId } = req.body;

			GuessValidation.createGuessValidation({
				firstTeamPoints,
				secondTeamPoints,
				gameId,
				userId,
			});

			await this.guessesService.create({
				firstTeamPoints,
				secondTeamPoints,
				gameId,
				userId,
			});

			res.status(201).send();
		} catch (error) {
			ErrorResolver.execute(error, res);
		}
	}
}
