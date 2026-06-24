/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */
import type { User } from "../adapters/User";

export class UserMapper {
	public static userToDomain(doc: FirebaseFirestore.DocumentData): User {
		return {
			id: doc.id,
			name: doc.data().name,
			email: doc.data().email,
			password: doc.data().password,
			points: doc.data().points
		};
	}
}
