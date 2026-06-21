export interface Guess {
	id?: string;
	firstTeamPoints: number;
	secondTeamPoints: number;
	gameId: string;
	userId: string;
	createdAt: string;
}

export interface GuessInput {
	firstTeamPoints: number;
	secondTeamPoints: number;
	gameId: string;
	userId: string;
}
