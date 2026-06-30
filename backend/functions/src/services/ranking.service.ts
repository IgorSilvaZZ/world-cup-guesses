import type { Game } from "../adapters/Game";
import type { IGuessRepository } from "../adapters/IGuessRepository";
import type { IUserRepository } from "../adapters/IUserRepository";
import { GuessesRepository } from "../repositories/GuessesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

export class RakingService {
	private readonly guessesRepository: IGuessRepository;
	private readonly usersRepository: IUserRepository;

	constructor() {
		this.guessesRepository = new GuessesRepository();

		this.usersRepository = new UsersRepository();
	}

	async process(game: Game) {
		const guesses = await this.guessesRepository.findByGameIdNotProcessed(
			game.id as string,
		);

		const winnerGamePoints =
			Number(game.firstTeamPoints) > Number(game.secondTeamPoints)
				? game.firstTeamPoints
				: game.secondTeamPoints;

		for (const guess of guesses) {
			let updateUser = false;

			const user = await this.usersRepository.findById(guess.userId);

			if (!user) {
				continue;
			}

			if (
				guess.firstTeamPoints === Number(game.firstTeamPoints) &&
				guess.secondTeamPoints === Number(game.secondTeamPoints)
			) {
				user.points = user.points + 6;

				updateUser = true;
			} else if (
				[guess.firstTeamPoints, guess.secondTeamPoints].includes(
					Number(winnerGamePoints),
				)
			) {
				user.points = user.points + 4;

				updateUser = true;
			}

			if (updateUser) {
				await this.usersRepository.update(user.id as string, user);
			}
		}
	}
}
