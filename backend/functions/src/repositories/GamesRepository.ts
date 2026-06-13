/** biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: "" */

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
	type CollectionReference,
	type Firestore,
	getFirestore,
	Timestamp,
} from "firebase-admin/firestore";
import type { Game } from "../adapters/Game";
import type { IGamesRepository } from "../adapters/IGamesRepository";

export class GamesRepository implements IGamesRepository {
	private readonly firestoreClient: Firestore;
	private readonly gamesRef: CollectionReference;

	constructor() {
		this.firestoreClient = getFirestore();

		this.gamesRef = this.firestoreClient.collection("games");
	}

	async findById(id: string): Promise<Game | null> {
		const game = await this.gamesRef.doc(id).get();

		const data = game.data();

		if (!game.exists && !data) {
			return null;
		}

		const utcDate = data?.date.toDate();
		const brDate = toZonedTime(utcDate, "America/Sao_Paulo");

		return {
			...game.data(),
			date: format(brDate, "yyyy-MM-dd HH:mm:ss"),
		} as Game;
	}

	async findByRange(startDate: string, endDate: string): Promise<Game[]> {
		const start = Timestamp.fromDate(new Date(`${startDate}T00:00:00-03:00`));
		const end = Timestamp.fromDate(new Date(`${endDate}T23:59:59-03:00`));

		const docGames = await this.gamesRef
			.where("date", ">=", start)
			.where("date", "<=", end)
			.get();

		const games = docGames.docs.map((doc) => {
			const data = doc.data();

			const utcDate = data.date.toDate();
			const brDate = toZonedTime(utcDate, "America/Sao_Paulo");

			return {
				id: doc.id,
				...data,
				date: format(brDate, "yyyy-MM-dd HH:mm:ss"),
			};
		});

		return games as Game[];
	}
}
