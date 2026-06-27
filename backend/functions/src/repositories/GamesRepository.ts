/** biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: "" */

import {
	type CollectionReference,
	type Firestore,
	getFirestore,
	Timestamp,
} from "firebase-admin/firestore";
import type { Game, GameUpdateInput } from "../adapters/Game";
import type { IGamesRepository } from "../adapters/IGamesRepository";
import { GameMapper } from "../mappers/GameMapper";

export class GamesRepository implements IGamesRepository {
	private readonly firestoreClient: Firestore;
	private readonly gamesRef: CollectionReference;

	constructor() {
		this.firestoreClient = getFirestore();

		this.gamesRef = this.firestoreClient.collection("games");
	}

	async findById(id: string): Promise<Game | null> {
		const docGames = await this.gamesRef.doc(id).get();

		if (!docGames.exists) {
			return null;
		}

		return GameMapper.gameToDomain(docGames);
	}

	async findByRange(startDate: string, endDate: string): Promise<Game[]> {
		const start = Timestamp.fromDate(new Date(`${startDate}T00:00:00-03:00`));
		const end = Timestamp.fromDate(new Date(`${endDate}T23:59:59-03:00`));

		const docGames = await this.gamesRef
			.where("date", ">=", start)
			.where("date", "<=", end)
			.get();

		const games = docGames.docs.map(GameMapper.gameToDomain);

		return games;
	}

	async findFinished(): Promise<Game[]> {
		const docGames = await this.gamesRef.where("finished", "==", true).get();

		const games = docGames.docs.map(GameMapper.gameToDomain);

		return games;
	}

	async update(gameId: string, data: Partial<GameUpdateInput>): Promise<void> {
		await this.gamesRef.doc(gameId).update(data);
	}
}
