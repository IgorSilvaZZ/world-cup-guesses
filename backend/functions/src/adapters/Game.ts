import type { Timestamp } from "firebase-admin/firestore";

export interface Game {
	id?: string;
	firstTeamCountryCode: string;
	secundTeamCountryCode: string;
	firstTeamPoints: string;
	secondTeamPoints: string;
	finished: boolean
	date: string | Timestamp;
}

export interface GamesByDateInput {
	date: string;
}
