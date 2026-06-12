import { initializeApp } from "firebase-admin/app";
import { onRequest } from "firebase-functions/https";

import { GamesController } from "./controllers/games.controller";

initializeApp();

const gamesController = new GamesController();

export const getGamesByToday = onRequest(
	gamesController.getGamesByToday.bind(gamesController),
);
