import type { User } from "./User";

export interface IUserRepository {
	findById(id: string): Promise<User | null>;
}
