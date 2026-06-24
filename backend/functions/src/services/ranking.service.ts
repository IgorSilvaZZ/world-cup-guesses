import type { IGamesRepository } from "../adapters/IGamesRepository";
import type { IGuessRepository } from "../adapters/IGuessRepository";
import { IUserRepository } from "../adapters/IUserRepository";
import { GamesRepository } from "../repositories/GamesRepository";
import { GuessesRepository } from "../repositories/GuessesRepository";
import { UsersRepository } from "../repositories/UsersRepository";

export class RakingService {
	private readonly guessesRepository: IGuessRepository;
	private readonly gamesRepository: IGamesRepository;
	private readonly usersRepository: IUserRepository

	constructor() {
		this.guessesRepository = new GuessesRepository();

		this.gamesRepository = new GamesRepository();

		this.usersRepository = new UsersRepository()
	}

	async process() {
		const finishedGames = await this.gamesRepository.findFinished();

		await Promise.all(finishedGames.map(async (game) => {
			const guesses = await this.guessesRepository.findByGameId(game.id as string)

			const winnerGamePoints = game.firstTeamPoints > game.secondTeamPoints ? game.firstTeamPoints : game.secondTeamPoints

			for (const guess of guesses) {
				let updateUser = false

				const user = await this.usersRepository.findById(guess.userId)

				if (!user) {
					continue
				}

				if (guess.firstTeamPoints === game.firstTeamPoints && guess.secondTeamPoints === game.secondTeamPoints) {
					user.points = user.points + 6

					updateUser = true

				} else if ([guess.firstTeamPoints, guess.secondTeamPoints].includes(winnerGamePoints)) {
					user.points = user.points + 4

					updateUser = true
				}

				if (updateUser) {
					/* Atualizar usuario */
					await this.usersRepository.update(user.id as string, user)
				}
			}

		}))
	}
}
