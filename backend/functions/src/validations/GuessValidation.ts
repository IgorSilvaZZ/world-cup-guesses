/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */
import z from "zod";
import type { GuessInput } from "../adapters/Guess";

export class GuessValidation {
	public static createGuessValidation(data: GuessInput): void {
		const schema = z.object({
			firstTeamPoints: z.int().min(0),
			secondTeamPoints: z.int().min(0),
			gameId: z.string(),
			userId: z.string(),
		});

		schema.parse(data);
	}
}
