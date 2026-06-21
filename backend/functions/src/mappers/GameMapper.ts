/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */

import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import type { Game } from "../adapters/Game";

export class GameMapper {
	public static gameToDomain(doc: FirebaseFirestore.DocumentData): Game {
		const data = doc.data();

		const utcDate = data.date.toDate();

		const brDate = toZonedTime(utcDate, "America/Sao_Paulo");

		return {
			id: doc.id,
			firstTeamCountryCode: data.firstTeamCountryCode,
			firstTeamPoints: data.firstTeamPoints,
			secondTeamPoints: data.secondTeamPoints,
			secundTeamCountryCode: data.secundTeamCountryCode,
			date: format(brDate, "yyyy-MM-dd HH:mm:ss"),
		};
	}
}
