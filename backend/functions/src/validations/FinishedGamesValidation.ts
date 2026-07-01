/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */

import z from "zod";
import type { FinishedGamesInput } from "../adapters/Game";

export class FinishedGamesValidation {
	public static finishedGames(data: FinishedGamesInput[]) {
		const finishedGameSchema = z.object({
			gameId: z.string(),
			firstTeamPoints: z.string(),
			secondTeamPoints: z.string(),
		});

		const finishedSchemaArray = z.array(finishedGameSchema);

		finishedSchemaArray.parse(data);
	}
}
