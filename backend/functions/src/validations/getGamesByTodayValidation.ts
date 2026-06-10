import z from "zod";
import type { GamesByTodayInput } from "../adapters/Game";

export function getGamesByTodayValidation(
	gamesByTodayInput: GamesByTodayInput,
) {
	const schema = z.object({
		date: z.iso.date(),
	});

	const result = schema.parse(gamesByTodayInput);

	return result;
}
