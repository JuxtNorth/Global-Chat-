import asyncErrorHandler from "../utils/asyncErrorHandler";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Schema } from "mongoose";
import User, { IUser } from "../models/User";

dotenv.config();

const authenticate = asyncErrorHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies.jwtToken;
		if (token) {
			const jwtAccessKey = <string>process.env.JWT_SECRET_KEY;
			const userData = jwt.verify(token, jwtAccessKey) as {
				_id: Schema.Types.ObjectId;
			};
			// Find User
			const user: IUser | null = await User.findById(userData._id);
			if (user) {
				return next();
			} else {
				return next(createHttpError(404, "User not found"));
			}
		}
		return next(createHttpError(400, "Invalid Token"));
	},
);

export default authenticate;
