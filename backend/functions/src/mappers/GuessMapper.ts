/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */

import type { Guess } from "../adapters/Guess";

export class GuessMapper {
	public static guessToDomain(doc: FirebaseFirestore.DocumentData): Guess {
		return {
			id: doc.id,
			firstTeamPoints: doc.data().firstTeamPoints,
			secondTeamPoints: doc.data().secondTeamPoints,
			gameId: doc.data().gameId,
			userId: doc.data().userId,
			processed: doc.data().processed,
			createdAt: doc.data().createdAt,
		};
	}
}
