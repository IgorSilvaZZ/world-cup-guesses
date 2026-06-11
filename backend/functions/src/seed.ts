process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";

import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import type { Game } from "./adapters/Game";
import type { User } from "./adapters/User";

initializeApp({ projectId: "bolao-copa-do-mundo-3ba11" });

const db = getFirestore();

const TIME_ZONE = "-03:00"

export const createUsers = async () => {
	console.log("🎯 Starting users seeding...");

	const users: User[] = [
		{ name: "Iguinho", email: "iguinho@email.com", password: "senha123" },
		{ name: "Vitinho", email: "vitinho@email.com", password: "senha123" },
	];

	try {
		for (const user of users) {
			const { id } = await db.collection("users").add(user);

			user.id = id;

			console.log("✅ Seeding user completed successfully!");
		}
	} catch (error) {
		console.error("❌ Error seeding users:", error);

		throw error;
	}

	return users;
};

export const createGames = async () => {
	console.log("🎯 Starting games seeding...");

	/* Apenas primeira rodada */
	const games: Game[] = [
		{
			date: Timestamp.fromDate(new Date(`2026-06-11T16:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "MX",
			secundTeamCountryCode: "ZA",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-11T23:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "KR",
			secundTeamCountryCode: "CZ",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-12T16:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "CA",
			secundTeamCountryCode: "BA",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-13T16:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "QA",
			secundTeamCountryCode: "CH",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-13T19:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "BR",
			secundTeamCountryCode: "MA",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-13T22:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "HT",
			secundTeamCountryCode: "GB",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-12T22:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "US",
			secundTeamCountryCode: "PY",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-14T01:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "AU",
			secundTeamCountryCode: "TR",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-14T14:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "DE",
			secundTeamCountryCode: "CW",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-14T20:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "CI",
			secundTeamCountryCode: "EC",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-14T17:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "NL",
			secundTeamCountryCode: "JP",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-14T23:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "SE",
			secundTeamCountryCode: "TN",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-15T16:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "BE",
			secundTeamCountryCode: "EG",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-15T22:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "IR",
			secundTeamCountryCode: "NZ",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-15T13:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "ES",
			secundTeamCountryCode: "CV",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-15T19:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "SA",
			secundTeamCountryCode: "UY",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-16T16:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "FR",
			secundTeamCountryCode: "SN",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-16T19:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "IQ",
			secundTeamCountryCode: "NO",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-16T22:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "AR",
			secundTeamCountryCode: "DZ",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-17T01:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "AT",
			secundTeamCountryCode: "JO",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-17T14:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "PT",
			secundTeamCountryCode: "CD",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-17T23:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "UZ",
			secundTeamCountryCode: "CO",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-17T17:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "GB",
			secundTeamCountryCode: "HR",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: Timestamp.fromDate(new Date(`2026-06-17T20:00:00${TIME_ZONE}`)),
			firstTeamCountryCode: "GH",
			secundTeamCountryCode: "PA",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
	];

	for (const game of games) {
		try {
			await db.collection("games").add(game);
		} catch (error) {
			console.error("❌ Error seeding games:", error);

			throw error;
		}	
	}

	console.log("✅ Seeding game completed successfully!");
};

async function seedDatabase() {
	console.log("🌱 Starting Firestore seeding...");

	/* await createUsers(); */

	await createGames();

	process.exit(0);
}

seedDatabase();
