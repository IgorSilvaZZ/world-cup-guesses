import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/https";

import { GamesController } from "./controllers/games.controller";
import { GuessesController } from "./controllers/guesses.controller";
import { RakingController } from "./controllers/ranking.controller";

initializeApp();

const gamesController = new GamesController();

const guessesController = new GuessesController();

const rakingController = new RakingController();

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

export const processRaking = onRequest(rakingController.process.bind(rakingController))
