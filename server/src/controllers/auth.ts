import {
	Request,
	Response,
	NextFunction
} from "express";
import User, { IUser } from "../models/User";
import {
	hashPassword,
	matchPasswords
} from "../utils/password";
import createHttpError from "http-errors";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signUp = asyncErrorHandler(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const {
			displayName,
			username,
			photoURL,
			email,
			password
		} = req.body;
		const hashedPassword = await hashPassword(
			password
		);
		const user = new User({
			displayName,
			username,
			photoURL,
			email,
			password: hashedPassword
		});
		const result = await user.save();
		const resultObj = result.toObject();
		delete resultObj.password;

		const jwtAccessKey = <string>(
			process.env.JWT_SECRET_KEY
		);
		const token = jwt.sign(resultObj, jwtAccessKey);

		res.cookie("jwtToken", token, {
			secure: process.env.NODE_ENV !== "dev",
			httpOnly: true
		});
		res.json({ status: 'Success' });
		res.send();
	}
);

export const signIn = asyncErrorHandler(
	async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { email, password } = req.body;

		const user: IUser | null = (await User.findOne({
			email: email.toLowerCase()
		}).select("+password")) as IUser;

		if (user) {
			const hashedPassword = <string>user.password;
			const isMatch = await matchPasswords(
				password,
				hashedPassword
			);
			if (isMatch) {
				const resultObj = user.toObject();
				delete resultObj.password;
				const jwtAccessKey = <string>(
					process.env.JWT_SECRET_KEY
				);
				const token = jwt.sign(
					resultObj,
					jwtAccessKey
				);
				
				res.cookie("jwtToken", token, {
					secure: process.env.NODE_ENV !== "dev",
					httpOnly: true
				});
				res.json({ status: 'Success' });
				res.send();
			} else {
				return next(
					createHttpError(401, "Incorrect Password")
				);
			}
		} else {
			return next(
				createHttpError(404, "User not found")
			);
		}
	}
);
