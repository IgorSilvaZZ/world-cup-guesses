/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { Game } from "../adapters/Game";

export class GameMapper {
	public static gameToDomain(data: FirebaseFirestore.DocumentData): Game {
		const utcDate = data.date.toDate();

		const brDate = toZonedTime(utcDate, "America/Sao_Paulo");

		return {
			id: data.id,
			firstTeamCountryCode: data.firstTeamCountryCode,
			firstTeamPoints: data.firstTeamPoints,
			secondTeamPoints: data.secondTeamPoints,
			secundTeamCountryCode: data.secundTeamCountryCode,
			date: format(brDate, "yyyy-MM-dd HH:mm:ss"),
		};
	}
}
