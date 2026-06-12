import z from "zod";
import type { GamesByDateInput } from "../adapters/Game";
import { CUP_END_DATE, CUP_START_DATE } from "../shared/const";

export function getGamesByDateValidation(
	gamesByDateInput: GamesByDateInput,
) {
	const schema = z.object({
		date: z.iso.date().refine((date) => {
			const parsed = new Date(date)

			return parsed >= CUP_START_DATE && parsed <= CUP_END_DATE
		}, {
			error: "Date must be within the 2026 World Cup period (2026-06-11 to 2026-07-19)"
		})
	});

	const result = schema.parse(gamesByDateInput);

	return result;
}
