/** biome-ignore-all lint/complexity/noStaticOnlyClass: "" */
/** biome-ignore-all lint/suspicious/noExplicitAny: "" */

import type { Response } from "firebase-functions/v1";
import { ZodError } from "zod";
import { AppErrors } from "../errors/AppErrors";

export class ErrorResolver {
	public static execute(error: any, res: Response) {
		console.error(error);

		if (error instanceof AppErrors) {
			res.status(error.statusCode).json({ message: error.message });
		} else if (error instanceof ZodError) {
			res
				.status(400)
				.json({ message: "Validation error", issues: error.issues });
		} else {
			res.status(500).json({ message: "Internal server error." });
		}
	}
}
