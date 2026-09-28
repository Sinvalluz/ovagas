import UserNotFound from "../_errors/user-not-found";
import { findById } from "../_repository/user-repository";

export async function getUser(id: string) {
	const user = await findById(id);

	if (!user) {
		throw new UserNotFound();
	}

	return user;
}
