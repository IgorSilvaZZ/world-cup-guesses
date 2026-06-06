import { type Firestore, getFirestore } from "firebase-admin/firestore";

export class GamesService {
	private readonly firestoreClient: Firestore;

	constructor() {
		this.firestoreClient = getFirestore();
	}

	public async getGamesByDate(date: string) {
		const docGames = await this.firestoreClient.collection("games").get();

		const games = docGames.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		return games;
	}
}
