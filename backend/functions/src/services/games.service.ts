import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
	type Firestore,
	getFirestore,
	Timestamp,
} from "firebase-admin/firestore";

export class GamesService {
	private readonly firestoreClient: Firestore;

	constructor() {
		this.firestoreClient = getFirestore();
	}

	public async getGamesByDate(date: string) {
		const start = Timestamp.fromDate(new Date(`${date}T00:00:00-03:00`))
		const end = Timestamp.fromDate(new Date(`${date}T23:59:59-03:00`))

		const gamesRef = this.firestoreClient.collection("games");

		const docGames = await gamesRef
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

		return games;
	}
}
