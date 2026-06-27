export interface Guess {
	id?: string;
	firstTeamPoints: string;
	secondTeamPoints: string;
	gameId: string;
	userId: string;
	processed: boolean;
	createdAt: string;
}

export interface GuessInput {
	firstTeamPoints: number;
	secondTeamPoints: number;
	gameId: string;
	userId: string;
	processed?: boolean;
}
