import type { Game, GameUpdateInput } from "./Game";

export interface IGamesRepository {
	findById(id: string): Promise<Game | null>;
	findByRange(startDate: string, endDate: string): Promise<Game[]>;
	findFinished(): Promise<Game[]>;
	update(gameId: string, data: Partial<GameUpdateInput>): Promise<void>;
}
