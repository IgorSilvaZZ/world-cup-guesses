import type { Game } from "./Game";

export interface IGamesRepository {
	findById(id: string): Promise<Game | null>;
	findByRange(startDate: string, endDate: string): Promise<Game[]>;
	findFinished(): Promise<Game[]>
}
