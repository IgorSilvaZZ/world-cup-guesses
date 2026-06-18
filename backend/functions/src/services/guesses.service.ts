import type { GuessInput } from "../adapters/Guess";
import type { IGuessRepository } from "../adapters/IGuessRepository";
import { GuessesRepository } from "../repositories/GuessesRepository";

export class GuessesService {
	private readonly guessesRepository: IGuessRepository;

	constructor() {
		this.guessesRepository = new GuessesRepository();
	}

	public async create(data: GuessInput) {
		await this.guessesRepository.create(data);
	}
}
