import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/https";

import { GamesController } from "./controllers/games.controller";

initializeApp();

const gamesController = new GamesController();

export const getGamesByDate = onRequest(
	gamesController.getGamesByDate.bind(gamesController),
);

export const getGameById = onRequest(
	gamesController.getGameById.bind(gamesController),
);
