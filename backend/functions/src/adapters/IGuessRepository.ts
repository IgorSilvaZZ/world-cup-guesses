import type { Guess, GuessInput } from "./Guess";

export interface IGuessRepository {
	findById(id: string): Promise<Guess | null>;
	findByUserAndGame(userId: string, gameId: string): Promise<Guess | null>;
	findAll(): Promise<Guess[]>;
	findByUserId(userId: string): Promise<Guess[]>;
	findByGameIdNotProcessed(gameId: string): Promise<Guess[]>;
	create(data: GuessInput): Promise<void>;
	update(guessId: string, data: Partial<GuessInput>): Promise<void>;
}
