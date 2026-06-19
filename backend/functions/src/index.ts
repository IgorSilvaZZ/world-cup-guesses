import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/https";

import { GamesController } from "./controllers/games.controller";
import { GuessesController } from "./controllers/guesses.controller";

initializeApp();

const gamesController = new GamesController();

const guessesController = new GuessesController();

export const getGamesByDate = onRequest(
	gamesController.getByDate.bind(gamesController),
);

export const getGameById = onRequest(
	gamesController.getById.bind(gamesController),
);

export const sendGuess = onRequest(
	guessesController.createAndUpdate.bind(guessesController),
);
