/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */

import type { Guess } from "../adapters/Guess";

export class GuessMapper {
	public static guessToDomain(data: FirebaseFirestore.DocumentData): Guess {
		return {
			id: data.id,
			firstTeamPoints: data.firstTeamPoints,
			secondTeamPoints: data.secondTeamPoints,
			gameId: data.gameId,
			userId: data.userId,
			createdAt: data.createdAt,
		};
	}
}
