import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
import User, { IUser } from "../models/User";

dotenv.config();

async function authenticateSocketUser(
	token: string
): Promise<IUser | null> {
	if (token) {
		const jwtSecretKey = <string>(
			process.env.JWT_SECRET_KEY
		);
		const userData = jwt.verify(
			token,
			jwtSecretKey
		) as {
			_id: Schema.Types.ObjectId;
		};
		const user: IUser | null = await User.findById(
			userData._id
		);
		return user;
	}
	return null;
}

export default authenticateSocketUser;
