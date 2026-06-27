/** biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: "" */

import {
	type CollectionReference,
	type Firestore,
	getFirestore,
} from "firebase-admin/firestore";
import type { Guess, GuessInput } from "../adapters/Guess";
import type { IGuessRepository } from "../adapters/IGuessRepository";
import { GuessMapper } from "../mappers/GuessMapper";

export class GuessesRepository implements IGuessRepository {
	private readonly firestoreClient: Firestore;
	private readonly guessesRef: CollectionReference;

	constructor() {
		this.firestoreClient = getFirestore();

		this.guessesRef = this.firestoreClient.collection("guesses");
	}

	async findById(id: string): Promise<Guess | null> {
		const docGuesses = await this.guessesRef.doc(id).get();

		if (!docGuesses.exists) {
			return null;
		}

		return GuessMapper.guessToDomain(docGuesses);
	}

	async findByUserAndGame(
		userId: string,
		gameId: string,
	): Promise<Guess | null> {
		const guessDoc = await this.guessesRef
			.where("userId", "==", userId)
			.where("gameId", "==", gameId)
			.get();

		if (guessDoc.empty || guessDoc.docs.length === 0) {
			return null;
		}

		const [docGuess] = guessDoc.docs;

		return GuessMapper.guessToDomain(docGuess);
	}

	async findAll(): Promise<Guess[]> {
		const docGuesses = await this.guessesRef.get();

		const guesses = docGuesses.docs.map(GuessMapper.guessToDomain);

		return guesses;
	}

	async findByUserId(userId: string): Promise<Guess[]> {
		const docGuesses = await this.guessesRef
			.where("userId", "==", userId)
			.get();

		const guesses = docGuesses.docs.map(GuessMapper.guessToDomain);

		return guesses;
	}

	async findByGameIdNotProcessed(gameId: string): Promise<Guess[]> {
		const docGuesses = await this.guessesRef
			.where("gameId", "==", gameId)
			.where("processed", "==", false)
			.get();

		const guesses = docGuesses.docs.map(GuessMapper.guessToDomain);

		return guesses;
	}

	async create(data: GuessInput): Promise<void> {
		await this.guessesRef.doc().set(data);
	}

	async update(guessId: string, data: Partial<GuessInput>): Promise<void> {
		await this.guessesRef.doc(guessId).update(data);
	}
}
