process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";

import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { Game } from "./adapters/Game";
import type { User } from "./adapters/User";

initializeApp({ projectId: "bolao-copa-do-mundo-3ba11" });

const db = getFirestore();

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

	const games: Game[] = [
		{
			date: "11 de junho de 2026 às 16:00:52 UTC-3",
			firstTeamCountryCode: "MX",
			secundTeamCountryCode: "ZA",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
		{
			date: "11 de junho de 2026 às 23:00:00 UTC-3",
			firstTeamCountryCode: "KR",
			secundTeamCountryCode: "CZ",
			firstTeamPoints: "",
			secondTeamPoints: "",
		},
	];

	try {
		for (const game of games) {
			await db.collection("games").add(game);

			console.log("✅ Seeding game completed successfully!");
		}
	} catch (error) {
		console.error("❌ Error seeding games:", error);

		throw error;
	}
};

async function seedDatabase() {
	console.log("🌱 Starting Firestore seeding...");

	await createUsers();

	await createGames();

	process.exit(0);
}

seedDatabase();
