import { initializeApp } from "firebase-admin/app";
import { onDocumentUpdated } from "firebase-functions/firestore";
import { onRequest } from "firebase-functions/https";
import type { Game } from "./adapters/Game";
import { GamesController } from "./controllers/games.controller";
import { GuessesController } from "./controllers/guesses.controller";
import { RakingController } from "./controllers/ranking.controller";

initializeApp();

const gamesController = new GamesController();

const guessesController = new GuessesController();

const rankingController = new RakingController();

export const getGamesByDate = onRequest(
	gamesController.getByDate.bind(gamesController),
);

export const getGameById = onRequest(
	gamesController.getById.bind(gamesController),
);

export const sendGuess = onRequest(
	guessesController.createAndUpdate.bind(guessesController),
);

export const getGuessesByUser = onRequest(
	guessesController.getByUserId.bind(guessesController),
);

/* Melhorar e colocar o placar juntamente com os ids do jogos */
export const finishedGames = onRequest(
	gamesController.finishedGamesByIds.bind(gamesController),
);

export const processRaking = onDocumentUpdated("games/{gameId}", (event) => {
	/* Colocar uma forma de filtrar e ser acionando como o campo de finished é acionado */

	const gameId = event.params.gameId;

	const gameBeforeData = {
		id: gameId,
		...event.data?.before.data(),
	} as Game;

	const gameAfterData = {
		id: gameId,
		...event.data?.after.data(),
	} as Game;

	rankingController.process(gameBeforeData, gameAfterData);
});
