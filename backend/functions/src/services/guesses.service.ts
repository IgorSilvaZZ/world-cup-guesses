import type { Guess, GuessInput } from "../adapters/Guess";
import type { IGamesRepository } from "../adapters/IGamesRepository";
import type { IGuessRepository } from "../adapters/IGuessRepository";
import type { IUserRepository } from "../adapters/IUserRepository";
import { GamesRepository } from "../repositories/GamesRepository";
import { GuessesRepository } from "../repositories/GuessesRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import { AppErrors } from "../shared/errors/AppErrors";

export class GuessesService {
	private readonly guessesRepository: IGuessRepository;
	private readonly usersRepository: IUserRepository;
	private readonly gamesRepository: IGamesRepository;

	constructor() {
		this.guessesRepository = new GuessesRepository();

		this.usersRepository = new UsersRepository();

		this.gamesRepository = new GamesRepository();
	}

	public async getByUserId(userId: string): Promise<Guess[]> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppErrors("User not found", 404);
		}

		const guesses = await this.guessesRepository.findByUserId(userId);

		return guesses;
	}

	public async createAndUpdate({
		firstTeamPoints,
		secondTeamPoints,
		userId,
		gameId,
	}: GuessInput): Promise<void> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new AppErrors("User not found", 404);
		}

		const game = await this.gamesRepository.findById(gameId);

		if (!game) {
			throw new AppErrors("Game not found!", 404);
		}

		const guessAlreadyExists = await this.guessesRepository.findByUserAndGame(
			userId,
			gameId,
		);

		if (guessAlreadyExists) {
			await this.guessesRepository.update(String(guessAlreadyExists.id), {
				firstTeamPoints,
				secondTeamPoints,
			});

			return;
		}

		await this.guessesRepository.create({
			firstTeamPoints,
			secondTeamPoints,
			userId,
			gameId,
			processed: false,
		});
	}
}
