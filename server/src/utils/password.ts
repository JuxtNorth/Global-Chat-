import { hash, genSalt, compare } from "bcryptjs";

export const hashPassword = async (
	password: string,
): Promise<string | Error> => {
	const salt = await genSalt();
	const hashedPassword = await hash(password, salt);
	return hashedPassword;
};

export const matchPasswords = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	const isMatch = await compare(password, hashedPassword);
	return isMatch;
};
