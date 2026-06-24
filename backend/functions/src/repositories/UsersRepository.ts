/** biome-ignore-all lint/correctness/noUnusedPrivateClassMembers: "" */
import {
	type CollectionReference,
	type Firestore,
	getFirestore,
} from "firebase-admin/firestore";
import type { IUserRepository } from "../adapters/IUserRepository";
import type { User, UserInput } from "../adapters/User";
import { UserMapper } from "../mappers/UserMapper";

export class UsersRepository implements IUserRepository {
	private readonly firestoreClient: Firestore;
	private readonly usersRef: CollectionReference;

	constructor() {
		this.firestoreClient = getFirestore();

		this.usersRef = this.firestoreClient.collection("users");
	}

	async findById(id: string): Promise<User | null> {
		const docUsers = await this.usersRef.doc(id).get();

		if (!docUsers.exists) {
			return null;
		}

		return UserMapper.userToDomain(docUsers);
	}


	async update(id: string, data: Partial<UserInput>): Promise<void> {
		await this.usersRef.doc(id).update(data)
	}

}
