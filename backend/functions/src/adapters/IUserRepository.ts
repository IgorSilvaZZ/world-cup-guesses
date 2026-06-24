import type { User, UserInput } from "./User";

export interface IUserRepository {
	findById(id: string): Promise<User | null>;
	update(id: string, data: Partial<UserInput>): Promise<void>
}
