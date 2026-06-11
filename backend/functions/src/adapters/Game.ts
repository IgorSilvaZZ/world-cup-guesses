import { Timestamp } from "firebase-admin/firestore";

export interface Game {
	id?: string;
	firstTeamCountryCode: string;
	secundTeamCountryCode: string;
	firstTeamPoints: string;
	secondTeamPoints: string;
	date: string | Timestamp;
}

export interface GamesByTodayInput {
	date: string;
}
