import { endOfDay, format, parse, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import {
	type Firestore,
	getFirestore,
	Timestamp,
} from "firebase-admin/firestore";

/* 2026-06-12T02:00:00:00.000Z */

export class GamesService {
	private readonly firestoreClient: Firestore;

	constructor() {
		this.firestoreClient = getFirestore();
	}

	public async getGamesByDate(date: string) {
		const dateParsed = parse(date, "yyyy-MM-dd", new Date());

		const start = Timestamp.fromDate(startOfDay(dateParsed));
		const end = Timestamp.fromDate(endOfDay(dateParsed));

		console.log({ start, end });

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
